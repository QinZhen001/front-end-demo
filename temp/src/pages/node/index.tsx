import { CommonPageRouter } from "../main"
import { lazy } from "react"

const Eventloop = lazy(() => import("./event-loop"))
const JSLibuv = lazy(() => import("./js-libuv"))

export const children = [
  {
    path: "eventloop",
    element: <Eventloop></Eventloop>,
    title: "简单版Eventloop",
  },
  {
    path: "js-libuv",
    element: <JSLibuv></JSLibuv>,
    title: "js和libuv通信",
  },
]

const NodePage = () => {
  return <CommonPageRouter routes={children}></CommonPageRouter>
}

export default NodePage
