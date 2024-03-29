// duration 的实现比较复杂，它实际上是实现了一个 Duration类，
// 用它来返回一个 duration实例 后，在实例上处理各种方法。

/**
 * @description: 判断是否是Duration的实例
 * @param {Any} d
 * @return {Boolean}
 */
const isDuration = (d) => d instanceof Duration

let $d
let $u

/**
 * @description: Duration实例的封装器
 * @param {Number|Object|String} input 值
 * @param {Dayjs} instance Dayjs实例
 * @param {String} unit 单位
 * @return {Duration} 返回一个Duration实例
 */
const wrapper = (input, instance, unit) => new Duration(input, unit, instance.$l)

/**
 * @description: 给单位加上s
 * @param {String} unit
 * @return {String} 返回units
 */
const prettyUnit = (unit) => `${$u.p(unit)}s`

class Duration {
  constructor(input, unit, locale) {
    // 解析出$d和$ms
    return this
  }

  /**
   * @description: 用$d对象计算出毫秒数，添加到$ms属性中
   */
  calMilliseconds() {}

  /**
   * @description: 将毫秒数解析为多少年月日时分秒毫秒，添加到$d属性中
   */
  parseFromMilliseconds() {}

  /**
   * @description: 返回ISO格式的时长字符串
   * @return {String}
   */
  toISOString() {}

  /**
   * @description: toJSON和toISOString是相同的
   * @return {String}
   */
  toJSON() {}

  /**
   * @description: 将时长格式化
   * @param {String} formatStr 模板字符串
   * @return {String} 返回格式化后的时长
   */
  format(formatStr) {}

  /**
   * @description: 返回以某个单位为基础的长度，保留小数
   * @param {String} unit 单位
   * @return {Number}
   */
  as(unit) {}

  /**
   * @description: 返回以某个单位的长度，只保留该单位，且为整数
   * @param {String} unit
   * @return {Number}
   */
  get(unit) {}

  /**
   * @description: 给时长添加input * unit
   * @param {Number|Duration} input 要添加的时长
   * @param {String} unit 单位
   * @param {Boolean} isSubtract 是否为减
   * @return {Duration} 返回新的Duration实例
   */
  add(input, unit, isSubtract) {}

  /**
   * @description: 给时长减少input * unit
   * @param {Number|Duration} input 要添加的时长
   * @param {String} unit 单位
   * @return {Duration} 返回新的Duration实例
   */
  subtract(input, unit) {}

  /**
   * @description: 设置Duration实例的locale
   * @param {Object} l locale对象
   * @return {Duration} 返回新的Duration实例
   */
  locale(l) {}

  /**
   * @description: 返回一个相同时长的新实例
   * @return {Duration}
   */
  clone() {}

  /**
   * @description: 返回显示一段时长，默认没有后缀
   * @param {Boolean} withSuffix 是否添加后缀
   * @return {String}
   */
  humanize(withSuffix) {}

  // 下面都是获取对应单位长度的方法，原理相同，as是转化为带小数的值，不带as是只取这一个单位
  milliseconds() {}
  asMilliseconds() {}
  seconds() {}
  asSeconds() {}
  minutes() {}
  asMinutes() {}
  hours() {}
  asHours() {}
  days() {}
  asDays() {}
  weeks() {}
  asWeeks() {}
  months() {}
  asMonths() {}
  years() {}
  asYears() {}
}

/**
 * @description: 判断是否是Duration的实例
 * @param {Any} d
 * @return {Boolean}
 */
const isDuration = (d) => d instanceof Duration

let $d
let $u

/**
 * @description: Duration实例的封装器
 * @param {Number|Object|String} input 值
 * @param {Dayjs} instance Dayjs实例
 * @param {String} unit 单位
 * @return {Duration} 返回一个Duration实例
 */
const wrapper = (input, instance, unit) => new Duration(input, unit, instance.$l)

/**
 * @description: 给单位加上s
 * @param {String} unit
 * @return {String} 返回units
 */
const prettyUnit = (unit) => `${$u.p(unit)}s`

class Duration {
  constructor(input, unit, locale) {
    // 解析出$d和$ms
    return this
  }

  /**
   * @description: 用$d对象计算出毫秒数，添加到$ms属性中
   */
  calMilliseconds() {}

  /**
   * @description: 将毫秒数解析为多少年月日时分秒毫秒，添加到$d属性中
   */
  parseFromMilliseconds() {}

  /**
   * @description: 返回ISO格式的时长字符串
   * @return {String}
   */
  toISOString() {}

  /**
   * @description: toJSON和toISOString是相同的
   * @return {String}
   */
  toJSON() {}

  /**
   * @description: 将时长格式化
   * @param {String} formatStr 模板字符串
   * @return {String} 返回格式化后的时长
   */
  format(formatStr) {}

  /**
   * @description: 返回以某个单位为基础的长度，保留小数
   * @param {String} unit 单位
   * @return {Number}
   */
  as(unit) {}

  /**
   * @description: 返回以某个单位的长度，只保留该单位，且为整数
   * @param {String} unit
   * @return {Number}
   */
  get(unit) {}

  /**
   * @description: 给时长添加input * unit
   * @param {Number|Duration} input 要添加的时长
   * @param {String} unit 单位
   * @param {Boolean} isSubtract 是否为减
   * @return {Duration} 返回新的Duration实例
   */
  add(input, unit, isSubtract) {}

  /**
   * @description: 给时长减少input * unit
   * @param {Number|Duration} input 要添加的时长
   * @param {String} unit 单位
   * @return {Duration} 返回新的Duration实例
   */
  subtract(input, unit) {}

  /**
   * @description: 设置Duration实例的locale
   * @param {Object} l locale对象
   * @return {Duration} 返回新的Duration实例
   */
  locale(l) {}

  /**
   * @description: 返回一个相同时长的新实例
   * @return {Duration}
   */
  clone() {}

  /**
   * @description: 返回显示一段时长，默认没有后缀
   * @param {Boolean} withSuffix 是否添加后缀
   * @return {String}
   */
  humanize(withSuffix) {}

  // 下面都是获取对应单位长度的方法，原理相同，as是转化为带小数的值，不带as是只取这一个单位
  milliseconds() {}
  asMilliseconds() {}
  seconds() {}
  asSeconds() {}
  minutes() {}
  asMinutes() {}
  hours() {}
  asHours() {}
  days() {}
  asDays() {}
  weeks() {}
  asWeeks() {}
  months() {}
  asMonths() {}
  years() {}
  asYears() {}
}

export default (option, Dayjs, dayjs) => {
  $d = dayjs
  $u = dayjs().$utils()

  /**
   * @description: 把duration方法加到了dayjs函数对象上
   * @param {Number|Object|String} input 值
   * @param {String} unit 单位
   * @return {*}
   */
  dayjs.duration = function (input, unit) {}
  dayjs.isDuration = isDuration

  const oldAdd = Dayjs.prototype.add
  const oldSubtract = Dayjs.prototype.subtract

  /**
   * @description: 扩展add方法
   * @param {Duration} value 值
   * @param {String} unit 单位
   */
  Dayjs.prototype.add = function (value, unit) {}
  /**
   * @description: 扩展subtract方法
   * @param {Duration} value 值
   * @param {String} unit 单位
   */
  Dayjs.prototype.subtract = function (value, unit) {}
}
