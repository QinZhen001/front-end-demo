function isFunction(fn) {
  return typeof fn === "function"
}

class EventBus {
  constructor() {
    this.task = {}
  }

  on(name, cb) {
    if (!isFunction(cb)) {
      throw new Error(`method need a function`)
    }
    if (!this.task[name]) {
      this.task[name] = []
    }
    this.task[name].push(cb)
  }

  emit(name, ...args) {
    let taskQueue = this.task[name]
    if (taskQueue && taskQueue.length) {
      taskQueue.forEach((fn) => fn(...args))
    }
  }

  off(name, cb) {
    if (!cb) {
      // 删除name下的所有回调
      this.task[name] = []
    }
    let taskQueue = this.task[name]
    if (taskQueue && taskQueue.length) {
      let index = taskQueue.indexOf(cb)
      if (index !== -1) {
        taskQueue.splice(index, 1)
      }
    }
  }

  once(name, cb) {
    if (!isFunction(cb)) {
      throw new Error(`method need a function`)
    }
    const callback = (...args) => {
      this.off(name, cb)
      cb(...args)
    }
    this.on(name, callback)
  }
}

// --------------------------

let bus = new EventBus()

bus.on("add", (a, b) => {
  console.log(a + b)
})

bus.emit("add", 10, 11)
