"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { IMicrophoneAudioTrack } from "agora-rtc-sdk-ng"

interface AudioWorkletNodeComProps {
  audioTrack?: IMicrophoneAudioTrack
}

let audioContext: AudioContext

const AudioWorkletNodeCom = (props: AudioWorkletNodeComProps) => {
  const { audioTrack } = props

  const dealAudioPcmData = async () => {
    if (!audioTrack) {
      throw new Error("audioTrack is null")
    }
    audioContext = new AudioContext()
    await audioContext.audioWorklet.addModule("/pcm-processor.js")
    const audioWorkletNode = new AudioWorkletNode(audioContext, "pcm-processor")

    const audioMediaStreamTrack = audioTrack.getMediaStreamTrack()
    const mNode = audioContext.createMediaStreamSource(new MediaStream([audioMediaStreamTrack]))
    mNode.connect(audioWorkletNode)

    audioWorkletNode.port.onmessage = (event) => {
      const inputs = event.data?.inputs ?? []
      console.log("event onmessage", inputs)
    }
  }

  useEffect(() => {
    return () => {
      if (audioContext.state != "closed") {
        // 会关闭并释放其所有相关的音频节点 (返回Promise)
        audioContext.close()
      }
    }
  }, [])

  return (
    <div>
      <Button onClick={dealAudioPcmData}>Deal</Button>
    </div>
  )
}

export default AudioWorkletNodeCom
