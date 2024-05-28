import { lazy } from "react"
import { CommonPageRouter } from "../main"

const MediaRecorderComponent = lazy(() => import("./media-recorder"))
const WebRtcDataChannel = lazy(() => import("./data-channel"))
const AnalyserNode = lazy(() => import("./analyser-node"))
const AudioPcm = lazy(() => import("./audio-pcm"))
const AudioBuffer = lazy(() => import("./audio-buffer"))
const GainNode = lazy(() => import("./gain-node"))
const CanvasCaptureStream = lazy(() => import("./canvas-capture-stream"))

export const children = [
  {
    path: "mediaRecorder",
    element: <MediaRecorderComponent></MediaRecorderComponent>,
    title: "MediaRecorder相关",
  },
  {
    path: "canvas-capture-stream",
    element: <CanvasCaptureStream></CanvasCaptureStream>,
    title: "canvasCaptureStream相关",
  },
  {
    path: "dataChannel",
    element: <WebRtcDataChannel></WebRtcDataChannel>,
    title: "WebRTC DataChannel",
  },
  {
    path: "analyserNode",
    element: <AnalyserNode></AnalyserNode>,
    title: "analyserNode 音频可视化分析",
  },
  {
    path: "audioPcm",
    element: <AudioPcm></AudioPcm>,
    title: "获取麦克风pcm数据",
  },
  {
    path: "audioBuffer",
    element: <AudioBuffer></AudioBuffer>,
    title: "AudioBuffer相关",
  },
  {
    path: "gainNode",
    element: <GainNode></GainNode>,
    title: "GainNode相关",
  },
]

export const WebMediaPage = () => {
  return <CommonPageRouter routes={children}></CommonPageRouter>
}

export default WebMediaPage
