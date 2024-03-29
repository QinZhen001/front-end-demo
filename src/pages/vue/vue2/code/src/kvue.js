import Dep from "./dep"
import Compile from "./compile"

// 期待用法
// new KVue({
//     data:{msg:'hello'}
// })

export default class KVue {
  constructor(options) {
    this.$options = options

    // 处理data选项
    this.$data = options.data
    // 响应式
    this.observe(this.$data)

    new Compile(options.el, this)

    if (options.created) {
      options.created.call(this)
    }
  }

  observe(value) {
    if (!value || typeof value !== "object") {
      return
    }
    // 遍历对象
    Object.keys(value).forEach((key) => {
      if (value.hasOwnProperty(key)) {
        this.defineReactive(value, key, value[key])
        // 代理到vm上
        this.proxyData(key)
      }
    })
  }

  defineReactive(obj, key, val) {
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      get() {
        // 依赖收集
        if (Dep.target) {
          dep.addDep(Dep.target)
        }
        return val
      },
      set(newVal) {
        if (newVal !== val) {
          val = newVal
          console.log(`${key}更新了：${newVal}`)
          dep.notify()
        }
      },
    })
    // 递归
    this.observe(val)
  }

  /**
   * 一层代理
   * 访问this.xxx => this.$data[xxx]
   * @param key
   * @returns {*}
   */
  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key]
      },
      set(newVal) {
        this.$data[key] = newVal
      },
    })
  }
}
