"use client"

import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { useMemo } from "react"

interface INavItemProps {
  title: string
  href: string
}

const NavItem = (props: INavItemProps) => {
  const { title, href } = props
  const pathname = usePathname()
  const router = useRouter()

  const active = useMemo(() => {
    return pathname === href
  }, [pathname, href])

  const onClickItem = () => {
    router.replace(href)
  }

  return (
    <div
      onClick={onClickItem}
      className={cn("h-8 px-6 leading-8 text-violet11 hover:bg-violet-300 hover:text-violet-900", {
        "bg-violet-500": active,
        "text-violet-900": active,
      })}
    >
      <span className={cn("text-sm", {})}>{title}</span>
    </div>
  )
}

export default NavItem
