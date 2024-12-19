"use client"

import { CompositionEvent, ChangeEvent } from "react"

const ChineseInput = () => {
  const onCompositionStart = (e: CompositionEvent<HTMLInputElement>) => {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Element/compositionstart_event
    console.log("onCompositionStart", e.data)
  }

  const onCompositionupdate = (e: CompositionEvent<HTMLInputElement>) => {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Element/compositionupdate_event
    // compositionupdate 事件触发于字符被输入到一段文字的时候（这些可见字符的输入可能需要一连串的键盘操作、语音识别或者点击输入法的备选词）
    // 可用于中文输入法
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
        className="border border-gray-300 rounded"
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
