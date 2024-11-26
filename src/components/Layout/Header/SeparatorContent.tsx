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
    <div className={cn(className, "flex items-center justify-center h-full")}>
      <RadiobuttonIcon className="text-violet10 mr-2"></RadiobuttonIcon>
      {data.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <span className="text-sm">{item}</span>
            {index !== data.length - 1 && (
              <Separator.Root className="mx-2 bg-slate-600 w-px h-4" orientation="vertical" />
            )}
          </React.Fragment>
        )
      })}
      {description && (
        <>
          <DividerHorizontalIcon className="ml-2"></DividerHorizontalIcon>
          <div className="ml-2 text-nowrap text-slate-700 text-sm">{description}</div>
        </>
      )}
    </div>
  )
}

export default SeparatorContent
