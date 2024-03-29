import duration from "dayjs/plugin/duration"
dayjs.extend(duration)

// 数字和单位的形式设置时长
dayjs.duration(2, "minutes")
// 对象形式设置时长
dayjs.duration({
  seconds: 2,
  minutes: 2,
  hours: 2,
  days: 2,
  weeks: 2,
  months: 2,
  years: 2,
})
// 加后缀
dayjs.duration(-1, "minutes").humanize(true) // 1 分钟前
// 提取出毫秒单位的数值
dayjs.duration(1500).milliseconds() // 500
// 转化为毫秒数返回
dayjs.duration(1500).asMilliseconds() // 1500
// 返回以秒为基础的长度，保留小数
dayjs.duration(1500).as("seconds") // 1.5
