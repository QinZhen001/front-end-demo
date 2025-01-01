/**
 * @description: plugin
 * @param {Object} o option
 * @param {Class} c Dayjs类
 */
export default (o, c) => {
  const proto = c.prototype
  /**
   * @description: 返回一个 boolean 来展示一个 Day.js 对象的年份是不是闰年。
   * @return {Boolean}
   */
  proto.isLeapYear = function () {
    return (this.$y % 4 === 0 && this.$y % 100 !== 0) || this.$y % 400 === 0
  }
}
