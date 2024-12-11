"use client"

import { useCountdown } from "./src"
import { Button } from "@/components/ui/button"

const UseCountdownPage = () => {
  const { start, count } = useCountdown(10, {
    countdownCall(val) {
      console.log("countdownCall: ", val)
    },
    onEnd: (val) => {
      console.log("onEnd: ", val)
    },
  })

  return (
    <div>
      <div>You can see something the console.</div>
      <div className="mt-2">
        <Button onClick={start}>start count: {count}</Button>
      </div>
    </div>
  )
}

export default UseCountdownPage
