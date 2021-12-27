import { Link, Outlet } from "react-router-dom";
import { routes } from "../../router";

export { Scheduler } from "./scheduler";

export const ReactPageComponent = () => {
  const curCoutes = routes.find((item) => item.path == "/react")?.children || [];

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
