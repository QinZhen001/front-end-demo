"use client"

// https://sdk.cloudroom.com/web/webrtc/static/rtcTest.html

// ScriptProcessorNode 已被 AudioWorklet API 取代。
// AudioWorklet 提供了一种更现代和高效的方式来处理音频数据，允许开发者在独立的线程中运行自定义音频处理代码。
// 这不仅提高了性能，还提供了更好的音频精度和低延迟。

// The AudioContext was not allowed to start.
// It must be resumed (or created) after a user gesture on the page
// 一定要通过用户手势触发 所以需要做一个测试按钮

// 浏览器影音共享是一种功能，允许用户通过网络浏览器直接分享和观看音频和视频内容。
// 这种功能通常利用WebRTC（网页实时通信）等技术，使得多个用户可以同时观看或收听相同的媒体内容，而无需下载额外的软件或应用程序。

import { useEffect, useState, useRef } from "react"
import { AudioInputDevicesSelect } from "./components/AudioInputDevicesSelect"
import { AudioOutputDevicesSelect } from "./components/AudioOutputDevicesSelect"
import { VideoInputDevicesSelect } from "./components/VideoInputDevicesSelect"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

interface ResolutionItem {
  width: number
  height: number
  resolutionState: boolean // true:支持 false:不支持
}

type State = "idle" | "loading" | "success" | "error"

// 视频分辨率检测列表
const DEFAULT_RESOLUTION_LIST: ResolutionItem[] = [
  {
    width: 160,
    height: 96,
    resolutionState: false,
  },
  {
    width: 162,
    height: 160,
    resolutionState: false,
  },
  {
    width: 516,
    height: 288,
    resolutionState: false,
  },
  {
    width: 640,
    height: 360,
    resolutionState: false,
  },
  {
    width: 848,
    height: 480,
    resolutionState: false,
  },
  {
    width: 1280,
    height: 720,
    resolutionState: false,
  },
  {
    width: 1920,
    height: 1080,
    resolutionState: false,
  },
]

