"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"

type RecordType = "screen" | "camera"

const width = 300
const height = 150
const frameRate = 20

const MediaRecorderPage = () => {
  const playerRef = useRef<HTMLVideoElement>(null)
  const recordPlayerRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  let blobs: BlobPart[] = []
  let mediaRecorder: MediaRecorder

  const record = async (type: RecordType) => {
    const getMediaMethod = type === "screen" ? "getDisplayMedia" : "getUserMedia"
    // @ts-ignore
    const stream = await navigator.mediaDevices[getMediaMethod]({
      video: {
        width,
        height,
        frameRate,
      },
    })
    if (playerRef.current) {
      // https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/srcObject
      // 该对象可以是一个 MediaStream、一个 MediaSource、一个 Blob 或者一个 File 类型
      playerRef.current.srcObject = stream
    }
    mediaRecorder = new MediaRecorder(stream, {
      mimeType: "video/webm",
    })
    mediaRecorder.ondataavailable = (e: any) => {
      console.log("mediaRecorder ondataavailable ", e)
      // e.data 为 Blob 类型
      blobs.push(e.data)
    }
    mediaRecorder.start(100)
  }

  const startScreen = () => {
    record("screen")
  }

  const startCamera = () => {
    record("camera")
  }

  const stop = () => {
    mediaRecorder.stop()
  }

  const reply = () => {
    const blob = new Blob(blobs, { type: "video/webm" })
    if (recordPlayerRef.current) {
      recordPlayerRef.current.src = window.URL.createObjectURL(blob)
      console.log("replay src ", recordPlayerRef.current.src)
      recordPlayerRef.current.play()
    }
  }

  const download = () => {
    const blob = new Blob(blobs, { type: "video/webm" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.style.display = "none"
    a.download = "record.webm"
    a.click()
  }

  const takePicture = () => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d")!
      canvasRef.current.width = width
      canvasRef.current.height = height
      context.drawImage(playerRef.current!, 0, 0, width, height)
    }
  }

  return (
    <div>
      <video autoPlay id="player" ref={playerRef}></video>
      <video id="recordPlayer" ref={recordPlayerRef}></video>
      <section className="mb-2 mt-2 space-x-2">
        <Button id="startScreen" onClick={startScreen}>
          开启录屏
        </Button>
        <Button id="startCamera" onClick={startCamera}>
          开启摄像头
        </Button>
      </section>
      <section className="space-x-2">
        <Button onClick={takePicture}>截图</Button>
        <Button id="stop" onClick={stop}>
          结束
        </Button>
        <Button id="reply" onClick={reply}>
          回放
        </Button>
        <Button id="download" onClick={download}>
          下载
        </Button>
      </section>
      <div className="mt-2">
        <canvas id="canvas" ref={canvasRef} />
      </div>
    </div>
  )
}

export default MediaRecorderPage
