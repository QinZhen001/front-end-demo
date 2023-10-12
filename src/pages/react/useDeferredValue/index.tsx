// React 18 useTransition
import { useState, useDeferredValue, useMemo, useEffect } from "react"



const List = ({ input }: any) => {
  const LIST_SIZE = 20000
  const deferredInput = useDeferredValue(input)
  // 减少渲染次数
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

  // const data = useDeferredValue()
  const [input, setInput] = useState("")

  const handleChange = (e: any) => {
    setInput(e.target.value)
  }


  return <div >
    <input type="text" value={input} onChange={handleChange} />
    <List input={input}></List>
  </div>
}


export default UseDeferredValue
