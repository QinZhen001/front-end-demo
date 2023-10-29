import { lazy } from "react"
import { CommonPageRouter } from "../default"

const CanvasPencil = lazy(() => import("./canvas-pencil"))
const CanvasHighlight = lazy(() => import("./canvas-highlight"))


export const children = [
  {
    path: "pencil",
    element: <CanvasPencil></CanvasPencil>,
    title: "绘制鼠标轨迹"
  },
  {
    path: "highlight",
    element: <CanvasHighlight></CanvasHighlight>,
    title: "高亮区块"
  }
]

export const CanvasPage = () => {
  return <CommonPageRouter routes={children}></CommonPageRouter>
};

export default CanvasPage
