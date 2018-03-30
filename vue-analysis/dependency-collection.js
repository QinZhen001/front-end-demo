// https://github.com/answershuto/learnVue/blob/master/docs/%E4%BE%9D%E8%B5%96%E6%94%B6%E9%9B%86.MarkDown
// 依赖收集 (减少不必要的渲染)

// 依赖收集类Dep
class Dep {
    constructor() {
        this.subs = []
    }

    addSub(sub: Watcher) {
        this.subs.push(sub)
    }

    removeSub(sub: Watcher) {
        remove(this.subs, sub)
    }

    notify() {
        // stabilize the subscriber list first
        const subs = this.subs.slice() //一层浅复制
        for (let i = 0, l = subs.length; i < l; i++) {
            subs[i].update()
        }
    }
}

//Watcher
//当依赖收集的时候会addSub到sub中，在修改data中数据的时候会触发dep对象的notify，
//通知所有Watcher对象去修改对应视图。
class Watcher {
    constructor(vm, expOrFn, cb, options) {
        this.cb = cb
        this.vm = vm
        // 在这里将观察者本身赋值给全局的target，只有被target标记过的才会进行依赖收集
        Dep.target = this
        this.cb.call(this.vm)
    }

    update() {
        this.cb.call(this.vm)
    }
}

//开始依赖收集
class Vue {
    constructor(options) {
        this._data = options.data
        observer(this._data, options.render)
        let watcher = new Watcher(this,)
    }
}
function defineReactive(obj, key, val, cb) {
    //在闭包内存储一个Dep对象
    const dep = new Dep()

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: () => {
            if (Dep.target) {
                //Watcher对象存在全局的Dep.target中
                dep.addSub(Dep.target)
            }
        },
        set: newVal => {
            // 只有之前addSub中的函数才会触发
            dep.notify()
        }
    })
}


Dep.target = null;


//将观察者Watcher实例赋值给全局的Dep.target
//然后触发render操作只有被Dep.target标记过的才会进行依赖收集
//有Dep.target的对象会将Watcher的实例push到subs中
//在对象被修改出发setter操作的时候dep会调用subs中的Watcher实例的update方法进行渲染
