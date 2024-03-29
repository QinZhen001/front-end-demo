import Dep from "./dep"

export default class Watcher {
  constructor(vm, key, initVal, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
    this.initVal = initVal
    Dep.target = this
    this.vm[this.key] // 触发依赖收集 get
    Dep.target = null
  }

  update() {
    this.cb.call(this.vm, this.vm[this.key], this.initVal)
  }
}
