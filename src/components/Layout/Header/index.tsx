"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import SeparatorContent from "./SeparatorContent"
import { useEffect, useMemo } from "react"
import { SORT_NAV_LIST, HEADER_DESCRIPTION } from "@/constant"
import { cn } from "@/lib/utils"

interface IHeaderProps {
  className?: string
}

const Header = (props: IHeaderProps) => {
  const { className } = props
  const pathname = usePathname()
  const pathData = useMemo(() => {
    return pathname.split("/").filter(Boolean)
  }, [pathname])

  const target = useMemo(() => {
    for (let item of SORT_NAV_LIST) {
      if (item.href === pathname) {
        return item
      }
      if (item.children) {
        for (let child of item.children) {
          if (child.href === pathname) {
            return child
          }
        }
      }
    }
  }, [pathname])

  return (
    <div className={cn(className, "box-border flex items-center justify-between bg-neutral-200")}>
      <SeparatorContent
        data={pathData}
        description={target?.description}
        className="ml-2 box-border flex-initial"
      ></SeparatorContent>
      <span className="mr-2 flex-auto text-right">{HEADER_DESCRIPTION}</span>
    </div>
  )
}

export default Header
