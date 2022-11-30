import { Link } from "react-router-dom"

const publicRoutes = [
  {
    path: "/other/delegate/index.html",
    name: "delegate"
  }
]

export const PublicPage = () => {
  return <ul>
    {publicRoutes.map(({ path, name }) => (
      <li key={path}>
         <a href={path}>{name}</a>
      </li>
    ))}
  </ul>
}


export default PublicPage
