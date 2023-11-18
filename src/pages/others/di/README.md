# 依赖注入

[https://mp.weixin.qq.com/s/Or2YTrRcCPGK2UgnuRRCpw](https://mp.weixin.qq.com/s/Or2YTrRcCPGK2UgnuRRCpw)

[https://codesandbox.io/s/di-playground-oz2j9](https://codesandbox.io/s/di-playground-oz2j9)



## reflect-metadata

[https://www.npmjs.com/package/reflect-metadata](https://www.npmjs.com/package/reflect-metadata)

[https://rbuckton.github.io/reflect-metadata/#syntax](https://rbuckton.github.io/reflect-metadata/#syntax)

`reflect-metadata` Allows you to do runtime reflection on types.





## tsconfig

开启了 emitDecoratorMetadata 之后，被装饰的地方，TS 会在编译的时候自动填充三种元数据：

* design:type 当前属性的类型元数据，出现在 PropertyDecorator 和 MethodDecorator
* design:paramtypes 入参的元数据，出现在 ClassDecorator 和 MethodDecorator；
* design:returntype 返回类型元数据，出现在 MethodDecorator。
