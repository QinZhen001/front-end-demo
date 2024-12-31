"use client"

// 同一个js脚本会创建一个 sharedWorker，其他页面再使用同样的脚本创建sharedWorker，会复用已创建的 worker，这个worker由几个页面共享，顾名思义叫shared worker。
// demo: http://coolaj86.github.io/html5-shared-web-worker-examples/
// github: https://github.com/coolaj86/html5-shared-web-worker-examples
// MDN: https://developer.mozilla.org/zh-CN/docs/Web/API/SharedWorker
import { useState, useEffect } from "react"

const ShareWorkerPage = () => {
  const [content, setContent] = useState<any[]>([])

  const initWorker = () => {
    const worker = new SharedWorker("/worker.js")
    worker.port.addEventListener(
      "message",
      function (e) {
        console.log("Message received from worker", e.data.msg)
        setContent((pre) => [...pre, e.data.msg])
      },
      false,
    )
    worker.port.start()
    worker.port.postMessage({ msg: "ping" })
  }

  useEffect(() => {
    initWorker()
  }, [])

  return (
    <div>
      <h3>ShareWorker</h3>
      <h3>请多开几个tab查看效果</h3>
      <div className="content">
        {content.map((item, index) => {
          return (
            <div className="text-lg text-red-500" key={index}>
              {item}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ShareWorkerPage
