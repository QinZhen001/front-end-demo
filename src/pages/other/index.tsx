import { Route, Routes, Link, Outlet } from "react-router-dom";
import { AsyncAwaitRetry } from "./async-await-retry";
import { PageRoute, routes } from "../../router";

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
