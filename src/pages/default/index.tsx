import { Link } from "react-router-dom";
import { routes } from "../../router";
import "./index.css";

export const DefaultPageComponent = () => {
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
