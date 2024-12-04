import { globalState } from "./utils"

interface INormalObject {
  [x: string]: any
}

export interface IObjectType<T> {
  new (): T
}

export default class Container {
  /**
   * 为类设置对应的实例，依赖注入时，将会从 set 时赋值的实例中寻找
   */
  public set<T extends INormalObject>(setClass: IObjectType<T>, instance: T) {
    if (!globalState.instances.has(setClass)) {
      globalState.instances.set(setClass, instance)
    }
  }

  public get<T>(getClass: IObjectType<T>): T {
    if (!globalState.instances.has(getClass)) {
      throw new Error(`${getClass.name} 未注册。先使用 set 方法注册，再使用 get 获取`)
    }

    const instance = globalState.instances.get(getClass)

    // 如果这个类没有 inject 过，就不会存在这个 symbol，直接返回实例
    if (!instance[globalState.injectSymbol]) {
      return instance
    }

    for (const [propertyKey, injectClass] of instance[globalState.injectSymbol]) {
      // 将instance所有 标注injectSymbol 注入的字段 注入值
      Object.defineProperty(instance, propertyKey, {
        enumerable: true,
        configurable: true,
        get: () => {
          // 获取全局唯一实例
          return globalState.instances.get(injectClass)
        },
        set: (newValue: any) => {
          instance.propertyKey = newValue
        },
      })
    }

    return instance
  }
}
