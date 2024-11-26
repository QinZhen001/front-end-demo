// https://juejin.cn/book/7171733571638738952/section/7173918784720207879?scrollMenuIndex=1#heading-2

// js <=> c++ <=> libuv
// JS 和 C、C++ 层的通信，Node.js 很多功能都是由 C、C++ 实现，然后暴露到 JS 层使用的，
// 所以当我们调用 JS 代码时，就会进入 C++ 层，接着 C++ 层会进入 Libuv 的 C 层，
// 等到 Libuv 完成操作后就会回调 C++ 代码，最终 C++ 代码再回调 JS 层。

// 操作系统
let fd = 0
function socket() {
  return ++fd
}
function connect(fd, addr, port, req) {
  return new Promise((resolve) => {
    // 模拟
    setTimeout(() => {
      resolve(0)
    }, 3000)
  })
}

// Libuv层 (C)
async function uv_tcp_connect(req, handle, addr, port, cb) {
  console.log("Libuv: uv_tcp_connect", req, handle, addr, port, cb)
  handle.fd = socket()
  req.handle = handle
  req.cb = cb
  const status = await connect(handle.fd, addr, port)
  req.cb(req, status)
}

// C++层
class ConnectWrap {
  uv_connect_t = {}

  constructor(object) {
    console.log("C++: ConnectWrap constructor", object)
    object[0] = this
    this.object = object
  }

  Dispatch(fn, ...args) {
    this.uv_connect_t.data = this
    fn(this.uv_connect_t, ...args)
  }

  MakeCallback(key, ...args) {
    this.object[key](...args)
  }
}

class TCPWrap {
  uv_tcp_t = {}

  constructor() {
    this.uv_tcp_t.data = this
  }

  static Connect(req, addr, port) {
    const tcpWrap = this[0]
    const connectWrap = new ConnectWrap(req)
    connectWrap.Dispatch(uv_tcp_connect, tcpWrap.uv_tcp_t, addr, port, (req, status) => {
      console.log("C++: connect callback", req, status)
      const connectWrap = req.data
      const tcpWrap = req.handle.data
      connectWrap.MakeCallback("oncomplete", tcpWrap, connectWrap, status)
    })
  }
}

function FunctionTemplate(cb) {
  const map = {}

  function Tmp() {
    Object.assign(this, map)
    cb && cb(this)
  }

  return {
    PrototypeTemplate() {
      return {
        set(k, v) {
          Tmp.prototype[k] = v
        },
      }
    },
    InstanceTemplate() {
      return {
        set(k, v) {
          map[k] = v
        },
      }
    },
    GetFunction() {
      return Tmp
    },
  }
}

const TCPFunctionTemplate = FunctionTemplate((target) => {
  target[0] = new TCPWrap()
})
TCPFunctionTemplate.PrototypeTemplate().set("connect", TCPWrap.Connect)
TCPFunctionTemplate.InstanceTemplate().set("name", "hi")
const TCP = TCPFunctionTemplate.GetFunction()

const TCPConnectWrapFunctionTemplate = FunctionTemplate()
const TCPConnectWrap = TCPConnectWrapFunctionTemplate.GetFunction()

// JS层
export const testJsTcpOperate = () => {
  // 模拟
  const tcp = new TCP()
  const req = new TCPConnectWrap()
  console.log("tcp", tcp)
  console.log("req", req)
  const address = "127.0.0.1"
  const port = 80
  req.oncomplete = () => {
    console.log("js: tcp connect success")
  }
  req.address = address
  req.port = port
  tcp.connect(req, address, port)
}
