import Header from "./Header"
import LeftNav from "./LeftNav"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = (props: LayoutProps) => {
  const { children } = props

  return (
    <div className="w-full h-[100vh] flex">
      <LeftNav></LeftNav>
      <div className="flex-1">
        <Header></Header>
        <div className="h-[calc(100vh-2rem)] bg-slate-50 overflow-auto p-2">{children}</div>
      </div>
    </div>
  )
}

export default Layout
