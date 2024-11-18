const tag = "ascoders-dependency-inject"

const globalOrWindow: any =
  (typeof self === "object" && self.self === self && self) ||
  (typeof global === "object" && global.global === global && global)

class GlobalState {
  public instances = new WeakMap()
  public injectSymbol = Symbol()
}

let globalState = new GlobalState()

if (globalOrWindow[tag]) {
  globalState = globalOrWindow[tag]
} else {
  globalOrWindow[tag] = globalState
}

console.log("window.globalState", globalState)

export { globalState }
