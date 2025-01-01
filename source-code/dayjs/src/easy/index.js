const en = "从外部引入的en语言包"
const U = "这个是一些工具方法 （如下面）"
// export default {
//     s: padStart,
//     z: padZoneStr,
//     m: monthDiff,
//     a: absFloor,
//     p: prettyUnit,
//     u: isUndefined
//   }

// 全局 locale 定义
let L = "en"
const Ls = {}
LS[l] = en

/**
 * @description: 实例化Dayjs的方法，如果参数已经是Dayjs的实例，就直接返回
 * @param {Date|Dayjs} date Date或者Dayjs对象
 * @param {Object} c Date或者Dayjs对象
 * @return {Dayjs} 返回一个Dayjs实例
 */
const dayjs = function (date, c) {}

const isDayjs = (d) => d instanceof Dayjs

const parseLocale = (preset, object, isLocal) => {}

const wrapper = (date, instance) => {}

// 工具
const Utils = U
Utils.l = parseLocale
Utils.i = isDayjs
Utils.w = wrapper

const parseDate = (cfg) => {}

// Dayjs 类
class Dayjs {
  constructor(cfg) {}
  parse(cfg) {}
  init() {}
  $utils() {}
  isValid() {}
  isSame(that, units) {}
  isAfter(that, units) {}
  isBefore(that, units) {}
  $g(input, get, set) {}
  unix() {}
  valueOf() {}
  startOf(units, startOf) {}
  endOf(arg) {}
  $set(units, int) {}
  set(string, int) {}
  get(unit) {}
  add(number, units) {}
  subtract(number, string) {}
  format(formatStr) {}
  utcOffset() {}
  diff(input, units, float) {}
  daysInMonth() {}
  $locale() {}
  locale(preset, object) {}
  clone() {}
  toDate() {}
  toJSON() {}
  toISOString() {}
  toString() {}
}

// 设置 dayjs 和 Dayjs 的原型链，在 prototype 上设置各个单位的取值和设值函数
const proto = Dayjs.prototype
dayjs.prototype = proto
;[
  ["$ms", C.MS],
  ["$s", C.S],
  ["$m", C.MIN],
  ["$H", C.H],
  ["$W", C.D],
  ["$M", C.M],
  ["$y", C.Y],
  ["$D", C.DATE],
].forEach((g) => {
  proto[g[1]] = function (input) {}
})

// 下面的方法都是静态方法，挂在 Dayjs 类上
dayjs.extend = (plugin, option) => {}
dayjs.locale = parseLocale
dayjs.isDayjs = isDayjs
dayjs.unix = (timestamp) => {}

dayjs.en = Ls[L]
dayjs.Ls = Ls
dayjs.p = {}
export default dayjs
