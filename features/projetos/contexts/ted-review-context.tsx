"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import {
  fetchTedSecaoReviews,
  saveTedSecaoReview,
  syncTedCampoReviews,
} from "@/features/projetos/services"
import type { TedCampoReview } from "@/features/projetos/types/ted-campo-review"
import type { TedSecaoReview } from "@/features/projetos/types/ted-secao-review"
import { canEditProjetoInformacoes } from "@/features/projetos/utils/projetos-permissions"
import { fetchSessionUser } from "@/features/login/services"
import type { PublicUser } from "@/features/login/types"
import { useAsyncData } from "@/hooks/use-async-data"

type TedReviewContextValue = {
  projetoId: string
  secaoSlug: string | null
  canManage: boolean
  review: TedSecaoReview | null
  camposAtencao: Set<string>
  isMarkingAtencao: boolean
  selectedCampoKeys: Set<string>
  isSaving: boolean
  error: string | null
  setIsMarkingAtencao: (value: boolean) => void
  toggleCampoSelection: (campoKey: string) => void
  isCampoAtencao: (campoKey: string) => boolean
  bloquearSecao: () => Promise<void>
  desbloquearSecao: () => Promise<void>
  limparAtencao: () => Promise<void>
  confirmarAtencao: (comentario: string) => Promise<void>
  reload: () => Promise<void>
}

const TedReviewContext = createContext<TedReviewContextValue | null>(null)

type TedReviewProviderProps = {
  projetoId: string
  secaoSlug: string
  children: ReactNode
}

export function TedReviewProvider({
  projetoId,
  secaoSlug,
  children,
}: TedReviewProviderProps) {
  const { data: sessionUser } = useAsyncData(fetchSessionUser, {
    initialData: null as PublicUser | null,
    errorMessage: "Não foi possível carregar o usuário.",
  })

  const canManage = Boolean(
    sessionUser && canEditProjetoInformacoes(sessionUser),
  )

  const load = useCallback(async () => {
    if (!projetoId) return { reviews: [], campos: [] }
    return fetchTedSecaoReviews(projetoId)
  }, [projetoId])

  const { data, reload, setData } = useAsyncData(load, {
    initialData: { reviews: [] as TedSecaoReview[], campos: [] as TedCampoReview[] },
    errorMessage: "Não foi possível carregar as revisões.",
    loadOnMount: Boolean(projetoId),
  })

  useEffect(() => {
    if (projetoId) void reload()
  }, [projetoId, reload])

  const [isMarkingAtencao, setIsMarkingAtencao] = useState(false)
  const [selectedCampoKeys, setSelectedCampoKeys] = useState<Set<string>>(
    new Set(),
  )
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const review = useMemo(
    () => data.reviews.find((r) => r.secaoSlug === secaoSlug) ?? null,
    [data.reviews, secaoSlug],
  )

  const camposAtencao = useMemo(() => {
    const keys = data.campos
      .filter((c) => c.secaoSlug === secaoSlug && c.precisaAtencao)
      .map((c) => c.campoKey)
    return new Set(keys)
  }, [data.campos, secaoSlug])

  // Ao trocar de seção, sai do modo de marcação
  useEffect(() => {
    setIsMarkingAtencao(false)
    setSelectedCampoKeys(new Set())
    setError(null)
  }, [secaoSlug])

  const toggleCampoSelection = useCallback((campoKey: string) => {
    setSelectedCampoKeys((prev) => {
      const next = new Set(prev)
      if (next.has(campoKey)) next.delete(campoKey)
      else next.add(campoKey)
      return next
    })
  }, [])

  const isCampoAtencao = useCallback(
    (campoKey: string) => {
      if (isMarkingAtencao) return selectedCampoKeys.has(campoKey)
      return camposAtencao.has(campoKey)
    },
    [isMarkingAtencao, selectedCampoKeys, camposAtencao],
  )

  const bloquearSecao = useCallback(async () => {
    setIsSaving(true)
    setError(null)
    try {
      const saved = await saveTedSecaoReview(projetoId, {
        secaoSlug,
        bloqueada: true,
        statusRevisao: "ok",
        comentario: null,
      })
      setData((prev) => ({
        ...prev,
        reviews: [
          ...prev.reviews.filter((r) => r.secaoSlug !== secaoSlug),
          saved,
        ],
      }))
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Não foi possível bloquear a seção.",
      )
    } finally {
      setIsSaving(false)
    }
  }, [projetoId, secaoSlug, setData])

  const desbloquearSecao = useCallback(async () => {
    setIsSaving(true)
    setError(null)
    try {
      const saved = await saveTedSecaoReview(projetoId, {
        secaoSlug,
        bloqueada: false,
        statusRevisao: review?.statusRevisao ?? "ok",
        comentario: review?.comentario ?? null,
      })
      setData((prev) => ({
        ...prev,
        reviews: [
          ...prev.reviews.filter((r) => r.secaoSlug !== secaoSlug),
          saved,
        ],
      }))
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível desbloquear a seção.",
      )
    } finally {
      setIsSaving(false)
    }
  }, [projetoId, secaoSlug, review, setData])

  const limparAtencao = useCallback(async () => {
    setIsSaving(true)
    setError(null)
    try {
      const result = await syncTedCampoReviews(projetoId, {
        secaoSlug,
        campoKeys: [],
        comentario: null,
      })
      setData({ reviews: result.reviews, campos: result.campos })
      setSelectedCampoKeys(new Set())
      setIsMarkingAtencao(false)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível limpar a atenção.",
      )
    } finally {
      setIsSaving(false)
    }
  }, [projetoId, secaoSlug, setData])

  const confirmarAtencao = useCallback(
    async (comentario: string) => {
      setIsSaving(true)
      setError(null)
      try {
        const result = await syncTedCampoReviews(projetoId, {
          secaoSlug,
          campoKeys: [...selectedCampoKeys],
          comentario,
        })
        setData({ reviews: result.reviews, campos: result.campos })
        setIsMarkingAtencao(false)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Não foi possível salvar a atenção.",
        )
        throw err
      } finally {
        setIsSaving(false)
      }
    },
    [projetoId, secaoSlug, selectedCampoKeys, setData],
  )

  const value = useMemo<TedReviewContextValue>(
    () => ({
      projetoId,
      secaoSlug,
      canManage,
      review,
      camposAtencao,
      isMarkingAtencao,
      selectedCampoKeys,
      isSaving,
      error,
      setIsMarkingAtencao: (v) => {
        if (v) {
          setSelectedCampoKeys(new Set(camposAtencao))
        }
        setIsMarkingAtencao(v)
      },
      toggleCampoSelection,
      isCampoAtencao,
      bloquearSecao,
      desbloquearSecao,
      limparAtencao,
      confirmarAtencao,
      reload,
    }),
    [
      projetoId,
      secaoSlug,
      canManage,
      review,
      camposAtencao,
      isMarkingAtencao,
      selectedCampoKeys,
      isSaving,
      error,
      toggleCampoSelection,
      isCampoAtencao,
      bloquearSecao,
      desbloquearSecao,
      limparAtencao,
      confirmarAtencao,
      reload,
    ],
  )

  return (
    <TedReviewContext.Provider value={value}>{children}</TedReviewContext.Provider>
  )
}

export function useTedReview() {
  return useContext(TedReviewContext)
}

export function useTedReviewRequired() {
  const ctx = useContext(TedReviewContext)
  if (!ctx) {
    throw new Error("useTedReviewRequired deve ser usado dentro de TedReviewProvider")
  }
  return ctx
}
