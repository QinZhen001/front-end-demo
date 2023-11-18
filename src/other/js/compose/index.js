// 同步compose
function compose1(...fns) {
  return function (result) {
    let list = fns.slice();
    while (list.length > 0) {
      // 拿出最后一个执行
      result = list.pop()(result);
    }
    return result;
  };
}

const compose2 =
  (...fns) =>
  (result) => {
    var list = fns.slice();
    while (list.length > 0) {
      // 将最后一个函数从列表尾部拿出
      // 并执行它
      result = list.pop()(result);
    }
    return result;
  };

// 异步compose
function compose3(...args) {
  const init = args.pop();
  return function (...arg) {
    return args.reverse().reduce((sequence, fn) => {
      return sequence.then((res) => {
        return fn.call(null, res);
      });
    }, Promise.resolve(init.apply(null, arg)));
  };
}

// ------------------------    test -----------------------------------
let a = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("xhr1");
      resolve("xhr1");
    }, 5000);
  });
};

let b = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("xhr2");
      resolve("xhr2");
    }, 3000);
  });
};
let steps = [a, b]; // 从右向左执行
let composeFn = compose3(...steps);

composeFn().then((res) => {
  console.log(666);
});

// xhr2
// xhr1
// 666
