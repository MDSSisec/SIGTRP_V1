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

import { saveOutrasInformacoesProponente } from "../action/saveOutrasInformacoesProponente"
import { OUTRAS_INFORMACOES_MAX_LENGTH } from "../constants/form"
import {
  toOutrasInformacoesForm,
  VAZIO_OUTRAS_INFORMACOES,
  type DadosOutrasInformacoes,
} from "../types/outras-informacoes-form"
import { useOutrasInformacoesReview } from "./useOutrasInformacoesReview"

type UseOutrasInformacoesProponenteOptions = {
  projectId?: string
  readOnlyView?: boolean
}

export function useOutrasInformacoesProponente({
  projectId,
  readOnlyView,
}: UseOutrasInformacoesProponenteOptions) {
  const projectData = useProjectData()
  const updateProjectData = useUpdateProjectData()

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [dadosFormulario, setDadosFormulario] =
    useState<DadosOutrasInformacoes>(VAZIO_OUTRAS_INFORMACOES)

  const review = useOutrasInformacoesReview({
    readOnlyView,
    isEditing,
  })

  const resetForm = useCallback(() => {
    setDadosFormulario(toOutrasInformacoesForm(projectData))
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
        [name]: value.slice(0, OUTRAS_INFORMACOES_MAX_LENGTH),
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
      const result = await saveOutrasInformacoesProponente({
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
    },
    actions: {
      handleChange,
      startEditing,
      cancel,
      save,
    },
  }
}
