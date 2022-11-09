import { Link, Outlet } from "react-router-dom";
import { routes } from "../../router";
import "./index.css";

export { AsyncAwaitRetry } from "./async-await-retry";
export { WebRtc } from "./webrtc-simple";
export { RxJS } from "./rx-js";
export { WebsocketChat } from "./WebsocketChat";
export { WebRtcDataChannel } from "./webrtc-datachannel";
export { CodeMirror } from "./codemirror"


export const OtherPageComponent = () => {
  const curCoutes = routes.find((item) => item.path == "/other")?.children || [];

  return (
    <div className="page">
      <section className="left">
        <ul>
          {curCoutes.map(({ title, path, element }) => (
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
