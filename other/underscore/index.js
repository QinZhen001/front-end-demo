// https://juejin.cn/post/6844903908972691469
// https://juejin.cn/post/6844903511394615303

const { push } = require("core-js/fn/array");

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
  return instance._chain ? _(obj).chain() : obj;
  // chain() 是 mixin的时候挂载上去的
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

// value
_.prototype.value = function () {
  return this._wrapped;
};

// 顺便提供了几个别名
_.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

// toString
_.prototype.toString = function () {
  return String(this._wrapped);
};

// mixin
_.mixin = function (obj) {
  _.each(_.functions(obj), function (name) {
    var func = (_[name] = obj[name]);

    _.prototype[name] = function () {
      var args = [this._wrapped];
      push.apply(args, arguments);
      return chainResult(this, func.apply(_, args));
    };
  });

  return _;
};

_.mixin(_);

// _mixin(_) 把静态方法挂载到了_.prototype上，
// 也就是_.prototype.chain方法 也就是 _.chain方法。





// noConflict  防冲突函数

// 暂存在 root 上， 执行noConflict时再赋值回来
var previousUnderscore = root._;
_.noConflict = function(){
  root._ = previousUnderscore
  return this 
}
