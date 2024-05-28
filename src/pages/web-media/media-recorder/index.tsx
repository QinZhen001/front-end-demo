import { useRef } from "react"

type RecordType = "screen" | "camera"

const width = 300
const height = 150
const frameRate = 20

export const MediaRecorderComponent = () => {
  const playerRef = useRef<HTMLVideoElement>(null)
  const recordPlayerRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  let mediaRecorder: MediaRecorder = null as any
  const blobs: BlobPart[] = []

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
      // var data = canvasRef.current.toDataURL('image/png');
    }
  }

  return (
    <div>
      <div>
        <video autoPlay id="player" ref={playerRef}></video>
        <video id="recordPlayer" ref={recordPlayerRef}></video>
      </div>
      <section>
        <button id="startScreen" onClick={startScreen}>
          开启录屏
        </button>
        <button id="startCamera" onClick={startCamera}>
          开启摄像头
        </button>
        <button onClick={takePicture}>截图</button>
        <button id="stop" onClick={stop}>
          结束
        </button>
        <button id="reply" onClick={reply}>
          回放
        </button>

        <button id="download" onClick={download}>
          下载
        </button>
      </section>
      <div>
        <canvas id="canvas" ref={canvasRef} />
      </div>
    </div>
  )
}

export default MediaRecorderComponent
