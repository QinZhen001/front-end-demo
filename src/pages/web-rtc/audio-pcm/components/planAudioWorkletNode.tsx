// import processorURL from "../lib/pcm-processor.js?url"
import { IMicrophoneAudioTrack } from "agora-rtc-sdk-ng"

// console.log("processorURL", processorURL)

interface PlanAudioWorkletNodeProps {
  audioTrack?: IMicrophoneAudioTrack
}

const PlanAudioWorkletNode = (props: PlanAudioWorkletNodeProps) => {
  const { audioTrack } = props

  const dealAudioPcmData = async () => {
    if (!audioTrack) {
      throw new Error("audioTrack is null")
    }
    const audioContext = new AudioContext()

    await audioContext.audioWorklet.addModule("pcm-processor.js")
    const audioMediaStreamTrack = audioTrack.getMediaStreamTrack()
    // 创建MediaStreamDestination节点
    const audioDestination = audioContext.createMediaStreamDestination()
    // 创建AudioWorkletNode节点
    const audioWorkletNode = new AudioWorkletNode(audioContext, "pcm-processor")
    // 连接AudioWorkletNode到MediaStreamDestination
    // audioWorkletNode.connect(audioDestination)
    // 将MediaStreamTrack加入MediaStreamDestination的输出轨道
    // audioDestination.stream.addTrack(audioMediaStreamTrack)
    // 将MediaStreamDestination作为媒体输入
    // const mediaStream = audioDestination.stream

    audioWorkletNode.port.onmessage = (event) => {
      // 获取 PCM 数据
      const pcmData = event.data
      // 处理 PCM 数据
      // ...你的代码...

      console.log("pcmData", pcmData)
    }

    // const options = {}
    // const source = new MediaElementAudioSourceNode(audioContext, options)

    // const source = audioContext.createMediaStreamSource(audioTrack)
    // const processor = audioContext.createScriptProcessor(1024, 1, 1)

    // processor.onaudioprocess = (event) => {
    //   const inputBuffer = event.inputBuffer.getChannelData(0)
    //   // 示例：将PCM数据转换成Float32Array
    //   const pcmArray = new Float32Array(inputData.length)
    // }

    // const audioSourceNode = audioContext.create(audioTrack)
  }

  // const dealAudioPcmData = () => {
  //   if (!audioTrack) {
  //     throw new Error("audioTrack is null")
  //   }
  //   const audioMediaStreamTrack = audioTrack.getMediaStreamTrack()
  //   // 创建一个AudioContext对象
  //   const audioContext = new AudioContext()
  //   const mediaStream = new MediaStream([audioMediaStreamTrack])
  //   // 使用createMediaStreamSource将MediaStream转换为AudioNode
  //   const sourceNode = audioContext.createMediaStreamSource(mediaStream)
  //   // 使用createScriptProcessor创建一个脚本处理器
  //   // The ScriptProcessorNode is deprecated
  //   const scriptProcessorNode = audioContext.createScriptProcessor(1024, 1, 1)
  //   // 将脚本处理器添加到AudioNode的处理链中
  //   sourceNode.connect(scriptProcessorNode)
  //   scriptProcessorNode.connect(audioContext.destination)

  //   // 当脚本处理器执行时，将执行这个回调函数
  //   scriptProcessorNode.onaudioprocess = function (event) {
  //     const inputBuffer = event.inputBuffer
  //     const outputBuffer = event.outputBuffer

  //     console.log("inputBuffer", inputBuffer)
  //     console.log("outputBuffer", outputBuffer)

  //     for (let channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
  //       const inputData = inputBuffer.getChannelData(channel)
  //       const outputData = outputBuffer.getChannelData(channel)

  //       console.log("inputData", inputData)
  //       console.log("outputData", outputData)

  //       // 处理PCM格式的音频数据，例如将其编码为MP3格式
  //       // ...

  //       // 将处理后的音频数据存储
  //       // ...
  //     }
  //   }
  // }

  return (
    <div>
      <button onClick={dealAudioPcmData}>dealAudioPcmData</button>
    </div>
  )
}

export default PlanAudioWorkletNode
