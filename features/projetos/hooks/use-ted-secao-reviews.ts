"use client"

import { useCallback, useEffect, useMemo } from "react"
import { fetchTedSecaoReviews } from "@/features/projetos/services"
import type { TedCampoReview } from "@/features/projetos/types/ted-campo-review"
import type { TedSecaoReview } from "@/features/projetos/types/ted-secao-review"
import { useAsyncData } from "@/hooks/use-async-data"

export function useTedSecaoReviews(projetoId?: string) {
  const load = useCallback(async () => {
    if (!projetoId) {
      return { reviews: [] as TedSecaoReview[], campos: [] as TedCampoReview[] }
    }
    return fetchTedSecaoReviews(projetoId)
  }, [projetoId])

  const { data, reload } = useAsyncData(load, {
    initialData: {
      reviews: [] as TedSecaoReview[],
      campos: [] as TedCampoReview[],
    },
    errorMessage: "Não foi possível carregar as revisões das seções.",
    loadOnMount: Boolean(projetoId),
  })

  useEffect(() => {
    if (projetoId) void reload()
  }, [projetoId, reload])

  const bySlug = useMemo(() => {
    const map = new Map<string, TedSecaoReview>()
    for (const review of data.reviews) {
      map.set(review.secaoSlug, review)
    }
    return map
  }, [data.reviews])

  const camposBySecao = useMemo(() => {
    const map = new Map<string, TedCampoReview[]>()
    for (const campo of data.campos) {
      const list = map.get(campo.secaoSlug) ?? []
      list.push(campo)
      map.set(campo.secaoSlug, list)
    }
    return map
  }, [data.campos])

  const getReview = useCallback(
    (secaoSlug: string) => bySlug.get(secaoSlug) ?? null,
    [bySlug],
  )

  const secaoTemAtencao = useCallback(
    (secaoSlug: string) => {
      const review = bySlug.get(secaoSlug)
      if (review?.statusRevisao === "precisaAtencao") return true
      return (camposBySecao.get(secaoSlug)?.length ?? 0) > 0
    },
    [bySlug, camposBySecao],
  )

  return {
    reviews: data.reviews,
    campos: data.campos,
    bySlug,
    getReview,
    secaoTemAtencao,
    reload,
  }
}
