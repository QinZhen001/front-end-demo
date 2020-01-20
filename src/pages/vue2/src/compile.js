// new Compile(el, vm)

class Compile {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)

    if (this.$el) {
      // 提取宿主中的模板内容到Fragment标签，dom操作会提高效率
      this.$fragment = this.node2Fragment(this.$el)
      // 编译模板内容，同时进行依赖收集
      this.compile(this.$fragment)
      this.$el.appendChild(this.$fragment)
    }
  }


  node2Fragment(el) {
    const fragment = document.createDocumentFragment()
    let child
    while ((child = el.firstChild)) {
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
        // console.log('编译元素节点'+node.nodeName);
        this.compileElement(node);
      } else if (this.isInterpolation(node)) {
        // 插值表达式
        // console.log('编译插值文本'+node.textContent);
        this.compileText(node);
      }

      //递归子节点
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }

  isInterpolation(node) {

  }




}
