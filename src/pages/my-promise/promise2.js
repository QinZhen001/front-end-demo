

/**
 * 用来处理then方法返回结果包装成promise 方便链式调用
 * @param {*} promise2 then方法执行产生的promise 方便链式调用
 * @param {*} x then方法执行完成功回调或者失败回调后的result
 * @param {*} resolve 返回的promise的resolve方法 用来更改promise最后的状态
 * @param {*} reject 返回的promise的reject方法 用来更改promise最后的状态
 */
function resolvePromise(promise2, x, resolve, reject) {
  // 首先判断x和promise2是否是同一引用 如果是 那么就用一个类型错误作为Promise2的失败原因reject
  if (promise2 === x) return reject(new TypeError('循环引用了!'));
  // called 用来记录promise2的状态改变，一旦发生改变了 就不允许 再改成其他状态
  let called;
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    // 如果x是一个对象或者函数 那么他就有可能是promise 需要注意 null typeof也是 object 所以需要排除掉
    //先获得x中的then 如果这一步发生异常了，那么就直接把异常原因reject掉
    try {
      let then = x.then;//防止别人瞎写报错
      if (typeof then === 'function') {
        //如果then是个函数 那么就调用then 并且把成功回调和失败回调传进去，如果x是一个promise 并且最终状态时成功，那么就会执行成功的回调，如果失败就会执行失败的回调如果失败了，就把失败的原因reject出去，做为promise2的失败原因，如果成功了那么成功的value时y，这个y有可能仍然是promise，所以需要递归调用resolvePromise这个方法 直达返回值不是一个promise
        then.call(x, y => {
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject)
        }, error => {
          if (called) return
          called = true;
          reject(error)
        })
      } else {
        resolve(x)
      }
    } catch (error) {
      if (called) return
      called = true;
      reject(error)
    }
  } else {
    // 如果是一个普通值 那么就直接把x作为promise2的成功value resolve掉
    resolve(x)
  }

}


class KPromise {
  static resolve(value) {
    return new KPromise((resolve, reject) => {
      resolve(value)
    })
  }
  static reject(reason) {
    return new KPromise((resolve, reject) => {
      reject(reason)
    })
  }
  // 全部
  static all(promises) {
    return new KPromise((resolve, reject) => {
      let arr = [];
      let i = 0;
      function getResult(index, value) {
        arr[index] = value;
        if (++i == promises.length) {
          resolve(arr)
        }
      }
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(data => {
          getResult(i, data)
        }, reject)
      }
    })
  }
  // 第一个
  static race(promises) {
    return new KPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        // resolve后，状态不能改变
        promises[i].then(resolve, reject)
      }
    })
  }

  static deferred() {
    const defer = {}
    defer.promise = new KPromise((resolve, reject) => {
      defer.resolve = resolve
      defer.reject = reject
    })
    return defer
  }

  constructor(fn) {
    this.status = 'pending'; // 存储promise状态 pending fulfilled rejected.
    this.value = null; // 存储成功后的值
    this.reason = null; // 记录失败的原因
    this.fulfillCbs = []; //  异步时候收集成功回调
    this.rejectCbs = []; //  异步时候收集失败回调
    let resolve = value => {
      if (this.status === 'pending') {
        this.status = 'fulfilled';// resolve的时候改变promise的状态
        this.value = value;//修改成功的值
        // 异步执行后 调用resolve 再把存储的then中的成功回调函数执行一遍
        this.fulfillCbs.forEach(cb => { cb() });
      }
    }
    let reject = reason => {
      if (this.status === 'pending') {
        this.status = 'rejected';// reject的时候改变promise的状态
        this.reason = reason; // 修改失败的原因
        // 异步执行后 调用reject 再把存储的then中的失败回调函数执行一遍
        this.rejectCbs.forEach(cb => {
          cb()
        });
      }
    }
    fn(resolve, reject);
    
  }
  catch(onRejected) {
    return this.then(null, onRejected)
  }
  then(onfulfilled, onrejected) {
    // onfulfilled then方法中的成功回调
    // onrejected then方法中的失败回调
    // 如果onfulfilled不是函数 那么就用默认的函数替代 以便达到值穿透
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : val => val;
    // 如果onrejected不是函数 那么就用默认的函数替代 以便达到值穿透
    onrejected = typeof onrejected === 'function' ? onrejected : err => { throw err }
    let promise2 = new KPromise((resolve, reject) => {
      if (this.status === 'fulfilled') {
        // 加入setTimeout 模拟异步
        // 如果调用then的时候promise 的状态已经变成了fulfilled 那么就调用成功回调 并且传递参数为 成功的value
        setTimeout( ()=> {
          // 如果执行回调发生了异常 那么就用这个异常作为promise2的失败原因
          try {
            // x 是执行成功回调的结果
            let x = onfulfilled(this.value);
            // 调用resolvePromise函数 根据x的值 来决定promise2的状态
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        }, 0)

      }

      if (this.status === 'rejected') {
        // 加入setTimeout 模拟异步
        // 如果调用then的时候promise 的状态已经变成了rejected 那么就调用失败回调 并且传递参数为 失败的reason
        setTimeout( ()=> {
          // 如果执行回调发生了异常 那么就用这个异常作为promise2的失败原因
          try {
            // x 是执行失败回调的结果
            let x = onrejected(this.reason);
            // 调用resolvePromise函数 根据x的值 来决定promise2的状态
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }

        }, 0)
      }

      if (this.status === 'pending') {
        //如果调用then的时候promise的状态还是pending，说明promsie执行器内部的resolve或者reject是异步执行的，那么就需要先把then方法中的成功回调和失败回调存储袭来，等待promise的状态改成fulfilled或者rejected时候再按顺序执行相关回调
        this.fulfillCbs.push(() => {
          //setTimeout模拟异步
          setTimeout( ()=> {
            // 如果执行回调发生了异常 那么就用这个异常作为promise2的失败原因
            try {
              // x 是执行成功回调的结果
              let x = onfulfilled(this.value)
              // 调用resolvePromise函数 根据x的值 来决定promise2的状态
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
        this.rejectCbs.push(() => {
          //setTimeout模拟异步
          setTimeout( ()=> {
            // 如果执行回调发生了异常 那么就用这个异常作为promise2的失败原因
            try {
              // x 是执行失败回调的结果
              let x = onrejected(this.reason)
              // 调用resolvePromise函数 根据x的值 来决定promise2的状态
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    })
    return promise2;
  }

}


let promise = new KPromise((resolve,reject)=>{
  setTimeout(()=>{
      resolve('hello ')
  },2000)
}).then(data=>{
  return data+' world'
}).then(res=>{
  console.log(res)
})

const p1 = new KPromise((resolve, reject) => {
  resolve(1);
});

const p2 = new KPromise((resolve, reject) => {
  setTimeout(()=>{
      resolve(2);

  },1000)
});

const p3 = new KPromise((resolve, reject) => {
  setTimeout(()=>{
      resolve(3);
  },3000)
});

KPromise.race([p1, p2, p3]).then(data => { 
  console.log(data); // 1
}, err => {
  console.log(err);
});
KPromise.all([p1, p2, p3]).then(data => { 
  console.log(data); // [1, 2, 3] 结果顺序和promise实例数组顺序是一致的
}, err => {
  console.log(err);
});


module.exports = KPromise