import { lazy } from "react"
import { CommonPageRouter } from "../default"

const Progress = lazy(() => import('./progress'));
const Lyric = lazy(() => import('./lyric'));
const AtEditor = lazy(() => import('./at-editor'));
const ChineseInput = lazy(() => import('./chinese-input'));
const Notification = lazy(() => import('./notification'));

export const children = [
  {
    path: "progress",
    element: <Progress></Progress>,
    title: "带文字过渡效果的进度条",
  },
  {
    path: "lyric",
    element: <Lyric></Lyric>,
    title: "歌词渐变过渡效果",
  },
  {
    path: "at-editor",
    element: <AtEditor></AtEditor>,
    title: "editor @人功能",
  },
  {
    path: "chinese-input",
    element: <ChineseInput></ChineseInput>,
    title: "监听中文输入法事件",
  },
  {
    path: "notification",
    element: <Notification></Notification>,
    title: "notification 系统通知",
  }
]

export const CssPage = () => {
  return <CommonPageRouter routes={children}></CommonPageRouter>
};

export default CssPage
