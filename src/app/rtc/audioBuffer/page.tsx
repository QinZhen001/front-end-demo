"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useRef } from "react"

let audioBuffer: AudioBuffer

const AudioBuffer = () => {
  const { toast } = useToast()
  const audioContextRef = useRef<AudioContext>()

  const onClickClose = () => {
    audioContextRef?.current?.close()
  }

  const onClickCreateBuffer = () => {
    if (typeof window !== "undefined") {
      // 创建 AudioContext 实例
      audioContextRef.current = new window.AudioContext()

      // 立体声
      const channels = 2
      // 创建一个 采样率与音频环境 (AudioContext) 相同的 时长 2 秒的 音频片段。
      // audioContext.sampleRate 默认 44100
      const frameCount = audioContextRef.current.sampleRate * 2.0
      audioBuffer = audioContextRef.current.createBuffer(
        channels,
        frameCount,
        audioContextRef.current.sampleRate,
      )
      // 填充数据
      for (let channel = 0; channel < channels; channel++) {
        // 使用白噪声填充 (-1.0 到 1.0 之间的随机数)
        // 读取实际音频片段 (AudioBuffer) 中包含的数据
        const nowBuffering = audioBuffer.getChannelData(channel)
        for (let i = 0; i < frameCount; i++) {
          // Math.random() is in [0; 1.0]
          // audio needs to be in [-1.0; 1.0]
          nowBuffering[i] = Math.random() * 2 - 1
        }
      }

      console.log("createBuffer success", audioBuffer)

      toast({
        description: "createBuffer success!",
      })
    }
  }

  const onClickAudioBufferPlay = () => {
    if (!audioBuffer) {
      throw new Error("audioBuffer is not created")
    }
    // Get an AudioBufferSourceNode.
    // This is the AudioNode to use when we want to play an AudioBuffer
    const sourceNode = audioContextRef.current!.createBufferSource()
    // set the buffer in the AudioBufferSourceNode
    sourceNode.buffer = audioBuffer
    // connect the AudioBufferSourceNode to the
    // destination so we can hear the sound
    sourceNode.connect(audioContextRef.current!.destination!) // audioContext.destination 一般是扬声器
    // start the source playing
    sourceNode.start()
  }

  return (
    <div>
      <div className="p-2">
        <Button onClick={onClickCreateBuffer}>createBuffer (从原始数据构建)</Button>
      </div>
      <div className="p-2">
        <Button onClick={onClickAudioBufferPlay}>
          播放 AudioBuffer (通过AudioBufferSourceNode播放)
        </Button>
      </div>
      <div className="p-2">
        <Button onClick={onClickClose}>close audioContext</Button>
      </div>
    </div>
  )
}

export default AudioBuffer
