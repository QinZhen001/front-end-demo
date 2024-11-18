function toPromise(obj) {
  if (!obj) return obj
  if (isPromise(obj)) return obj
  if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj)
  if (typeof obj == "function") return thunkToPromise.call(this, obj)
  if (Array.isArray(obj)) return arrayToPromise.call(this, obj)
  if (isObject(obj)) return objectToPromise.call(this, obj)
  return obj
}

function isPromise(val) {
  return val && typeof val.then == "function"
}

function isGenerator(val) {
  return typeof val.next == "function" && typeof val.throw == "function"
}

function isGeneratorFunction(obj) {
  const constructor = obj.constructor
  if (!constructor) return false
  if (constructor.name == "GeneratorFunction" || constructor.displayName == "GeneratorFunction")
    return true
  return isGenerator(constructor.prototype)
}

function thunkToPromise(fn) {
  const ctx = this
  return new Promise((resolve, reject) => {
    fn.call(ctx, (err, res) => {
      if (err) return reject(err)
      if (arguments.length > 2) {
        res = Array.prototype.slice.call(arguments, 1)
      }
      resolve(res)
    })
  })
}

function arrayToPromise(obj) {
  return Promise.all(obj.map(toPromise, this))
}

function objectToPromise(obj) {
  const resuls = new obj.constructor()
  const keys = Object.keys(obj)
  const promises = []
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const promise = toPromise.call(this, obj[key])
    if (promise && isPromise(promise)) {
      defer(promise, key)
    } else {
      results[key] = obj[key]
    }
  }
  return Promise.all(promise)

  function defer(promise, key) {
    // 函数作用域向上查找
    results[key] = undefined
    promises.push(promise.then((res) => (results[key] = res)))
  }
}

function co(gen) {
  const ctx = this
  return new Promise((resolve, reject) => {
    if (typeof gen == "function") {
      gen = gen.call(ctx)
    }
    if (!gen || typeof gen.next !== "function") {
      return resolve(gen)
    }

    function onFulfilled(res) {
      let ret
      try {
        ret = gen.next(res)
      } catch (e) {
        return reject(e)
      }
      next(ret)
      return null
    }

    function onRejected(err) {
      let ret
      try {
      } catch (e) {
        return reject(e)
      }
    }

    function next(ret) {
      if (ret.done) {
        return resolve(ret.value)
      }
      const value = toPromise.call(ctx, ret.value)
      if (value && isPromise(value)) {
        return value.then(onFulfilled, onRejected)
      }
      return onRejected(
        new TypeError(
          "You may only yield a function, promise, generator, array, or object, " +
            'but the following object was passed: "' +
            String(ret.value) +
            '"',
        ),
      )
    }

    onFulfilled()
  })
}

window.co = co
