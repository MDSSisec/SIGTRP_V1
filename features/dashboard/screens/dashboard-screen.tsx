"use client"

import * as React from "react"

import { ChartBarInteractive } from "@/components/ChartBarInteractive"
import { Button } from "@/components/ui/button"
import { DashboardTotals, DashboardUfSection } from "../components"
import { useDashboardStats } from "../hooks"

export function DashboardScreen() {
  const [view, setView] = React.useState<"grafico" | "mapa">("grafico")
  const { cards, ufItems, isLoading, error, reload } = useDashboardStats()

  return (
    <div className="flex h-[calc(100svh-9rem)] min-h-[520px] flex-col gap-4 overflow-hidden md:gap-6">
      <div className="shrink-0">
        <DashboardTotals
          totalProjetos={cards.totalProjetos}
          preenchimentoTrp={cards.preenchimentoTrp}
          instrumentosCelebrados={cards.instrumentosCelebrados}
          totalTed={cards.totalTed}
          totalEmenda={cards.totalEmenda}
          totalConvenio={cards.totalConvenio}
          isLoading={isLoading}
        />
        {error ? (
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-destructive">
            <span>{error}</span>
            <Button variant="outline" size="sm" onClick={() => void reload()}>
              Tentar novamente
            </Button>
          </div>
        ) : null}
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold">Distribuição por UF</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Baseado no código IBGE do proponente na identificação do projeto.
            </p>
          </div>

          <div className="flex w-full gap-2 sm:w-auto">
            <Button
              variant={view === "grafico" ? "default" : "outline"}
              size="sm"
              className="flex-1 sm:flex-none"
              onClick={() => setView("grafico")}
            >
              Gráfico de barras
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
            <DashboardUfSection items={ufItems} isLoading={isLoading} />
          ) : (
            <ChartBarInteractive
              items={ufItems}
              title="Gráfico por UF"
              description={
                isLoading
                  ? "Carregando…"
                  : "Projetos agrupados pela UF do proponente (IBGE)."
              }
              className="h-full"
            />
          )}
        </div>
      </div>
    </div>
  )
}
