import { Link, Outlet } from "react-router-dom";
import { routes } from "../../router";

export { AsyncAwaitRetry } from "./async-await-retry";
export { WebRtc } from "./web-rtc";
export { RxJS } from "./rx-js";

export const OtherPageComponent = () => {
  const curCoutes = routes.find((item) => item.path == "/other")?.children || [];

  return (
    <div>
      <ul>
        {curCoutes.map(({ title, path, element }) => (
          <li key={path}>
            <Link to={path}>{title}</Link>
          </li>
        ))}
      </ul>

      <Outlet />
    </div>
  );
};