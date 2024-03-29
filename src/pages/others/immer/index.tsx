import { useState } from "react"
import { Store } from "./src"

const store = new Store({
  name: "jack",
  age: 18,
  content: { text: "asfvasfafsa" },
  data: { aaa: "aaa", bbb: "bbb" },
})

const Immer = () => {
  const [data, setData] = useState(store.get("data"))

  const onClickChange = () => {
    const oldData = store.get("data")
    const oldContent = store.get("content")
    store.set("data", {
      ddd: "ddd",
    })
    const newData = store.get("data")
    const newContent = store.get("content")
    console.log("oldData == newData", oldData === newData)
    console.log("oldContent == newContent", oldContent === newContent)
    setData(store.get("data"))
  }

  return (
    <div>
      <div>value:</div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <div>
        <button onClick={onClickChange}>change</button>
      </div>
    </div>
  )
}

export default Immer
