"use client"

// 用canvas绘制一个曲线动画——深入理解贝塞尔曲线
// https://github.com/hujiulong/blog/issues/1

import { useEffect, useRef } from "react"
import generate from "./generator"
import { Button } from "@/components/ui/button"

// consant
const START_R: number = 10
const END_R: number = 150
const FPS: number = 60
const DURATION: number = 5000

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
      pauseDraw()
      return
    }
    drawArc()
    percent += 1000 / (FPS * DURATION)
    let p = generate(p1x, p1y, p2x, p2y)(percent)
    r = Math.floor((END_R - START_R) * p + START_R)
    console.log("[test] draw: ", percent, r)
    globalID = requestAnimationFrame(startDraw)
  }

  const pauseDraw = () => {
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

  const endDraw = () => {
    const width = canvasRef.current!.width ?? 0
    const height = canvasRef.current!.height ?? 0
    ctx.clearRect(0, 0, width, height)
    percent = 0
    r = START_R
  }

  return (
    <>
      <div className="space-x-2">
        <Button onClick={startDraw}>开始绘制</Button>
        <Button onClick={pauseDraw}>暂停绘制</Button>
        <Button onClick={endDraw}>清理绘制</Button>
      </div>
      <canvas
        id="canvas"
        width="200"
        height="200"
        ref={canvasRef}
        className="w-[200px] h-[200px] mt-2"
      ></canvas>
    </>
  )
}

export default Expand
