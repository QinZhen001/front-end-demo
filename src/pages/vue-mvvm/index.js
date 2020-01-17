function myVue(options) {
  this._init(options)
}


myVue.prototype._init = function (options) {
  this.$options = options
  this.$el = document.querySelector(options.el)
  this.$data = options.data
  this.$methods = options.methods  //increment

  this._binding = {} //_binding保存着model和view的映射关系 也就定义的Watcher实例
  //当model改变的时，触发其中的指令类更新，保证view也能实时更新

  this._obverse(this.$data)


  //将view和model进行绑定  用来解析我们的指令(v-bind,v-model,v-click)
  this._compile(this.$el)
}


myVue.prototype._compile = function (root) {
  // root为id为app的Element元素 也就是我们的根元素
  var _this = this
  var nodes = root.children
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i]
    if (node.children.length) {
      this._compile(node)
    }

    if (node.hasAttribute('v-click')) {
      //如果有v-click属性 我们监听它的onclick事件 触发increment事件
      // ()()首先会自执行 node.onclick实际上是()()的return值
      node.onclick = (function () {
        var attrVal = nodes[i].getAttribute('v-click')
        return _this.$methods[attrVal].bind(_this.$data)
      })()
    }

    if (node.hasAttribute('v-model') && (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA')) {
      node.addEventListener('input', (function (key) {
        var attrVal = node.getAttribute('v-model')
        // _this.binding['number']._directives = [一个Watcher实例]
        // 其中Watcher.prototype.update = function(){
        //          node['value']  = _this.$data['number'] 这就将node的值保持与number一致
        // }
        _this._binding[attrVal]._directives.push(new Watcher(
          'input', node, _this, attrVal, 'value'
        ))

        return function () {
          _this.$data[attrVal] = nodes[key].value
          // 使number的值与node的value保持一致 实现了双向绑定
        }


      })(i))
    }


    if (node.hasAttribute('v-bind')) {
      //如果有v-bind属性 我们只需使node的值及时更新为data中的number值即可
      var attrVal = node.getAttribute('v-bind')
      _this._binding[attrVal]._directives.push(new Watcher(
        'text', node, _this, attrVal, 'innerHTML'
      ))
    }


  }
}


// _obverse 函数，对data进行处理，重写data的set和get函数
myVue.prototype._obverse = function (obj) {
  // obj = {number:0}
  var value
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      value = obj[key]
      this._binding[key] = {
        _directives: []
      }

      if (typeof value === 'object') {
        this._obverse(value)
      }


      var binding = this._binding[key]
      Object.defineProperty(this.$data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
          console.log(`获取${value}`)
          return value
        },
        set: function (newVal) {
          if (value !== newVal) {
            console.log(`更新${newVal}`)
            value = newVal
            binding._directives.forEach(function (item) {
              //当number改变的时候，触发_binding[number]._directives 中绑定的Watcher类的更新
              item.update()
            })
          }
        }
      })
    }
  }
}


//指令类Watcher，用来绑定更新函数，实现对DOM元素的更新
function Watcher(name, el, vm, exp, attr) {
  this.name = name //指令名称 例如文本节点 该值设为'text'
  this.el = el //指定对应的DOM元素
  this.vm = vm //指令所属的myVue实例
  this.exp = exp //指令对应的值 本例如 number
  this.attr = attr //绑定的属性值 本例'innerHTML'

  this.update()
}

Watcher.prototype.update = function () {
  this.el[this.attr] = this.vm.$data[this.exp] //比如 H3.innerHTML = this.data.number
  // 当number改变的时候 会触发这个update函数 保证对应的DOM进行了更新
}


var app = new myVue({
  el: '#app',
  data: {
    number: 0
  },
  methods: {
    increment: function () {
      this.number++
    }
  }
})
