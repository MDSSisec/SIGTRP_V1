"use client"

import { useCallback, useMemo, useState } from "react"

import {
  VAZIO_PUBLICO_BENEFICIARIO,
  type DadosPublicoBeneficiario,
} from "../types/publico-beneficiario-form"
import { calcularValores, sanitizeQuantidadeInput } from "../utils/formatters"
import { usePublicoBeneficiarioReview } from "./usePublicoBeneficiarioReview"

type UsePublicoBeneficiarioOptions = {
  readOnlyView?: boolean
}

/**
 * Lógica do formulário de Público beneficiário.
 */
export function usePublicoBeneficiario({
  readOnlyView,
}: UsePublicoBeneficiarioOptions) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [dados, setDados] = useState<DadosPublicoBeneficiario>(
    VAZIO_PUBLICO_BENEFICIARIO,
  )
  const [rascunho, setRascunho] = useState<DadosPublicoBeneficiario>(
    VAZIO_PUBLICO_BENEFICIARIO,
  )

  const review = usePublicoBeneficiarioReview({
    readOnlyView,
    isEditing,
  })

  const valores = useMemo(() => calcularValores(dados), [dados])

  const setHomensDiretos = useCallback((value: string) => {
    setSaveError(null)
    setDados((prev) => ({
      ...prev,
      homensDiretos: sanitizeQuantidadeInput(value),
    }))
  }, [])

  const setMulheresDiretos = useCallback((value: string) => {
    setSaveError(null)
    setDados((prev) => ({
      ...prev,
      mulheresDiretos: sanitizeQuantidadeInput(value),
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
      // TODO: integrar API quando disponível
      setIsEditing(false)
    } catch {
      setSaveError("Não foi possível salvar o público beneficiário.")
    } finally {
      setIsSaving(false)
    }
  }, [])

  return {
    form: dados,
    meta: {
      valores,
    },
    ui: {
      isEditing,
      isSaving,
      saveError,
      isLocked: review.isLocked,
      isViewMode: review.isViewMode,
      canStartEditing: review.canStartEditing,
    },
    actions: {
      setHomensDiretos,
      setMulheresDiretos,
      startEditing,
      cancel,
      save,
    },
  }
}
