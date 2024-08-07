import { globalState } from "./utils"

export default <T>(injectClass: T) =>
  (target: any, propertyKey: string | symbol, descriptor?: PropertyDescriptor) => {
    // fix babel 无法 definePropery 的问题
    if (descriptor) {
      descriptor.enumerable = true
      descriptor.configurable = true
      descriptor.writable = true
    }

    // 这个字段用来存储所有可能从注入中获取的数据
    if (!target[globalState.injectSymbol]) {
      Object.defineProperty(target, globalState.injectSymbol, {
        enumerable: true,
        configurable: true,
        value: new Map(),
      })
    }

    target[globalState.injectSymbol].set(propertyKey, injectClass)
  }
