// 最好把这几个children直接写进这里 （不要import）（import会导致加载对应的index.js 懒加载失效）
import { children as vueChildren } from "../pages/vue";
import { children as otherChildren } from "../pages/others";
import { children as RtcChildren } from "../pages/web-rtc";
import { children as ReactChildren } from "../pages/react"
import { children as AnimateChildren } from "../pages/animation"
import { children as CanvasChildren } from "../pages/canvas"
import { Suspense, lazy } from "react"
import { HashRouter, Route, Routes } from "react-router-dom";

export type PageRoute = {
  path: string;
  element: React.ReactNode;
  title: string;
  hidden?: boolean;
  children?: PageRoute[];
};

const ReactPage = lazy(() => import('../pages/react'));
const VuePage = lazy(() => import('../pages/vue'));
const WebpackPage = lazy(() => import('../pages/webpack'));
const ReduxPage = lazy(() => import('../pages/redux'));
const NodePage = lazy(() => import('../pages/node'));
const VuexPage = lazy(() => import('../pages/vuex'));
const VitePage = lazy(() => import('../pages/vite'));
const MainPage = lazy(() => import('../pages/main'));
const WebRtcPage = lazy(() => import('../pages/web-rtc'));
const OtherPage = lazy(() => import('../pages/others'));
const AnimationPage = lazy(() => import('../pages/animation'));
const CanvasPage = lazy(() => import('../pages/canvas'));

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
    children: vueChildren
  },
  {
    path: "/vuex",
    element: <VuexPage></VuexPage>,
    title: "vuex 相关",
  },
  {
    path: "/react",
    element: <ReactPage></ReactPage>,
    title: "react 相关",
    children: ReactChildren
  },
  {
    path: "/redux",
    element: <ReduxPage></ReduxPage>,
    title: "redux 相关",
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
  },
  {
    path: "/node",
    element: <NodePage></NodePage>,
    title: "node 相关",
  },
  {
    path: '/web-rtc',
    element: <WebRtcPage></WebRtcPage>,
    title: "web-rtc 相关",
    children: RtcChildren
  },
  {
    path: '/animation',
    element: <AnimationPage></AnimationPage>,
    title: "动画 相关",
    children: AnimateChildren
  },
  {
    path: '/canvas',
    element: <CanvasPage></CanvasPage>,
    title: "canvas 相关",
    children: CanvasChildren
  },
  // other should be the last one
  {
    path: '/others',
    element: <OtherPage></OtherPage>,
    title: "others 相关",
    children: otherChildren
  },
]

export const RouteContainer = () => (
  <HashRouter>
    <Routes>
      {routes
        .map((item) => (
          <Route key={item.path} path={item.path} element={
            <Suspense fallback={<div>Loading...</div>}>{item.element}</Suspense>
          }
          >
            {item.children
              ? item.children
                .map(({ path, element }) => (
                  <Route key={path} path={path} element={
                    <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
                  }></Route>
                ))
              : null}
          </Route>
        ))}
    </Routes>
  </HashRouter>
);
