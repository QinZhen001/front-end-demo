const thunk =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    // 所有的dispatch都要通过中间件
    console.log(action, typeof action)
    //
    //如果是函数，就执行一下 (因为默认的action都是对象形式)
    if (typeof action === "function") {
      return action(dispatch, getState)
    }
    //默认，什么都没干
    return next(action)
  }

export default thunk

// return action(dispatch, getState)  所以actionCreator里面可以调用dispatch和getState

// export function addGunAsync() {
//     //thunk插件的作用，这里可以返回函数
//     return dispatch => {
//         setTimeout(() => {
//             //异步结束后，手动执行dispatch
//             dispatch({type: ADD_GUN})
//         }, 2000)
//     }
// }
