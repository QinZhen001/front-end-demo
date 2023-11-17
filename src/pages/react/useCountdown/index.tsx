import { useCountdown } from "./src"

const UseCountdownPage = () => {
  const { start, count } = useCountdown(10, {
    countdownCall(val) {
      console.log("countdownCall: ", val)
    },
    onEnd: (val) => {
      console.log("onEnd: ", val)
    }
  })

  return <div>
    <div>You can see something the console.</div>
    <div>
      <button onClick={start}>start count: {count}</button>
    </div>
  </div>
}


export default UseCountdownPage
