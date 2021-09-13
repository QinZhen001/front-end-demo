// https://juejin.cn/post/6844903939062628360

function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}

var runInContext = function runInContext(context) {
  // 浏览器处理context为window
  function lodash(value) {
    // ...
    return new LodashWrapper(value);
  }
  // ...
  return lodash;
};

function LodashWrapper(value, chainAll) {
  this.__wrapped__ = value;
  // 存放待执行的函数体func， 函数参数 args，函数执行的this 指向 thisArg。
  this.__actions__ = [];
  // undefined两次取反转成布尔值false，不支持链式调用。
  // 和underscore一样，默认是不支持链式调用的。
  this.__chain__ = !!chainAll;
  // 索引值 默认 0
  this.__index__ = 0;
  // 主要clone时使用
  this.__values__ = undefined;
}

//  立即执行匿名函数
// 返回一个函数，用于设置原型 可以理解为是 __proto__
var baseCreate = (function () {
  function object() {}

  return function (proto) {
    // 如果传入的参数不是object也不是function 是null
    //  则返回空对象。
    if (!isObject(proto)) {
      return {};
    }
    // 如果支持Object.create方法，则返回 Object.create
    if (Object.create) {
      return Object.create(proto);
    }
    // 如果不支持Object.create 用 ployfill new
    object.prototype = proto;
    var result = new object();
    // 还原 prototype
    object.prototype = undefined;
    return result;
  };
})();

// 空函数
function baseLodash() {
  // No operation performed.
}

// Ensure wrappers are instances of `baseLodash`.
lodash.prototype = baseLodash.prototype;
// 为什么会有这一句？因为上一句把lodash.prototype.construtor 设置为Object了。这一句修正constructor
lodash.prototype.constructor = lodash;

LodashWrapper.prototype = baseCreate(baseLodash.prototype);
LodashWrapper.prototype.constructor = LodashWrapper;

// mixin
function mixin(object, source, options) {
  // source 对象中可以枚举的属性
  var props = keys(source),
    // source 对象中的方法名称数组
    methodNames = baseFunctions(source, props);

  if (object == null && !(isObject(source) && (methodNames.length || !props.length))) {
    // 如果 options 没传为 undefined  undefined == null 为true
    // 且 如果source 不为 对象或者不是函数
    // 且 source对象的函数函数长度 或者 source 对象的属性长度不为0
    // 把 options 赋值为 source
    options = source;
    // 把 source 赋值为 object
    source = object;
    // 把 object 赋值为 this 也就是 _ (lodash)
    object = this;
    // 获取到所有的方法名称数组
    methodNames = baseFunctions(source, keys(source));
  }

  // 如果指定的属性在指定的对象或其原型链中，则in 运算符返回true。
  // 或者 options.chain 转布尔值
  var chain = !(isObject(options) && "chain" in options) || !!options.chain,
    // object 是函数
    isFunc = isFunction(object);

  // 循环 方法名称数组
  arrayEach(methodNames, function (methodName) {
    // 函数本身
    var func = source[methodName];
    // object 通常是 lodash  也赋值这个函数。
    object[methodName] = func;
    if (isFunc) {
      // 如果object是函数 赋值到  object prototype  上，通常是lodash
      object.prototype[methodName] = function () {
        // 实例上的__chain__ 属性 是否支持链式调用
        // 这里的 this 是 new LodashWrapper 实例 类似如下
        /**
     {
     __actions__: [],
     __chain__: true
     __index__: 0
     __values__: undefined
     __wrapped__: []
     }
     **/

        var chainAll = this.__chain__;
        // options 中的 chain 属性 是否支持链式调用
        // 两者有一个符合链式调用  执行下面的代码
        if (chain || chainAll) {
          // 通常是 lodash
          var result = object(this.__wrapped__),
            // 复制 实例上的 __action__ 到 result.__action__ 和 action 上
            actions = (result.__actions__ = copyArray(this.__actions__));

          // action 添加 函数 和 args 和 this 指向，延迟计算调用。
          actions.push({ func: func, args: arguments, thisArg: object });
          //实例上的__chain__ 属性  赋值给 result 的 属性 __chain__
          result.__chain__ = chainAll;
          // 最后返回这个实例
          return result;
        }

        // 都不支持链式调用。直接调用
        // 把当前实例的 value 和 arguments 对象 传递给 func 函数作为参数调用。返回调用结果。
        return func.apply(object, arrayPush([this.value()], arguments));
      };
    }
  });

  // 最后返回对象 object
  return object;
}

