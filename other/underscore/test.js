// 测试

const obj = {
  aaa: "aaa",
};

const res1 = _(obj);
console.log("res1", res1);

// _.chain([1,2,3]).reverse().value()

const arr = _.chain([1, 2, 3]);
console.log("arr", arr);
