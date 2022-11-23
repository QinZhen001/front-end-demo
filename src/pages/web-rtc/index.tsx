import { Link, Outlet } from "react-router-dom";
import { WebRtcSimple } from "./simple"
import { WebRtcDataChannel } from "./data-channel"
import {AudioApi} from "./audio-api"
import { PageRoute } from "../../types"
import "../../styles/index.css"

const path = '/web-rtc'
const children = [
  {
    path: "webrtc-simple",
    element: <WebRtcSimple></WebRtcSimple>,
    title: "快速入门 WebRTC",
  },
  {
    path: "webrtc-data-channel",
    element: <WebRtcDataChannel></WebRtcDataChannel>,
    title: "WebRTC DataChannel",
  },
  {
    path: "audio-api",
    element: <AudioApi></AudioApi>,
    title: "audio api相关",
  },
]


export const WebRtcPage = () => {
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



export const webRtcRoutes: PageRoute = {
  path,
  element: <WebRtcPage></WebRtcPage>,
  title: "web-rtc 相关",
  children
}
