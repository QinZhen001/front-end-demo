import * as C from "./constant.js";
import en from "./locale/en.js";
import U from "./utils.js";

let L = "en"; // 全局 locale
const Ls = {}; // 全局的已加载 locale 映射
Ls[L] = en;

/**
 * @description: 判断对象是否为Dayjs的实例
 * @param {object} d 对象
 * @return {Boolean}
 */
const isDayjs = (d) => d instanceof Dayjs;

/**
 * @description: 给全局locale映射添加一个键值对或修改已有键值对
 * @param {String|Object} preset 预设的local对象或名称字符串
 * @param {Object} object locale对象
 * @param {Boolean} isLocal 是否为本地的 locale
 * @return {String} 返回键名
 */
const parseLocale = (preset, object, isLocal) => {
  let l;
  // 不带参数时，返回当前使用的locale键
  if (!preset) {
    return L;
  }
  // 不管preset是对象还是字符串，都去映射键值对
  if (typeof preset === "string") {
    if (Ls[preset]) {
      l = preset;
    }
    if (object) {
      Ls[preset] = object;
      l = preset;
    }
  } else {
    const { name } = preset;
    Ls[name] = preset;
    l = name;
  }
  // 如果不用本地的locale，就修改L，最后返回l
  if (!isLocal && l) L = l;
  return l || (!isLocal && L);
};

/**
 * @description: 实例化Dayjs的方法，如果参数已经是Dayjs的实例，就直接返回
 * @param {Date|Dayjs} date Date或者Dayjs对象
 * @param {Object} c Date或者Dayjs对象
 * @return {Dayjs} 返回一个Dayjs实例
 */
const dayjs = function (date, c) {
  if (isDayjs(date)) {
    return date.clone();
  }

  const cfg = typeof c === "object" ? c : {};
  cfg.date = date;
  cfg.args = arguments;

  return new Dayjs(cfg);
};

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
  });
};

// 把上面写的几个方法同样加到 Utils 工具包中
const Utils = U; // for plugin use
Utils.l = parseLocale;
Utils.i = isDayjs;
Utils.w = wrapper;

/**
 * @description: 根据 cfg 返回对应的 Date 对象
 * @param {Object} cfg config 配置对象 {date, utc}
 * @return {Date} 返回 Date 对象
 */
const parseDate = (cfg) => {
  const { date, utc } = cfg;
  if (date === null) {
    // null 时返回 new Date(NaN)
    return new Date(NaN);
  }
  if (Utils.u(date)) {
    return new Date(); // undefined 时返回 new Date()
  }
  if (date instanceof Date) {
      return  
  }
};
