// immer.js:也许更适合你的immutable js库
// https://juejin.cn/post/6844904111402385422#heading-6

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

function produce()
