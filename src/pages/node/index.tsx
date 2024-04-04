import { CommonPageRouter } from "../main"
import { lazy } from "react"

const Eventloop = lazy(() => import("./event-loop"))

export const children = [
  {
    path: "eventloop",
    element: <Eventloop></Eventloop>,
    title: "简单版Eventloop",
  },
]

const NodePage = () => {
  return <CommonPageRouter routes={children}></CommonPageRouter>
}

export default NodePage
