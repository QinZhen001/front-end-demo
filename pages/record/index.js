// https://mp.weixin.qq.com/s/r1yX1-iNZi5JT_wTeRDxdA
// https://www.zoo.team/article/webrtc-screen

const tracks = []; // 媒体数据
const options = {
  mimeType: "video/webm; codecs = vp8", // 媒体格式
};
let mediaRecorder;
// 初始化请求用户授权监控
navigator.mediaDevices.getDisplayMedia().then((stream) => {
  debugger;
  // 对音视流进行操作
  start(stream);
});
// 开始录制方法
function start(stream) {
  // 创建 MediaRecorder 的实例对象，对指定的媒体流进行录制
  mediaRecorder = new MediaRecorder(stream, options);
  // 当生成媒体流数据时触发该事件，回调传参 event 指本次生成处理的媒体数据
  mediaRecorder.ondataavailable = (event) => {
    if (event?.data?.size > 0) {
      tracks.push(event.data); // 存储媒体数据
    }
  };
  mediaRecorder.start();
  console.log("************开始录制************");
}


// 结束录制方法
function stop() {
  mediaRecorder.stop();
  console.log("************录制结束************");
}
// 定义constraints数据类型
// interface constraints {
//   audio: boolean | MediaTrackConstraints; // 指定是否请求音轨或者约束轨道属性值的对象
//   video: boolean | MediaTrackConstraints; // 指定是否请求视频轨道或者约束轨道属性值的对象
// }
