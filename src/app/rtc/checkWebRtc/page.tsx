"use client"

import { useEffect, useState } from "react"
import { Select } from "@/components/ui/select"

const CheckWebRtc = () => {
  const [supportWebRTCApi, setSupportWebRTCApi] = useState(false) // 是否支持webrtc
  const [supportDeviceListApi, setSupportDeviceListApi] = useState(false) // 是否支持获取设备列表api
  const [isH264Encode, setIsH264Encode] = useState(false) // 是否支持H264编码
  const [isH264Decode, setIsH264Decode] = useState(false) // 是否支持H264解码
  const [isVP8Encode, setIsVP8Encode] = useState(false) // 是否支持VP8编码
  const [isVP8Decode, setIsVP8Decode] = useState(false) // 是否支持VP8解码
  const [audioinputDevices, setAudioinputDevices] = useState<MediaDeviceInfo[]>([]) // 音频输入设备列表
  const [audiooutputDevices, setAudiooutputDevices] = useState<MediaDeviceInfo[]>([]) // 音频输出设备列表
  const [videoinputDevices, setVideoinputDevices] = useState<MediaDeviceInfo[]>([]) // 视频输入设备列表

  useEffect(() => {
    checkApi()
    setTimeout(() => {
      checkDeviceSupport()
      // checkVideoDecode()
      // checkVideoEncode()
    }, 0)
  }, [])

  const checkApi = () => {
    if (RTCPeerConnection) {
      setSupportWebRTCApi(true)
    }
    if (!!navigator?.mediaDevices?.enumerateDevices) {
      setSupportDeviceListApi(true)
    }
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

  const checkVideoEncode = () => {
    if (!RTCPeerConnection) {
      return
    }
    const p = new RTCPeerConnection()
  }

  const checkDeviceSupport = async () => {
    debugger
    if (supportDeviceListApi) {
      debugger
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

  return (
    <div className="space-y-2">
      <div className="text-lg">支持webrtc api: {supportWebRTCApi.toString()}</div>
      <div className="text-lg">支持获取设备列表: {supportDeviceListApi.toString()}</div>
      <div className="text-lg">
        是否有音频输入设备: {(!!audioinputDevices.length).toString()}
        <Select>
          {audioinputDevices.map((item) => (
            <option key={item.deviceId} value={item.deviceId}>
              {item.label}
            </option>
          ))}
        </Select>
        </div>
      <div className="text-lg">是否有音频输出设备: {(!!audiooutputDevices.length).toString()}</div>
      <div className="text-lg">是否有视频输入设备: {(!!videoinputDevices.length).toString()}</div>
    </div>
  )
}

export default CheckWebRtc
