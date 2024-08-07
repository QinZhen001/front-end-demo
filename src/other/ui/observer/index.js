const arrMethods = [
  "concat",
  "copyWithin",
  "entries",
  "every",
  "fill",
  "filter",
  "find",
  "findIndex",
  "forEach",
  "includes",
  "indexOf",
  "join",
  "keys",
  "lastIndexOf",
  "map",
  "pop",
  "push",
  "reduce",
  "reduceRight",
  "reverse",
  "shift",
  "slice",
  "some",
  "sort",
  "splice",
  "toLocaleString",
  "toString",
  "unshift",
  "values",
  "size",
]

const triggerStr = [
  "concat",
  "copyWithin",
  "fill",
  "pop",
  "push",
  "reverse",
  "shift",
  "sort",
  "splice",
  "unshift",
  "size",
].join(",")

console.log("triggerStr", triggerStr)

function isArray(obj) {
  return Object.prototype.toString.call(obj) === "[object Array]"
}

function isString(obj) {
  return typeof obj === "string"
}

function isFunction(obj) {
  return Object.prototype.toString.call(obj) == "[object Function]"
}

function isInArray(arr, item) {
  for (var i = arr.length; --i > -1; ) {
    if (item === arr[i]) return true
  }
  return false
}

function nan(value) {
  return typeof value === "number" && isNaN(value)
}

function _getRootName(prop, path) {
  // 暂时全部为 prop
  if (path === "#") {
    return prop
  }
  return path.split("-")[1]
}

// -----------------------------

class Observer {
  constructor() {
    this.target = {}
  }

  /**
   * callback是回调函数
   * this指向target
   * 接受的参数prop(属性), value(新值), oldValue(旧值), path(路径)
   */
  observe(target, callback) {
    if (isArray(target)) {
      if (target.length === 0) {
        this.track(target)
      }
      this.mock(target)
    }

    if (target && typeof target === "object" && Object.keys(target).length === 0) {
      this.track(target)
    }

    let eventPropArr = []
    // 主流程
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
        if (callback) {
          eventPropArr.push(prop)
          this.watch(target, prop)
        }
      }
    }

    this.target = target

    if (!this.propertyChangedHandler) {
      this.propertyChangedHandler = []
      const propChanged = callback
      this.propertyChangedHandler.push({
        all: false,
        propChanged: propChanged,
        eventPropArr: eventPropArr,
      })
    }
  }

  /**
   * target为空数组 或者 空对象时才会触发
   */
  track(obj, prop, path) {
    // 更改 target 上的  $observeProps 中 $observerPath
    if (obj.$observeProps) {
      return
    }
    Object.defineProperty(obj, "$observeProps", {
      configurable: true,
      enumerable: false,
      writable: true,
      value: {},
    })
    if (path) {
      obj.$observeProps.$observerPath = path + "-" + prop
    } else {
      if (prop) {
        obj.$observeProps.$observerPath = "#" + "-" + prop
      } else {
        // path 和 prop 都不存在
        obj.$observeProps.$observerPath = "#"
      }
    }
  }

  // 更改 target数组上的方法
  mock(target) {
    const self = this
    arrMethods.forEach((item) => {
      // 重写方法
      target[item] = function () {
        // 这里的this指向target
        const old = Array.prototype.slice.call(this, 0)
        const result = Array.prototype[item].apply(this, Array.prototype.slice.call(arguments))
        if (new RegExp("\\b" + item + "\\b").test(triggerStr)) {
          debugger
          // 是改变数组的方法
          for (let cprop in this) {
            if (this.hasOwnProperty(cprop) && !isFunction(this[cprop])) {
              // 再次设置监听 (当执行到这里时$observeProps.$observerPath已经存在了)
              self.watch(this, cprop, this.$observeProps.$observerPath)
            }
          }
          // 派发通知
          self.onPropertyChanged(`Array-${item}`, this, old, this, this.$observeProps.$observerPath)
        }
        return result
      }
      // 定义纯净方法
      const name = `pure${item.substring(0, 1).toUpperCase()}${item.substring(1)}`
      target[name] = function () {
        return Array.prototype[item].apply(this, Array.prototype.slice.call(arguments))
      }
    })
  }

  /**
   * 我们会在target中创建$observeProps
   * @param target
   * @param prop
   * @param path
   */
  watch(target, prop, path) {
    // 我们先不理path的处理
    if (prop === "$observeProps" || prop === "$observer") return
    if (isFunction(target[prop])) return
    if (!target.$observeProps) {
      Object.defineProperty(target, "$observeProps", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: {},
      })
    }
    if (path !== undefined) {
      target.$observeProps.$observerPath = path
    } else {
      target.$observeProps.$observerPath = "#"
    }

    const self = this
    const currentValue = (target.$observeProps[prop] = target[prop])

    Object.defineProperty(target, prop, {
      get: function () {
        // this 指向target
        return this.$observeProps[prop]
      },
      set: function (newVal) {
        // 拿到旧数据
        const old = this.$observeProps[prop]
        if (old !== newVal) {
          // 赋值新数据
          this.$observeProps[prop] = newVal
          // notify 通知
          // debugger
          self.onPropertyChanged(prop, newVal, old, this, this.$observeProps.$observerPath)
        }
      },
    })

    if (typeof currentValue == "object") {
      if (isArray(currentValue)) {
        this.mock(currentValue)
        // console.log("target", currentValue)
        // debugger

        if (currentValue.length === 0) {
          this.track(currentValue, prop, path)
        }
      }

      if (currentValue && Object.keys(currentValue).length === 0) {
        this.track(currentValue, prop, path)
      }

      // 递归watch
      for (let cprop in currentValue) {
        if (currentValue.hasOwnProperty(cprop)) {
          this.watch(currentValue, cprop, target.$observeProps.$observerPath + "-" + prop)
        }
      }
    }
  }

  /**
   * 监听到store中的prop发生改变
   *
   */
  onPropertyChanged(prop, value, oldValue, target, path) {
    if (!(nan(value) && nan(oldValue)) && this.propertyChangedHandler) {
      const rootName = _getRootName(prop, path)
      for (let i = 0, len = this.propertyChangedHandler.length; i < len; i++) {
        const handler = this.propertyChangedHandler[i]
        if (
          handler.all ||
          // rootName大部分情况为prop prop在eventPropArr中
          isInArray(handler.eventPropArr, rootName) ||
          rootName.indexOf("Array-") === 0
        ) {
          handler.propChanged.call(this.target, prop, value, oldValue, path)
        }
      }
    }

    // 改变的是数组中的对象元素
    // 这种情况要重新watch
    if (prop.indexOf("Array-") !== 0 && typeof value === "object") {
      debugger
      this.watch(target, prop, target.$observeProps.$observerPath)
    }
  }
}

// ------------------------------------------

let data = {
  aaa: "aaa",
  bbb: "bbb",
  ccc: {
    ddd: "ddd",
    eee: [
      1,
      2,
      3,
      {
        xxx: "xxx",
      },
    ],
  },
  fff: [{ aa: 11 }, { aa: 22 }, { aa: 33 }, { aa: 44 }],
}

const observer = new Observer()
// 监听data
observer.observe(data, function (prop, value, old, path) {
  // 触发更新 (这里可以进行视图的更新)
  debugger
  console.log("this", this)
  console.log("更新", prop, value, old, path)
  console.log("\n")
})

console.log("data", data)

// data.aaa = "ccc"

data.fff.splice(2, 1)
// 只有重写数组的方法 才能监听到数组第二次改变
data.fff.splice(3, 1)
