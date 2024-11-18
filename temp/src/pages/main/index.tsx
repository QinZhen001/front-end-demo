import { Link, Outlet } from "react-router-dom"
import { routes } from "../../router"
import { PageRoute } from "../../types"
import "./index.css"

export const MainPage = () => {
  const finalRoutes = routes.filter((item) => item.path !== "/")

  return (
    <div>
      <ul>
        {finalRoutes.map(({ path, title }) => (
          <li key={path}>{path ? <Link to={path}>{title}</Link> : title}</li>
        ))}
      </ul>
    </div>
  )
}

export const CommonPageRouter = ({ routes }: { routes: PageRoute[] }) => {
  return (
    <div className="page">
      <section className="left">
        <ul>
          {routes
            .filter((item) => !item.hidden && !item.index)
            .map(({ title, path, element }) => (
              <li key={path}>{path ? <Link to={path}>{title}</Link> : title}</li>
            ))}
        </ul>
      </section>
      <section className="right">
        <Outlet />
      </section>
    </div>
  )
}

export default MainPage
