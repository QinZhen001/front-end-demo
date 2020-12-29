//https://github.com/answershuto/learnVue/blob/master/docs/%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8E%9F%E7%90%86.MarkDown
// 响应式原理
function defineReactive(obj, key, val, cb) {
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: () => {
            //依赖收集
        },
        set: newVal => {
            cb() //订阅者收到消息的回调
        }
    })
}

function observe(value, cb) {
    Object.keys(value).forEach(key => {
        defineReactive(value, key, value[key], cb)
    })
}

// 代理 这样就可以用app.text代替app._data.text
function _proxy(data) {
    const that = this
    Object.keys(data).forEach(key => {
        Object.defineProperty(that, key, {
            configurable: true,
            enumerable: true,
            get: function proxyGetter() {
                return that._data[key]
            },
            set: function proxySetter(val) {
                this._data[key] = val
            }
        })
    })
}

class Vue {
    constructor(options) {
        this._data = options.data
        observe(this._data, options.render)
        //代理
        //把data上面的属性代理到vm上
        _proxy(options.data)
    }
}

let app = new Vue({
    el: '#app',
    data: {
        text: 'text',
        text2: 'text2'
    },
    render(){
        console.log('render')
    }
})



