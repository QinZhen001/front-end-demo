import { CommonPageRouter } from "../main"
import { lazy } from "react"

const Vue2Realize = lazy(() => import("./vue2"))
const Vue3Realize = lazy(() => import("./vue3"))
const SimpleVueRouter = lazy(() => import("./simple-vue-router"))
const SimpleVuex = lazy(() => import("./vuex"))

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
  {
    path: "vue3",
    element: <Vue3Realize></Vue3Realize>,
    title: "vue3 简单实现",
  },
  {
    path: "vuex",
    element: <SimpleVuex></SimpleVuex>,
    title: "vuex 简单实现",
  },
  // just for simple vue router test
  {
    path: "simple-vue-router/foo",
    element: <SimpleVueRouter></SimpleVueRouter>,
    title: "vue router 简单实现",
    hidden: true,
  },
  {
    path: "simple-vue-router/bar",
    element: <SimpleVueRouter></SimpleVueRouter>,
    title: "vue router 简单实现",
    hidden: true,
  },
  // just for simple vue router test
]

const VuePage = () => {
  return <CommonPageRouter routes={children}></CommonPageRouter>
}

export default VuePage
