import {
  VuePageComponent,
  ReactPageComponent,
  DefaultPageComponent,
  WebpackPageComponent,
  ReduxPageComponent,
  NodePageComponent,
  OtherPageComponent,
  VuexPageComponent,
} from "../pages";
import { WebRtc, AsyncAwaitRetry, RxJS, WebsocketChat,WebRtcDataChannel } from "../pages/other";
import { Scheduler } from "../pages/react";
import { HashRouter, Route, Routes } from "react-router-dom";

export type PageRoute = {
  path: string;
  element: React.ReactNode;
  title: string;
  children?: PageRoute[];
};

const otherRoutes: PageRoute = {
  path: "/other",
  element: <OtherPageComponent></OtherPageComponent>,
  title: "other 相关",
  children: [
    {
      path: "retry",
      element: <AsyncAwaitRetry></AsyncAwaitRetry>,
      title: "多次重试promise",
    },
    {
      path: "webrtc-simple",
      element: <WebRtc></WebRtc>,
      title: "快速入门 WebRTC",
    },
    {
      path: "webrtc-data-channel",
      element: <WebRtcDataChannel></WebRtcDataChannel>,
      title: "WebRTC DataChannel",
    },
    {
      path: "rxjs",
      element: <RxJS></RxJS>,
      title: "实现简易 RxJS",
    },
    {
      path: "websocket-chat",
      element: <WebsocketChat></WebsocketChat>,
      title: "Websocket 聊天",
    },
  ],
};

export const routes: PageRoute[] = [
  {
    path: "/vue",
    element: <VuePageComponent></VuePageComponent>,
    title: "vue 相关",
  },
  {
    path: "/vuex",
    element: <VuexPageComponent></VuexPageComponent>,
    title: "vuex 相关",
  },
  {
    path: "/react",
    element: <ReactPageComponent></ReactPageComponent>,
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
    element: <ReduxPageComponent></ReduxPageComponent>,
    title: "redux 相关",
  },
  {
    path: "/webpack",
    element: <WebpackPageComponent></WebpackPageComponent>,
    title: "webpack 相关",
  },
  {
    path: "/node",
    element: <NodePageComponent></NodePageComponent>,
    title: "node 相关",
  },
  otherRoutes,
  // should be last
  {
    path: "/",
    element: <DefaultPageComponent></DefaultPageComponent>,
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
