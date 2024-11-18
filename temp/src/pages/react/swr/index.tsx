//  https://juejin.cn/post/6943397563114455048
// 「全局服务端数据管理」和「声明式数据请求」
import { useState } from "react"
// import { useFetch } from "./mini/index"

const url = "https://jsonplaceholder.typicode.com/posts"

const TestSwr = () => {
  const [num, setNum] = useState(1)
  // const { data } = useFetch(async () => {
  //   return fetch(`${url}/${num}`).then((response) => response.json())
  // }, [num])

  return (
    <div>
      <button onClick={() => setNum(num + 1)}>fetchData {num}</button>
      {/* <div>{data?.id}</div>
    <div>{data?.body}</div> */}
    </div>
  )
}

export default TestSwr
