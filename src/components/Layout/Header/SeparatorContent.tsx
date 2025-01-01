import * as React from "react"
import * as Separator from "@radix-ui/react-separator"
import { cn } from "@/lib/utils"
import { RadiobuttonIcon } from "@radix-ui/react-icons"
import { DividerHorizontalIcon } from "@radix-ui/react-icons"

interface ISeparatorContentProps {
  data: string[]
  description?: string
  className?: string
}

const SeparatorContent = (props: ISeparatorContentProps) => {
  const { data, className, description } = props

  return (
    <div className={cn(className, "flex h-full items-center justify-center")}>
      <RadiobuttonIcon className="mr-2 text-violet10"></RadiobuttonIcon>
      {data.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <span className="text-sm">{item}</span>
            {index !== data.length - 1 && (
              <Separator.Root className="mx-2 h-4 w-px bg-slate-600" orientation="vertical" />
            )}
          </React.Fragment>
        )
      })}
      {description && (
        <>
          <DividerHorizontalIcon className="ml-2"></DividerHorizontalIcon>
          <div className="ml-2 text-nowrap text-sm text-slate-700">{description}</div>
        </>
      )}
    </div>
  )
}

export default SeparatorContent
