const PENDING = 1
const FULFILLED = 2
const REJECTED = 3

class KPromise {
  constructor(cb) {
    this.state = PENDING
    // 完成后的值
    this.value = null
    // 失败后的原因
    this.reason = null
    this.fulfilledCbs = []
    this.rejectCbs = []

    let resolve = (data) => {
      setTimeout(() => {
        // 执行这个后，修改状态
        if ((this.state = PENDING)) {
          this.state = FULFILLED
          this.value = data
          this.fulfilledCbs.forEach((v) => v(data))
        }
      }, 0)
    }

    let reject = (reason) => {
      setTimeout(() => {
        // 执行这个后，修改状态
        if (this.state === PENDING) {
          this.state = REJECTED
          this.reason = reason
          this.rejectCbs.forEach((v) => v(reason))
        }
      }, 0)
    }

    cb(resolve, reject)
  }

  then(onFulfilled, onRejected) {
    if (typeof onFulfilled === 'function') {
      // 成功的回调
      this.fulfilledCbs.push(onFulfilled)
    }
    if (typeof onRejected === 'function') {
      // 失败的回调
      this.rejectCbs.push(onRejected)
    }
  }
}

// module.exports = KPromise

// ---------------------------------------------------

// --------------------- test -----------------------
let promise = new KPromise((resolve, reject) => {
  let a = 2
  let b = 1
  if (a > b) {
    resolve('resolve111')
  } else {
    reject('reject11111')
  }
}).then(
  (res) => {
    setTimeout(() => {
      console.log('then resolve: ', res)
    }, 1000)
  },
  (rej) => {
    console.log('then reject: ', rej)
  }
)
