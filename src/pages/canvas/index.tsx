import { lazy } from "react"
import { CommonPageRouter } from "../main"

const Pencil = lazy(() => import("./pencil"))
const Highlight = lazy(() => import("./highlight"))
const Expand = lazy(() => import("./expand"))

export const children = [
  {
    path: "pencil",
    element: <Pencil></Pencil>,
    title: "绘制鼠标轨迹",
  },
  {
    path: "highlight",
    element: <Highlight></Highlight>,
    title: "高亮区块",
  },
  {
    path: "expand",
    element: <Expand></Expand>,
    title: "扩张效果(模拟贝塞尔曲线)",
  },
]

export const CanvasPage = () => {
  return <CommonPageRouter routes={children}></CommonPageRouter>
}

export default CanvasPage
