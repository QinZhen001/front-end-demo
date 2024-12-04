import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { IMicrophoneAudioTrack } from "agora-rtc-sdk-ng"

// cessorNode
// https://developer.mozilla.org/zh-CN/docs/Web/API/BaseAudioContext/createScriptProcessor
// Deprecated. Not for use in new websites

interface PlanInsertableStreamProps {
  audioTrack?: IMicrophoneAudioTrack
}

const PlanInsertableStream = (props: PlanInsertableStreamProps) => {
  const { audioTrack } = props
  const { toast } = useToast()

  const dealAudioPcmData = async () => {
    if (!audioTrack) {
      throw new Error("audioTrack is null")
    }
    const audioContext = new AudioContext()
    const audioMediaStreamTrack = audioTrack.getMediaStreamTrack()
    const mNode = audioContext.createMediaStreamSource(new MediaStream([audioMediaStreamTrack]))
    const audioWorkletNode = audioContext.createScriptProcessor(4096, 1, 1)
    mNode.connect(audioWorkletNode)
    audioWorkletNode.onaudioprocess = (event) => {
      const inputBuffer = event.inputBuffer
      const outputBuffer = event.outputBuffer
      const inputData = inputBuffer.getChannelData(0)

      const outputData = outputBuffer.getChannelData(0)
      for (let i = 0; i < inputBuffer.length; i++) {
        outputData[i] = inputData[i]
      }
    }
    audioWorkletNode.connect(audioContext.destination)
  }

  return (
    <div className="space-x-2">
      <Button onClick={dealAudioPcmData}>dealAudioPcmData</Button>
    </div>
  )
}

export default PlanInsertableStream
