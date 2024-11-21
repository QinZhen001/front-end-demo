import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import * as React from "react"
import { cn } from "@/lib/utils"

const AccordionRoot = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ children, className, ...props }, forwardedRef) => (
  <AccordionPrimitive.Root
    className={cn("overflow-hidden w-full", className)}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </AccordionPrimitive.Root>
))

AccordionRoot.displayName = AccordionPrimitive.Root.displayName

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ children, className, ...props }, forwardedRef) => (
  <AccordionPrimitive.Item
    className={cn(
      "w-full overflow-hidden first:mt-0 focus-within:relative focus-within:z-10 focus-within:shadow-md border-b border-slate-200",
      className,
    )}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </AccordionPrimitive.Item>
))

AccordionItem.displayName = AccordionPrimitive.Item.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, ...props }, forwardedRef) => (
  <AccordionPrimitive.Content
    className={cn("overflow-hidden cursor-pointer", className)}
    {...props}
    ref={forwardedRef}
  />
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ children, className, ...props }, forwardedRef) => (
  <AccordionPrimitive.Trigger
    className={cn(
      "flex w-full h-[45px] flex-1 items-center justify-between bg-white px-5 leading-none text-violet11 shadow-[0_1px_0] shadow-mauve6 outline-none",
      className,
    )}
    {...props}
    ref={forwardedRef}
  >
    {children}
    <ChevronDownIcon
      className=" text-violet10 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
      aria-hidden
    />
  </AccordionPrimitive.Trigger>
))

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

export { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent }
