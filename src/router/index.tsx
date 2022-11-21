import {
  VuePage,
  ReactPage,
  DefaultPage,
  WebpackPage,
  ReduxPage,
  NodePage,
  VuexPage,
  VitePage,
  WebRtcPage
} from "../pages";
import { otherRoutes } from "../pages/other";
import { webRtcRoutes } from "../pages/web-rtc";
import { Scheduler } from "../pages/react";
import { HashRouter, Route, Routes } from "react-router-dom";
import {
  PageRoute
} from "../types";


export const routes: PageRoute[] = [
  {
    path: "/vue",
    element: <VuePage></VuePage>,
    title: "vue 相关",
  },
  {
    path: "/vuex",
    element: <VuexPage></VuexPage>,
    title: "vuex 相关",
  },
  {
    path: "/vite",
    element: <VitePage></VitePage>,
    title: "vite 相关",
  },
  {
    path: "/react",
    element: <ReactPage></ReactPage>,
    title: "react 相关",
    children: [
      {
        path: "scheduler",
        element: <Scheduler></Scheduler>,
        title: "react 调度",
      },
    ],
  },
  {
    path: "/redux",
    element: <ReduxPage></ReduxPage>,
    title: "redux 相关",
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
  webRtcRoutes,
  otherRoutes,
  // should be last
  {
    path: "/",
    element: <DefaultPage></DefaultPage>,
    title: "default",
  },
];

export const RouteContainer = () => (
  <HashRouter>
    <Routes>
      {routes.map((item) => (
        <Route key={item.path} path={item.path} element={item.element}>
          {item.children
            ? item.children.map(({ path, element }) => (
              <Route key={path} path={path} element={element}></Route>
            ))
            : null}
        </Route>
      ))}
    </Routes>
  </HashRouter>
);
