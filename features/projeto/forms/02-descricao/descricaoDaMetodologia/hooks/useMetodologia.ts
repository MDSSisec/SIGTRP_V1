"use client"

import { useCallback, useEffect, useState } from "react"

import {
  useProjectData,
  useUpdateProjectData,
} from "@/features/projeto/contexts/project-data-context"
import { fetchProjectSession02Description } from "@/features/projeto/services/project-session-02-description.service"
import type { ProjectSession02Description } from "@/features/projeto/types/project-session-02-description"
import { useAsyncData } from "@/hooks/use-async-data"

import { saveMetodologia } from "../action/saveMetodologia"
import { METODOLOGIA_MAX_LENGTH } from "../constants/form"
import {
  toMetodologiaForm,
  VAZIO_METODOLOGIA,
  type DadosMetodologia,
} from "../types/metodologia-form"
import { useMetodologiaReview } from "./useMetodologiaReview"

type UseMetodologiaOptions = {
  projectId?: string
  readOnlyView?: boolean
}

/**
 * Lógica da seção Metodologia: carga, edição e persistência.
 */
export function useMetodologia({
  projectId,
  readOnlyView,
}: UseMetodologiaOptions) {
  const projectData = useProjectData()
  const updateProjectData = useUpdateProjectData()

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [dadosFormulario, setDadosFormulario] =
    useState<DadosMetodologia>(VAZIO_METODOLOGIA)

  const review = useMetodologiaReview({ readOnlyView, isEditing })

  const loadDescricao = useCallback(async () => {
    if (!projectId) return null
    return fetchProjectSession02Description(projectId)
  }, [projectId])

  const { data: descricao, reload } = useAsyncData(loadDescricao, {
    initialData: null as ProjectSession02Description | null,
    errorMessage: "Não foi possível carregar a metodologia do projeto.",
    loadOnMount: Boolean(projectId),
  })

  const resetForm = useCallback((data: ProjectSession02Description | null) => {
    setDadosFormulario(toMetodologiaForm(data))
  }, [])

  const atualizarFormulario = useCallback(
    (salvo: ProjectSession02Description) => {
      resetForm(salvo)

      updateProjectData({
        descricao_projeto: {
          ...projectData?.descricao_projeto,
          metodologia: {
            meta: salvo.metodologiaMeta ?? "",
            etapa_1_1: salvo.metodologiaEtapa11 ?? "",
            etapa_1_2: salvo.metodologiaEtapa12 ?? "",
            etapa_1_3: salvo.metodologiaEtapa13 ?? "",
            etapa_1_4: salvo.metodologiaEtapa14 ?? "",
          },
        },
      })
    },
    [resetForm, updateProjectData, projectData?.descricao_projeto],
  )

  useEffect(() => {
    if (projectId) void reload()
  }, [projectId, reload])

  useEffect(() => {
    resetForm(descricao)
  }, [descricao, resetForm])

  const startEditing = useCallback(() => {
    setIsEditing(true)
    setSaveError(null)
  }, [])

  const cancel = useCallback(() => {
    resetForm(descricao)
    setSaveError(null)
    setIsEditing(false)
  }, [descricao, resetForm])

  const setMetaTexto = useCallback((value: string) => {
    setSaveError(null)
    setDadosFormulario((prev) => ({
      ...prev,
      metaTexto: value.slice(0, METODOLOGIA_MAX_LENGTH),
    }))
  }, [])

  const setEtapaTexto = useCallback((id: string, value: string) => {
    setSaveError(null)
    setDadosFormulario((prev) => ({
      ...prev,
      etapasTexto: {
        ...prev.etapasTexto,
        [id]: value.slice(0, METODOLOGIA_MAX_LENGTH),
      },
    }))
  }, [])

  const save = useCallback(async () => {
    if (!projectId) return

    setIsSaving(true)
    setSaveError(null)

    try {
      const result = await saveMetodologia(projectId, dadosFormulario)

      if (!result.ok) {
        setSaveError(result.error)
        return
      }

      if (result.data) {
        atualizarFormulario(result.data)
      }

      setIsEditing(false)
      await reload()
    } finally {
      setIsSaving(false)
    }
  }, [projectId, dadosFormulario, atualizarFormulario, reload])

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
      startEditing,
      cancel,
      save,
      setMetaTexto,
      setEtapaTexto,
    },
  }
}
