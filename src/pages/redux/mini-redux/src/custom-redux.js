export function createStore(reducer, enhancer) {
  //enhancer增强器 也就是一些中间件 相当于applyMiddleware
  //enhancer作用包裹createStore，对createStore进行了一次扩展
  if (enhancer) {
    return enhancer(createStore)(reducer) //applyMiddleware(createStore)(reducer)
  }
  let currentState = {}
  let currentListeners = []

  function getState() {
    return currentState
  }

  function subscribe(listener) {
    currentListeners.push(listener)
  }

  function dispatch(action) {
    currentState = reducer(currentState, action)
    currentListeners.forEach((v) => v()) //执行每个listener
    return action
  }

  dispatch({ type: '@INIT/CUSTOM-REDUX' })

  return {
    getState,
    subscribe,
    dispatch,
  }
}

// applyMiddleware 返回一个增强createStore的函数 它本身的参数就接受一个 createStore
//...args 其实就是reducer  (这里很巧妙 ...先把args变为数组 在...把args展开)
export function applyMiddleware(...middlewares) {
  return (createStore) => (...args) => {
    const store = createStore(...args)
    let dispatch = store.dispatch

    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args),
    }
    const middlewareChain = middlewares.map((middleware) => middleware(midApi))
    dispatch = compose(...middlewareChain)(store.dispatch)

    // 假如只有一个middleware
    // 正真的dispatch = middleware(midApi)(store.dispatch)
    // dispatch(action)相当于 middleware(midApi)(store.dispatch)(action)  三层函数

    return {
      ...store,
      dispatch, //覆盖掉原来的store
    }
  }
}

// compose(fn1,fn2,fn3)
// fn1(fn2(fn3))
export function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((ret, item) => (...args) => ret(item(...args)))
}

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args))
}

export function bindActionCreators(creators, dispatch) {
  return Object.keys(creators).reduce((ret, item) => {
    ret[item] = bindActionCreator(creators[item], dispatch)
    return ret
  }, {})
}