// 添加 LazyWrapper 的方法到 lodash.prototype
// ["drop", "dropRight", "take", "takeRight", "filter", "map", "takeWhile", "head", "last", "initial", "tail", "compact", "find", "findLast", "invokeMap", "reject", "slice", "takeRightWhile", "toArray", "clone", "reverse", "value"]

// Add `LazyWrapper` methods to `lodash.prototype`.
// baseForOwn 这里其实就是遍历LazyWrapper.prototype上的方法，执行回调函数
baseForOwn(LazyWrapper.prototype, function (func, methodName) {
  // 检测函数名称是否是迭代器也就是循环
  var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName),
    // 检测函数名称是否head和last
    // 顺便提一下 ()这个是捕获分组 而加上 ?:  则是非捕获分组 也就是说不用于其他操作
    isTaker = /^(?:head|last)$/.test(methodName),
    // lodashFunc 是 根据 isTaker 组合 takeRight take methodName
    lodashFunc = lodash[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName],
    // 根据isTaker 和 是 find 判断结果是否 包装
    retUnwrapped = isTaker || /^find/.test(methodName);

  // 如果不存在这个函数，就不往下执行
  if (!lodashFunc) {
    return;
  }
  // 把 lodash.prototype 方法赋值到lodash.prototype
  lodash.prototype[methodName] = function () {
    // 取实例中的__wrapped__ 值 例子中则是 [1,2,3,4,5]
    var value = this.__wrapped__,
      // 如果是head和last 方法 isTaker 返回 [1], 否则是arguments对象
      args = isTaker ? [1] : arguments,
      // 如果value 是LayeWrapper的实例
      isLazy = value instanceof LazyWrapper,
      // 迭代器 循环
      iteratee = args[0],
      // 使用useLazy isLazy value或者是数组
      useLazy = isLazy || isArray(value);

    var interceptor = function (value) {
      // 函数执行 value args 组合成数组参数
      var result = lodashFunc.apply(lodash, arrayPush([value], args));
      // 如果是 head 和 last (isTaker) 支持链式调用 返回结果的第一个参数 否则 返回result
      return isTaker && chainAll ? result[0] : result;
    };

    // useLazy true 并且 函数checkIteratee 且迭代器是函数，且迭代器参数个数不等于1
    if (useLazy && checkIteratee && typeof iteratee == "function" && iteratee.length != 1) {
      // Avoid lazy use if the iteratee has a "length" value other than `1`.
      // useLazy 赋值为 false
      // isLazy 赋值为 false
      isLazy = useLazy = false;
    }
    // 取实例上的 __chain__
    var chainAll = this.__chain__,
      // 存储的待执行的函数 __actions__ 二次取反是布尔值 也就是等于0或者大于0两种结果
      isHybrid = !!this.__actions__.length,
      // 是否不包装 用结果是否不包装 且 不支持链式调用
      isUnwrapped = retUnwrapped && !chainAll,
      // 是否仅Lazy 用isLazy 和 存储的函数
      onlyLazy = isLazy && !isHybrid;

    // 结果不包装 且 useLazy 为 true
    if (!retUnwrapped && useLazy) {
      // 实例 new LazyWrapper 这里的this 是 new LodashWrapper()
      value = onlyLazy ? value : new LazyWrapper(this);
      // result 执行函数结果
      var result = func.apply(value, args);

      /*
    *
    // _.thru(value, interceptor)
    // 这个方法类似 _.tap， 除了它返回 interceptor 的返回结果。该方法的目的是"传递" 值到一个方法链序列以取代中间结果。
    _([1, 2, 3])
    .tap(function(array) {
     // 改变传入的数组
     array.pop();
    })
    .reverse()
    .value();
    // => [2, 1]
    */

      // thisArg 指向undefined 或者null 非严格模式下是指向window，严格模式是undefined 或者nll
      result.__actions__.push({ func: thru, args: [interceptor], thisArg: undefined });
      // 返回实例 lodashWrapper
      return new LodashWrapper(result, chainAll);
    }
    // 不包装 且 onlyLazy 为 true
    if (isUnwrapped && onlyLazy) {
      // 执行函数
      return func.apply(this, args);
    }
    // 上面都没有执行，执行到这里了
    // 执行 thru 函数，回调函数 是 interceptor
    result = this.thru(interceptor);
    return isUnwrapped ? (isTaker ? result.value()[0] : result.value()) : result;
  };
});
