"use client"

import { useCallback, useMemo, useState } from "react"

import {
  VAZIO_PUBLICO_BENEFICIARIO,
  type DadosPublicoBeneficiario,
} from "../types/publico-beneficiario-form"
import { calcularValores, sanitizeQuantidadeInput } from "../utils/formatters"

type UsePublicoBeneficiarioOptions = {
  readOnlyView?: boolean
}

/**
 * Lógica do formulário de Público beneficiário.
 *
 * - controla edição local;
 * - calcula indiretos e totais.
 */
export function usePublicoBeneficiario({
  readOnlyView,
}: UsePublicoBeneficiarioOptions) {
  // states
  const [isEditing, setIsEditing] = useState(false)
  const [dados, setDados] = useState<DadosPublicoBeneficiario>(
    VAZIO_PUBLICO_BENEFICIARIO,
  )
  const [rascunho, setRascunho] = useState<DadosPublicoBeneficiario>(
    VAZIO_PUBLICO_BENEFICIARIO,
  )

  // helpers
  const isLocked = Boolean(readOnlyView) || !isEditing
  const canStartEditing = !readOnlyView

  const valores = useMemo(() => calcularValores(dados), [dados])

  // actions
  const setHomensDiretos = useCallback((value: string) => {
    setDados((prev) => ({
      ...prev,
      homensDiretos: sanitizeQuantidadeInput(value),
    }))
  }, [])

  const setMulheresDiretos = useCallback((value: string) => {
    setDados((prev) => ({
      ...prev,
      mulheresDiretos: sanitizeQuantidadeInput(value),
    }))
  }, [])

  const startEditing = useCallback(() => {
    setRascunho({ ...dados })
    setIsEditing(true)
  }, [dados])

  const cancel = useCallback(() => {
    setDados({ ...rascunho })
    setIsEditing(false)
  }, [rascunho])

  const save = useCallback(() => {
    setIsEditing(false)
  }, [])

  // return
  return {
    form: dados,

    meta: {
      valores,
    },

    ui: {
      isEditing,
      isLocked,
      canStartEditing,
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
