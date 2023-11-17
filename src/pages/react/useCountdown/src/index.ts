import { useCallback, useEffect, useRef, useState } from "react"
import { noop, useLatest } from './utils'

export const useCountdown = (initCount: number, {
  onEnd = noop,
  countdownCall = noop
}) => {
  const endfnRef = useLatest(onEnd)
  const cbFnRef = useLatest(countdownCall)
  const [count, setCount] = useState(0)
  let timer = useRef<any>(null)
  let countDowning = useRef<boolean>(false)

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearInterval(timer.current)
      }
      countDowning.current = false
    }

  }, [])


  useEffect(() => {
    if (countDowning.current && count != initCount) {
      cbFnRef.current(count)
      if (count == 0) {
        endfnRef.current(count)
        countDowning.current = false
      }
    }
  }, [count, initCount])


  const start = useCallback(() => {
    countDowning.current = true
    setCount(initCount)
    timer.current = setInterval(() => {
      setCount((count) => {
        if (count == 1) {
          timer.current && clearInterval(timer.current)
        }
        return count - 1
      })
    }, 1000)
  }, [initCount])


  return {
    start, count
  }
}


