import { ConstructorOf } from "../common"

export type Token<T = any> = string | symbol | ConstructorOf<T>

export interface TokenFactory<T = any> {
  getToken(): Token<T>
}

export interface InjectableOpts {
  muiltple?: boolean
  deps: Token[]
}

export interface IContainer {
  resolve<T>(token: Token<T>): T
}

export interface ClassProvider<T = any> {
  token: Token<T>
  useClass: ConstructorOf<T>
}

export interface ValueProvider<T = any> {
  token: Token<T>
  useValue: T
}

export interface FactoryProvider<T = any> {
  token: Token<T>
  useFactory(c: IContainer): T
}

export type Provider<T = any> = ClassProvider<T> | ValueProvider<T> | FactoryProvider<T>
