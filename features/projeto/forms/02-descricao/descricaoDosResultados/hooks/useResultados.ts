"use client"

import { useCallback, useEffect, useState } from "react"

import {
  useProjectData,
  useUpdateProjectData,
} from "@/features/projeto/contexts/project-data-context"

import { saveResultados } from "../action/saveResultados"
import { RESULTADO_MAX_LENGTH } from "../constants/form"
import {
  toResultadosForm,
  VAZIO_RESULTADOS,
  type DadosResultados,
} from "../types/resultados-form"
import { useResultadosReview } from "./useResultadosReview"

type UseResultadosOptions = {
  projectId?: string
  readOnlyView?: boolean
}

/**
 * Lógica do formulário de Resultados Esperados.
 */
export function useResultados({
  projectId,
  readOnlyView,
}: UseResultadosOptions) {
  const projectData = useProjectData()
  const updateProjectData = useUpdateProjectData()

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [dadosFormulario, setDadosFormulario] =
    useState<DadosResultados>(VAZIO_RESULTADOS)

  const review = useResultadosReview({
    readOnlyView,
    isEditing,
  })

  const resetForm = useCallback(() => {
    setDadosFormulario(toResultadosForm(projectData))
  }, [projectData])

  useEffect(() => {
    if (!isEditing) resetForm()
  }, [isEditing, resetForm])

  const handleChange = useCallback((indice: number, valor: string) => {
    setSaveError(null)
    setDadosFormulario((prev) => {
      const resultados = [...prev.resultados]
      resultados[indice] = valor.slice(0, RESULTADO_MAX_LENGTH)
      return { resultados }
    })
  }, [])

  const adicionar = useCallback(() => {
    setSaveError(null)
    setDadosFormulario((prev) => ({
      resultados: [...prev.resultados, ""],
    }))
  }, [])

  const remover = useCallback((indice: number) => {
    setSaveError(null)
    setDadosFormulario((prev) => {
      if (prev.resultados.length <= 1) return prev
      return {
        resultados: prev.resultados.filter((_, i) => i !== indice),
      }
    })
  }, [])

  const startEditing = useCallback(() => {
    setDadosFormulario(toResultadosForm(projectData))
    setIsEditing(true)
    setSaveError(null)
  }, [projectData])

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
      const result = await saveResultados({
        projectId,
        dados: dadosFormulario,
        updateProjectData,
      })

      if (!result.ok) {
        setSaveError(result.error)
        return
      }

      setIsEditing(false)
    } finally {
      setIsSaving(false)
    }
  }, [projectId, dadosFormulario, updateProjectData])

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
      handleChange,
      adicionar,
      remover,
      startEditing,
      cancel,
      save,
    },
  }
}
