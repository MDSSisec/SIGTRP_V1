"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-5 shrink-0 items-center justify-center rounded-[5px]",
        "border border-input bg-white shadow-xs transition-[color,box-shadow,background-color,border-color]",
        "outline-none after:absolute after:-inset-x-2.5 after:-inset-y-2",
        "hover:border-foreground/40",
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "group-has-disabled/field:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        "aria-invalid:aria-checked:border-primary",
        "data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground data-checked:shadow-none",
        "dark:bg-input/30 dark:hover:bg-input/50",
        "dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        "dark:data-checked:bg-primary dark:data-checked:border-primary",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none data-[starting-style]:scale-50 data-[ending-style]:scale-50 [&>svg]:size-3.5"
      >
        <CheckIcon strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
