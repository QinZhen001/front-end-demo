// 同步compose
export function compose1(...fns) {
  return function (result) {
    let list = fns.slice()
    while (list.length > 0) {
      // 拿出最后一个执行
      result = list.pop()(result)
    }
    return result
  }
}

export const compose2 =
  (...fns) =>
  (result) => {
    var list = fns.slice()
    while (list.length > 0) {
      // 将最后一个函数从列表尾部拿出
      // 并执行它
      result = list.pop()(result)
    }
    return result
  }

// 异步compose
export function compose3(...args) {
  const init = args.pop()
  return function (...arg) {
    return args.reverse().reduce(
      (sequence, fn) => {
        return sequence.then((res) => {
          return fn.call(null, res)
        })
      },
      Promise.resolve(init.apply(null, arg)),
    )
  }
}
