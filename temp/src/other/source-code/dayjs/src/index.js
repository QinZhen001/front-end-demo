import * as C from "./constant.js"
import en from "./locale/en.js"
import U from "./utils.js"

let L = "en" // 全局 locale
const Ls = {} // 全局的已加载 locale 映射
Ls[L] = en

/**
 * @description: 判断对象是否为Dayjs的实例
 * @param {object} d 对象
 * @return {Boolean}
 */
const isDayjs = (d) => d instanceof Dayjs

/**
 * @description: 给全局locale映射添加一个键值对或修改已有键值对
 * @param {String|Object} preset 预设的local对象或名称字符串
 * @param {Object} object locale对象
 * @param {Boolean} isLocal 是否为本地的 locale
 * @return {String} 返回键名
 */
const parseLocale = (preset, object, isLocal) => {
  let l
  // 不带参数时，返回当前使用的locale键
  if (!preset) {
    return L
  }
  // 不管preset是对象还是字符串，都去映射键值对
  if (typeof preset === "string") {
    if (Ls[preset]) {
      l = preset
    }
    if (object) {
      Ls[preset] = object
      l = preset
    }
  } else {
    const { name } = preset
    Ls[name] = preset
    l = name
  }
  // 如果不用本地的locale，就修改L，最后返回l
  if (!isLocal && l) L = l
  return l || (!isLocal && L)
}

/**
 * @description: 实例化Dayjs的方法，如果参数已经是Dayjs的实例，就直接返回
 * @param {Date|Dayjs} date Date或者Dayjs对象
 * @param {Object} c Date或者Dayjs对象
 * @return {Dayjs} 返回一个Dayjs实例
 */
const dayjs = function (date, c) {
  if (isDayjs(date)) {
    return date.clone()
  }

  const cfg = typeof c === "object" ? c : {}
  cfg.date = date
  cfg.args = arguments

  return new Dayjs(cfg)
}

// 下面的方法都是静态方法，挂在dayjs 函数对象上
/**
 * @description: 挂载插件
 * @param {*} plugin 插件
 * @param {*} option 插件选项
 * @return {dayjs function} 返回 dayjs 函数对象
 */
dayjs.extend = (plugin, option) => {
  // 同一个插件只挂载一次
  if (!plugin.$i) {
    plugin(option, Dayjs, dayjs)
    plugin.$i = true
  }
  return dayjs
}
dayjs.locale = parseLocale
dayjs.isDayjs = isDayjs
dayjs.unix = (timestamp) => dayjs(timestamp * 1e3)
dayjs.en = Ls[L]
dayjs.Ls = Ls
dayjs.p = {}

/**
 * @description: 封装器，根据Date对象和Dayjs实例封装出一个新实例
 * @param {Date} date Date对象
 * @param {Dayjs} instance 已存在的Dayjs实例
 * @return {Dayjs}
 */
const wrapper = (date, instance) => {
  dayjs(date, {
    locale: instance.$L,
    utc: instance.$u,
    x: instance.$x,
    $offset: instance.$offset, // todo: refactor; do not use this.$offset in you code
  })
}

// 把上面写的几个方法同样加到 Utils 工具包中
const Utils = U // for plugin use
Utils.l = parseLocale
Utils.i = isDayjs
Utils.w = wrapper

/**
 * @description: 根据 cfg 返回对应的 Date 对象
 * @param {Object} cfg config 配置对象 {date, utc}
 * @return {Date} 返回 Date 对象
 */
const parseDate = (cfg) => {
  const { date, utc } = cfg
  if (date === null) {
    // null 时返回 new Date(NaN)
    return new Date(NaN)
  }
  if (Utils.u(date)) {
    return new Date() // undefined 时返回 new Date()
  }
  if (date instanceof Date) {
    return
  }
}

// Dayjs 类
class Dayjs {
  constructor(cfg) {
    this.$L = parseLocale(cfg.locale, null, true)
    this.parse(cfg)
  }

  parse(cfg) {
    this.$d = parseDate(cfg)
    this.$x = cfg.x || {}
    this.init()
  }

  init() {
    const { $d } = this
    this.$y = $d.getFullYear() // 2020
    this.$M = $d.getMonth() // 11
    this.$D = $d.getDate() // 8
    this.$W = $d.getDay() // 2
    this.$H = $d.getHours() // 7
    this.$m = $d.getMinutes() // 6
    this.$s = $d.getSeconds() // 1
    this.$ms = $d.getMilliseconds() // 425
  }

  $utils() {
    return Utils
  }

  /**
   * @description: 返回 Date 对象是否合规
   * @return {Boolean}
   */
  isValid() {
    return !(this.$d.toString() === C.INVALID_DATE_STRING)
  }

  isSame(that, units) {
    const other = dayjs(that)
    return this.startOf(units) <= other && other <= this.endOf(units)
  }

  isAfter(that, units) {
    return dayjs(that) < this.startOf(units)
  }

  isBefore(that, units) {
    return this.endOf(units) < dayjs(that)
  }

  $g(input, get, set) {
    // 无参数就get，有参数就set
    if (Utils.u(input)) return this[get]
    return this.set(set, input)
  }

  unix() {
    return Math.floor(this.valueOf() / 1000)
  }

  valueOf() {
    // timezone(hour) * 60 * 60 * 1000 => ms
    return this.$d.getTime()
  }

  startOf(units, startOf) {
    const isStartOf = !Utils.u(startOf) ? startOf : true
    const unit = Utils.p(units)
  }
}

// 原型链
const proto = Dayjs.prototype
dayjs.prototype = proto

// 在prototype上设置各个单位的取值和设值函数
;[
  ["$ms", C.MS], // Dayjs.prototype.millisecond
  ["$s", C.S], // Dayjs.prototype.second
  ["$m", C.MIN], // Dayjs.prototype.minute
  ["$H", C.H], // Dayjs.prototype.hour
  ["$W", C.D], // Dayjs.prototype.day
  ["$M", C.M], // Dayjs.prototype.month
  ["$y", C.Y], // Dayjs.prototype.year
  ["$D", C.DATE], // Dayjs.prototype.date
].forEach((g) => {
  proto[g[1]] = function (input) {
    // g[0]是实例上的值，g[1]是字符串（例如date）
    return this.$g(input, g[0], g[1])
  }
})
