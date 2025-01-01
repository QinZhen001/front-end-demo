// simple vue-router

// TIP: _self 属性是一个特殊属性，它用于在组件内部指向组件实例自身

const routerLink = {
  props: {
    to: Object || String,
  },
  render(h) {
    console.log("router-link render", this === this._self)
    const isHashMode = this._self._root._router.isHashMode
    let to = this.to
    if (typeof this.to == "object") {
      to = this.to.path
    }
    let href = (isHashMode ? "#" : "") + this.to
    return h(
      "a",
      {
        attrs: { href: href },
      },
      this.$slots.default,
    )
  },
}

const routerView = {
  render(h) {
    let current = this._self._root._router.currentObj.path
    let routesMap = this._self._root._router.routesMap
    let target = routesMap[current]
    console.log("router-view render", target)
    return target ? h(target) : h()
  },
}

class VueRouter {
  constructor(options) {
    this.mode = options.mode || "hash"
    this.routes = options.routes || []
    this.isHashMode = this.mode === "hash"
    // routes 转化成 key：value 格式
    this.routesMap = this.createMap(this.routes)
    this.currentObj = { path: "" }
    this.initListener()
  }

  initListener() {
    if (typeof window === "undefined") return
    const initPath = (this.isHashMode ? location.hash.slice(1) : location.pathname) || "/"
    //监听的对象名称，hash模式监听hashchange，history监听popstate
    const listName = this.isHashMode ? "hashchange" : "popstate"
    window.addEventListener("load", () => {
      this.currentObj.path = initPath
    })
    window.addEventListener(listName, () => {
      this.currentObj.path = (this.isHashMode ? location.hash.slice(1) : location.pathname) || "/"
    })
  }

  createMap(routes) {
    return routes.reduce((pre, current) => {
      pre[current.path] = current.component
      return pre
    }, {})
  }
}

VueRouter.install = function (v) {
  let vue = v

  vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.router) {
        // 是根组件
        this._root = this // 把当前实例挂载在_root上
        this._router = this.$options.router // VueRouter 实例
        // 双向绑定
        vue.util.defineReactive(this, "_route", this._router.currentObj)
      } else {
        // 是子组件
        // &&表达式 取最后一项的结果
        this._root = this.$parent && this.$parent._root
      }
      Object.defineProperty(this, "$router", {
        get() {
          return this._root._router
        },
      })
      Object.defineProperty(this, "$route", {
        get() {
          return this._root._route
        },
      })
    },
  })

  vue.component("router-link", routerLink)
  vue.component("router-view", routerView)
}

export default VueRouter

// window.VueRouter = VueRouter
