# 依赖注入

[https://mp.weixin.qq.com/s/Or2YTrRcCPGK2UgnuRRCpw](https://mp.weixin.qq.com/s/Or2YTrRcCPGK2UgnuRRCpw)

[https://codesandbox.io/s/di-playground-oz2j9](https://codesandbox.io/s/di-playground-oz2j9)

## reflect-metadata

[https://www.npmjs.com/package/reflect-metadata](https://www.npmjs.com/package/reflect-metadata)

[https://rbuckton.github.io/reflect-metadata/#syntax](https://rbuckton.github.io/reflect-metadata/#syntax)

`reflect-metadata` Allows you to do runtime reflection on types.

## tsconfig

开启了 emitDecoratorMetadata 之后，被装饰的地方，TS 会在编译的时候自动填充三种元数据：

- design:type 当前属性的类型元数据，出现在 PropertyDecorator 和 MethodDecorator
- design:paramtypes 入参的元数据，出现在 ClassDecorator 和 MethodDecorator；
- design:returntype 返回类型元数据，出现在 MethodDecorator。

# 分析

Injectable 的时候 Reflect.defineMetadata(REFLECT_KEY.Injectable） 设置deps

Container.resolve 的时候Reflect.getOwnMetadata(REFLECT_KEY.Injectable) 获取相关deps

所谓deps 举个例子

```ts
@Injectable()
export class Student {
  constructor(transportation: Transportation, test: Test) {}
}

// deps: [transportation,test]
```

---

deps.map((dep) => this.resolve(dep as any));

递归去

# 踩坑

[Why can't reflect-metadata be used in vite](https://stackoverflow.com/questions/68570519/why-cant-reflect-metadata-be-used-in-vite)

Vite uses ESBuild which doesn't support `"emitDecoratorMetadata"` in tsconfig, since ESBuild doesn't have its own type system implemented. Refer to this [vitejs/vite#788](https://github.com/vitejs/vite/issues/788) for more details on this topic.

One approach I took was explicitly disabling ESBuild and used SWC instead

用 SWC 代替 ESBuild
