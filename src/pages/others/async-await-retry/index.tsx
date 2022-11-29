import { retry } from "./src/index";
import "./index.css";

const fn1 = () => {
  return "fn1";
};

let i = 0;

const second = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (i++ == 1) {
        resolve("second resolve");
        i = 0;
      } else {
        reject("second reject");
      }
    }, 1000);
  });
};

const funErr = async () => {
  throw new Error("Error");
};

const funCallBack = (cb: Function) => {
  cb(null, "funCallBack");
};

const funCallBackWithArgs = (arg1: any, cb: Function) => {
  // 这里的arg1 就是  { value: "arg1" }
  cb(null, arg1);
};

const funCallBackWithErr = (arg1: any, cb: Function) => {
  console.log("arg1", arg1);
  let err = new Error("funCallBackWithErr");
  cb(err, arg1);
};

// --------------------------------------------------

export const AsyncAwaitRetry = () => {
  const retryNormal = async () => {
    const res = await retry(fn1); // 一次执行就成功了
    console.log("retryNormal", res);
  };

  const retrySecond = async () => {
    const res = await retry(second); // 第一次执行reject 重试 第二次执行成功
    console.log("retrySecond", res);
  };

  const retryError = async () => {
    const res = await retry(funErr); // 默认重试三次
    console.log("retryError", res); // 这里不会执行 因为抛出了错误
  };

  const retryCallBack = async () => {
    // 只执行一次
    const res = await retry(funCallBack, [], { isCb: true });
    console.log("retryCallBack", res);
  };

  const retryCallBackWithArgs = async () => {
    // 只执行一次
    const res = await retry(funCallBackWithArgs, [{ value: "arg1" }], { isCb: true });
    console.log("retryCallBackWithArgs", res);
  };

  const retryCallBackWithErr = async () => {
    // 只执行一次
    const res = await retry(funCallBackWithErr, [{ value: "arg1" }], { isCb: true });
    console.log("retryCallBackWithErr", res); // 存在error 这里不会打印
  };

  return (
    <div className="retry">
      <button onClick={retryNormal}>retryNormal</button>
      <button onClick={retryError}>retryError</button>
      <button onClick={retrySecond}>retrySecond</button>
      <button onClick={retryCallBack}>retryCallBack</button>
      <button onClick={retryCallBackWithArgs}>retryCallBackWithArgs</button>
      <button onClick={retryCallBackWithErr}>retryCallBackWithErr</button>
    </div>
  );
};


export default AsyncAwaitRetry
