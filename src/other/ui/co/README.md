# co

[http://www.ruanyifeng.com/blog/2015/05/co.html](http://www.ruanyifeng.com/blog/2015/05/co.htmls)

> co的源码
>
> https://github.com/tj/co/blob/master/index.js

**co 函数库可以让你不用编写 Generator 函数的执行器。**

```js
var gen = function* () {
  var f1 = yield readFile("/etc/fstab")
  var f2 = yield readFile("/etc/shells")
  console.log(f1.toString())
  console.log(f2.toString())
}
```

**co 函数库可以让你不用编写 Generator 函数的执行器。**

```js
var co = require("co")
co(gen)
```

上面代码中，Generator 函数只要传入 co 函数，就会自动执行。

co 函数返回一个 Promise 对象，因此可以用 then 方法添加回调函数。

```javascript
co(gen).then(function () {
  console.log("Generator 函数执行完成")
})
```

## co 函数库的原理

为什么 co 可以自动执行 Generator 函数？

Generator 函数就是一个异步操作的容器。它的自动执行需要一种机制，当异步操作有了结果，能够自动交回执行权。

两种方法可以做到这一点。

- 回调函数。将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。
- Promise 对象。将异步操作包装成 Promise 对象，用 then 方法交回执行权。

**co 函数库其实就是将两种自动执行器（Thunk 函数和 Promise 对象），包装成一个库。**使用 co 的前提条件是，Generator 函数的 yield 命令后面，只能是 Thunk 函数或 Promise 对象。

# 补充

## Thunk

> http://www.ruanyifeng.com/blog/2015/05/thunk.html

编译器的"传名调用"实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数。

```js
function f(m) {
  return m * 2
}

f(x + 5)

// 等同于

var thunk = function () {
  return x + 5
}

function f(thunk) {
  return thunk() * 2
}
```

上面代码中，函数 f 的参数 x + 5 被一个函数替换了。凡是用到原参数的地方，对 Thunk 函数求值即可。

**这就是 Thunk 函数的定义，它是"传名调用"的一种实现策略，用来替换某个表达式。**

### js中的Thunk

JavaScript 语言是传值调用，它的 Thunk 函数含义有所不同。**在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成单参数的版本，且只接受回调函数作为参数。**

```js
// 正常版本的readFile（多参数版本）
fs.readFile(fileName, callback)

// Thunk版本的readFile（单参数版本）
var readFileThunk = Thunk(fileName)
readFileThunk(callback)

var Thunk = function (fileName) {
  return function (callback) {
    return fs.readFile(fileName, callback)
  }
}
```

上面代码中，fs 模块的 readFile 方法是一个多参数函数，两个参数分别为文件名和回调函数。经过转换器处理，它变成了一个单参数函数，只接受回调函数作为参数。这个单参数版本，就叫做 Thunk 函数。

任何函数，只要参数有回调函数，就能写成 Thunk 函数的形式。下面是一个简单的 Thunk 函数转换器。

```js
var Thunk = function (fn) {
  return function () {
    var args = Array.prototype.slice.call(arguments)
    return function (callback) {
      args.push(callback)
      return fn.apply(this, args)
    }
  }
}
```

使用上面的转换器，生成 fs.readFile 的 Thunk 函数。

```js
var readFileThunk = Thunk(fs.readFile)
readFileThunk(fileA)(callback)
```

# 问题

## Aggressive Memory Leak

[https://github.com/tj/co/issues/180](https://github.com/tj/co/issues/180)
