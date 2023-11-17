# useCountdown

[hooks 里面有那么多的 ref](https://juejin.cn/post/7271643757640007680)

## 总结：

编写自定义hooks时候，我们需要注意一下外部传入的参数，以及我们返回给用户的返回值，核心点是决不相信外部传入的内容，以及绝对要给用户一个可靠的返回值。

**自定义hooks，参数是一个函数，我们不能保证外部传入的变量一定是一个被useCallback包裹的函数，那么肯定就不能放到useEffect依赖项里面，所以需要useref包装一下。**

---

外部传入的函数不能保证是一个被useCallBack包裹的函数，useEffect依赖它就可能会导致useEffect多次执行



