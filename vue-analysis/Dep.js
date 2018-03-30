//Dep
//其实Dep就是一个发布者，可以订阅多个观察者，
// 依赖收集之后Deps中会存在一个或多个Watcher对象，
// 在数据变更的时候通知所有的Watcher。
/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
export default class Dep {
    static target: ?Watcher;
    id: number;
    subs: Array<Watcher>;

    constructor() {
        this.id = uid++
        this.subs = []
    }

    /*添加一个观察者对象*/
    addSub(sub: Watcher) {
        this.subs.push(sub)
    }

    /*移除一个观察者对象*/
    removeSub(sub: Watcher) {
        remove(this.subs, sub)
    }

    /*依赖收集，当存在Dep.target的时候添加观察者对象*/
    depend() {
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }

    /*通知所有订阅者*/
    notify() {
        // stabilize the subscriber list first
        const subs = this.subs.slice()
        for (let i = 0, l = subs.length; i < l; i++) {
            subs[i].update()
        }
    }
}


// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null
/*依赖收集完需要将Dep.target设为null，防止后面重复添加依赖。*/
