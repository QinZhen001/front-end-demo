import "reflect-metadata"
import { ConstructorOf } from "../common"
import { REFLECT_KEY } from "./ReflectKey"
import { ProviderAssertion } from "./Provider"
import {
  InjectableOpts,
  IContainer,
  Provider,
  Token,
  TokenFactory,
  ValueProvider,
  ClassProvider,
  FactoryProvider,
} from "./DefinationTypings"

const ERROR_MSG = {
  NO_INJECTABLE: "Constructor should be wrapped with decorator Injectable.",
  PROVIDER_NO_FOUND: "Not found provider for the token.",
}

export class ContainerV1 {
  resolve<T>(target: ConstructorOf<T>): T {
    const injectableOpts = this.parseInjectableOpts(target)
    const args = injectableOpts.deps.map((dep) => this.resolve(dep as any))
    return new target(...args)
  }

  protected parseInjectableOpts(target: ConstructorOf<any>): InjectableOpts {
    const ret = Reflect.getOwnMetadata(REFLECT_KEY.Injectable, target)
    if (!ret) {
      throw new Error(ERROR_MSG.NO_INJECTABLE)
    }
    return ret
  }
}

export class ContainerV2 extends ContainerV1 implements IContainer {
  protected providerMap = new Map<Token, Provider>()

  constructor(...providers: Provider[]) {
    super()
    this.register(...providers)
  }

  resolve<T>(token: Token<T>): T {
    const provider = this.providerMap.get(token)
    if (provider) {
      if (ProviderAssertion.isClassProvider(provider)) {
        return this.resolveClassProvider(provider)
      } else if (ProviderAssertion.isValueProvider(provider)) {
        return this.resolveValueProvider(provider)
      }
      return this.resolveFactoryProvider(provider)
    }

    if (typeof token !== "function") {
      throw new Error(ERROR_MSG.PROVIDER_NO_FOUND)
    }

    return this.resolveClassProvider({
      token,
      useClass: token,
    })
  }

  register(...providers: Provider[]) {
    providers.forEach((p) => {
      this.providerMap.set(p.token, p)
    })
  }

  protected resolveValueProvider(provider: ValueProvider) {
    return provider.useValue
  }

  protected resolveFactoryProvider(provider: FactoryProvider) {
    return provider.useFactory(this)
  }

  protected resolveClassProvider(provider: ClassProvider) {
    const constructorFn = provider.useClass
    const injectableOpts = this.parseInjectableOpts(constructorFn)
    const args = injectableOpts.deps.map((dep) => this.resolve(dep))

    constructorFn.prototype[REFLECT_KEY.Container] = this
    const instance = new constructorFn(...args)
    delete constructorFn.prototype[REFLECT_KEY.Container]

    instance[REFLECT_KEY.Container] = this

    return instance
  }
}
