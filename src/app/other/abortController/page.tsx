"use client"

import { Button } from "@/components/ui/button"

// https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController
// https://developer.mozilla.org/zh-CN/docs/Web/API/DOMException
// DOMException 接口代表调用方法或访问 Web API 属性时发生的异常事件（被称为异常，exception）。
// 这基本上是在 Web API 中如何描述错误情况的

// https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController/abort
// abort(reason) reason: 可选
// 操作中止的原因，可以是各种 JavaScript 值。如果没有指定，则将原因设置为“AbortError”

let control = new AbortController()
const signal = control.signal
const resourceUrl = "https://jsonplaceholder.typicode.com/todos/1"

function myCoolPromise({ signal }: any) {
  return new Promise((resolve, reject) => {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/AbortSignal/throwIfAborted
    // 如果 signal 已经被中止，则 throwIfAborted() 方法抛出中止的 reason；否则它什么也不做。
    signal?.throwIfAborted()

    // 异步的操作
    setTimeout(() => {
      resolve("ok")
    }, 5000)

    // 添加 abort 事件监听，一旦 signal 状态改变就将 Promise 的状态改变为 rejected
    signal?.addEventListener("abort", () => reject(signal?.reason))
  })
}

const AbortControllerComponent = () => {
  const onClickFetch = async () => {
    try {
      setTimeout(() => {
        // 中止请求
        control.abort()
      }, 500)
      const res = await fetch(resourceUrl, { signal })
    } catch (error: any) {
      if (error.name == "AbortError") {
        console.error("触发了 abort", error)
      } else {
        console.error(error)
      }
    }
  }

  const onClickMyPromise = async () => {
    myCoolPromise({ signal }).then(
      (res) => console.log(res),
      (err) => console.error("Promise reject", err),
    )
    setTimeout(() => {
      control.abort()
    }, 200)
  }

  return (
    <div className="space-x-2">
      <Button onClick={onClickFetch}>fetch</Button>
      <Button onClick={onClickMyPromise}>可以主动取消的 Promise</Button>
    </div>
  )
}

export default AbortControllerComponent
