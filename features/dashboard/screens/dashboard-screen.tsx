"use client"

import * as React from "react"

import { ChartBarInteractive } from "@/components/ChartBarInteractive"
import { Button } from "@/components/ui/button"
import { DashboardTotals, DashboardUfSection } from "../components"
import { DASHBOARD_PROJECTS_BY_UF } from "../constants/dashboard-uf-data"

export function DashboardScreen() {
  const [view, setView] = React.useState<"grafico" | "mapa">("grafico")

  return (
    <div className="flex h-[calc(100svh-9rem)] min-h-[520px] flex-col gap-4 overflow-hidden md:gap-6">
      <div className="shrink-0">
        <DashboardTotals />
      </div>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold">Visões do dashboard</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Alterne entre o grafico de barras e o mapa por UF.
            </p>
          </div>

          <div className="flex w-full gap-2 sm:w-auto">
            <Button
              variant={view === "grafico" ? "default" : "outline"}
              size="sm"
              className="flex-1 sm:flex-none"
              onClick={() => setView("grafico")}
            >
              Grafico de barras
            </Button>
            <Button
              variant={view === "mapa" ? "default" : "outline"}
              size="sm"
              className="flex-1 sm:flex-none"
              onClick={() => setView("mapa")}
            >
              Mapa
            </Button>
          </div>
        </div>

        <div className="min-h-0 flex-1">
          {view === "mapa" ? (
            <DashboardUfSection />
          ) : (
            <ChartBarInteractive
              items={DASHBOARD_PROJECTS_BY_UF}
              className="h-full"
            />
          )}
        </div>
      </div>
    </div>
  )
}
