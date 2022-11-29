// https://mp.weixin.qq.com/s/ECI3tniwucE2Tpv4eWw7iA
import { useState } from "react";
import { Observable, Subscriber, Observer, map } from "./src";
import "./index.css";

let source: Observable;
let subscription: Subscriber;

export const RxJS = () => {
  const [val, setVal] = useState(0);

  const onCreateObservable = () => {
    if (source) {
      return;
    }
    source = new Observable((observer: Observer) => {
      let i = 0;
      const timer = setInterval(() => {
        observer.next(++i);
      }, 1000);

      return function unsubscribe() {
        clearInterval(timer);
      };
    });
  };

  const onSubscribe = () => {
    if (subscription) {
      return;
    }
    subscription = source.subscribe({
      next: (v) => {
        console.log("next", v);
        setVal(v);
      },
      error: (err) => console.error(err),
      complete: () => console.log("complete"),
    });
  };

  const onSubscribePipe = () => {
    if (subscription) {
      return;
    }
    subscription = source.pipe(map((v: any) => v * v)).subscribe({
      next: (v) => {
        console.log("pipe next", v);
        setVal(v);
      },
      error: (err) => console.error(err),
      complete: () => console.log("complete"),
    });
  };

  const onUnsubscribe = () => {
    subscription.unsubscribe();
  };

  return (
    <div className="rx-js">
      RxJS
      <div>current: {val}</div>
      <button onClick={onCreateObservable}>Create Observable</button>
      <button onClick={onSubscribe}>Subscribe</button>
      <button onClick={onSubscribePipe}>Subscribe Pipe</button>
      <button onClick={onUnsubscribe}>Unsubscribe</button>
    </div>
  );
};


export default RxJS
