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

import { saveIdentificacaoResponsavelTecnico } from "../action/saveIdentificacaoResponsavelTecnico"
import {
  toIdentificacaoResponsavelTecnicoForm,
  VAZIO_IDENTIFICACAO_RESPONSAVEL_TECNICO,
  type DadosIdentificacaoResponsavelTecnico,
} from "../types/responsavel-tecnico-form"
import {
  emailValido,
  formatTelefone,
  formatTelefoneFixo,
} from "../utils/formatters"
import { useIdentificacaoResponsavelTecnicoReview } from "./useIdentificacaoResponsavelTecnicoReview"

type Options = {
  projectId?: string
  readOnlyView?: boolean
}

/**
 * Hook responsável pela lógica do formulário de
 * Identificação do Responsável Técnico.
 *
 * Responsabilidades:
 * - carregar dados da API;
 * - controlar edição;
 * - aplicar máscaras de telefone/celular;
 * - validar e-mail;
 * - salvar alterações;
 * - aplicar regras de revisão.
 */
export function useIdentificacaoResponsavelTecnico({
  projectId,
  readOnlyView,
}: Options) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [emailTocado, setEmailTocado] = useState(false)
  const [dadosFormulario, setDadosFormulario] =
    useState<DadosIdentificacaoResponsavelTecnico>(
      VAZIO_IDENTIFICACAO_RESPONSAVEL_TECNICO,
    )

  const review = useIdentificacaoResponsavelTecnicoReview({
    readOnlyView,
    isEditing,
  })

  const loadIdentificacao = useCallback(async () => {
    if (!projectId) return null
    return fetchTedIdentificacao(projectId)
  }, [projectId])

  const { data: identificacao, reload } = useAsyncData(loadIdentificacao, {
    initialData: null as TedIdentificacao | null,
    errorMessage: "Não foi possível carregar o responsável técnico.",
    loadOnMount: Boolean(projectId),
  })

  const resetForm = useCallback((data: TedIdentificacao | null) => {
    setDadosFormulario(toIdentificacaoResponsavelTecnicoForm(data))
    setEmailTocado(false)
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

    if (name === "celular") value = formatTelefone(value)
    else if (name === "telefone") value = formatTelefoneFixo(value)

    setDadosFormulario((prev) => ({ ...prev, [name]: value }))
  }, [])

  const markEmailTouched = useCallback(() => {
    setEmailTocado(true)
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
      const result = await saveIdentificacaoResponsavelTecnico(
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

  const emailInvalido =
    emailTocado &&
    dadosFormulario.email.length > 0 &&
    !emailValido(dadosFormulario.email)

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
      emailInvalido,
    },
    actions: {
      handleChange,
      markEmailTouched,
      startEditing,
      cancel,
      save,
    },
  }
}
