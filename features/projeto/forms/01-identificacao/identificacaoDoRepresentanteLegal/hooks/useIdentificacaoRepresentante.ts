"use client"

import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
} from "react"

import { fetchTedIdentificacao } from "@/features/projetos/services"
import type { TedIdentificacao } from "@/features/projetos/types/ted-identificacao"
import { useAsyncData } from "@/hooks/use-async-data"

import { saveIdentificacaoRepresentante } from "../action/saveIdentificacaoRepresentante"
import {
  toIdentificacaoRepresentanteForm,
  VAZIO_IDENTIFICACAO_REPRESENTANTE,
  type DadosIdentificacaoRepresentanteLegal,
} from "../types/representante-form"
import {
  formatCpf,
  formatTelefone,
  validateTextWithoutDigits,
} from "../utils/formatters"
import { useIdentificacaoRepresentanteReview } from "./useIdentificacaoRepresentanteReview"

type Options = {
  projectId?: string
  readOnlyView?: boolean
}

/**
 * Hook responsável pela lógica do formulário de
 * Identificação do Representante Legal.
 *
 * Responsabilidades:
 * - carregar dados da API;
 * - controlar edição;
 * - aplicar máscaras e validações;
 * - salvar alterações;
 * - aplicar regras de revisão.
 */
export function useIdentificacaoRepresentante({
  projectId,
  readOnlyView,
}: Options) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [dadosFormulario, setDadosFormulario] =
    useState<DadosIdentificacaoRepresentanteLegal>(
      VAZIO_IDENTIFICACAO_REPRESENTANTE,
    )

  const review = useIdentificacaoRepresentanteReview({
    readOnlyView,
    isEditing,
  })

  const loadIdentificacao = useCallback(async () => {
    if (!projectId) return null
    return fetchTedIdentificacao(projectId)
  }, [projectId])

  const { data: identificacao, reload } = useAsyncData(loadIdentificacao, {
    initialData: null as TedIdentificacao | null,
    errorMessage: "Não foi possível carregar o representante legal.",
    loadOnMount: Boolean(projectId),
  })

  const resetForm = useCallback((data: TedIdentificacao | null) => {
    setDadosFormulario(toIdentificacaoRepresentanteForm(data))
  }, [])

  useEffect(() => {
    if (projectId) void reload()
  }, [projectId, reload])

  useEffect(() => {
    resetForm(identificacao)
  }, [identificacao, resetForm])

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target
    setSaveError(null)

    if (name === "cpf") value = formatCpf(value)
    else if (name === "telefone") value = formatTelefone(value)
    else if (!validateTextWithoutDigits(name, value)) return

    setDadosFormulario((prev) => ({ ...prev, [name]: value }))
  }, [])

  const startEditing = useCallback(() => {
    setIsEditing(true)
  }, [])

  const cancel = useCallback(() => {
    resetForm(identificacao)
    setSaveError(null)
    setIsEditing(false)
  }, [identificacao, resetForm])

  const save = useCallback(async () => {
    if (!projectId) return

    setIsSaving(true)
    setSaveError(null)

    try {
      const result = await saveIdentificacaoRepresentante(
        projectId,
        dadosFormulario,
      )

      if (!result.ok) {
        setSaveError(result.error)
        return
      }

      if (result.data) resetForm(result.data)

      setIsEditing(false)
      await reload()
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
