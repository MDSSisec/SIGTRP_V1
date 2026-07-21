"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

import { fetchProjectSession03Participants } from "@/features/projeto/services/project-session-03-participants.service"
import type { ProjectSession03Participants } from "@/features/projeto/types/project-session-03-participants"
import { useAsyncData } from "@/hooks/use-async-data"

import { savePublicoBeneficiario } from "../action/savePublicoBeneficiario"
import {
  toPublicoBeneficiarioForm,
  VAZIO_PUBLICO_BENEFICIARIO,
  type DadosPublicoBeneficiario,
} from "../types/publico-beneficiario-form"
import { calcularValores, sanitizeQuantidadeInput } from "../utils/formatters"
import { usePublicoBeneficiarioReview } from "./usePublicoBeneficiarioReview"

type UsePublicoBeneficiarioOptions = {
  projectId?: string
  readOnlyView?: boolean
}

/**
 * Lógica do formulário de Público beneficiário.
 */
export function usePublicoBeneficiario({
  projectId,
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

  const loadParticipantes = useCallback(async () => {
    if (!projectId) return null
    return fetchProjectSession03Participants(projectId)
  }, [projectId])

  const { data: participantes, reload } = useAsyncData(loadParticipantes, {
    initialData: null as ProjectSession03Participants | null,
    errorMessage: "Não foi possível carregar o público beneficiário.",
    loadOnMount: Boolean(projectId),
  })

  const resetForm = useCallback((data: ProjectSession03Participants | null) => {
    setDados(toPublicoBeneficiarioForm(data))
  }, [])

  useEffect(() => {
    if (projectId) {
      resetForm(participantes)
    }
  }, [projectId, participantes, resetForm])

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
      const result = await savePublicoBeneficiario(projectId, dados)
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
