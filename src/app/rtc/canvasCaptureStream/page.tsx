"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { getRandomInt } from "@/lib/utils"

const WIDTH = 300
const HEIGHT = 300
let rotate = 0
let recorder: MediaRecorder
let data: BlobPart[] = []

type State = "recording" | "stop"

const CanvasCaptureStream = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [videoUrl, setVideoUrl] = useState<string>("")
  const [state, setState] = useState<State>("stop")

  const onClickDrawCanvas = () => {
    drawCanvas()
  }

  const drawCanvas = () => {
    if (!canvasRef.current) {
      throw new Error("canvasRef.current is null")
    }
    const ctx = canvasRef.current.getContext("2d")!
    ctx.fillStyle = "red"
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    // 将当前状态放入栈中，以保存 canvas 的完整状态。
    ctx.save()
    ctx.translate(WIDTH / 2, HEIGHT / 2)
    ctx.rotate((rotate++ * Math.PI) / 180)
    // 网格上将画布和原点水平移动 x 单位和垂直移动 y 单位
    ctx.translate(-WIDTH / 2, -HEIGHT / 2)
    ctx.beginPath()
    ctx.rect(
      getRandomInt(50, 100),
      getRandomInt(50, 100),
      getRandomInt(30, 50),
      getRandomInt(30, 50),
    )
    ctx.fill()
    // 将 canvas 恢复到最近的保存状态
    ctx.restore()

    requestAnimationFrame(drawCanvas)
  }

  const onClickRecordStart = () => {
    if (!canvasRef.current) {
      throw new Error("canvasRef.current is null")
    }
    const stream = canvasRef.current.captureStream()
    console.log("stream", stream)

    recorder = new MediaRecorder(stream, { mimeType: "video/webm" })

    recorder.ondataavailable = (e: any) => {
      console.log("mediaRecorder ondataavailable ", e)
      // e.data 为 Blob 类型
      data.push(e.data)
    }

    // The number of milliseconds to record into each Blob
    recorder.start(1000)
  }

  const onClickRecordEnd = () => {
    recorder.stop()
    const url = URL.createObjectURL(new Blob(data, { type: "video/webm" }))
    console.log("onstop data", data)
    console.log("onstop url", url)
    setVideoUrl(url)
    data = []
  }

  const onClickToggleRecord = () => {
    if (state === "recording") {
      onClickRecordEnd()
      setState("stop")
    } else {
      onClickRecordStart()
      setState("recording")
    }
  }

  return (
    <>
      <div className="space-x-2">
        <Button onClick={onClickDrawCanvas}>drawCanvas</Button>
        <Button onClick={onClickToggleRecord}>{state == "recording" ? "Stop" : "Start"}</Button>
      </div>
      <canvas ref={canvasRef} width={WIDTH} height={HEIGHT}></canvas>
      {videoUrl ? <video controls src={videoUrl} width={WIDTH} height={HEIGHT}></video> : null}
    </>
  )
}

export default CanvasCaptureStream
