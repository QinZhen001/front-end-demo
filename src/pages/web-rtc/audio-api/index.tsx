// https://mp.weixin.qq.com/s/rEX18DMuvzUx8GhJ5c3AEA
// 可视化音频文件
// 获取音频文件数据；
// 获取音频文件频率数据；
// 使用 Canvas API 实现数据可视化。

import { useEffect, useRef } from "react"

let frequencyData: Uint8Array
let bufferLength = 0
let analyser:AnalyserNode


export const AudioApi = () => {
  const ref = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)


  function createAnalyser(context: AudioContext, dataSource: AudioBufferSourceNode):AnalyserNode {
    console.log("context", context)
    const analyser = context.createAnalyser();
    // The size of the FFT (Fast Fourier Transform) used for frequency-domain analysis.
    analyser.fftSize = 512;
    dataSource.connect(analyser);
    analyser.connect(context.destination);
    return analyser;
  }

  function drawBar() {
    requestAnimationFrame(drawBar);
    analyser.getByteFrequencyData(frequencyData);
    const canvasContext = canvasRef.current!.getContext("2d");
    const canvasWidth = canvasRef.current?.width || 0
    const canvasHeight = canvasRef.current?.height || 0
    canvasContext?.clearRect(0, 0, canvasWidth, canvasHeight);
    let barHeight, barWidth, r, g, b;
    for (let i = 0, x = 0; i < bufferLength; i++) {
      barHeight = frequencyData[i];
      barWidth = canvasWidth / bufferLength * 2;
      r = barHeight + 25 * (i / bufferLength);
      g = 250 * (i / bufferLength);
      b = 50;
      canvasContext!.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      canvasContext?.fillRect(x, canvasHeight - barHeight, barWidth, barHeight);
      x += barWidth + 2;
    }
  }

  useEffect(() => {
    console.log("ref", ref)
    if (ref.current) {
      ref.current.onchange = function (event: Event) {
        // @ts-ignore
        const file = event.target?.files[0];
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = evt => {
          console.log("evt", evt)
          // @ts-ignore
          const encodedBuffer = evt.currentTarget?.result;
          const context = new AudioContext();
          context.decodeAudioData(encodedBuffer, decodedBuffer => {
            const dataSource = context.createBufferSource();  //AudioBufferSourceNode
            dataSource.buffer = decodedBuffer;
            console.log("dataSource", dataSource)
            analyser = createAnalyser(context, dataSource);
            bufferLength = analyser.frequencyBinCount;
            console.log("analyser", analyser)
            frequencyData = new Uint8Array(bufferLength)
            dataSource.start();
            drawBar();
          })
        }
      }
    }
  }, [])



  return <div>
    <input id="audioFile" ref={ref} type="file" accept="audio/*" />
    <canvas ref={canvasRef} width="500" height="300"></canvas>
  </div>
}
