/**
 * Define a property.
 */
export function def(obj: Object, key: string, val: any, enumerable
    ? : boolean
)
{
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
}


/**
 * Define a reactive property on an Object.
 */
export function defineReactive
(obj: Object,
 key: string,
 val: any,
 customSetter: Function) {
    //在闭包中定义一个dep对象
    const dep = new Dep()

    const property = Object.getOwnPropertyDescriptor(obj, key)
    if (property && property.configurable === false) {
        return
    }
    /*如果之前该对象已经预设了getter以及setter函数则将其取出来，
     新定义的getter/setter中会将其执行，
     保证不会覆盖之前已经定义的getter/setter。
     */
    // cater for pre-defined getter/setters
    const getter = property && property.get
    const setter = property && property.set

    //对象的子对象递归进行observe并返回子节点的observer对象
    let childOb = observe(val)
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            //如果原本对象拥有getter方法则执行
            const value = getter ? getter.call(obj) : val
            if (Dep.target) {
                //进行依赖收集
                dep.depend()
                if (childOb) {
                    // 子对象进行依赖收集，其实就是将同一个watcher观察者实例放进两个depend中
                    // 一个是正在本身闭包中的depend，另一个是子元素的depend
                    childOb.dep.depend()
                }
                if (Array.isArray(value)) {
                    //是数组则需要对每一个成员都进行依赖收集，如果数组的成员还是数组，则递归
                    dependAray(value)
                }
            }
            return value
        },
        set: function reactiveSetter(newVal) {
            //通过getter方法获取当前值，与新值进行比较，一值则不需要执行下面的操作
            const value = getter ? getter.call(obj) : val
            /* eslint-disable no-self-compare */
            if (newVal === val || (newVal !== newVal && value !== value)) {
                return
            }
            /* eslint-disable no-self-compare */
            if (process.env.NODE_ENV !== 'production' && customSetter) {
                customSetter()
            }
            if (setter) {
                //如果原本对象拥有setter方法则执行setter
                setter.call(obj, newVal)
            } else {
                val = newVal
            }

            //新的值需要重新进行observe，保证数据的响应式
            childOb = observe(newVal)

            //dep对象通知所有的观察者
            dep.notify()
        }
    })


}