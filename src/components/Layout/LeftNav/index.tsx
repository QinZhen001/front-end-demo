"use client"

import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../ui/accordion"
import { usePathname, useRouter } from "next/navigation"
import { useMemo } from "react"
import { CONTENT_LIST } from "@/constant"
import NavItem from "./NavItem"
import { cn } from "@/lib/utils"

const LeftNav = () => {
  const pathname = usePathname()
  const router = useRouter()

  const firstPath = useMemo(() => {
    return "/" + pathname.split("/").filter(Boolean)[0]
  }, [pathname])

  const secondPath = useMemo(() => {
    const path = pathname.split("/").filter(Boolean)[1]
    if (path) {
      return "/" + path
    }
    return ""
  }, [pathname])

  const onValueChange = (value: string) => {
    const target = CONTENT_LIST.find((item) => item.href === value)
    if (target?.href) {
      router.replace(target.href)
    }
  }

  return (
    <AccordionRoot
      className="flex-initial w-52"
      type="single"
      onValueChange={onValueChange}
      value={firstPath}
      collapsible
    >
      {CONTENT_LIST.map((item) => {
        return (
          <AccordionItem key={item.title} value={item.href}>
            <AccordionTrigger
              className={cn(
                firstPath == item.href && !secondPath
                  ? "bg-violet-500 text-violet-900"
                  : "hover:bg-violet-300 hover:text-violet-900",
              )}
            >
              {item.title}
            </AccordionTrigger>
            <AccordionContent>
              {item.children?.map((child) => {
                return <NavItem key={child.title} title={child.title} href={child.href}></NavItem>
              })}
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </AccordionRoot>
  )
}

export default LeftNav
