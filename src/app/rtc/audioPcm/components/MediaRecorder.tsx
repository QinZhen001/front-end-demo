import { Button } from "@/components/ui/button"
import { IMicrophoneAudioTrack } from "agora-rtc-sdk-ng"

let audioChunks: BlobPart[] = []

interface MediaRecorderProps {
  audioTrack?: IMicrophoneAudioTrack
}

const MediaRecorderCom = (props: MediaRecorderProps) => {
  const { audioTrack } = props

  const dealAudioPcmData = () => {
    if (!audioTrack) {
      throw new Error("audioTrack is null")
    }

    const audioMediaStreamTrack = audioTrack.getMediaStreamTrack()
    const stream = new MediaStream([audioMediaStreamTrack])
    const mediaRecorder = new MediaRecorder(stream)

    mediaRecorder.ondataavailable = ondataavailable
    mediaRecorder.onstop = onstop

    mediaRecorder.start()

    setTimeout(() => {
      mediaRecorder.stop()
    }, 5000)
  }

  const ondataavailable = (event: BlobEvent) => {
    audioChunks.push(event.data)
  }

  const onstop = async () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/wav" })
    // 可以使用音频 Blob 进行进一步处理
    const audioUrl = URL.createObjectURL(audioBlob)
    const audioContext = new AudioContext()
    const res = await fetch(audioUrl)
    const arrayBuffer = await res.arrayBuffer()
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
    const pcmData1 = audioBuffer.getChannelData(0)

    console.log("pcmData1", pcmData1)
  }

  return (
    <div>
      <Button onClick={dealAudioPcmData}>Deal</Button>
    </div>
  )
}

export default MediaRecorderCom
