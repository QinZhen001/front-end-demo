import { useMemo, useState } from "react"
import AgoraRTC, {
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
  IRemoteAudioTrack,
  UID,
} from "agora-rtc-sdk-ng"
import PlanAudioWorkletNode from "./components/planAudioWorkletNode"
import PlanInsertableStream from "./components/planInsertableStream"

import "./index.css"

const AudioPcm = () => {
  const [audioTrack, setAudioTrack] = useState<IMicrophoneAudioTrack>()
  const [plan, setPlan] = useState(1)

  const createAudioTrack = async () => {
    const track = await AgoraRTC.createMicrophoneAudioTrack()
    setAudioTrack(track)
  }

  const audioPlay = () => {
    audioTrack?.play()
  }

  const audioStop = () => {
    audioTrack?.stop()
  }

  const changeScheme = () => {
    setPlan((plan) => (plan === 1 ? 2 : 1))
  }

  const schemeText = useMemo(() => {
    return plan === 1 ? "InsertableStream" : "AudioWorkletNode"
  }, [plan])

  return (
    <div>
      <section className="section">
        <button onClick={createAudioTrack}>createAudioTrack</button>
        <button onClick={audioPlay}>audioPlay</button>
        <button onClick={audioStop}>audioStop</button>
      </section>
      <section className="section">
        <button onClick={changeScheme}>scheme: {schemeText}</button>
      </section>
      <section className="section">
        {plan == 1 ? (
          <PlanInsertableStream audioTrack={audioTrack}></PlanInsertableStream>
        ) : (
          <PlanAudioWorkletNode audioTrack={audioTrack}></PlanAudioWorkletNode>
        )}
      </section>
    </div>
  )
}

export default AudioPcm
