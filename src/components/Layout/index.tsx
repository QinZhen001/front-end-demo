import Header from "./Header"
import LeftNav from "./LeftNav"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = (props: LayoutProps) => {
  const { children } = props

  return (
    <div className="flex h-[100vh] w-full">
      <LeftNav className="w-52 flex-none"></LeftNav>
      <div className="flex-auto">
        <Header className="h-[2rem]"></Header>
        <div className="relative h-[calc(100vh-2rem)] w-full overflow-hidden overflow-y-auto bg-slate-50 p-2">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
