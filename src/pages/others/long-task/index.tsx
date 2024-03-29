import { useEffect, useState, useLayoutEffect } from "react"
import { useLastEvent } from "./hooks"

const MockTrackerSend = (data: any) => {
  console.log("[mock send]: ", data)
}

const LongTask = () => {
  const { getLast } = useLastEvent()

  useLayoutEffect(() => {
    observeLongTask()
  }, [])

  const observeLongTask = () => {
    if (PerformanceObserver) {
      new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 100) {
            const lastEvent = getLast()
            requestIdleCallback(() => {
              // 浏览器空闲时上报
              MockTrackerSend({
                type: "longTask",
                eventType: lastEvent?.type,
                startTime: entry.startTime, // 开始时间
                duration: entry.duration, // 持续时间
                selector: lastEvent?.target,
              })
            })
          }
        })
      }).observe({
        entryTypes: ["longtask"],
      })
    }
  }

  const addLongTask = () => {
    let start = Date.now()
    console.log("longTask开始 start", start)
    while (Date.now() < 2000 + start) {}
    console.log("longTask结束 end", Date.now())
  }

  const test1 = () => {
    console.log("test1")
  }

  const test2 = () => {
    console.log("test2")
  }

  return (
    <div>
      <button onClick={test1}>test1</button>
      <button onClick={test2}>test2</button>
      <button onClick={addLongTask}>add long task</button>
    </div>
  )
}

export default LongTask
