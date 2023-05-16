let count = 0;
// 收集 port 这样就可以给每个页面发消息了
let peers = []



function start() {
  console.log("[worker]:", self, this)
  self.addEventListener("connect", function (e) {
    const port = e.ports[0];
    peers.push(port);
    count++;

    port.postMessage({ msg: 'Hello World! You are connection #' + count });

    port.addEventListener('message', function (e) {
      peers.forEach(function (port) {
        port.postMessage(e.data);
      });
    });

    port.start();
  })
}

start()
