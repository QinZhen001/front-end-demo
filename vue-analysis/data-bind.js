//https://github.com/answershuto/learnVue/blob/master/docs/%E4%BB%8E%E6%BA%90%E7%A0%81%E8%A7%92%E5%BA%A6%E5%86%8D%E7%9C%8B%E6%95%B0%E6%8D%AE%E7%BB%91%E5%AE%9A.MarkDown
// 从源码角度再看数据绑定
// 前面已经讲过Vue数据绑定的原理了，现在从源码来看一下数据绑定在Vue中是如何实现的。

//initData
//initData主要是初始化data中的数据，将数据进行Observer，监听数据的变化，其他的监视原理一致
function initData(vm: Component) {
    //得到data数据
    let data = vm.$options.data
    data = vm._data = (typeof data === 'function' ? getData(data, vm) : data || {})
    // 判断是否是对象
    if (!isPlainObject(data)) {
        data = {}
        process.env.NODE_ENV !== 'production' && warn(
            'data functions should return an object:\n' +
            'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
            vm
        )
    }

    // proxy data on instance
    // 遍历data对象
    const keys = Object.keys(data)
    const props = vm.$options.props
    let i = keys.length

    //遍历data中的数据
    while (i--) {
        //保证data中的key不与props中的key重复，props优先，如果有冲突会产生warning
        if (props && hasOwn(props, keys[i])) {
            process.env.NODE_ENV !== 'production' && warn(
                `The data property "${keys[i]}" is already declared as a prop. ` +
                `Use prop default value instead.`,
                vm
            )
        } else if (!isReserved(keys[i])) {
            // 判断是否是保留字段

            //前面讲过的代理 将data上面的属性代理到了vm实例上
            proxy(vm, `_data`, keys[i])
        }
    }

    //observe data
    // 从这里开始对数据进行绑定(asRootData),这步作为根数据
    observe(data, true)
}

//其实这段代码主要做了两件事，
// 一是将_data上面的数据代理到vm上，
// 另一件事通过observe将所有数据变成observable。


//proxy
//添加代理
function proxy(target: Object, sourceKey: string, key: string) {
    sharedPropertyDefinition.get = function proxyGetter() {
        return this[sourceKey][key]
    }
    sharedPropertyDefinition.set = function proxySetter(val) {
        this[sourceKey][key] = val
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
}
// 这里比较好理解，通过proxy函数将data上面的数据代理到vm上，这样就可以用app.text代替app._data.text了。


//observe
//这个函数定义在core文件下oberver的index.js文件中。

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
/*
 尝试创建一个Observer实例（__ob__），如果成功创建Observer实例则返回新的Observer实例，
 如果已有Observer实例则返回现有的Observer实例。
 */

function observe(value: any, asRootData: ?boolean): Observer | void {
    //判断是否是一个对象
    if (!isObject(value)) {
        return
    }
    let ob: Observer | void

    //这里使用__ob__这个属来判断是否已经有了Observer实例，
    // 如果没有则会新建一个Observer实例并赋值给__ob__这个属性
    // 如果已有Observer实例则直接返回该Observer实例
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__
    } else if (
        //这里的判断是为了确保value是单纯的对象，而不是函数或者Regexp等
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
    ) {
        ob = new Observer(value)
    }

    if (asRootData && ob) {
        // 如果是根数据则计数，后面Observer中的observe的asRootData非true
        ob.vmCount++
    }
    return ob
}
//Vue响应式数据都会有一个__ob__的属性作为标记
//里面存放着该属性的观察器，也就是Observer的实例，防止重复绑定


//Observer
//Observer的作用就是遍历对象的所有属性将其进行双向绑定。
/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
export class Observer {
    value: any;
    dep: Dep;
    vmCount: number; //number of vms that has this object as root $data

    constructor(value: any) {
        this.value = value
        this.dep = new Dep()
        this.vmCount = 0
        //将Observer实例绑定到data的__ob__属性上面去，之前说过observe会先检测
        //是否已有__ob__对象存放Observer实例了
        //def方法定义可以参考https://github.com/vuejs/vue/blob/dev/src/core/util/lang.js#L16

        def(value, '__ob__', this)
        if (Array.isArray(value)) {
            //如果是数组，将修改后可以截获响应的数组方法替换掉该数组的原型的原生方法
            //达到监听数组数据变化响应的效果
            //这里如果当前浏览器支持__proto__属性，则直接覆盖当前数组对象原型上的原生数组方法
            //如果不支持该属性，则直接覆盖数组对象的原型
            const augment = hasProto
                ? protoAugment //直接覆盖原型的方法来修改目标对象
                : copyAugment //定义(覆盖)目标对象的某一个方法
            augment(value, arrayMethods, arrayKeys)
            //如果是数组则需要遍历数组的每一个成员进行observe
            this.observeArray(value)
        } else {
            //如果是对象则直接walk进行绑定
            this.walk(value)
        }
    }

    /**
     * Walk through each property and convert them into
     * getter/setters. This method should only be called when
     * value type is Object.
     */
    walk(obj: Object) {
        const keys = Object.keys(obj)
        //walk方法会遍历对象的每一个属性进行defineReactive绑定
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, key[i], obj[keys[i]])
        }
    }

    /**
     * Observe a list of Array items.
     */
    observeArray(items: Array<any>) {
        //数组需要遍历每一个成员进行observe
        for (let i = 0, l = items.length; i < l; i++) {
            observe(items[i])
        }
    }
}
// Observer为数据加上响应式属性进行双向绑定。
// 如果是对象则进行深度遍历，为每一个子对象都绑定上方法
// 如果是数组则为每一个成员都绑定上方法


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


// 如果是修改一个数组的成员，该成员是一个对象，那只需要递归对数组的成员进行双向绑定即可。
// 但这时候出现了一个问题，？
// 如果我们进行pop、push等操作的时候，push进去的对象根本没有进行过双向绑定，
// 更别说pop了，那么我们如何监听数组的这些变化呢？
// Vue.js提供的方法是重写push、pop、shift、unshift、splice、sort、reverse这七个数组方法。

import {def} from './util'
//获取原生数组的原型
const arrayProto = Array.prototype
//创建一个新的数组对象，修改该对象上的数组的七个方法，防止污染原生数组方法
export const arrayMethods = Object.create(arrayProto)


    /**
     * Intercept mutating methods and emit events
     * 截获数组的成员发生的变化，
     * 执行原生数组操作的同时dep通知关联的所有观察者进行响应式处理
     */

    ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
    .forEach(function (method) {
        // cache original method
        /*将数组的原生方法缓存起来，后面要调用*/
        const original = arrayProto[method]
        def(arrayMethods, method, function mutator() {
            // avoid leaking arguments:
            // http://jsperf.com/closure-with-arguments
            let i = arguments.length
            const args = new Array(i)
            while (i--) {
                args[i] = arguments[i]
            }
            //调用原生的数组方法
            const result = original.apply(this, args)

            //数组插入的元素需要重新进行observe才能响应
            const ob = this.__ob__
            let inserted
            switch (method) {
                case 'push':
                    inserted = args
                    break
                case 'unshift':
                    inserted = args
                    break
                case 'splice':
                    inserted = args.slice(2)
                    break
            }
            if (inserted) {
                ob.observeArray(inserted)
            }

            // notify change
            /*dep通知所有注册的观察者进行响应式处理*/
            ob.dep.notify()
            return result
        })
    })
// 在保证不污染不覆盖数组原生方法添加监听，主要做了两个操作，
// 第一是通知所有注册的观察者进行响应式处理，
// 第二是如果是添加成员的操作，需要对新成员进行observe。





































