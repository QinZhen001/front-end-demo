// Dob
// https://github.com/dobjs/dob
// https://github.com/ascoders/weekly/blob/master/%E5%89%8D%E6%B2%BF%E6%8A%80%E6%9C%AF/35.%E7%B2%BE%E8%AF%BB%E3%80%8Adob%20-%20%E6%A1%86%E6%9E%B6%E5%AE%9E%E7%8E%B0%E3%80%8B.md

import { useState, useEffect, useRef } from "react"
import TestDependencyInject from "./components/test-dependency-inject"

// type ToSingleKeyValue<T> = T extends {
//   readonly key: infer K;
//   readonly value: infer V;
// }
//   ? K extends PropertyKey
//   ? {
//     [Key in K]: V;
//   }
//   : never
//   : never;

type ToSingleKeyValue<T> = T extends {
  key: infer K
  value: infer V
}
  ? {
      [Key in keyof K]: V
    }
  : never

type C = ToSingleKeyValue<{ key: "a"; value: 111 }>

let aaa: C = {
  a: 111,
}

function Counter() {
  const testRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setInterval(() => {
      console.log(testRef?.current?.value)
    }, 1000)
  })

  return <input ref={testRef} defaultValue="Bob" type="text"></input>
}

const Dob = () => {
  let [showInject, setShowInject] = useState(false)

  const testDependencyInject = () => {
    setShowInject((val) => !val)
  }

  return (
    <div>
      {/* <div>
      <button onClick={testDependencyInject}>TestDependencyInject</button>
    </div>
    {showInject ? <TestDependencyInject></TestDependencyInject> : null} */}
      <Counter></Counter>
    </div>
  )
}

export default Dob
