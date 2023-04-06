import { lazy } from "react"
import { CommonPageRouter } from "../default"

const Progress = lazy(() => import('./progress'));
const Lyric = lazy(() => import('./lyric'));
const AtEditor = lazy(() => import('./at-editor'));

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
]

export const CssPage = () => {
  return <CommonPageRouter routes={children}></CommonPageRouter>
};

export default CssPage
