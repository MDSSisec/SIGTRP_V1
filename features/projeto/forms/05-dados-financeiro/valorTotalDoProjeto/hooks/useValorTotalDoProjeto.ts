"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

import { fetchProjectSession05Financial } from "@/features/projeto/services/project-session-05-financial.service"
import type { ProjectSession05Financial } from "@/features/projeto/types/project-session-05-financial"
import { useAsyncData } from "@/hooks/use-async-data"

import { saveValorTotalDoProjeto } from "../action/saveValorTotalDoProjeto"
import {
  toValorTotalDoProjetoForm,
  VAZIO_VALOR_TOTAL_DO_PROJETO,
  type DadosValorTotalDoProjeto,
} from "../types"
import { calcularValores, sanitizeMoedaInput } from "../utils"
import { useValorTotalDoProjetoReview } from "./useValorTotalDoProjetoReview"

type UseValorTotalDoProjetoOptions = {
  projectId?: string
  readOnlyView?: boolean
}

type CampoMoeda = keyof DadosValorTotalDoProjeto

/**
 * Lógica do formulário de Valor total do projeto.
 */
export function useValorTotalDoProjeto({
  projectId,
  readOnlyView,
}: UseValorTotalDoProjetoOptions) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [dados, setDados] = useState<DadosValorTotalDoProjeto>(
    VAZIO_VALOR_TOTAL_DO_PROJETO,
  )
  const [rascunho, setRascunho] = useState<DadosValorTotalDoProjeto>(
    VAZIO_VALOR_TOTAL_DO_PROJETO,
  )

  const review = useValorTotalDoProjetoReview({ readOnlyView, isEditing })

  const loadFinanceiro = useCallback(async () => {
    if (!projectId) return null
    return fetchProjectSession05Financial(projectId)
  }, [projectId])

  const { data: financeiro, reload } = useAsyncData(loadFinanceiro, {
    initialData: null as ProjectSession05Financial | null,
    errorMessage: "Não foi possível carregar o valor total do projeto.",
    loadOnMount: Boolean(projectId),
  })

  const resetForm = useCallback((data: ProjectSession05Financial | null) => {
    setDados(toValorTotalDoProjetoForm(data))
  }, [])

  useEffect(() => {
    if (projectId && !isEditing) {
      resetForm(financeiro)
    }
  }, [projectId, financeiro, isEditing, resetForm])

  const valores = useMemo(() => calcularValores(dados), [dados])

  const setCampo = useCallback((campo: CampoMoeda, value: string) => {
    setSaveError(null)
    setDados((prev) => ({
      ...prev,
      [campo]: sanitizeMoedaInput(value),
    }))
  }, [])

  const startEditing = useCallback(() => {
    setRascunho({ ...dados })
    setSaveError(null)
    setIsEditing(true)
  }, [dados])

  const cancel = useCallback(() => {
    setDados({ ...rascunho })
    setSaveError(null)
    setIsEditing(false)
  }, [rascunho])

  const save = useCallback(async () => {
    if (!projectId) return

    setIsSaving(true)
    setSaveError(null)

    try {
      const result = await saveValorTotalDoProjeto(projectId, dados)
      if (!result.ok) {
        setSaveError(result.error)
        return
      }

      if (result.data) {
        resetForm(result.data)
      } else {
        void reload()
      }

      setIsEditing(false)
    } finally {
      setIsSaving(false)
    }
  }, [projectId, dados, resetForm, reload])

  return {
    form: dados,
    meta: { valores },
    ui: {
      isEditing,
      isSaving,
      saveError,
      isLocked: review.isLocked,
      canStartEditing: review.canStartEditing,
    },
    actions: {
      setCampo,
      startEditing,
      cancel,
      save,
    },
  }
}
