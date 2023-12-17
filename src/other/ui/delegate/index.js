function delegate(element, eventType, selector, fn) {
  element.addEventListener(
    eventType,
    (e) => {
      let el = e.target;
      while (!el.matches(selector)) {
        if (element === el) {
          // 事件委托给了element的子节点
          // 所以事件触发是element本身是不会调用fn
          el = null;
          break;
        }
        el = el.parentNode;
      }
      el && fn.call(el, e, el);
    },
    true
  );
  return element;
}

let element = document.querySelector("ul");
delegate(element, "click", "li", (e, el) => {
  console.log("事件代理 (真实点击元素)", e.target);
  console.log("事件代理 (代理元素)", el);
});

// let element2 = document.querySelector("#item-2");
// element2.addEventListener("click", (e) => {
//   console.log("点击了item-2", e);
// });
