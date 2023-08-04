// https://juejin.cn/post/7262175454714626108
const InfinityDebugger = () => {

  (() => {
    // 当然使用的时候，为了更加的安全，最好加密后再使用
    function block() {
      if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
        // 此时打开了console控制台
        document.body.innerHTML = "检测到非法调试,请关闭后刷新重试!";
      }
      setInterval(() => {
        (function () {
          return false;
        }
        ['constructor']('debugger')
        ['call']());
      }, 50);
    }
    try {
      block();
    } catch (err) { }
  })();



  return <div>
    InfinityDebugger
  </div>
}


export default InfinityDebugger