const CheckWebRtc = () => {
  const [state, setState] = useState<State>("idle")
  const [supportWebRTCApi, setSupportWebRTCApi] = useState(false) // 是否支持webrtc
  const [supportDeviceListApi, setSupportDeviceListApi] = useState(false) // 是否支持获取设备列表api
  const [isH264Encode, setIsH264Encode] = useState(false) // 是否支持H264编码
  const [isH264Decode, setIsH264Decode] = useState(false) // 是否支持H264解码
  const [isVP8Encode, setIsVP8Encode] = useState(false) // 是否支持VP8编码
  const [isVP8Decode, setIsVP8Decode] = useState(false) // 是否支持VP8解码
  const [audioinputDevices, setAudioinputDevices] = useState<MediaDeviceInfo[]>([]) // 音频输入设备列表
  const [audiooutputDevices, setAudiooutputDevices] = useState<MediaDeviceInfo[]>([]) // 音频输出设备列表
  const [videoinputDevices, setVideoinputDevices] = useState<MediaDeviceInfo[]>([]) // 视频输入设备列表
  const [isVideoInput, setIsVideoInput] = useState(false) // 是否支持视频输入
  const [isAudioInput, setIsAudioInput] = useState(false) // 是否支持音频输入
  const [localVideoStream, setLocalVideoStream] = useState<MediaStream>()
  const [localAudioStream, setLocalAudioStream] = useState<MediaStream>()
  const [resolutionList, setResolutionList] = useState<ResolutionItem[]>(DEFAULT_RESOLUTION_LIST)
  const [volume, setVolume] = useState(0)
  const [isScreenShare, setIsScreenShare] = useState(false)
  const [isMediaShare, setIsMediaShare] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (state == "loading") {
      checkDeviceSupport()
    }
  }, [supportDeviceListApi, state])

  useEffect(() => {
    if (state == "loading") {
      checkVideoEncode()
      checkResolution()
    }
  }, [localVideoStream, state])

  const checkApi = () => {
    if (RTCPeerConnection) {
      setSupportWebRTCApi(true)
    }
    if (!!navigator?.mediaDevices?.enumerateDevices) {
      setSupportDeviceListApi(true)
    }
  }

  const checkVideoInput = async () => {
    if (!navigator?.mediaDevices?.getUserMedia) {
      return
    }
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    console.log(`获取到摄像头stream`, stream)
    setIsVideoInput(true)
    setLocalVideoStream(stream)
    if (videoRef.current) {
      videoRef.current.srcObject = stream
      videoRef.current.play()
      const defaultSettings = stream.getVideoTracks()[0].getSettings()
      console.log(`默认settings: `, defaultSettings)
    }
  }

  const checkAudioInput = async () => {
    if (!AudioContext || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return
    }
    let context = new AudioContext()
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    console.log(`获取到麦克风stream`, stream)
    setIsAudioInput(true)
    setLocalAudioStream(stream)
    // ScriptProcessorNode 已经被遗弃
    let script = context.createScriptProcessor(2048, 1, 1)
    script.onaudioprocess = (event) => {
      let input = event.inputBuffer.getChannelData(0)
      let sum = 0.0
      for (let i = 0; i < input.length; ++i) {
        // input 有正数和负数
        sum += input[i] * input[i]
      }
      const instant = Math.sqrt(sum / input.length)
      setVolume(instant)
    }

    let audioinput = context.createMediaStreamSource(stream)
    audioinput.connect(script)
    script.connect(context.destination)
  }

  const checkVideoDecode = async () => {
    if (!RTCPeerConnection) {
      return
    }
    const p = new RTCPeerConnection()
    const offer = await p.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    })
    console.log(`接收端（解码）：`, offer.sdp)
    const isH264Decode = !!offer?.sdp?.includes("H264")
    setIsH264Decode(isH264Decode)
    const isVP8Decode = !!offer?.sdp?.includes("VP8")
    setIsVP8Decode(isVP8Decode)
  }

  const checkVideoEncode = async () => {
    if (!RTCPeerConnection || !localVideoStream) {
      return
    }
    const p = new RTCPeerConnection()
    if (p.addTrack && p.signalingState !== "closed") {
      p.addTrack(localVideoStream.getVideoTracks()[0], localVideoStream)
    } else {
      p.dispatchEvent(new Event("negotiationneeded"))
    }
    const offer = await p.createOffer()
    console.log(`发送端（编码）：`, offer.sdp)
    const isH264Encode = !!offer?.sdp?.includes("H264")
    const isVP8Encode = !!offer?.sdp?.includes("VP8")
    setIsH264Encode(isH264Encode)
    setIsVP8Encode(isVP8Encode)
  }

  const checkDeviceSupport = async () => {
    if (supportDeviceListApi) {
      const devices = await navigator.mediaDevices.enumerateDevices()
      console.log("devices", devices)
      let audioinputDevices: MediaDeviceInfo[] = []
      let audiooutputDevices: MediaDeviceInfo[] = []
      let videoinputDevices: MediaDeviceInfo[] = []
      devices.forEach((item) => {
        if (item.kind === "audioinput") {
          audioinputDevices.push(item)
        }
        if (item.kind === "audiooutput") {
          audiooutputDevices.push(item)
        }
        if (item.kind === "videoinput") {
          videoinputDevices.push(item)
        }
      })
      setAudioinputDevices(audioinputDevices)
      setAudiooutputDevices(audiooutputDevices)
      setVideoinputDevices(videoinputDevices)
    } else {
    }
  }

  const checkResolution = async () => {
    if (!localVideoStream) {
      return
    }
    const videoTrack = localVideoStream.getVideoTracks()[0]
    for (let [index, item] of resolutionList.entries()) {
      try {
        const constraints = {
          height: {
            ideal: item.height,
          },
          width: {
            ideal: item.width,
          },
        }
        await videoTrack.applyConstraints(constraints)
        console.log(`设置分辨率：${item.width} X ${item.height} 成功`)
        const settings = videoTrack.getSettings()
        if (settings.height == item.height && settings.width == item.width) {
          setResolutionList((prev) => {
            const newList = [...prev]
            newList[index].resolutionState = true
            return newList
          })
        }
      } catch (err) {
        console.error(err)
        // 某些移动端设备上，设置失败之后画面就黑屏了，且无法恢复，这里重新获取视频流并展示默认的参数
        // TODO: 后续优化
        if (index == resolutionList.length) {
        } else {
          // 继续检测下一个
          // 将检测逻辑抽取成一个test函数
        }
      }
    }
  }

  const checkScreenShare = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      return
    }
    // 移动端设备上，有相关屏幕共享api，但不支持屏幕共享
    const stream = await navigator.mediaDevices.getDisplayMedia()
    setIsScreenShare(true)
  }

  const checkMediaShare = async () => {
    const videoEle = document.createElement("video")
    if (
      "captureStream" in videoEle ||
      "mozCaptureStream" in videoEle ||
      "webkitCaptureStream" in videoEle
    ) {
      setIsMediaShare(true)
    }
  }

  const startTest = () => {
    setState("loading")
    checkApi()
    checkVideoInput()
    checkVideoDecode()
    checkAudioInput()
    checkScreenShare()
    checkMediaShare()
  }

  return state == "idle" ? (
    <div>
      <Button onClick={startTest}>开始测试</Button>
    </div>
  ) : (
    <div className="space-y-2">
      <div className="text-lg">支持webrtc api: {supportWebRTCApi.toString()}</div>
      <div className="text-lg">支持获取设备列表: {supportDeviceListApi.toString()}</div>
      <div className="text-lg">支持H264编码: {isH264Encode.toString()}</div>
      <div className="text-lg">支持H264解码: {isH264Decode.toString()}</div>
      <div className="text-lg">支持VP8编码: {isVP8Encode.toString()}</div>
      <div className="text-lg">支持VP8解码: {isVP8Decode.toString()}</div>
      <div className="text-lg">
        <div>支持音频输入: {isAudioInput.toString()}</div>
        <div>支持音频输入设备: {(!!audioinputDevices.length).toString()}</div>
        <AudioInputDevicesSelect options={audioinputDevices} />
        <Slider className="mt-2" value={[volume]} max={1} min={0} step={0.01} />
      </div>
      <div className="text-lg">
        支持音频输出设备: {(!!audiooutputDevices.length).toString()}
        <AudioOutputDevicesSelect options={audiooutputDevices}></AudioOutputDevicesSelect>
        <div className="text-red-500">音频输出检测可以在这播放一个mp3</div>
      </div>
      <div className="text-lg">
        <div>支持视频输入: {isVideoInput.toString()}</div>
        <div>支持视频输入设备: {(!!videoinputDevices.length).toString()}</div>
        <VideoInputDevicesSelect options={videoinputDevices}></VideoInputDevicesSelect>
        <video className="mt-2" ref={videoRef} width={288} height={160}></video>
      </div>
      <div className="text-lg">
        分辨率检测:
        <ul>
          {resolutionList.map((item) => (
            <li className="text-sm" key={item.width}>
              {item.width} X {item.height} {item.resolutionState ? "支持" : "不支持"}
            </li>
          ))}
        </ul>
      </div>
      <div className="text-lg">支持屏幕共享: {isScreenShare.toString()}</div>
      <div className="text-lg">支持屏幕共享: {isMediaShare.toString()}</div>
    </div>
  )
}

export default CheckWebRtc
