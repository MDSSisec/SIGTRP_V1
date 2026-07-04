"use client"

import { InfoIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export type TotalProps = {
  value: number | string
  label: string
  icon: React.ReactNode
  description?: string
  valueClassName?: string
  className?: string
}

export function Total({
  value,
  label,
  icon,
  description,
  valueClassName,
  className,
}: TotalProps) {
  return (
    <article
      className={cn(
        "rounded-xl border border-border bg-card p-4",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 text-muted-foreground [&_svg]:size-4">
            {icon}
          </span>
          <p className="truncate text-sm text-muted-foreground">{label}</p>
        </div>
        <Tooltip>
          <TooltipTrigger
            className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={`Informações sobre ${label}`}
          >
            <InfoIcon className="size-4" />
          </TooltipTrigger>
          <TooltipContent side="top" align="end">
            {description ?? label}
          </TooltipContent>
        </Tooltip>
      </div>
      <p
        className={cn(
          "mt-4 text-3xl font-semibold tracking-tight",
          valueClassName,
        )}
      >
        {value}
      </p>
    </article>
  )
}
