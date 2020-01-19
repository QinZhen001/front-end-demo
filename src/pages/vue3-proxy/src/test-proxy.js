let obj = {name: 'test', location: {city: 'beijing'}}


let o = new Proxy(obj, {
  get(target, key) {
    console.log('获取值', key)
    // return target[key]
    return Reflect.get(target, key)
  },
  set(target, key, val) {
    console.log('修改值', key, val)
    return Reflect.set(target, key, val)
  }
})


o.location.city = 'shanghai'



// 1. 数组多次触发


// 2. 对象嵌套


