"use client"

import { useCallback, useEffect, useMemo } from "react"
import { fetchSecaoReviews } from "@/features/projeto/services"
import type { CampoReview } from "@/features/projeto/types/campo-review"
import type { SecaoReview } from "@/features/projeto/types/secao-review"
import { useAsyncData } from "@/hooks/use-async-data"

export function useSecaoReviews(projetoId?: string) {
  const load = useCallback(async () => {
    if (!projetoId) {
      return { reviews: [] as SecaoReview[], campos: [] as CampoReview[] }
    }
    return fetchSecaoReviews(projetoId)
  }, [projetoId])

  const { data, reload } = useAsyncData(load, {
    initialData: {
      reviews: [] as SecaoReview[],
      campos: [] as CampoReview[],
    },
    errorMessage: "Não foi possível carregar as revisões das seções.",
    loadOnMount: Boolean(projetoId),
  })

  useEffect(() => {
    if (projetoId) void reload()
  }, [projetoId, reload])

  const bySlug = useMemo(() => {
    const map = new Map<string, SecaoReview>()
    for (const review of data.reviews) {
      map.set(review.secaoSlug, review)
    }
    return map
  }, [data.reviews])

  const camposBySecao = useMemo(() => {
    const map = new Map<string, CampoReview[]>()
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
