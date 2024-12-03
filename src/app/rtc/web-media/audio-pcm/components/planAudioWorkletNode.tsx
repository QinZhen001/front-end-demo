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
    const audioWorkletNode = new AudioWorkletNode(audioContext, "pcm-processor")

    const audioMediaStreamTrack = audioTrack.getMediaStreamTrack()
    const mNode = audioContext.createMediaStreamSource(new MediaStream([audioMediaStreamTrack]))
    mNode.connect(audioWorkletNode)

    audioWorkletNode.port.onmessage = (event) => {
      console.log("event onmessage", event.data)
    }
  }

  return (
    <div>
      <button onClick={dealAudioPcmData}>dealAudioPcmData</button>
    </div>
  )
}

export default PlanAudioWorkletNode
