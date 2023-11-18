import "reflect-metadata";
import { DESIGN_TYPE_NAME } from "../common";
import { InjectableOpts, REFLECT_KEY, Token } from "../ioc";


type InjectableDecoratorOpts = Omit<InjectableOpts, "deps">;


export function Injectable<T>(opts: InjectableDecoratorOpts = {}){
  return (target: new (...args: any[]) => T) => {
    const deps = Reflect.getMetadata(DESIGN_TYPE_NAME.ParamType, target) || [];
    const tokenMap: Map<number, Token> = Reflect.getOwnMetadata(
      REFLECT_KEY.Inject,
      target
    );
    if(tokenMap){
      
    }
  }
}
