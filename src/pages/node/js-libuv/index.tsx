// Node.js 通过 V8 提供的函数模版和对象模版来拓展 JS 的功能。

// C++ 层的核心数据结构大多数是 C++ 类的基类，它们封装了很多通用的逻辑。
// BaseObject 用于 JS 和 C++ 对象的管理，AsyncWrap 用于异步回调 JS，
// HandleWrap 和 ReqWrap 是对 Libuv handle 和 request

import { testJsTcpOperate } from "./src"

const JSLibuv = () => {
  const onClick = () => {
    testJsTcpOperate()
  }

  return (
    <div>
      <button onClick={onClick}>testJsTcpOperate</button>
    </div>
  )
}

export default JSLibuv
