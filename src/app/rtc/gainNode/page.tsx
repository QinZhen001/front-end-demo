"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

let audioSourceNode
let audioCtx: AudioContext
let gainNode: GainNode

const GainNode = () => {
  const [muted, setMuted] = useState(false)

  const onClickGainNode = async () => {
    if (!navigator.mediaDevices.getUserMedia) {
      throw new Error("getUserMedia is not supported")
    }
    audioCtx = new AudioContext()
    gainNode = audioCtx.createGain()
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      })
      console.log("audioStream", audioStream)
      audioSourceNode = audioCtx.createMediaStreamSource(audioStream)
      audioSourceNode.connect(gainNode)
      gainNode.connect(audioCtx.destination)
      console.log("gainNode", gainNode)
    } catch (e) {
      console.error("error", e)
      throw e
    }
  }

  const onClickMute = () => {
    const currentTime = audioCtx.currentTime
    console.log("currentTime", currentTime)
    if (!muted) {
      // 0 means mute. If you still hear something, make sure you haven't
      // connected your source into the output in addition to using the GainNode.
      gainNode.gain.setValueAtTime(0, currentTime)
    } else {
      gainNode.gain.setValueAtTime(1, currentTime)
    }
    setMuted(!muted)
  }

  return (
    <div className="space-x-2">
      <Button onClick={onClickGainNode}>dealGainNode （播放麦克风声音）</Button>
      <Button onClick={onClickMute}>muted: {muted ? "true" : "false"}</Button>
    </div>
  )
}

export default GainNode
