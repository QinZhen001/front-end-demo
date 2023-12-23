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
      set(target, key, value) {
        // return boolean 代表是否设置成功
        const rest = Reflect.set(target, key, value);
        _this.$binding[key].map(item => item.update());
        return rest;
      }
    }

    this.$data = new Proxy(data, handler);
  }

  

  pushWatch(watcher) {
    if (!this.$binding[watcher.key]) {
      this.$binding[watcher.key] = [];
    }
    this.$binding[watcher.key].push(watcher);
  }
}


class zCompile {
  constructor(el, vm) {
    this.$el = document.querySelector(el);
    this.$vm = vm;
    if (this.$el) {
      this.$fragment = this.getNodeChildren(this.$el);
      this.compile(this.$fragment);
      this.$el.appendChild(this.$fragment);
    }

  }


  getNodeChildren(el) {
    const frag = document.createDocumentFragment();
    let child;
    while ((child = el.firstChild)) {
      // 遍历
      frag.appendChild(child);
    }
    return frag;
  }

  compile(el) {
    const childNodes = el.childNodes;
    Array.from(childNodes).forEach(node => {
      if (node.nodeType === 1) {
        // 元素节点
        this.compileElement(node);
      } else if (node.nodeType === 2) {
        // 属性节点
        // this.compileText(node);
      } else if (node.nodeType === 3) {
        // 文本节点
        this.compileText(node);
      }

      if (node.childNodes && node.childNodes.length) {
        this.compile(node);
      }

    })
  }

  compileElement(node) {
    const nodeAttrs = node.attributes;
    Array.from(nodeAttrs).forEach(attr => {
      const attrName = attr.name;//属性名称
      const attrVal = attr.value;//属性值
      if (attrName.slice(0, 2) === 'z-') {
        var tagName = attrName.substring(2);
        switch (tagName) {
          case "model":
            this.zDir_model(node, attrVal);
            break;
          case "html":
            this.zDir_html(node, attrVal);
            break;
        }
      }
    })
  }

  compileText(node) {
    if (typeof node.textContent !== 'string') {
      return;
    }
    const reg = /{{(.*)}}/;
    let match = (node.textContent).match(reg)
    if (!match || !match.length || !match[1]) {
      return
    }
    const key = match[1].trim();
    this.updaterAll('text', node, key);
  }


  updaterAll(type, node, key) {
    let updater = null
    switch (type) {
      case 'text':
        updater = this.updateText;
        const initVal = node.textContent
        updater(node, this.$vm.$data[key], initVal);
        this.$vm.pushWatch(
          new Watcher(this.$vm, key, initVal, function (value, initVal) {
            updater(node, value, initVal);
          })
        )
        break;
      case 'model':
        updater = this.updateModel;
        const initValue = this.$vm.$data[key];
        updater(node, initValue)
        this.$vm.pushWatch(
          new Watcher(this.$vm, key, null, function (value, initVal) {
            updater(node, value);
          })
        )
        break;
      default:
        break;
    }
  }


  updateText(node, value, initVal) {
    var reg = /{{(.*)}}/ig;
    var replaceStr = String(initVal.match(reg));
    var result = initVal.replace(replaceStr, value);
    node.textContent = result;
  }


  updateModel(node, value) {
    node.value = value;
  }


  zDir_model(node, value) {
    const vm = this.$vm;
    this.updaterAll('model', node, value);
    node.addEventListener("input", e => {
      vm.$data[value] = e.target.value;
    });
  }

  zDir_html(node, value) {
    this.updaterHtml(node, this.$vm.$data[value]);
  }

  updaterHtml(node, value) {
    node.innerHTML = value;
  }

}



class Watcher {
  constructor(vm, key, initVal, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;
    this.initVal = initVal;
    // compare vue2 not need Dep
    // Dep.target = this;
    // this.vm[this.key];
    // Dep.target = null;
  }


  update() {
    this.cb.call(this.vm, this.vm.$data[this.key], this.initVal);
  }
}



export default zVue
