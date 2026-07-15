"use client"

import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
} from "react"

import {
  useProjectData,
  useUpdateProjectData,
} from "@/features/projeto/contexts/project-data-context"

import { saveJustificativa } from "../action/saveJustificativa"
import {
  toJustificativaForm,
  VAZIO_JUSTIFICATIVA,
  type DadosJustificativa,
} from "../types/justificativa-form"
import { useJustificativaReview } from "./useJustificativaReview"

type UseJustificativaOptions = {
  projectId?: string
  readOnlyView?: boolean
}

/**
 * Lógica do formulário de Justificativa e Motivação.
 *
 * - carrega dados do contexto do projeto;
 * - controla edição/salvamento;
 * - aplica regras de revisão.
 */
export function useJustificativa({
  projectId,
  readOnlyView,
}: UseJustificativaOptions) {
  const projectData = useProjectData()
  const updateProjectData = useUpdateProjectData()

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [dadosFormulario, setDadosFormulario] =
    useState<DadosJustificativa>(VAZIO_JUSTIFICATIVA)

  const review = useJustificativaReview({
    readOnlyView,
    isEditing,
  })

  const resetForm = useCallback(() => {
    setDadosFormulario(toJustificativaForm(projectData))
  }, [projectData])

  useEffect(() => {
    resetForm()
  }, [resetForm])

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = event.target
      setSaveError(null)
      setDadosFormulario((prev) => ({ ...prev, [name]: value }))
    },
    [],
  )

  const startEditing = useCallback(() => {
    setIsEditing(true)
    setSaveError(null)
  }, [])

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
      const result = await saveJustificativa({
        projectId,
        dados: dadosFormulario,
        currentDescricao: projectData?.descricao_projeto,
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
  }, [
    projectId,
    dadosFormulario,
    projectData?.descricao_projeto,
    updateProjectData,
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
    },
    actions: {
      handleChange,
      startEditing,
      cancel,
      save,
    },
  }
}
