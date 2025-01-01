"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

let ctx: CanvasRenderingContext2D
let offCtx: CanvasRenderingContext2D
let canvasLeft = 0
let canvasTop = 0

const CanvasPencil = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const offCanvasRef = useRef<HTMLCanvasElement>(null)
  const MouseStatus = useRef<"down" | "up">("up")

  const drawImg = () => {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.src = "/images/color_block.jpg"
      image.crossOrigin = "Anonymous"
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvasRef.current!.width, canvasRef.current!.height)
        resolve(true)
      }
    })
  }

  const canvasToImageByBackgroundColor = () => {
    let imageData = offCanvasRef.current!.toDataURL("image/png")
    return imageData
  }

  const initcanvas = () => {
    ctx = canvasRef.current!.getContext("2d")!
    const { left, top } = canvasRef.current!.getBoundingClientRect()
    canvasLeft = left
    canvasTop = top
  }

  const initOffCanvas = () => {
    offCtx = offCanvasRef.current!.getContext("2d")!
    offCtx.fillStyle = "black"
    offCtx.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height)
  }

  const init = async () => {
    initOffCanvas()
    initcanvas()
    await drawImg()
  }

  useEffect(() => {
    init()
  }, [])

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (MouseStatus.current === "down") return
    MouseStatus.current = "down"
    const { clientX, clientY } = e
    let x = clientX - canvasLeft
    let y = clientY - canvasTop
    drawDown(x, y)
  }

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (MouseStatus.current === "up") return
    const { clientX, clientY } = e
    let x = clientX - canvasLeft
    let y = clientY - canvasTop
    drawMove(x, y)
  }

  const onMouseUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    console.log("onMouseUp")
    if (MouseStatus.current === "up") return
    MouseStatus.current = "up"
    drawUp()
  }

  const drawDown = (x: number, y: number) => {
    ctx.strokeStyle = "red"
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(x, y)

    offCtx.strokeStyle = "white"
    offCtx.lineWidth = 4
    offCtx.beginPath()
    offCtx.moveTo(x, y)
  }

  const drawMove = (x: number, y: number) => {
    ctx.lineTo(x, y)
    ctx.stroke()

    offCtx.lineTo(x, y)
    offCtx.stroke()
  }

  const drawUp = () => {
    ctx.closePath()

    offCtx.closePath()
  }

  const outputImg = () => {
    const url = canvasToImageByBackgroundColor()
    const image = new Image()
    image.src = url
    const node = document.getElementById("img-wrapper")
    node?.appendChild(image)
  }

  return (
    <div>
      <Button onClick={outputImg}>导出图片</Button>
      <section className="mt-2 flex">
        <div className="relative h-[600px] w-[300px]">
          <canvas
            className="invisible absolute bottom-0 left-0 right-0 top-0 -z-10"
            width={300}
            height={600}
            ref={offCanvasRef}
          ></canvas>
          <canvas
            className="visible absolute bottom-0 left-0 right-0 top-0 z-10"
            width={300}
            height={600}
            ref={canvasRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
          ></canvas>
        </div>
        {/* 导出图片 */}
        <div id="img-wrapper">{/* img */}</div>
      </section>
    </div>
  )
}

export default CanvasPencil
