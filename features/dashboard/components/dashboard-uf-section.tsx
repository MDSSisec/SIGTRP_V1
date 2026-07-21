"use client"

import { BrazilUfMap } from "@/components/map"
import type { UfSource } from "@/components/map"

type DashboardUfSectionProps = {
  items: UfSource[]
  isLoading?: boolean
}

export function DashboardUfSection({
  items,
  isLoading = false,
}: DashboardUfSectionProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <BrazilUfMap
        items={items}
        title="Mapa por UF"
        description={
          isLoading
            ? "Carregando distribuição por UF…"
            : "UF do proponente (proponente_uf_ibge). Quanto mais escuro, mais projetos."
        }
        countSingular="projeto"
        countPlural="projetos"
        emptyMessage="Nenhum projeto com UF do proponente cadastrada."
      />
    </div>
  )
}
