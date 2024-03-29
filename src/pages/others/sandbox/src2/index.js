const windowProxy = new Proxy(window, traps)

with (windowProxy) {
  // 应用代码，通过 with 确保所有的全局变量的操作实际都是在操作 qiankun 提供的代理对象
  // ${appCode}
}
