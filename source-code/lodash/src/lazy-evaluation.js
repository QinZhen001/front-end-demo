// 惰性求值——lodash源码解读
// https://juejin.cn/post/6844903661450035207

var MAX_ARRAY_LENGTH = 4294967295 // 最大的数组长度

// 缓存数据结构体
function LazyWrapper(value) {
  // 缓存数据
  this.__wrapped__ = value
  // 缓存数据管道中进行“裁决”的方法
  this.__iteratees__ = []
  // 记录需要拿的符合要求的数据集个数
  this.__takeCount__ = MAX_ARRAY_LENGTH
}

// 惰性求值的入口
function lazy(value) {
  return new LazyWrapper(value)
}

var LAZY_FILTER_FLAG = 1 // filter方法的标记

function filter(iteratee) {
  this.__iteratees__.push({
    iteratee: iteratee,
    type: LAZY_FILTER_FLAG,
  })
  return this
}

// 绑定方法到原型链上
LazyWrapper.prototype.filter = filter

function take(n) {
  this.__takeCount__ = n
  return this
}

LazyWrapper.prototype.take = take

// 惰性求值
function lazyValue() {
  var array = this.__wrapped__
  var length = array.length
  var resIndex = 0
  var takeCount = this.__takeCount__
  var iteratees = this.__iteratees__
  var iterLength = iteratees.length
  var index = -1
  var dir = 1
  var result = []

  outer: while (length-- && resIndex < takeCount) {
    // 外层循环待处理的数组
    index += dir
    var iterIndex = -1
    var value = array[index]

    while (++iterIndex < iterLength) {
      // 内层循环处理链上的方法
      var data = iteratees[iterIndex]
      var iteratee = data.iteratee
      var type = data.type
      var computed = iteratee(value)

      // 处理数据不符合要求的情况
      if (!computed) {
        if (type == LAZY_FILTER_FLAG) {
          // 不希望执行 resultp[resIndex++] = value;
          continue outer
        } else {
          break outer
        }
      }
    }

    // 经过内层循环，符合要求的数据
    result[resIndex++] = value
  }
  return result
}

LazyWrapper.prototype.value = lazyValue

// ------------------------------- test -------------------Î-------------
var testArr = [1, 19, 30, 2, 12, 5, 28, 4]

const result = lazy(testArr)
  .filter(function (x) {
    console.log("check x=" + x)
    return x < 10
  })
  .take(2)
  .value()

console.log("result", result)
