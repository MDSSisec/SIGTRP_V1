"use client"

import { useCallback, useEffect, useState } from "react"

import {
  useProjectData,
  useUpdateProjectData,
} from "@/features/projeto/contexts/project-data-context"
import { formatCurrencyInput } from "@/features/projeto/utils/currency"

import { saveDadosGerais } from "../action/saveDadosGerais"
import {
  readDadosGerais,
  toDadosGeraisForm,
  VAZIO_DADOS_GERAIS,
  type DadosGeraisForm,
} from "../types/dados-gerais-form"

type Options = {
  readOnlyView?: boolean
}

/**
 * Hook responsável pela lógica do formulário de Dados Gerais do Projeto.
 *
 * Responsabilidades:
 * - carregar dados do contexto;
 * - controlar edição;
 * - validar e salvar no contexto (com sync de cursos).
 */
export function useDadosGerais({ readOnlyView }: Options) {
  const projectData = useProjectData()
  const updateProjectData = useUpdateProjectData()

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [savedData, setSavedData] =
    useState<DadosGeraisForm>(VAZIO_DADOS_GERAIS)
  const [dadosFormulario, setDadosFormulario] =
    useState<DadosGeraisForm>(VAZIO_DADOS_GERAIS)

  const resetForm = useCallback(() => {
    const loaded = toDadosGeraisForm(
      readDadosGerais(projectData as Record<string, unknown> | null),
    )
    setSavedData(loaded)
    setDadosFormulario(loaded)
  }, [projectData])

  useEffect(() => {
    resetForm()
    setIsEditing(false)
    setSaveError(null)
  }, [resetForm])

  const handleCurrencyChange = useCallback((value: string) => {
    setSaveError(null)
    setDadosFormulario((prev) => ({
      ...prev,
      custoTotalProjeto: formatCurrencyInput(value),
    }))
  }, [])

  const handleQuantidadeChange = useCallback((value: string) => {
    setSaveError(null)
    const digits = value.replace(/\D/g, "")
    setDadosFormulario((prev) => ({
      ...prev,
      quantidadeCursos: digits,
    }))
  }, [])

  const handleCheckboxChange = useCallback((checked: boolean) => {
    setSaveError(null)
    setDadosFormulario((prev) => ({
      ...prev,
      possuiEventoCertificacao: checked,
    }))
  }, [])

  const startEditing = useCallback(() => {
    setIsEditing(true)
  }, [])

  const cancel = useCallback(() => {
    setDadosFormulario(savedData)
    setSaveError(null)
    setIsEditing(false)
  }, [savedData])

  const save = useCallback(async () => {
    setIsSaving(true)
    setSaveError(null)

    try {
      const result = saveDadosGerais({
        dados: dadosFormulario,
        projectData,
        updateProjectData,
      })

      if (!result.ok) {
        setSaveError(result.error)
        return
      }

      setSavedData(result.normalized)
      setDadosFormulario(result.normalized)
      setIsEditing(false)
    } finally {
      setIsSaving(false)
    }
  }, [dadosFormulario, projectData, updateProjectData])

  const isLocked = Boolean(readOnlyView) || !isEditing
  const isViewMode = !isEditing

  return {
    form: dadosFormulario,
    ui: {
      isEditing,
      isSaving,
      saveError,
      isLocked,
      isViewMode,
      canStartEditing: !readOnlyView,
    },
    actions: {
      handleCurrencyChange,
      handleQuantidadeChange,
      handleCheckboxChange,
      startEditing,
      cancel,
      save,
    },
  }
}
