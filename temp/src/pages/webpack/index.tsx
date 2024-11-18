import { CommonPageRouter } from "../main"
import { lazy } from "react"

const MiniWebpack = lazy(() => import("./mini-webpack"))

export const children = [
  {
    path: "mini-webpack",
    element: <MiniWebpack></MiniWebpack>,
    title: "MiniWebpack",
  },
]

export const WebpackPage = () => {
  return <CommonPageRouter routes={children}></CommonPageRouter>
}

export default WebpackPage
