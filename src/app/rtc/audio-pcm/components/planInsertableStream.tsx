import { IMicrophoneAudioTrack } from "agora-rtc-sdk-ng"

interface PlanInsertableStreamProps {
  audioTrack?: IMicrophoneAudioTrack
}

const isSupportInsertableStream = () => {
  // @ts-ignore
  return !!window.MediaStreamTrackProcessor && !!window.MediaStreamTrackGenerator
}

const PlanInsertableStream = (props: PlanInsertableStreamProps) => {
  const { audioTrack } = props

  const checkSupportInsertableStream = () => {
    console.log(isSupportInsertableStream())
  }

  const dealAudioPcmData = () => {
    if (audioTrack) {
      const audioMediaStreamTrack = audioTrack.getMediaStreamTrack()
      console.log("audioMediaStreamTrack", audioMediaStreamTrack)

      if (!isSupportInsertableStream()) {
        throw new Error("not support insertable stream")
      }

      // @ts-ignore
      const processor = new MediaStreamTrackProcessor(audioMediaStreamTrack)
      // @ts-ignore
      const generator = new MediaStreamTrackGenerator("audio")

      const transformer = new TransformStream({
        async transform(audioFrame, controller) {
          console.log("audioFrame", audioFrame)
          console.log("controller", controller)
        },
      })

      processor.readable.pipeThrough(transformer)
      processor.readable.pipeThrough(transformer).pipeTo(generator.writable)
    }
  }

  return (
    <div>
      <button onClick={checkSupportInsertableStream}>checkSupportInsertableStream</button>
      <button onClick={dealAudioPcmData}>dealAudioPcmData</button>
    </div>
  )
}

export default PlanInsertableStream
