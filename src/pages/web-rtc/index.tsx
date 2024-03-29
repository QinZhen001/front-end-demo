import { lazy } from "react"
import { CommonPageRouter } from "../main"

const WebRtcSimple = lazy(() => import("./simple"))
const WebRtcDataChannel = lazy(() => import("./data-channel"))
const AudioApi = lazy(() => import("./audio-api"))

export const children = [
  {
    path: "webrtc-simple",
    element: <WebRtcSimple></WebRtcSimple>,
    title: "快速入门 WebRTC",
  },
  {
    path: "webrtc-data-channel",
    element: <WebRtcDataChannel></WebRtcDataChannel>,
    title: "WebRTC DataChannel",
  },
  {
    path: "audio-api",
    element: <AudioApi></AudioApi>,
    title: "audio api相关",
  },
]

export const WebRtcPage = () => {
  return <CommonPageRouter routes={children}></CommonPageRouter>
}

export default WebRtcPage
