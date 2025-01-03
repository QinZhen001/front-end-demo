import * as Popover from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const PopoverContent = Popover.Content
PopoverContent.displayName = Popover.Content.displayName

const PopoverTrigger = Popover.Trigger
PopoverTrigger.displayName = Popover.Trigger.displayName

const PopoverRoot = Popover.Root
PopoverRoot.displayName = Popover.Root.displayName

export { PopoverContent, PopoverRoot, PopoverTrigger }
