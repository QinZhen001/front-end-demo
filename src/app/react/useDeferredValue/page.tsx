"use client"

import { Input } from "@/components/ui/input"
// React 18 useTransition
import { useState, useDeferredValue, useMemo, useEffect } from "react"

const LIST_SIZE = 3000

const List = ({ input }: any) => {
  // 将某些状态的更新标记为“延迟”，
  // React 可以优先更新更紧急的状态（比如用户交互的直接反馈），而将不太急的状态更新稍晚处理。
  const deferredInput = useDeferredValue(input)

  // 减少渲染次数 （list 依赖 deferredValue）
  const list = useMemo(() => {
    const l = []
    for (let i = 0; i < LIST_SIZE; i++) {
      l.push(<div key={i}>{deferredInput}</div>)
    }
    return l
  }, [deferredInput])

  useEffect(() => {
    console.log(`input: ${input} deferredInput: ${deferredInput}`)
  }, [deferredInput, input])

  return list
}

const UseDeferredValue = () => {
  const [input, setInput] = useState("")

  const handleChange = (e: any) => {
    setInput(e.target.value)
  }

  return (
    <div>
      <Input type="text" value={input} onChange={handleChange} />
      <List input={input}></List>
    </div>
  )
}

export default UseDeferredValue
