"use client"

import { useMemo, useState } from "react"
import AgoraRTC, {
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
  IRemoteAudioTrack,
  UID,
} from "agora-rtc-sdk-ng"
import { Button } from "@/components/ui/button"
import PlanAudioWorkletNode from "./components/planAudioWorkletNode"
import PlanInsertableStream from "./components/planInsertableStream"

const AudioPcm = () => {
  const [audioTrack, setAudioTrack] = useState<IMicrophoneAudioTrack>()
  const [playing, setPlaying] = useState(false)
  const [plan, setPlan] = useState(1)

  const createAudioTrack = async () => {
    const track = await AgoraRTC.createMicrophoneAudioTrack()
    setAudioTrack(track)
  }

  const changeScheme = () => {
    setPlan((plan) => (plan === 1 ? 2 : 1))
  }

  const schemeText = useMemo(() => {
    return plan === 1 ? "InsertableStream" : "AudioWorkletNode"
  }, [plan])

  const toggleAudioPlay = () => {
    if (playing) {
      audioTrack?.stop()
    } else {
      audioTrack?.play()
    }
    setPlaying(!playing)
  }

  return (
    <div>
      <section className="p-2 space-x-2">
        <Button onClick={createAudioTrack}>createAudioTrack</Button>
        <Button onClick={toggleAudioPlay}>{!playing ? "audioPlay" : "audioStop"}</Button>
      </section>
      <section className="p-2 divide-solid">
        <div className="text-md mb-2">提取 mic track 中 pcm裸数据</div>
        <Button onClick={changeScheme}>scheme: {schemeText}</Button>
      </section>
      <section className="p-2">
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
