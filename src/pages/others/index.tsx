import { lazy } from "react"
import { CommonPageRouter } from "../default"

const AsyncAwaitRetry = lazy(() => import('./async-await-retry'));
const RxJS = lazy(() => import('./rx-js'));
const WebsocketChat = lazy(() => import('./WebsocketChat'));
const CodeMirror = lazy(() => import('./codemirror'));

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
]

export const OtherPage = () => {
  return <CommonPageRouter routes={children}></CommonPageRouter>
};

export default OtherPage
