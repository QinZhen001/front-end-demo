import { Link, Outlet } from "react-router-dom";
import { AsyncAwaitRetry } from "./async-await-retry";
import { RxJS } from "./rx-js";
import { WebsocketChat } from "./WebsocketChat";
import { CodeMirror } from "./codemirror"
import { PageRoute } from "../../types";
import "../../styles/index.css"

const path = '/other'
const children = [
  {
    path: "retry",
    element: <AsyncAwaitRetry></AsyncAwaitRetry>,
    title: "多次重试promise",
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
  {
    path: "codemirror",
    element: <CodeMirror></CodeMirror>,
    title: "代码高亮 CodeMirror",
  },
]

export const OtherPage = () => {
  return (
    <div className="page">
      <section className="left">
        <ul>
          {children.map(({ title, path, element }) => (
            <li key={path}>
              <Link to={path}>{title}</Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="right">
        <Outlet />
      </section>
    </div>
  );
};

export const otherRoutes: PageRoute = {
  path,
  element: <OtherPage></OtherPage>,
  title: "other 相关",
  children: children
};

