import { Link, Outlet } from "react-router-dom";
import { lazy } from "react"
import { CommonPageRouter } from "../default"



export const routes = [
  {
    path: "/other/compose/index.html",
    title: "compose",
  },
  {
    path: "/other/cross-domain/index.html",
    title: "cross-domain",
  },
  {
    path: "/other/delegate/index.html",
    title: "delegate",
  },
]

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
