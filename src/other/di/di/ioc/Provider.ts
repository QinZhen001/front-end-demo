import { Provider, ValueProvider, ClassProvider, FactoryProvider } from "./DefinationTypings"

export class ProviderAssertion {
  static isClassProvider(provider: Provider): provider is ClassProvider {
    return provider && provider.hasOwnProperty("useClass")
  }

  static isValueProvider(provider: Provider): provider is ValueProvider {
    return provider && provider.hasOwnProperty("useValue")
  }

  static isFactoryProvider(provider: Provider): provider is FactoryProvider {
    return provider && provider.hasOwnProperty("useFactory")
  }
}
