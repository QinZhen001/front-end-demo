// immer.js:也许更适合你的immutable js库
// https://juejin.cn/post/6844904111402385422#heading-6

// https://immerjs.github.io/immer/zh-CN/
// 会将所有更改应用到临时 draft，它是 currentState 的代理。一旦你完成了所有的 mutations，
// Immer 将根据对 draft state 的 mutations 生成 nextState

export class Store {
  modified: boolean
  source: any
  copy: any

  constructor(state: any) {
    this.modified = false
    this.source = state
    this.copy = null
  }

  get(key: any) {
    if (!this.modified) {
      return this.source[key]
    }
    return this.copy[key]
  }

  set(key: any, value: any) {
    if (!this.modified) {
      this.modifying()
    }
    return (this.copy[key] = value)
  }

  modifying() {
    if (this.modified) {
      return
    }
    this.modified = true
    // 这里使用原生的 API 实现一层 immutable，
    // 数组使用 slice 则会创建一个新数组。对象则使用解构
    this.copy = Array.isArray(this.source) ? this.source.slice() : { ...this.source }
  }
}

const PROXY_FLAG = "@@SYMBOL_PROXY_FLAG"
const handler = {
  get(target: any, key: any) {
    // 如果遇到了这个 flag 我们直接返回我们操作的 target
    if (key === PROXY_FLAG) return target
    return target.get(key)
  },
  set(target: any, key: any, value: any) {
    return target.set(key, value)
  },
}

function produce(state: any, producer: (state: any) => {}) {
  const store = new Store(state)
  const proxy = new Proxy(store, handler)

  // 执行我们传入的 producer 函数，我们实际操作的都是 proxy 实例，
  // 所有有副作用的操作都会在 proxy 内部进行判断，是否最终要对 store 进行改动。
  producer(proxy)

  // 处理完成之后，通过 flag 拿到 store 实例
  const newState = proxy[PROXY_FLAG]

  if (newState.modified) {
    return newState.copy
  }

  return newState.source
}
