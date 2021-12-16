let vue = null;

class VueRouter {
  constructor(options) {
    this.mode = options.mode || "hash";
    this.routes = options.routes || [];
    // routes 转化成 key：value 格式
    this.routesMap = this.createMap(this.routes);
    this.history = new HistoryRoute();
    this.init();
  }

  init() {
    if (this.mode === "hash") {
      // hash 模式
      // 先判断用户打开时有没有hash值，没有的话跳转到#/
      location.hash ? "" : (location.hash = "/");
      window.addEventListener("load", () => {
        this.history.current = location.hash.slice(1);
      });
      window.addEventListener("hashchange", () => {
        this.history.current = location.hash.slice(1);
      });
    } else {
      // history 模式
      location.pathname ? "" : (location.pathname = "/");
      window.addEventListener("load", () => {
        this.history.current = location.pathname;
      });
      window.addEventListener("popstate", () => {
        this.history.current = location.pathname;
      });
    }
  }

  createMap(routes) {
    return routes.reduce((pre, current) => {
      pre[current.path] = current.component;
      return pre;
    }, {});
  }
}

class HistoryRoute {
  constructor() {
    this.current = null;
  }
}

VueRouter.install = function(v) {
  let vue = v;
  console.log("install", vue);

  vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.router) {
        // 是根组件
        this._root = this; // 把当前实例挂载在_root上
        this._router = this.$options.router;
        vue.util.defineReactive(this, "xxx", this._router);
      } else {
        // 是子组件
        // &&表达式 取最后一项的结果
        this._root = this.$parent && this.$parent._root;
      }

      Object.defineProperty(this, "$router", {
        get() {
          return this._root._router;
        },
      });
      Object.defineProperty(this, "$route", {
        get() {
          return this._root._router.history.current;
        },
      });
    },
  });

  vue.component("router-link", {
    props: {
      to: Object || String,
    },
    render(h) {
      console.log(this.to);
      let mode = this._self._root._router.mode;
      let to = this.to;
      if (typeof this.to == "object") {
        to = this.to.path;
      }
      let href = mode === "hash" ? "#/" + to : "/" + to;
      debugger;
      return h(
        "a",
        {
          attrs: { href: href },
        },
        this.$slots.default
      );
    },
  });

  vue.component("router-view", {
    render(h) {
      console.log("render this", this);
      console.log(this._self);
      let current = this._self._root._router.history.current;
      let routesMap = this._self._root._router.routesMap;
      debugger;
      return h(routesMap[current]);
    },
  });
};

export default VueRouter;
