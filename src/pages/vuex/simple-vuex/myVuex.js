let Vue = null;

class Store {
  constructor(options = {}) {
    this.vm = new Vue({
      data: {
        state: options.state,
      },
    });

    // getters 相关处理
    let getters = options.getters || {};
    this.getters = {};
    Object.keys(getters).forEach((getterName) => {
      Object.defineProperty(this.getters, getterName, {
        get: () => {
          return getters[getterName](this.state);
        },
      });
    });

    // mutations 相关处理
    let mutations = options.mutations || {};
    this.mutations = {};
    Object.keys(mutations).forEach((mutationName) => {
      this.mutations[mutationName] = (arg) => {
        mutations[mutationName](this.state, arg);
      };
    });

    // actions 处理
    let actions = options.actions || {};
    this.actions = {};
    Object.keys(actions).forEach((actionName) => {
      this.actions[actionName] = (args) => {
        // 注意这里的箭头函数 是为了保证执行环境
        // 注意第一个参数是this
        console.log("action this", this);
        actions[actionName](this, args);
      };
    });
  }

  dispatch(method, arg) {
    this.actions[method](arg);
  }

  commit = (method, arg) => {
    console.log("commit this", this);
    this.mutations[method](arg);
  };

  get state() {
    return this.vm.state;
  }
}

const install = function (vue) {
  Vue = vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.store) {
        this.$store = this.$options.store;
      } else {
        this.$store = this.$parent && this.$parent.$store;
      }
    },
  });
};

let Vuex = {
  Store,
  install,
};

export default Vuex;
