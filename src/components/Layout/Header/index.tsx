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
    <div className={cn(className, " bg-neutral-200 flex items-center justify-between box-border")}>
      <SeparatorContent
        data={pathData}
        description={target?.description}
        className="flex-initial box-border ml-2"
      ></SeparatorContent>
      <span className="flex-auto text-right mr-2">{HEADER_DESCRIPTION}</span>
    </div>
  )
}

export default Header
