// 支持函数对象的这个插件实现的非常标准，基本上所有的方法都是在扩展原有的方法。

// 比如下述 parse 的实现，先把老版本的 parse 保存成 oldParse，
// 进行对象版本的 parse 处理后再执行 oldParse，保证同时兼容对象和其他格式。

const oldParse = proto.parse

proto.parse = function (cfg) {
  cfg.date = parseDate.bind(this)(cfg)
  oldParse.bind(this)(cfg)
}
