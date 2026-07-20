"use client"

import { useCallback, useMemo, useState } from "react"

import {
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
    setIsSaving(true)
    setSaveError(null)

    try {
      // TODO: integrar API / banco quando disponível
      setIsEditing(false)
    } catch {
      setSaveError("Não foi possível salvar o valor total do projeto.")
    } finally {
      setIsSaving(false)
    }
  }, [])

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
