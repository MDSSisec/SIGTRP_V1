"use client"

import { useCallback, useEffect, useState } from "react"

import { useCronograma } from "@/features/projeto/contexts/cronograma/CronogramaContext"
import {
  useProjectData,
  useUpdateProjectData,
} from "@/features/projeto/contexts/project-data-context"

import { saveMetas } from "../action/saveMetas"
import {
  createEmptyMeta,
  toMetasForm,
  VAZIO_METAS,
  type DadosMetas,
} from "../types/metas-form"
import { useMetasReview } from "./useMetasReview"

type UseMetasOptions = {
  projectId?: string
  readOnlyView?: boolean
}

/**
 * Lógica do formulário de Metas.
 *
 * - sincroniza com CronogramaContext;
 * - controla edição/salvamento e lista de metas;
 * - aplica regras de revisão.
 */
export function useMetas({ projectId, readOnlyView }: UseMetasOptions) {
  const { data, replaceMetas } = useCronograma()
  const projectData = useProjectData()
  const updateProjectData = useUpdateProjectData()

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [dadosFormulario, setDadosFormulario] =
    useState<DadosMetas>(VAZIO_METAS)

  const review = useMetasReview({
    readOnlyView,
    isEditing,
  })

  const resetForm = useCallback(() => {
    setDadosFormulario(toMetasForm(data.metas))
  }, [data.metas])

  useEffect(() => {
    if (!isEditing) resetForm()
  }, [isEditing, resetForm])

  const handleTituloChange = useCallback((indice: number, valor: string) => {
    setSaveError(null)
    setDadosFormulario((prev) => ({
      metas: prev.metas.map((meta, i) =>
        i === indice ? { ...meta, titulo: valor } : meta,
      ),
    }))
  }, [])

  const adicionarMeta = useCallback(() => {
    setSaveError(null)
    setDadosFormulario((prev) => ({
      metas: [...prev.metas, createEmptyMeta()],
    }))
  }, [])

  const removerMeta = useCallback((indice: number) => {
    setSaveError(null)
    setDadosFormulario((prev) => {
      if (prev.metas.length <= 1) return prev
      return {
        metas: prev.metas.filter((_, i) => i !== indice),
      }
    })
  }, [])

  const startEditing = useCallback(() => {
    setDadosFormulario(toMetasForm(data.metas))
    setIsEditing(true)
    setSaveError(null)
  }, [data.metas])

  const cancel = useCallback(() => {
    resetForm()
    setSaveError(null)
    setIsEditing(false)
  }, [resetForm])

  const save = useCallback(async () => {
    if (!projectId) return

    setIsSaving(true)
    setSaveError(null)

    try {
      const result = await saveMetas({
        projectId,
        dados: dadosFormulario,
        replaceMetas,
        updateProjectData,
        currentEtapasCronograma: projectData?.etapas_cronograma,
      })

      if (!result.ok) {
        setSaveError(result.error)
        return
      }

      setIsEditing(false)
    } finally {
      setIsSaving(false)
    }
  }, [
    projectId,
    dadosFormulario,
    replaceMetas,
    updateProjectData,
    projectData?.etapas_cronograma,
  ])

  return {
    form: dadosFormulario,
    review: {
      fieldClass: review.fieldClass,
    },
    ui: {
      isEditing,
      isSaving,
      saveError,
      isLocked: review.isLocked,
      isViewMode: review.isViewMode,
      canStartEditing: review.canStartEditing,
      canManageList: isEditing && !review.isLocked,
    },
    actions: {
      handleTituloChange,
      adicionarMeta,
      removerMeta,
      startEditing,
      cancel,
      save,
    },
  }
}
