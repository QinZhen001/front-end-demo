function toPromise(params) {}

function isPromise(params) {}

function co(gen) {
  const ctx = this
  return new Promise((resolve, reject) => {
    debugger
    if (typeof gen == 'function') {
      gen = gen.call(ctx)
    }
    if (!gen || typeof gen.next !== 'function') {
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
      try{

      }catch(e){
        return reject(e);
      }
    }

    function next(ret) {
      if (ret.done) {
        return resolve(ret.value)
      }
      const value = toPromise.call()
      if (value && isPromise(value)) {
        return value.then(onFulfilled, onRejected)
      }
      return onRejected(
        new TypeError(
          'You may only yield a function, promise, generator, array, or object, ' +
            'but the following object was passed: "' +
            String(ret.value) +
            '"'
        )
      )
    }


    onFulfilled()
  })
}

window.co = co
