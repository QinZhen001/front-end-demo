// ObjectSupport 扩展了 dayjs(), dayjs.utc, dayjs().set, dayjs().add,
//  dayjs().subtract 的 API 以支持传入对象参数。

import objectSupport from 'dayjs/plugin/objectSupport';
dayjs.extend(objectSupport);

// dayjs函数直接支持对象参数
dayjs({
  year: 2010,
  month: 1,
  day: 12,
});
// dayjs函数对象上的方法支持对象参数
dayjs.utc({
  year: 2010,
  month: 1,
  day: 12,
});
// 实例上的方法支持对象参数
dayjs().set({ year: 2010, month: 1, day: 12 });
dayjs().add({ M: 1 });
dayjs().subtract({ month: 1 });