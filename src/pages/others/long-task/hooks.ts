import { useState, useEffect, useCallback, useLayoutEffect, useRef } from "react"

const EVENTS = ["click", "touchstart", "mousedown", "keydown"]

// 监听用户的最后一次操作
export const useLastEvent = () => {
  const ref = useRef<Event>()
  const [last, setLast] = useState<Event>()

  useEffect(() => {
    addEventListeners()
    return () => removeEventListeners()
  }, [])

  const dealEvent = (event: Event) => {
    ref.current = event
    setLast(event)
  }

  const addEventListeners = () => {
    EVENTS.forEach((eventName) => {
      document.addEventListener(eventName, dealEvent, { capture: true, passive: false })
    })
  }

  const removeEventListeners = () => {
    EVENTS.forEach((eventName) => {
      document.removeEventListener(eventName, dealEvent)
    })
  }

  const getLast = () => ref.current


  return {
    last,
    getLast
  }
}
