import { CommonPageRouter } from "../main"
import { lazy } from "react"

const Vue2Realize = lazy(() => import('./vue2'));



export const children = [
  {
    path: "vue2",
    element: <Vue2Realize></Vue2Realize>,
    title: "vue2 简单实现",
  },

]

const VuePage = () => {
  return <CommonPageRouter routes={children}></CommonPageRouter>
};


export default VuePage
