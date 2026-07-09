"use client"

import { BrazilUfMap } from "@/components/map"
import { DASHBOARD_PROJECTS_BY_UF } from "../constants/dashboard-uf-data"

export function DashboardUfSection() {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <BrazilUfMap
        items={DASHBOARD_PROJECTS_BY_UF}
        title="Mapa por UF"
        description="Quanto mais escuro o estado, maior a quantidade de projetos."
        countSingular="projeto"
        countPlural="projetos"
        emptyMessage="Nenhum projeto com UF cadastrada para exibir no mapa."
      />
    </div>
  )
}
