//Vue事件机制
//https://github.com/answershuto/learnVue/blob/master/docs/Vue%E4%BA%8B%E4%BB%B6%E6%9C%BA%E5%88%B6.MarkDown


// 初始化事件
// 初始化事件在vm上创建一个_events对象，用来存放事件。_events的内容如下：
// {
//     eventName: [func1, func2, func3]
// }


export function initEvents(vm: Component) {
    //在vm上创建一个_event对象，用来存放事件
    vm._events = Object.create(null)
    //这个bool标志位来表明是否存在钩子，而不需要通过哈希表的方法查找是否有钩子
    //这样做可以减少不必要的开销，优化性能
    vm._hasHookEvent = false
    // init parent attached events
    /*初始化父组件attach的事件*/
    const listeners = vm.$options._parentListeners
    if (listeners) {
        updateComponentListeners(vm, listeners)
    }
}


//$on
//$on方法用来在vm实例上监听一个自定义事件，该事件可用$emit触发。
Vue.prototype.$on = function (event: string | Array<string>, fn: Function): Component {
    const vm: Component = this
}
