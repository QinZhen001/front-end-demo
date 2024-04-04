// https://juejin.cn/book/7171733571638738952/section/7173918784720207879?scrollMenuIndex=1#heading-2

// js <=> c++ <=> libuv
// JS 和 C、C++ 层的通信，Node.js 很多功能都是由 C、C++ 实现，然后暴露到 JS 层使用的，
// 所以当我们调用 JS 代码时，就会进入 C++ 层，接着 C++ 层会进入 Libuv 的 C 层，
// 等到 Libuv 完成操作后就会回调 C++ 代码，最终 C++ 代码再回调 JS 层。
