// https://mp.weixin.qq.com/s/rEX18DMuvzUx8GhJ5c3AEA
// 可视化音频文件
// 获取音频文件数据；
// 获取音频文件频率数据；
// 使用 Canvas API 实现数据可视化。

import { useEffect, useRef } from "react"

let frequencyData: Uint8Array
let bufferLength = 0
let analyser: AnalyserNode
const context = new AudioContext()
// 它包含了一些写在内存中的音频数据，通常储存在一个 ArrayBuffer 对象中
const dataSourceNode = context.createBufferSource()

export const AudioApi = () => {
  const ref = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  function drawBar() {
    requestAnimationFrame(drawBar)
    analyser.getByteFrequencyData(frequencyData)
    const canvasContext = canvasRef.current!.getContext("2d")
    const canvasWidth = canvasRef.current?.width || 0
    const canvasHeight = canvasRef.current?.height || 0
    canvasContext?.clearRect(0, 0, canvasWidth, canvasHeight)
    let barHeight, barWidth, r, g, b
    for (let i = 0, x = 0; i < bufferLength; i++) {
      barHeight = frequencyData[i]
      barWidth = (canvasWidth / bufferLength) * 2
      r = barHeight + 25 * (i / bufferLength)
      g = 250 * (i / bufferLength)
      b = 50
      canvasContext!.fillStyle = "rgb(" + r + "," + g + "," + b + ")"
      canvasContext?.fillRect(x, canvasHeight - barHeight, barWidth, barHeight)
      x += barWidth + 2
    }
  }

  useEffect(() => {
    console.log("ref", ref)
    if (ref.current) {
      ref.current.onchange = function (event: Event) {
        // @ts-ignore
        const file = event.target?.files[0]
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onload = async (evt: any) => {
          const audioArrayBuffer = evt.target.result // ArrayBuffer
          console.log("audioData", audioArrayBuffer)
          // 从一个音频文件解码构建一个 AudioBuffer
          const decodeAudioBuffer = await context.decodeAudioData(audioArrayBuffer)
          dataSourceNode.buffer = decodeAudioBuffer
          analyser = context.createAnalyser()
          // The size of the FFT (Fast Fourier Transform) used for frequency-domain analysis.
          // FFT 是一种用于将时域信号（例如音频）转换为频域信号的算法。
          analyser.fftSize = 512
          dataSourceNode.connect(analyser)
          analyser.connect(context.destination)
          bufferLength = analyser.frequencyBinCount
          frequencyData = new Uint8Array(bufferLength)
          dataSourceNode.start()
          drawBar()
        }
      }
    }
  }, [])

  return (
    <div>
      <input id="audioFile" ref={ref} type="file" accept="audio/*" />
      <canvas ref={canvasRef} width="500" height="300"></canvas>
    </div>
  )
}

export default AudioApi
