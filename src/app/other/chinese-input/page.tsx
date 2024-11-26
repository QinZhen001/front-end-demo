"use client"

import { CompositionEvent, ChangeEvent } from "react"
// https://developer.mozilla.org/zh-CN/docs/Web/API/Element/compositionstart_event

const ChineseInput = () => {
  const onCompositionStart = (e: CompositionEvent<HTMLInputElement>) => {
    console.log("onCompositionStart", e.data)
  }

  const onCompositionupdate = (e: CompositionEvent<HTMLInputElement>) => {
    // 输入中文时，会触发该事件，也会触发onChange事件
    console.log("onCompositionupdate", e.data)
  }

  const onCompositionEnd = (e: CompositionEvent<HTMLInputElement>) => {
    console.log("onCompositionEnd", e.data)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("onChange", e.target.value)
  }

  return (
    <div>
      <input
        type="text"
        onCompositionStart={onCompositionStart}
        onCompositionUpdate={onCompositionupdate}
        onCompositionEnd={onCompositionEnd}
        onChange={onChange}
      ></input>
    </div>
  )
}

export default ChineseInput
