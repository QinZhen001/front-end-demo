import { useEffect } from "react"

import "./index.css"

const audioContext = new AudioContext()
let audioBuffer: AudioBuffer

const AudioBuffer = () => {
  const onClickClose = () => {
    audioContext.close()
  }

  const onClickCreateBuffer = () => {
    // 立体声
    const channels = 2
    // 创建一个 采样率与音频环境 (AudioContext) 相同的 时长 2 秒的 音频片段。
    // audioContext.sampleRate 默认 44100
    const frameCount = audioContext.sampleRate * 2.0
    audioBuffer = audioContext.createBuffer(channels, frameCount, audioContext.sampleRate)
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
  }

  const onClickAudioBufferPlay = () => {
    if (!audioBuffer) {
      throw new Error("audioBuffer is not created")
    }
    // Get an AudioBufferSourceNode.
    // This is the AudioNode to use when we want to play an AudioBuffer
    const sourceNode = audioContext.createBufferSource()
    // set the buffer in the AudioBufferSourceNode
    sourceNode.buffer = audioBuffer
    // connect the AudioBufferSourceNode to the
    // destination so we can hear the sound
    sourceNode.connect(audioContext.destination) // audioContext.destination 一般是扬声器
    // start the source playing
    sourceNode.start()
  }

  return (
    <div>
      <div className="item">
        <button onClick={onClickCreateBuffer}>createBuffer (从原始数据构建)</button>
      </div>
      <div className="item">
        <button onClick={onClickAudioBufferPlay}>
          播放 AudioBuffer (通过AudioBufferSourceNode播放)
        </button>
      </div>
      <div className="item">
        <button onClick={onClickClose}>close audioContext</button>
      </div>
    </div>
  )
}

export default AudioBuffer
