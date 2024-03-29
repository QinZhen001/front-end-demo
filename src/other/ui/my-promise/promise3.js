function myPromise(executor) {
  let self = this
  self.status = "pending"
  self.success = undefined
  self.error = undefined

  self.onSuccessCallbacks = []
  self.onErrorCallbacks = []

  function resolve(success) {
    if (self.status == "pending") {
      self.status = "resolved"
      self.success = success
      self.onSuccessCallbacks.forEach((element) => {
        element()
      })
    }
  }

  function reject(error) {
    if (self.status == "pending") {
      self.status = "rejected"
      self.error = error
      self.onErrorCallbacks.forEach((element) => element())
    }
  }

  try {
    console.log("executor")
    executor(resolve, reject)
  } catch (err) {
    reject(err)
  }
}

myPromise.prototype.then = function (onResolved, onRejected) {
  let self = this
  let promiseAgain = new myPromise((resolve, reject) => {
    if (self.status == "pending") {
      self.onSuccessCallbacks.push(() => {
        let x = onResolved(self.success)
        resolvePromise(promiseAgain, x, resolve, reject)
      })
      self.onErrorCallbacks.push(() => {
        let x = onRejected(self.error)
        resolvePromise(promiseAgain, x, resolve, reject)
      })
    }

    if (self.status === "resolved") {
      let x = onResolved(self.success)
      resolvePromise(promiseAgain, x, resolve, reject)
    }
    if (self.status === "rejected") {
      let x = onRejected(self.error)
      resolvePromise(promiseAgain, x, resolve, reject)
    }
  })
  return promiseAgain
}

// x 是return的东西
function resolvePromise(promiseAgain, x, resolve, reject) {
  if (promiseAgain === x) {
    return reject(new Error("循环调用"))
  }
  console.warn("resolvePromise x", typeof x, x)
  // Promise 是一个 object
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    // x 是个promise
    try {
      let then = x.then
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            resolvePromise(promiseAgain, y, resolve, reject)
          },
          (e) => {
            reject(e)
          },
        )
      } else {
        resolve(x)
      }
    } catch (err) {
      reject(err)
    }
  } else if (x !== null) {
    // return 不是promise
    resolve(x)
  }
}

// ---------------------- test ------------------------------

let p = new myPromise((resolve, reject) => {
  setTimeout(function () {
    resolve("success data")
  }, 2000)
})

console.log("p", p)

p.then(
  (res) => {
    console.log("res", res)
    // return "next" + res
    return Promise.resolve("Promise.resolve")
  },
  (rej) => {
    console.log("rej", rej)
  },
).then(
  (res) => {
    console.log("res1", res)
  },
  (rej) => {
    console.log("rej1", rej)
  },
)
