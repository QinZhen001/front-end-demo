import { useState, useCallback, useEffect } from "react"

export function useFetch(fetcher: Function, deps: any[] = []) {
  const [data, setData] = useState<any>()
  const fetch = useCallback(async () => {
    try {
      const data = await fetcher()
      setData(data)
    } catch (err) {
      throw err
    }
  }, deps)

  useEffect(() => {
    debugger
    fetch()
  }, [fetch])

  return {
    data,
    // 暴露 fetch 给使用方，以便重新发起请求，刷新数据
    fetch,
  }
}
