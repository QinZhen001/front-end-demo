const dep = new Dep();

let actualCount = 0;

const state = {
  get count() {
    // 收集依赖
    dep.depend();
    return actualCount;
  },
  set count(newCount) {
    debugger;
    actualCount = newCount;
    // 触发effect
    dep.notify();
  },
};

watchEffect(() => {
  console.log(state.count);
});

state.count = 22;
state.count = 33;
