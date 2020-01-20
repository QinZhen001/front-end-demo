import Dep from "./dep"

class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb


    Dep.target = this
    // 添加watcher到dep
    this.vm[this.key]
    Dep.target = null;
  }

  update() {
    console.log("属性更新了!")
    this.cb.call(this.vm, this.vm[this.key])
  }
}
