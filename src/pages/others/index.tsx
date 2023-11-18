import { lazy } from "react"
import { CommonPageRouter } from "../main"

const AsyncAwaitRetry = lazy(() => import('./async-await-retry'));
const RxJS = lazy(() => import('./rx-js'));
const WebsocketChat = lazy(() => import('./WebsocketChat'));
const CodeMirror = lazy(() => import('./codemirror'));
const SandBox = lazy(() => import('./sandbox'));
const AbortController = lazy(() => import('./abort-controller'));
const JSBridgeComponent = lazy(() => import('./js-bridge'));
const ShareWorker = lazy(() => import('./share-worker'));
const LongTask = lazy(() => import("./long-task"))
const InfinityDebugger = lazy(() => import("./infinity-debugger"))

export const children = [
  {
    path: "retry",
    element: <AsyncAwaitRetry></AsyncAwaitRetry>,
    title: "多次重试promise",
  },
  {
    path: "rxjs",
    element: <RxJS></RxJS>,
    title: "实现简易 RxJS",
  },
  {
    path: "websocket-chat",
    element: <WebsocketChat></WebsocketChat>,
    title: "Websocket 聊天",
  },
  {
    path: "codemirror",
    element: <CodeMirror></CodeMirror>,
    title: "代码高亮 CodeMirror",
  },
  {
    path: "sandbox",
    element: <SandBox></SandBox>,
    title: "SandBox 沙箱",
  },
  {
    path: "abort-controller",
    element: <AbortController></AbortController>,
    title: "AbortController 中断请求",
  },
  {
    path: "js-bridge",
    element: <JSBridgeComponent></JSBridgeComponent>,
    title: "JSBridge",
  },
  {
    path: "share-worker",
    element: <ShareWorker></ShareWorker>,
    title: "ShareWorker",
  }, {
    path: "long-task",
    element: <LongTask></LongTask>,
    title: "LongTask 监控长任务",
  },
  {
    path: "infinity-debugger",
    element: <InfinityDebugger></InfinityDebugger>,
    title: "无限Debugger（禁止别人调试自己网页）"
  },
]

export const OtherPage = () => {
  return <CommonPageRouter routes={children}></CommonPageRouter>
};

export default OtherPage
