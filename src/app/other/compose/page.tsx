"use client"

// https://juejin.cn/post/6989020415444123662

import { Button } from "@/components/ui/button"
import { compose3 } from "./compose"

let a = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("xhr1")
      resolve("xhr1")
    }, 1000)
  })
}

let b = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("xhr2")
      resolve("xhr2")
    }, 2000)
  })
}

const ComposePage = () => {
  const onClickCompose = () => {
    let steps = [a, b] // 从右向左执行
    let composeFn = compose3(...steps)

    composeFn().then(() => {
      console.log("end")
    })
  }

  return (
    <div>
      <Button onClick={onClickCompose}>compose</Button>
    </div>
  )
}

export default ComposePage
