"use client"

// React 18 useTransition
import { useState, useTransition } from "react"
import { Input } from "@/components/ui/input"

const UseTransitionPage = () => {
  const [input, setInput] = useState("")
  const [list, setList] = useState<any[]>([])
  const [isPending, startTransition] = useTransition()

  const LIST_SIZE = 500

  function handleChange(e: any) {
    // 高优先级 (先保证这个ui交互流畅)
    setInput(e.target.value)
    // 低优先级
    startTransition(() => {
      const l = []
      for (let i = 0; i < LIST_SIZE; i++) {
        l.push(e.target.value)
      }
      setList(l)
    })
  }

  return (
    <div>
      <Input type="text" value={input} onChange={handleChange}></Input>
      <div className="mt-2">
        {isPending ? (
          <div>Loading...</div>
        ) : (
          list.map((item, index) => <div key={index}>{item}</div>)
        )}
      </div>
    </div>
  )
}

export default UseTransitionPage
