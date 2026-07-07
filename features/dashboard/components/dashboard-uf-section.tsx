"use client"

import {
  BrazilUfMap,
  BRAZIL_UFS,
  countByUf,
} from "@/components/map"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DASHBOARD_PROJECTS_BY_UF } from "../constants/dashboard-uf-data"

const cardClassName =
  "flex min-h-0 flex-1 flex-col rounded-xl border border-border bg-card p-4 lg:h-full lg:min-h-0 lg:flex-none"

const mapCardClassName = "flex min-h-0 flex-1 lg:h-full lg:min-h-0 lg:flex-none"

export function DashboardUfSection() {
  const countsByUf = countByUf(DASHBOARD_PROJECTS_BY_UF)
  const total = Object.values(countsByUf).reduce((sum, count) => sum + count, 0)

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-4 lg:[grid-template-rows:minmax(0,1fr)]">
      <article className={cardClassName}>
        <div className="shrink-0">
          <h2 className="text-sm font-semibold">Projetos por UF</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Distribuição de projetos por unidade federativa.
          </p>
        </div>

        <div className="mt-4 flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="min-h-0 flex-1 overflow-y-auto">
            <Table className="border-0 bg-transparent shadow-none">
              <TableHeader className="sticky top-0 z-10 bg-card [&_tr]:bg-card">
                <TableRow>
                  <TableHead>UF</TableHead>
                  <TableHead className="text-right">Projetos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {BRAZIL_UFS.map((uf) => (
                  <TableRow key={uf}>
                    <TableCell className="font-medium">{uf}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {countsByUf[uf] ?? 0}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex shrink-0 items-center justify-between border-t border-border px-4 py-3 text-sm font-medium">
            <span>Total</span>
            <span className="tabular-nums">{total}</span>
          </div>
        </div>
      </article>

      <article className={mapCardClassName}>
        <BrazilUfMap
          items={DASHBOARD_PROJECTS_BY_UF}
          title="Mapa por UF"
          description="Quanto mais escuro o estado, maior a quantidade de projetos."
          countSingular="projeto"
          countPlural="projetos"
          emptyMessage="Nenhum projeto com UF cadastrada para exibir no mapa."
        />
      </article>
    </div>
  )
}
