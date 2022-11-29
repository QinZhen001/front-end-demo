# rxjs

[Rxjs入门教程](https://juejin.cn/post/7003328753556258846)



Subscription = Observable.subscribe(observer) observable

随着时间产生的数据集合，可以理解为流，其subscribe方法可以启动该流

observer: 决定如何处理数据

subscription: 存储已经启动过的流，其unsubscribe方法可以停止该流

## subscribe

subscribe不是订阅，而是启动这个流，subscribe后，才会执行next方法

```tsx
import { Observable } from "rxjs";

// stream$尾部的$是表示当前这个变量是个ovservable
const stream$ = new Observable(subscriber => {
  setTimeout(() => {
    subscriber.next([1, 2, 3]);
  }, 500);
  setTimeout(() => {
    subscriber.next({ a: 1000 });
  }, 1000);
  setTimeout(() => {
    subscriber.next("end");
  }, 3000);
  setTimeout(() => {
    subscriber.complete();
  }, 4000);
});

// 启动流
const subscription = stream$.subscribe({
  complete: () => console.log("done"),
  next: v => console.log(v),
  error: () => console.log("error")
});
// output
// [1,2,3]  // 500ms时
// {a:1000} // 1000ms时
// end // 3000ms时
// done // 4000ms时
```





能不能多次启动流，如果可以，那么多次启动时，相互之间的输出会不会干扰？

**可以多次启动，多次启动的流之间是相互独立的**

