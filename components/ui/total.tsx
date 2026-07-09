"use client"

import { ArrowDownRightIcon, ArrowUpRightIcon, InfoIcon } from "lucide-react"

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export type TotalProps = {
  value: number | string
  label: string
  icon: React.ReactNode
  badgeText?: string
  trend?: "up" | "down"
  summary?: string
  description?: string
  valueClassName?: string
  className?: string
}

export function Total({
  value,
  label,
  icon,
  badgeText,
  trend = "up",
  summary,
  description,
  valueClassName,
  className,
}: TotalProps) {
  const TrendIcon = trend === "down" ? ArrowDownRightIcon : ArrowUpRightIcon

  return (
    <Card
      className={cn(
        "@container/card border border-border bg-gradient-to-t from-primary/5 to-card shadow-xs",
        className,
      )}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardDescription>{label}</CardDescription>
          {description ? (
            <Tooltip>
              <TooltipTrigger
                className="inline-flex size-4 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
                aria-label={`Informações sobre ${label}`}
              >
                <InfoIcon className="size-3.5" />
              </TooltipTrigger>
              <TooltipContent side="top" align="start">
                {description}
              </TooltipContent>
            </Tooltip>
          ) : null}
        </div>
        <CardTitle
          className={cn(
            "text-2xl font-semibold tabular-nums @[250px]/card:text-3xl",
            valueClassName,
          )}
        >
          {value}
        </CardTitle>
        {badgeText ? (
          <CardAction>
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground shadow-xs">
              <TrendIcon className="size-3.5" />
              {badgeText}
            </span>
          </CardAction>
        ) : icon ? (
          <CardAction>
            <span className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-xs [&_svg]:size-4">
              {icon}
            </span>
          </CardAction>
        ) : null}
      </CardHeader>
      {summary ? (
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {summary}
            <TrendIcon className="size-4" />
          </div>
        </CardFooter>
      ) : null}
    </Card>
  )
}
