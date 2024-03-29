// 用canvas绘制一个曲线动画——深入理解贝塞尔曲线
// https://github.com/hujiulong/blog/issues/1

import { useEffect, useRef } from "react"
import generate from "./generator"

// consant
const START_R: number = 10
const END_R: number = 150
const FPS: number = 60
const DURATION: number = 1000
// 贝塞尔曲线控制点
const p1x = 0.2
const p1y = 0.8
const p2x = 0.8
const p2y = 0.2
// variable
let ctx: CanvasRenderingContext2D
let r: number = START_R
let globalID: any = undefined
let percent = 0

const Expand = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    ctx = canvasRef.current!.getContext("2d")!
  }, [])

  const startDraw = () => {
    if (percent > 1) {
      endDraw()
      return
    }
    drawArc()
    percent += 1000 / (FPS * DURATION)
    let p = generate(p1x, p1y, p2x, p2y)(percent)
    r = Math.floor((END_R - START_R) * p + START_R)
    console.log("[test] draw: ", percent, r)
    globalID = requestAnimationFrame(startDraw)
  }

  const endDraw = () => {
    if (globalID) {
      cancelAnimationFrame(globalID)
      globalID = undefined
    }
  }

  const drawArc = () => {
    ctx.clearRect(0, 0, 200, 200)
    ctx.beginPath()
    ctx.arc(100, 100, r, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()
  }

  return (
    <div className="expand">
      <div>
        <button onClick={startDraw}>开始绘制</button>
        <button onClick={endDraw}>结束绘制</button>
      </div>
      <canvas
        id="canvas"
        width="200"
        height="200"
        ref={canvasRef}
        style={{
          width: "200px",
          height: "200px",
        }}
      ></canvas>
    </div>
  )
}

export default Expand
