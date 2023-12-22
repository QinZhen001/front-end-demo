import { Link, Outlet } from "react-router-dom";
import { routes, PageRoute } from "../../router";
import "./index.css";

export const MainPage = () => {
  const finalRoutes = routes.filter((item) => item.path !== "/");

  return (
    <div>
      <ul>
        {finalRoutes.map(({ path, title }) => (
          <li key={path}>
            <Link to={path}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const CommonPageRouter = ({ routes }: { routes: PageRoute[] }) => {
  return (
    <div className="page">
      <section className="left">
        <ul>
          {routes.filter(item => !item.hidden).map(({ title, path, element }) => (
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
}


export default MainPage
