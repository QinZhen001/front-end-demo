const arrayThunk =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    //如果是函数，执行一下
    if (Array.isArray(action)) {
      return action.forEach((v) => dispatch(v))
    }

    //如果不符合我们的要求，就直接调用下一个中间件，使用next
    //如果符合我们的要求，需要重新dispatch，调用dispatch即可
    // if (typeof action === 'function') {
    //     return action(dispatch, getState)
    // }
    return next(action)
  }

export default arrayThunk
