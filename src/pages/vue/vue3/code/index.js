class zVue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;
    this.$el = options.el;
    //替换原来的dep
    this.$binding = {};
    //添加observer监听
    this.proxyData(this.$data)
    new zCompile(options.el, this);//添加文档解析
  }


  proxyData(data) {
    if (!data || typeof (data) !== 'object') {
      return;
    }
    const _this = this;

    const handler = {
      set(target, key, value){
        const rest = Reflect.set(target, key, value);
      }
    }

    this.$data = new Proxy(data, handler);
  }
}
