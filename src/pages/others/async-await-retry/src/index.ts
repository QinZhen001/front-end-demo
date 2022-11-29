type Config = {
  retriesMax?: number;
  interval?: number;
  jitter?: number;
  factor?: number;
  onAttemptFail?: Function;
  isCb?: boolean;
  exponential?: boolean;
};

const getPromise = (fn: Function, args: Array<any> = []) => {
  return new Promise((resolve, reject) => {
    args.push((err: any, data: any) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
    fn.apply(null, args);
  });
};

const clone = (obj: any): any => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    let clonedArr = [];
    for (let data of obj) {
      clonedArr.push(clone(data));
    }
    return clonedArr;
  } else {
    let clonedObj: any = {};
    const keys = Object.keys(obj);
    for (const key of keys) {
      clonedObj[key] = clone(obj[key]);
    }
    return clonedObj;
  }
};

const onAttemptFailFallback = async ({ exponential, interval, factor, jitter }: any) => {
  interval = exponential ? interval * factor : interval;
  if (interval) {
    await new Promise((r) => setTimeout(r, interval + jitter));
  }
};

export const retry = async (fn: Function, args: any[] = [], config: Config = {}) => {
  let {
    retriesMax = 3,
    interval = 0,
    jitter = 0,
    factor = 2,
    onAttemptFail = onAttemptFailFallback,
    exponential = true,
    isCb,
  } = config;
  if (jitter) {
    jitter = Math.floor(Math.random() * jitter) + 1;
  }

  for (let i = 0; i < retriesMax; i++) {
    try {
      let val = null;
      if (!isCb) {
        val = await fn.apply(null, args);
      } else {
        val = await getPromise(fn, clone(args));
      }
      return val;
    } catch (error) {
      if (
        retriesMax === i + 1 ||
        (Object.prototype.hasOwnProperty.call(error, "retryable") && !error.retryable)
      ) {
        throw error;
      }
      const result = await onAttemptFail({
        error,
        currentRetry: i,
        retriesMax,
        interval,
        exponential,
        factor,
        jitter,
      });
      if (!result && onAttemptFail !== onAttemptFailFallback) {
        return;
      }
    }
  }
};
