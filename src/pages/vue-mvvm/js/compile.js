function Compile(el, vm) {
    this.$vm = vm
    this.$el = this.isElementNode
}


Compile.prototype = {
    node2Fragment: function (el) {
        var fragment = document.createDocumentFragment(),
            child

        //将原生节点拷贝到fragment
        while (child = el.firstChild) {
            fragment.appendChild(child)
        }

        return fragment

    },

    init: function () {
        this.compileElement(this.$fragment)
    },

    compileElement: function (el) {
        var childNodes = el.childNodes,
            me = this;
        //[].slice.call把类数组转化为数组
        [].slice.call(childNodes).forEach(node){
            var text = node.textContent
        }
    }

}























