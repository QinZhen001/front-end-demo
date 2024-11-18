// 第一版
function curry1(fn) {
  let args = [].slice.call(arguments, 1)
  return function () {
    let newArgs = args.concat([].slice(arguments))
    return fn.apply(null, newArgs)
  }
}

function add(a, b) {
  return a + b
}

let addFun = curry1(add, 1, 2)
let res1 = addFun()
console.log("res1", res1)

// 上面的代码有个问题，参数不够自由

// 第二版
function curry2(fn, args = []) {
  // length 为fn函数所需要的参数个数
  let length = fn.length
  return function (...rest) {
    let _args = [...args, ...rest]
    return _args.length < length ? curry2.call(this, fn, _args) : fn.apply(this, _args)
  }
}

var fn2 = curry2(function (a, b, c) {
  console.log("curry2", a + b + c)
})
fn2("a", "b", "c") // abc
fn2("a", "b")("c") // abc
fn2("a")("b")("c") // abc
