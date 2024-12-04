// @ts-nocheck
import { useEffect } from "react"
import { Container, inject, injectFactory } from "../dependency-inject"

class Store {
  public num = 1
}

class Action {
  // TIP: @inject(Store) 会自动注入 store
  // 这里的 Store 就是 inject 中的 injectClass
  @inject(Store)
  private store: Store

  public setNum(num: number) {
    console.log("action this", this)
    this.store.num = num
  }
}

const TestDependencyInject = () => {
  const injectNormal = () => {
    const container = new Container()
    window.container = container

    container.set(Store, new Store())
    container.set(Action, new Action())

    const store = container.get(Store)
    // container.get 会做注入处理
    const action = container.get(Action)

    action.setNum(2)

    console.log("container", container)
    console.log("store", store)
    console.log("---------------------------")
  }

  const testInjectFactory = () => {
    const result = injectFactory({
      Store,
      Action,
    })

    result.Action.setNum(3)

    console.log("result", result.Store)
    console.log("---------------------------")
  }

  return (
    <div style={{ padding: "10px" }}>
      test dependency inject
      <div>
        <button onClick={injectNormal}>Inject Normal</button>
        <button onClick={testInjectFactory}>Inject Factory</button>
      </div>
    </div>
  )
}

export default TestDependencyInject
