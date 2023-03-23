import { Link, Outlet } from "react-router-dom";
import { lazy } from "react"
import { CommonPageRouter } from "../default"

export const routes = [
  {
    path: "compose",
    title: "compose",
  },
  {
    path: "cross-domain",
    title: "cross-domain",
  },
  {
    path: "delegate",
    title: "delegate",
  },
  {
    path: "await-to-js",
    title: "await-to-js",
  },
  {
    path: "co",
    title: "co",
  }
].map(item => {
  return {
    ...item,
    path:`/other/${item.path}/index.html`
  }
})

export const OtherJsPage = () => {
  return <ul> {routes.map(({ title, path, }) => (
    <li key={path}>
      <a href={path}>
        {title}
      </a>
    </li>
  ))}
  </ul>
};


export default OtherJsPage
