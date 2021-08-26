// https://juejin.cn/post/6844903908972691469

var _ = function (obj) {
  if (obj instanceof _) {
    return obj;
  }
  if (!(this instanceof _)) {
    return new _(obj);
  }

  this.wrapped = obj;
};

// 支持链式调用
_.chain = function (obj) {
  var instance = _(obj);
  instance._chain = true;
  return instance;
};

var chainResult = function (instance, obj) {
  // 如果实例中有_chain 为 true 这个属性，则返回实例 
  // 支持链式调用的实例对象  
  // { _chain: true, this._wrapped: [3, 2, 1] }，否则直接返回这个对象[3, 2, 1]。
  return instance._chain ? _(obj).chain() : obj
};

var ArrayProto = Array.prototype;

_.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (name) {
  var method = ArrayProto[name];
  _.prototype[name] = function () {
    var obj = this._wrapped;
    method.apply(obj, arguments);
    // 兼容低版本ie 不用管
    if ((name === "shift" || name === "splice") && obj.length === 0) delete obj[0];
    return chainResult(this, obj);
  };
});
