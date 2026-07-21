"use client"

import { useCallback, useMemo } from "react"

import type { UfSource } from "@/components/map"
import { useAsyncData } from "@/hooks/use-async-data"

import { fetchDashboardStats } from "../services"
import type { DashboardStats } from "../types"

const EMPTY_STATS: DashboardStats = {
  totalProjetos: 0,
  preenchimentoTrp: 0,
  instrumentosCelebrados: 0,
  totalTed: 0,
  totalEmenda: 0,
  totalConvenio: 0,
  byUf: [],
  semUf: 0,
}

/** Expande contagens por UF no formato esperado pelo mapa/gráfico. */
export function toUfSourceItems(
  byUf: DashboardStats["byUf"],
): UfSource[] {
  const items: UfSource[] = []
  for (const { uf, total } of byUf) {
    for (let i = 0; i < total; i += 1) {
      items.push({ uf })
    }
  }
  return items
}

export function useDashboardStats() {
  const load = useCallback(() => fetchDashboardStats(), [])

  const { data, isLoading, error, reload } = useAsyncData(load, {
    initialData: EMPTY_STATS,
    errorMessage: "Não foi possível carregar o dashboard.",
  })

  const ufItems = useMemo(() => toUfSourceItems(data.byUf), [data.byUf])

  const cards = useMemo(
    () => ({
      totalProjetos: data.totalProjetos,
      preenchimentoTrp: data.preenchimentoTrp,
      instrumentosCelebrados: data.instrumentosCelebrados,
      totalTed: data.totalTed,
      totalEmenda: data.totalEmenda,
      totalConvenio: data.totalConvenio,
    }),
    [data],
  )

  return {
    stats: data,
    cards,
    ufItems,
    isLoading,
    error,
    reload,
  }
}
