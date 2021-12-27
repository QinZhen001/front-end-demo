// https://mp.weixin.qq.com/s/u6MkezGj1o9h5-ACEkFcRQ
// 音视频通信的流程有五步：采集、编码、通信、解码、渲染。

import { useRef } from "react";

type RecordType = "screen" | "camera";

export const WebRtc = () => {
  const playerRef = useRef<HTMLVideoElement>(null);
  const recordPlayerRef = useRef<HTMLVideoElement>(null);
  let mediaRecorder: MediaRecorder = null as unknown as MediaRecorder;
  let blobs: BlobPart[] = [];

  const record = async (type: RecordType) => {
    const getMediaMethod = type === "screen" ? "getDisplayMedia" : "getUserMedia";
    // @ts-ignore
    const stream = await navigator.mediaDevices[getMediaMethod]({
      video: {
        width: 500,
        height: 300,
        frameRate: 20,
      },
    });
    if (playerRef.current) {
      playerRef.current.srcObject = stream;
    }
    mediaRecorder = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });
    mediaRecorder.ondataavailable = (e) => {
      console.log("mediaRecorder ondataavailable ", e);
      blobs.push(e.data);
    };
    mediaRecorder.start(100);
  };

  const startScreen = () => {
    record("screen");
  };

  const startCamera = () => {
    record("camera");
  };

  const stop = () => {
    mediaRecorder.stop();
  };

  const reply = () => {
    const blob = new Blob(blobs, { type: "video/webm" });
    if (recordPlayerRef.current) {
      recordPlayerRef.current.src = window.URL.createObjectURL(blob);
      console.log("replay src ", recordPlayerRef.current.src);
      recordPlayerRef.current.play();
    }
  };

  const download = () => {
    var blob = new Blob(blobs, { type: "video/webm" });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.style.display = "none";
    a.download = "record.webm";
    a.click();
  };

  return (
    <div>
      <div>
        <video autoPlay id="player" ref={playerRef}></video>
        <video id="recordPlayer" ref={recordPlayerRef}></video>
      </div>
      <section>
        <button id="startScreen" onClick={startScreen}>
          开启录屏
        </button>
        <button id="startCamera" onClick={startCamera}>
          开启摄像头
        </button>
        <button id="stop" onClick={stop}>
          结束
        </button>
        <button id="reply" onClick={reply}>
          回放
        </button>
        <button id="download" onClick={download}>
          下载
        </button>
      </section>
    </div>
  );
};
