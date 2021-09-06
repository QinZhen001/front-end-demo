// https://juejin.cn/post/6844903939062628360



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

LodashWrapper.prototype = baseCreate()





function baseCreate(){

}








