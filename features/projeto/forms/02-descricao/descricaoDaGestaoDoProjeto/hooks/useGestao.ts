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

import { saveGestao } from "../action/saveGestao"
import { GESTAO_MAX_LENGTH } from "../constants/form"
import {
  toGestaoForm,
  VAZIO_GESTAO,
  type DadosGestao,
} from "../types/gestao-form"
import { useGestaoReview } from "./useGestaoReview"

type UseGestaoOptions = {
  projectId?: string
  readOnlyView?: boolean
}

/**
 * Controla o estado e as ações do formulário da seção
 * Gestão do Projeto.
 *
 * Responsabilidades:
 * - carregar os dados do contexto do projeto;
 * - controlar edição e salvamento;
 * - aplicar regras de revisão;
 * - disponibilizar ações e estados para a interface.
 */
export function useGestao({
  projectId,
  readOnlyView,
}: UseGestaoOptions) {
  const projectData = useProjectData()
  const updateProjectData = useUpdateProjectData()

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [dadosFormulario, setDadosFormulario] =
    useState<DadosGestao>(VAZIO_GESTAO)

  const review = useGestaoReview({
    readOnlyView,
    isEditing,
  })

  const resetForm = useCallback(() => {
    setDadosFormulario(toGestaoForm(projectData))
  }, [projectData])

  useEffect(() => {
    if (!isEditing) {
      resetForm()
    }
  }, [isEditing, resetForm])

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = event.target

      setSaveError(null)

      setDadosFormulario((prev) => ({
        ...prev,
        [name]: value.slice(0, GESTAO_MAX_LENGTH),
      }))
    },
    [],
  )

  const startEditing = useCallback(() => {
    resetForm()
    setSaveError(null)
    setIsEditing(true)
  }, [resetForm])

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
      const result = await saveGestao({
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
  }, [
    projectId,
    dadosFormulario,
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