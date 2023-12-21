/**
 * https://www.w3school.com.cn/jsref/prop_node_nodetype.asp
 * nodeType
 * 1 Element
 * 2 Attr
 * 3 Text
 * 4 CDATASection
 * 5 EntityReference
 *
 */
import Watcher from "./watcher"

export default class Compile {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)

    if (this.$el) {
      // 提取宿主中的模板内容到Fragment标签，dom操作会提高效率
      this.$fragment = this.node2Fragment(this.$el)
      console.log("this.$fragment", this.$fragment)
      // 编译模板内容，同时进行依赖收集
      this.compile(this.$fragment)
      this.$el.appendChild(this.$fragment)
    }
  }


  node2Fragment(el) {
    const fragment = document.createDocumentFragment()
    let child
    while ((child = el.firstChild)) {
      // firstChild will be move all node to fragment
      fragment.appendChild(child)
    }
    return fragment
  }


  compile(el) {
    const childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      // 判断节点类型
      if (node.nodeType === 1) {
        // element节点
        this.compileElement(node);
      } else if (node.nodeType == 2) {
       // TODO: attr node
      } else if (node.nodeType == 3) {
        if(this.isInterpolation(node)){
          this.compileText(node);
        }
      }
      

      //递归子节点
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }

  isInterpolation(node) {
    // 是文本且符合 {{}}
    return node.nodeType === 3 &&
      /\{\{(.*)\}\}/.test(node.textContent)
  }


  compileElement(node) {
    let nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach(attr => {
      const attrName = attr.name;
      const exp = attr.value;
      if (this.isDirective(attrName)) {
        const dir = attrName.substring(2)
        let finalDir = `dir_${dir}`
        this[finalDir] && this[finalDir](node, exp)
      } else if (this.isEvent(attrName)) {
        const dir = attrName.substring(1)
        this.eventHandler(node, this.$vm, exp, dir)
      }

    })
  }


  isDirective(attr) {
    return attr.indexOf("k-") === 0;
  }

  isEvent(attr) {
    return attr.indexOf("@") === 0;
  }

  compileText(node) {
    // RegExp.$1 
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/n
    this.update("text", node, RegExp.$1,)
  }

  update(type, node, key) {
    let updater = null
    switch (type) {
      case "text":
        updater = this.updateText;
        // first time (set initVal)
        const initVal = node.textContent;
        updater(node, this.$vm[key], initVal);

        new Watcher(this.$vm, key, initVal, function (value, initVal) {
          updater(node, value, initVal);
        });
        break;
      case "model":
        updater = this.updateModel;
        // first time (set initVal)
        updater(node, this.$vm[key]);

        new Watcher(this.$vm, key, null, function (value, initVal) {
          updater(node, value);
        });
        break;
    }

  }


  eventHandler(node, vm, exp, dir) {
    const fn = vm.$options.methods && vm.$options.methods[exp]
    if (dir && fn) {
      node.addEventListener(dir, fn.bind(vm))
    }
  }


  // directive
  dir_model(node, value) {
    const vm = this.$vm;
    this.update('model', node, value);
    node.addEventListener("input", e => {
      vm[value] = e.target.value;
    });
  }

  dir_html(node, value) {
    this.updateHtml(node, this.$vm[value]);
  }

  dir_text(node, value) {
    this.updateText(node, this.$vm[value]);
  }


  // operate dom
  updateHtml(node, value) {
    node.innerHTML = value
  }

  updateText(node, value, initVal = "") {
    if (!initVal) {
      // k-text situation
      node.textContent = value
      return
    }
    var reg = /{{(.*)}}/ig;
    var replaceStr = String(initVal.match(reg)); // arr[0] => string
    var result = initVal.replace(replaceStr, value);
    node.textContent = result;
  }

  updateModel(node, value) {
    node.value = value;
  }


}
