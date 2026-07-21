"use client"

import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
} from "react"

import { fetchProjectSession04Characterization } from "@/features/projeto/services/project-session-04-characterization.service"
import type { ProjectSession04Characterization } from "@/features/projeto/types/project-session-04-characterization"
import { useAsyncData } from "@/hooks/use-async-data"

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
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [dadosFormulario, setDadosFormulario] =
    useState<DadosOutrasInformacoes>(VAZIO_OUTRAS_INFORMACOES)

  const review = useOutrasInformacoesReview({
    readOnlyView,
    isEditing,
  })

  const loadCaracterizacao = useCallback(async () => {
    if (!projectId) return null
    return fetchProjectSession04Characterization(projectId)
  }, [projectId])

  const { data: caracterizacao, reload } = useAsyncData(loadCaracterizacao, {
    initialData: null as ProjectSession04Characterization | null,
    errorMessage: "Não foi possível carregar as outras informações do proponente.",
    loadOnMount: Boolean(projectId),
  })

  const resetForm = useCallback(
    (data: ProjectSession04Characterization | null) => {
      setDadosFormulario(toOutrasInformacoesForm(data))
    },
    [],
  )

  useEffect(() => {
    if (projectId && !isEditing) {
      resetForm(caracterizacao)
    }
  }, [projectId, caracterizacao, isEditing, resetForm])

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
    resetForm(caracterizacao)
    setSaveError(null)
    setIsEditing(true)
  }, [caracterizacao, resetForm])

  const cancel = useCallback(() => {
    resetForm(caracterizacao)
    setSaveError(null)
    setIsEditing(false)
  }, [caracterizacao, resetForm])

  const save = useCallback(async () => {
    if (!projectId) return

    setIsSaving(true)
    setSaveError(null)

    try {
      const result = await saveOutrasInformacoesProponente({
        projectId,
        dados: dadosFormulario,
      })

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
  }, [projectId, dadosFormulario, resetForm, reload])

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
