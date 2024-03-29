// https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController
// https://developer.mozilla.org/zh-CN/docs/Web/API/DOMException
// DOMException 接口代表调用方法或访问 Web API 属性时发生的异常事件（被称为异常，exception）。
// 这基本上是在 Web API 中如何描述错误情况的

let ac = new AbortController()
const { signal } = ac
const resourceUrl = "https://jsonplaceholder.typicode.com/todos/1"

function myCoolPromise({ signal }: any) {
  return new Promise((resolve, reject) => {
    signal?.throwIfAborted()

    // 异步的操作
    setTimeout(() => {
      Math.random() > 0.5 ? resolve("ok") : reject(new Error("not good"))
    }, 1000)

    // 添加 abort 事件监听，一旦 signal 状态改变就将 Promise 的状态改变为 rejected
    signal?.addEventListener("abort", () => reject(signal?.reason))
  })
}

const AbortControllerComponent = () => {
  const onClickFetch = () => {
    fetch(resourceUrl, { signal })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((err) => {
        console.error(err)
        const { code, name, message } = err
        console.log(code, name, message)
      })

    // 中止请求
    setTimeout(() => {
      ac.abort()
    }, 10)
  }

  const onClickMyPromise = async () => {
    myCoolPromise({ signal }).then(
      (res) => console.log(res),
      (err) => console.error(err),
    )
    setTimeout(() => {
      ac.abort()
    }, 20)
  }

  return (
    <div>
      <button onClick={onClickFetch}>fetch</button>
      <button onClick={onClickMyPromise}>可以主动取消的 Promise</button>
    </div>
  )
}

export default AbortControllerComponent
