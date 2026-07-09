"use client"

import * as React from "react"
import { InfoIcon } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import { BRAZIL_UFS, countByUf, type UfSource } from "@/components/map"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const chartConfig = {
  projetos: {
    label: "Projetos",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export type ChartBarInteractiveProps = {
  items: UfSource[]
  title?: string
  description?: string
  className?: string
}

export function ChartBarInteractive({
  items,
  title = "Grafico por UF",
  description = "Quanto maior a barra, maior a quantidade de projetos.",
  className,
}: ChartBarInteractiveProps) {
  const chartData = React.useMemo(() => {
    const countsByUf = countByUf(items)

    return BRAZIL_UFS.map((uf) => ({
      uf,
      projetos: countsByUf[uf] ?? 0,
    }))
  }, [items])

  const chartMinWidth = chartData.length * 28

  return (
    <Card
      className={cn(
        "flex h-full flex-col border border-border bg-gradient-to-t from-primary/5 to-card py-0 shadow-xs",
        className,
      )}
    >
      <div className="shrink-0 px-4 pt-4 pb-4">
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 text-[0.8125rem] text-muted-foreground">
          {description}
        </p>
      </div>

      <CardContent className="flex min-h-0 flex-1 overflow-x-auto px-2 pb-4 sm:px-4">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-full min-h-0 w-full"
          style={{ minWidth: chartMinWidth }}
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 20, right: 8, bottom: 4, left: 4 }}
          >
            <CartesianGrid vertical={false} stroke="var(--border)" />
            <XAxis
              dataKey="uf"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0}
              fontSize={11}
              tick={{ fill: "var(--muted-foreground)" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              allowDecimals={false}
              width={32}
              fontSize={11}
              tick={{ fill: "var(--muted-foreground)" }}
            />
            <ChartTooltip
              cursor={{ fill: "var(--muted)", opacity: 0.35 }}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => `UF ${value}`}
                  formatter={(value) => (
                    <span className="font-medium tabular-nums">
                      {value} projeto{Number(value) === 1 ? "" : "s"}
                    </span>
                  )}
                />
              }
            />
            <Bar
              dataKey="projetos"
              fill="var(--color-projetos)"
              radius={[4, 4, 0, 0]}
              maxBarSize={24}
            >
              <LabelList
                dataKey="projetos"
                position="top"
                offset={6}
                fontSize={10}
                fill="var(--foreground)"
                fontWeight={600}
                formatter={(value) =>
                  value != null && Number(value) > 0 ? String(value) : ""
                }
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
