import Header from "./Header"
import LeftNav from "./LeftNav"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = (props: LayoutProps) => {
  const { children } = props

  return (
    <div className="w-full h-[100vh]">
      <Header></Header>
      <div>
        <LeftNav></LeftNav>
        {children}
      </div>
    </div>
  )
}

export default Layout
