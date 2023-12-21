import { CommonPageRouter } from "../main"
import { lazy } from "react"

const Vue2Realize = lazy(() => import('./vue2'));
const SimpleVueRouter = lazy(() => import('./simple-vue-router'));


export const children = [
  {
    path: "vue2",
    element: <Vue2Realize></Vue2Realize>,
    title: "vue2 简单实现",
  },
  {
    path: "simple-vue-router",
    element: <SimpleVueRouter></SimpleVueRouter>,
    title: "vue router 简单实现",
  },

]

const VuePage = () => {
  return <CommonPageRouter routes={children}></CommonPageRouter>
};


export default VuePage
