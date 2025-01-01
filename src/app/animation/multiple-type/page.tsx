"use client"

// https://github.com/chokcoco/iCSS/issues/262
// 内联元素的每一行都是会有不一样的效果,动画效果是以行为单位进行变换的

import { useEffect, useState } from "react"
import "./index.css"

const characters = "abcde fghijk lmnop qrstu vwxyz"

const MultipleType = () => {
  const [text, setText] = useState("")

  useEffect(() => {
    const id = setInterval(() => {
      setText((prev) => {
        if (prev.length >= 1000) {
          return ""
        }
        if (prev.length % 80 === 0) {
          return prev + "\n"
        }
        return prev + characters[Math.floor(Math.random() * characters.length)]
      })
    }, 100)

    return () => {
      clearInterval(id)
    }
  }, [])

  return (
    <div className="multiple-type">
      <div className="example">
        <p>{text}</p>
      </div>
    </div>
  )
}

export default MultipleType
