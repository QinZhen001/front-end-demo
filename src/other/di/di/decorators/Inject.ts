import "reflect-metadata"
import { ConstructorOf } from "../common"
import { REFLECT_KEY, Token, IContainer, TokenFactory } from "../ioc"

function decorateConstructorParameter(
  target: ConstructorOf<any>,
  index: number,
  tokenOrFactory: Token | TokenFactory,
) {
  if (!Reflect.hasOwnMetadata(REFLECT_KEY.Inject, target)) {
    const tokenMap = new Map([[index, tokenOrFactory]])
    Reflect.defineMetadata(REFLECT_KEY.Inject, tokenMap, target)
  } else {
    const tokenMap: Map<number, Token | TokenFactory> = Reflect.getOwnMetadata(
      REFLECT_KEY.Inject,
      target,
    )
    tokenMap.set(index, tokenOrFactory)
  }
}

function decorateProperty(_1: object, _2: string | symbol, tokenOrFactory: Token | TokenFactory) {
  const valueKey = Symbol.for("PropertyValue")
  const ret: PropertyDescriptor = {
    get(this: any) {
      if (!this.hasOwnProperty(valueKey)) {
        const token =
          typeof tokenOrFactory === "object" ? tokenOrFactory.getToken() : tokenOrFactory

        const container: IContainer = this[REFLECT_KEY.Container]
        const instance = container.resolve(token)
        this[valueKey] = instance
      }
      return this[valueKey]
    },
  }
}

export function Inject(tokenOrFactory: Token | TokenFactory): any {
  return (target: ConstructorOf<any> | object, key: string | symbol, index?: number) => {
    console.log("[Inject]:", target, key, index)
    if (typeof index !== "number" || typeof target === "object") {
      return decorateProperty(target, key, tokenOrFactory)
    } else {
      return decorateConstructorParameter(target, index, tokenOrFactory)
    }
  }
}

export function LazyInject(tokenFn: () => Token): any {
  return (target: ConstructorOf<any> | object, key: string | symbol, index?: number) => {
    if (typeof index !== "number" || typeof target === "object") {
      return decorateProperty(target, key, { getToken: tokenFn })
    } else {
      return decorateConstructorParameter(target, index, { getToken: tokenFn })
    }
  }
}
