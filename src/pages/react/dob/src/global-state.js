
class GlobalState {
  proxies = new WeakMap()
  originObjects = new WeakMap()
  ignoreDynamicSymbol = Symbol()
  objectReactionBindings = new WeakMap()
  pendingReactions = new Set()
  event = new Event()
}

export const globalState = new GlobalState()

