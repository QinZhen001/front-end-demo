// 最好把这几个children直接写进这里 （不要import）（import会导致加载对应的index.js 懒加载失效）
import { children as vueChildren } from "../pages/vue"
import { children as otherChildren } from "../pages/others"
import { children as RtcChildren } from "../pages/web-media"
import { children as ReactChildren } from "../pages/react"
import { children as AnimateChildren } from "../pages/animation"
import { children as CanvasChildren } from "../../../src/app/canvas/canvas"
import { children as WebpackChildren } from "../pages/webpack"
import { children as NodeChildren } from "../pages/node"
import { Suspense, lazy } from "react"
import { HashRouter, Route, Routes } from "react-router-dom"
import { PageRoute } from "../types"

const ReactPage = lazy(() => import("../pages/react"))
const VuePage = lazy(() => import("../pages/vue"))
const WebpackPage = lazy(() => import("../pages/webpack"))
const NodePage = lazy(() => import("../pages/node"))
const VitePage = lazy(() => import("../pages/vite"))
const MainPage = lazy(() => import("../pages/main"))
const WebMediaPage = lazy(() => import("../pages/web-media"))
const OtherPage = lazy(() => import("../pages/others"))
const AnimationPage = lazy(() => import("../pages/animation"))
const CanvasPage = lazy(() => import("../../../src/app/canvas/canvas"))

export const routes: PageRoute[] = [
  {
    path: "/",
    element: <MainPage></MainPage>,
    title: "default",
  },
  {
    path: "/vue",
    element: <VuePage></VuePage>,
    title: "vue 相关",
    children: vueChildren,
  },
  {
    path: "/react",
    element: <ReactPage></ReactPage>,
    title: "react 相关",
    children: ReactChildren,
  },
  {
    path: "/vite",
    element: <VitePage></VitePage>,
    title: "vite 相关",
  },
  {
    path: "/webpack",
    element: <WebpackPage></WebpackPage>,
    title: "webpack 相关",
    children: WebpackChildren,
  },
  {
    path: "/node",
    element: <NodePage></NodePage>,
    title: "node 相关",
    children: NodeChildren,
  },
  {
    path: "/web-media",
    element: <WebMediaPage></WebMediaPage>,
    title: "web音视频相关",
    children: RtcChildren,
  },
  {
    path: "/animation",
    element: <AnimationPage></AnimationPage>,
    title: "动画 相关",
    children: AnimateChildren,
  },
  {
    path: "/canvas",
    element: <CanvasPage></CanvasPage>,
    title: "canvas 相关",
    children: CanvasChildren,
  },
  // other should be the last one
  {
    path: "/others",
    element: <OtherPage></OtherPage>,
    title: "others 相关",
    children: otherChildren,
  },
]

export const RouteContainer = () => {
  const genRoutes = (routes: PageRoute[]) => {
    const finalRoutes = routes.map((item) => {
      const { path, element, children, index } = item
      return !index ? (
        <Route
          key={path}
          path={path}
          element={<Suspense fallback={<div> Loading...</div>}>{element}</Suspense>}
        >
          {children && children.length ? genRoutes(children) : null}
        </Route>
      ) : (
        <Route key="index" index element={element} />
      )
    })

    return finalRoutes
  }

  return (
    <HashRouter>
      <Routes>{genRoutes(routes)}</Routes>
    </HashRouter>
  )
}
