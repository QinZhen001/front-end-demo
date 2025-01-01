"use client"

import { Button } from "@/components/ui/button"
import { EventSystem } from "./src"

const eventSystem = new EventSystem()

const Eventloop = () => {
  const enQueue = () => {
    console.log("enQueue")
    const curDate = new Date()
    eventSystem.enQueue(() => {
      console.log("time: " + curDate)
    })
  }

  const run = () => {
    console.log("run")
    eventSystem.run()
  }

  const end = () => {
    console.log("end")
    eventSystem.setStop()
  }

  return (
    <div className="space-x-2">
      <Button onClick={enQueue}>enQueue 添加任务</Button>
      <Button onClick={run}>run 启动事件循环</Button>
      <Button onClick={end}>end 关闭事件循环</Button>
    </div>
  )
}

export default Eventloop
