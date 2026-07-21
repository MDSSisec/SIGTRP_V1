"use client"

import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
} from "react"

import { fetchProjectSession01Identificacao } from "@/features/projeto/services"
import type { ProjectSession01Identificacao } from "@/features/projeto/types/project-session-01-identificacao"
import { useAsyncData } from "@/hooks/use-async-data"

import { saveIdentificacaoRepresentante } from "../action/saveIdentificacaoRepresentante"
import {
  toIdentificacaoRepresentanteForm,
  VAZIO_IDENTIFICACAO_REPRESENTANTE,
  type DadosIdentificacaoRepresentanteLegal,
} from "../types/representante-form"
import {
  formatTelefone,
  sanitizeMatriculaFuncional,
  validateTextWithoutDigits,
} from "../utils/formatters"
import { useIdentificacaoRepresentanteReview } from "./useIdentificacaoRepresentanteReview"

type Options = {
  projectId?: string
  readOnlyView?: boolean
}

/**
 * Hook responsÃ¡vel pela lÃ³gica do formulÃ¡rio de
 * IdentificaÃ§Ã£o do Representante Legal.
 *
 * Responsabilidades:
 * - carregar dados da API;
 * - controlar ediÃ§Ã£o;
 * - aplicar mÃ¡scaras e validaÃ§Ãµes;
 * - salvar alteraÃ§Ãµes;
 * - aplicar regras de revisÃ£o.
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
    return fetchProjectSession01Identificacao(projectId)
  }, [projectId])

  const { data: identificacao, reload } = useAsyncData(loadIdentificacao, {
    initialData: null as ProjectSession01Identificacao | null,
    errorMessage: "NÃ£o foi possÃ­vel carregar o representante legal.",
    loadOnMount: Boolean(projectId),
  })

  const resetForm = useCallback((data: ProjectSession01Identificacao | null) => {
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

    if (name === "matriculaFuncional") {
      value = sanitizeMatriculaFuncional(value)
    } else if (name === "telefone") value = formatTelefone(value)
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
