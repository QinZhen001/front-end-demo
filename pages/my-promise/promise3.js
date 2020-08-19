const PENDING = 1
const FULFILLED = 2
const REJECTED = 3

function isFunction(fn) {
  return typeof fn === "function"
}


class Promise {
  /**
   * Promise构造函数里面的逻辑是同步执行的
   * @param {*} executor 
   */
  constructor(executor) {
    this.state = PENDING
    // 成功相关
    this.value = null
    this.onResolvedCbs = []

    // 失败相关
    this.reason = null
    this.onRejectedCbs = []

    /**
     * resolve 执行太快 onResolvedCbs还是[]
     * 所以在promise1中resolve加上了setTimeout延时
     * 
     * @param {} value 
     */
    const resolve = (value) => {
      console.log(this)
      debugger
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.value = value
        this.onResolvedCbs.forEach(cb => cb(value))
      }
    }

    const reject = (reason) => {
      debugger
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
        this.onRejectedCbs.forEach(cb => cb(reason))
      }
    }

    // 执行器
    try {
      executor(resolve, reject)
    } catch (err) {
      console.log(err)
      debugger
      reject(err)
    }

  }



  then(onFulfilled, onRejected) {
    if (this.state === FULFILLED) {
      if (isFunction(onFulfilled)) {
        this.onResolvedCbs.push(onFulfilled)
      }
    } else if (this.state === REJECTED) {
      if (isFunction(onFulfilled)) {
        this.onRejectedCbs.push(onRejected)
      }
    }
  }
}


// ---------------------- test -----------------------------



let p = new Promise((resolve, reject) => {
  resolve(1)
})

p.then(data => {
  debugger
  console.log(data)
}) // 1








