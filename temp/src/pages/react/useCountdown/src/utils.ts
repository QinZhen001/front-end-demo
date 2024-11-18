import { useMemo, useRef } from "react"

type Noop = (...args: any[]) => void

export const noop = (...args: any[]) => {}

export const useLatest = <T>(value: T) => {
  const ref = useRef<any>()
  ref.current = value

  return ref
}

const useMemoizedFn = <T extends Noop>(fn: T) => {
  const fnRef = useRef<T>(fn)

  // why not write fnRef.current = fn
  fnRef.current = useMemo(() => fn, [fn])

  // TODO: why not write this?
  const memoizedFn = useRef<T>()
  // if(!memoizedFn.current) {
  //   memoizedFn.current = function(this)
  // }
}
