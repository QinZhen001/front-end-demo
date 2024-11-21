"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import SeparatorContent from "./SeparatorContent"
import { DividerHorizontalIcon } from "@radix-ui/react-icons"
import { useEffect, useMemo } from "react"
import { CONTENT_LIST } from "@/constant"

const Header = () => {
  const pathname = usePathname()
  const pathData = useMemo(() => {
    return pathname.split("/").filter(Boolean)
  }, [pathname])

  const target = useMemo(() => {
    for (let item of CONTENT_LIST) {
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
    <div className="h-8 w-full bg-neutral-200 px-2 leading-8 flex items-center">
      <SeparatorContent data={pathData} className="flex-initial"></SeparatorContent>
      {target?.description && (
        <>
          <DividerHorizontalIcon className="ml-2"></DividerHorizontalIcon>
          <div className="flex-initial ml-2 text-nowrap text-slate-700 text-sm">
            {target.description}
          </div>
        </>
      )}
      <div className="flex-1 self-end text-right">web demo collection</div>
    </div>
  )
}

export default Header
