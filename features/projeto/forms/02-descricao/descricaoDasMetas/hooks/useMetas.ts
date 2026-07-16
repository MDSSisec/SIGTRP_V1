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
  // contexts
  const { data, replaceMetas } = useCronograma()
  const projectData = useProjectData()
  const updateProjectData = useUpdateProjectData()

  // states
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [dadosFormulario, setDadosFormulario] =
    useState<DadosMetas>(VAZIO_METAS)

  // review
  const { isLocked, isViewMode, canStartEditing, fieldClass } = useMetasReview({
    readOnlyView,
    isEditing,
  })

  // helpers
  const clearError = useCallback(() => {
    setSaveError(null)
  }, [])

  const loadCurrentData = useCallback(() => {
    setDadosFormulario(toMetasForm(data.metas))
  }, [data.metas])

  // effects
  useEffect(() => {
    if (!isEditing) {
      loadCurrentData()
    }
  }, [isEditing, loadCurrentData])

  // actions
  const handleTituloChange = useCallback(
    (indice: number, valor: string) => {
      clearError()

      setDadosFormulario((prev) => {
        const metas = prev.metas.map((meta, index) =>
          index === indice
            ? {
                ...meta,
                titulo: valor,
              }
            : meta,
        )

        return { metas }
      })
    },
    [clearError],
  )

  const adicionarMeta = useCallback(() => {
    clearError()

    setDadosFormulario((prev) => ({
      metas: [...prev.metas, createEmptyMeta()],
    }))
  }, [clearError])

  const removerMeta = useCallback(
    (indice: number) => {
      clearError()

      setDadosFormulario((prev) => {
        if (prev.metas.length <= 1) {
          return prev
        }

        const metas = prev.metas.filter((_, index) => index !== indice)

        return { metas }
      })
    },
    [clearError],
  )

  const startEditing = useCallback(() => {
    loadCurrentData()
    clearError()
    setIsEditing(true)
  }, [clearError, loadCurrentData])

  const cancel = useCallback(() => {
    loadCurrentData()
    clearError()
    setIsEditing(false)
  }, [clearError, loadCurrentData])

  const save = useCallback(async () => {
    if (!projectId) {
      return
    }

    setIsSaving(true)
    clearError()

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
    clearError,
    projectId,
    dadosFormulario,
    replaceMetas,
    updateProjectData,
    projectData?.etapas_cronograma,
  ])

  // return
  return {
    form: dadosFormulario,

    review: {
      fieldClass,
    },

    ui: {
      isEditing,
      isSaving,
      saveError,
      isLocked,
      isViewMode,
      canStartEditing,
      canManageList: isEditing && !isLocked,
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
