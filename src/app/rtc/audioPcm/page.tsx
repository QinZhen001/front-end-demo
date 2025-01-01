"use client"

import { useEffect, useMemo, useState } from "react"
import type { IMicrophoneAudioTrack, IAgoraRTC } from "agora-rtc-sdk-ng"
import { Button } from "@/components/ui/button"
import AudioWorkletNode from "./components/AudioWorkletNode"
import MediaRecorder from "./components/MediaRecorder"
import PcmSelect, { PcmSelectValue } from "./components/PcmSelect"

let AgoraRTC: IAgoraRTC

const AudioPcm = () => {
  const [audioTrack, setAudioTrack] = useState<IMicrophoneAudioTrack>()
  const [playing, setPlaying] = useState(false)
  const [plan, setPlan] = useState<PcmSelectValue>(PcmSelectValue.AudioWorkletNode)

  useEffect(() => {
    return () => {
      audioTrack?.stop()
      audioTrack?.close()
    }
  }, [audioTrack])

  const createAudioTrack = async () => {
    await initSdk()
    // 可以不通过 agora sdk 直接通过 navigator.mediaDevices.getUserMedia
    const track = await AgoraRTC.createMicrophoneAudioTrack()
    setAudioTrack(track)
  }

  const initSdk = async () => {
    AgoraRTC = (await import("agora-rtc-sdk-ng")).default
  }

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
      <section className="mb-2 space-x-2">
        <Button onClick={createAudioTrack}>createAudioTrack</Button>
        <Button onClick={toggleAudioPlay}>{!playing ? "audioPlay" : "audioStop"}</Button>
      </section>
      <section className="mb-2 mt-2">
        <div className="text-md mb-2">提取 mic track 中 pcm裸数据</div>
        <PcmSelect value={plan} onChange={(v) => setPlan(v)}></PcmSelect>
      </section>
      <section className="mt-2">
        {plan == PcmSelectValue.AudioWorkletNode && (
          <AudioWorkletNode audioTrack={audioTrack}></AudioWorkletNode>
        )}
        {plan == PcmSelectValue.MediaRecorder && (
          <MediaRecorder audioTrack={audioTrack}></MediaRecorder>
        )}
      </section>
    </div>
  )
}

export default AudioPcm
