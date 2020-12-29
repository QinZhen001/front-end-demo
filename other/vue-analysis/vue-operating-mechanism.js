// Vue.js源码角度看内部运行机制
// https://github.com/answershuto/learnVue/blob/master/docs/%E4%BB%8Etemplate%E5%88%B0DOM(Vue.js%E6%BA%90%E7%A0%81%E8%A7%92%E5%BA%A6%E7%9C%8B%E5%86%85%E9%83%A8%E8%BF%90%E8%A1%8C%E6%9C%BA%E5%88%B6).MarkDown


// Vue构造类
function Vue(options) {
    if (process.env.NODE_ENV !== 'production' &&
        !(this instanceof Vue)) {
        warn('Vue is a constructor and should be called with the `new` keyword')
    }
    /*初始化*/
    this._init(options)
}

// Vue的构造类只做了一件事情，就是调用_init函数进行
// 来看一下init的代码
Vue.prototype._init = function (option: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        startTag = `vue-perf-init:${vm._uid}`
        endTag = `vue-perf-end:${vm._uid}`
        mark(startTag)
    }

    // a flag to avoid this being observed
    /*一个防止vm实例自身被观察的标志位*/
    vm._isVue = true
    // merge options
    if (options && options._isComponent) {
        // optimize internal component instantiation
        // since dynamic options merging is pretty slow, and none of the
        // internal component options needs special treatment.
        initInternalComponent(vm, options)
    } else {
        vm.$options = mergeOptions(
            resolveConstructorOptions(vm.constructor),
            options || {},
            vm
        )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
        initProxy(vm)
    } else {
        vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    /*初始化生命周期*/
    initLifecycle(vm)
    /*初始化事件*/
    initEvents(vm)
    /*初始化render*/
    initRender(vm)
    /*调用beforeCreate钩子函数并且触发beforeCreate钩子事件*/
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    /*初始化props、methods、data、computed与watch*/
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    /*调用created钩子函数并且触发created钩子事件*/
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        /*格式化组件名*/
        vm._name = formatComponentName(vm, false)
        mark(endTag)
        measure(`${vm._name} init`, startTag, endTag)
    }

    if (vm.$options.el) {
        /*挂载组件*/
        vm.$mount(vm.$options.el)
    }
}


// _init主要做了这两件事：
// 1.初始化（包括生命周期、事件、render函数、state等）。
// 2.$mount组件。

// 在生命钩子beforeCreate与created之间会初始化state，在此过程中，会依次初始化props、methods、data、computed与watch，
// 这也就是Vue.js对options中的数据进行“响应式化”（即双向绑定）的过程。


// 双向绑定
// 以initData为例，对option的data的数据进行双向绑定Oberver，其他option参数双向绑定的核心原理是一致的。
function initData(vm: Component) {
    /*得到data数据*/
    let data = vm.$options.data
    data = vm._data = typeof data === 'function'
        ? getData(data, vm)
        : data || {}

    /*判断是否是对象*/
    if (!isPlainObject(data)) {
        data = {}
        process.env.NODE_ENV !== 'production' && warn(
            'data functions should return an object:\n' +
            'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
            vm
        )
    }

    // proxy data on instance
    /*遍历data对象*/
    const keys = Object.keys(data)
    const props = vm.$options
    let i = keys.length

    //遍历data中的数据
    while (i--) {
        /*保证data中的key不与props中的key重复，props优先，如果有冲突会产生warning*/
        if (props && hasOwn(props, keys[i])) {
            process.env.NODE_ENV !== 'production' && warn(
                `The data property "${keys[i]}" is already declared as a prop. ` +
                `Use prop default value instead.`,
                vm
            )
        } else if (!isReserved(keys[i])) {
            /*判断是否是保留字段*/

            /*这里是我们前面讲过的代理，将data上面的属性代理到了vm实例上*/
            proxy(vm, `_data`, keys[i])
        }
    }
    // observe data
    /*从这里开始我们要observe了，开始对数据进行绑定，这里有尤大大的注释asRootData，这步作为根数据，下面会进行递归observe进行对深层对象的绑定。*/
    observe(data, true /* asRootData */)

}

// observe会通过defineReactive对data中的对象进行双向绑定，最终通过Object.defineProperty对对象设置setter以及getter的方法。
// getter的方法主要用来进行依赖收集
// setter方法会在对象被修改的时候触发（不存在添加属性的情况，添加属性请用Vue.set）
// 这时候setter会通知闭包中的Dep，Dep中有一些订阅了这个对象改变的Watcher观察者对象，Dep会通知Watcher对象更新视图。


// 如果是修改一个数组的成员，该成员是一个对象，那只需要递归对数组的成员进行双向绑定即可。
// 但这时候出现了一个问题，如果我们进行pop、push等操作的时候，push进去的对象根本没有进行过双向绑定，更别说pop了，
// 那么我们如何监听数组的这些变化呢？ Vue.js提供的方法是重写push、pop、shift、unshift、splice、sort、reverse这七个数组方法。修改数组原型方法的代码可以参考observer/array.js以及observer/index.js。
export class Observer {
    value: any
    dep: Dep
    vmCount: number  // number of vms that has this object as root $data


    constructor(value: any) {
        //.......


        if (Array.isArray(value)) {
            /*
             如果是数组，将修改后可以截获响应的数组方法替换掉该数组的原型中的原生方法，达到监听数组数据变化响应的效果。
             这里如果当前浏览器支持__proto__属性，则直接覆盖当前数组对象原型上的原生数组方法，如果不支持该属性，则直接覆盖数组对象的原型。
             */
            const augment = hasProto
                ? protoAugment  /*直接覆盖原型的方法来修改目标对象*/
                : copyAugment
            /*定义（覆盖）目标对象或数组的某一个方法*/
            augment(value, arrayMethods, arrayKeys)

            /*如果是数组则需要遍历数组的每一个成员进行observe*/
            this.observeArray(value)
        } else {
            /*如果是对象则直接walk进行绑定*/
            this.walk(value)
        }
    }

}


/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
/*直接覆盖原型的方法来修改目标对象或数组*/
function protoAugment(target, src: Object) {
    /* eslint-disable no-proto */
    target.__proto__ = src
    /* eslint-enable no-proto */
}


/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
/*定义（覆盖）目标对象或数组的某一个方法*/
function copyAugment(target: Object, src: Object, keys: Array<string>) {
    for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i]
        def(target, key, src[key])
    }
}















































