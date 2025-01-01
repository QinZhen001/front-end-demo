# 提取 mic track 中 pcm裸数据

## Insertable streams

[MediaStreamTrack的Insertable streams](https://www.rtcdeveloper.cn/cn/community/blog/21801)

[Insertable Streams for MediaStreamTrack API](https://developer.mozilla.org/en-US/docs/Web/API/Insertable_Streams_for_MediaStreamTrack_API)

MediaStreamTrack 的insertable stream背后的核心思想是将MediaStreamTrack的内容作为流集合公开。

这些流经操作可以用于引入新的组件。 (MediaStreamTrackProcessor/MediaStreamTrackGenerator)

### 问题

MediaStreamTrackProcessor/MediaStreamTrackGenerator 仅支持 chrome 92+，且不支持Safari，兼容性存在问题

## AudioWorkletNode

> 兼容性好

[AudioWorkletNode](https://developer.mozilla.org/zh-CN/docs/Web/API/AudioWorkletNode)
