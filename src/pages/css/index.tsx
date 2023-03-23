import { lazy } from "react"
import { CommonPageRouter } from "../default"

const Progress = lazy(() => import('./progress'));

export const children = [
  {
    path: "progress",
    element: <Progress></Progress>,
    title: "带文字过渡效果的进度条",
  },
]

export const CssPage = () => {
  return <CommonPageRouter routes={children}></CommonPageRouter>
};

export default CssPage
