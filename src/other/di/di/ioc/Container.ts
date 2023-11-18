import "reflect-metadata";
import { ConstructorOf } from "../common";
import { REFLECT_KEY } from "./ReflectKey";
import { ProviderAssertion } from "./Provider";
import {
  InjectableOpts,
  IContainer,
  Provider,
  Token,
  TokenFactory,
  ValueProvider,
  ClassProvider,
  FactoryProvider
} from "./DefinationTypings";

const ERROR_MSG = {
  NO_INJECTABLE: "Constructor should be wrapped with decorator Injectable.",
  PROVIDER_NO_FOUND: "Not found provider for the token."
};


export class ContainerV1 {
  resolve<T>(target: ConstructorOf<T>): T {
    const injectableOpts = this.parseInjectableOpts(target);
    const args = injectableOpts.deps.map((dep) => this.resolve(dep as any));
    return new target(...args);
  }

  protected parseInjectableOpts(target: ConstructorOf<any>): InjectableOpts {
    const ret = Reflect.getOwnMetadata(REFLECT_KEY.Injectable, target);
    debugger
    if (!ret) {
      throw new Error(ERROR_MSG.NO_INJECTABLE);
    }
    return ret;
  }
}
