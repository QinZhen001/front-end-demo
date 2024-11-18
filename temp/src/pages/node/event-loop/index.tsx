import { EventSystem } from "./src"

const eventSystem = new EventSystem()

const Eventloop = () => {
  const enQueue = () => {
    console.log("enQueue")
    const curDate = new Date()
    eventSystem.enQueue(() => {
      console.log("time: " + curDate)
    })
  }

  const run = () => {
    console.log("run")
    eventSystem.run()
  }

  const end = () => {
    console.log("end")
    eventSystem.setStop()
  }

  return (
    <div>
      <button onClick={enQueue}>enQueue 添加任务</button>
      <button onClick={run}>run 启动事件循环</button>
      <button onClick={end}>end 关闭事件循环</button>
    </div>
  )
}

export default Eventloop
