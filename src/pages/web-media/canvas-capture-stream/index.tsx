import { useRef, useState } from "react"

const WIDTH = 300
const HEIGHT = 300
let rotate = 0

const CanvasCaptureStream = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoUrl, setVideoUrl] = useState<string>("")
  let recorder: any
  const data: BlobPart[] = []

  const onClickDrawCanvas = () => {
    drawCanvas()
    requestAnimationFrame(onClickDrawCanvas)
  }

  const drawCanvas = () => {
    if (!canvasRef.current) {
      throw new Error("canvasRef.current is null")
    }
    const ctx = canvasRef.current.getContext("2d")!
    ctx.fillStyle = "red"
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    ctx.save()
    ctx.translate(WIDTH / 2, HEIGHT / 2)
    ctx.rotate((rotate++ * Math.PI) / 180)
    ctx.translate(-WIDTH / 2, -HEIGHT / 2)
    ctx.beginPath()
    ctx.rect(100, 100, 50, 50)
    ctx.fill()
    ctx.restore()
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

    recorder.start(1000)
  }

  const onClickRecordEnd = () => {
    recorder.stop()
    const url = URL.createObjectURL(new Blob(data, { type: "video/webm" }))
    console.log("onstop data", data)
    console.log("onstop url", url)
    videoRef!.current!.src = url
    setVideoUrl(url)
  }

  return (
    <div>
      <div>
        <button onClick={onClickDrawCanvas}>drawCanvas</button>
        <button onClick={onClickRecordStart}>record</button>
        <button onClick={onClickRecordEnd}>stop</button>
      </div>
      <canvas ref={canvasRef} width={WIDTH} height={HEIGHT}></canvas>
      <div>
        <video controls ref={videoRef}></video>
      </div>
    </div>
  )
}

export default CanvasCaptureStream
