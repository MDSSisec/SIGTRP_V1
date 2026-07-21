"use client"

import { useCallback, useEffect, useState } from "react"

import { HISTORICO_SITUACAO_MAX_LENGTH } from "@/features/projeto/constants/historico-situacao"
import { fetchProjectSession03Participants } from "@/features/projeto/services/project-session-03-participants.service"
import type { ProjectSession03Participants } from "@/features/projeto/types/project-session-03-participants"
import { useAsyncData } from "@/hooks/use-async-data"

import { saveHistoricoSituacao } from "../action/saveHistoricoSituacao"
import {
  toHistoricoSituacaoForm,
  VAZIO_HISTORICO_SITUACAO,
  type DadosHistoricoSituacao,
} from "../types/historico-situacao-form"

type UseHistoricoSituacaoOptions = {
  projectId?: string
  readOnlyView?: boolean
}

/**
 * Lógica do formulário de Histórico e situação socioeconômica.
 */
export function useHistoricoSituacao({
  projectId,
  readOnlyView,
}: UseHistoricoSituacaoOptions) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [dados, setDados] = useState<DadosHistoricoSituacao>(
    VAZIO_HISTORICO_SITUACAO,
  )
  const [rascunho, setRascunho] = useState<DadosHistoricoSituacao>(
    VAZIO_HISTORICO_SITUACAO,
  )

  const isLocked = Boolean(readOnlyView) || !isEditing
  const canStartEditing = !readOnlyView

  const loadParticipantes = useCallback(async () => {
    if (!projectId) return null
    return fetchProjectSession03Participants(projectId)
  }, [projectId])

  const { data: participantes, reload } = useAsyncData(loadParticipantes, {
    initialData: null as ProjectSession03Participants | null,
    errorMessage:
      "Não foi possível carregar o histórico e situação do território.",
    loadOnMount: Boolean(projectId),
  })

  const resetForm = useCallback((data: ProjectSession03Participants | null) => {
    setDados(toHistoricoSituacaoForm(data))
  }, [])

  useEffect(() => {
    if (projectId) {
      resetForm(participantes)
    }
  }, [projectId, participantes, resetForm])

  const setTexto = useCallback((value: string) => {
    setSaveError(null)
    setDados({
      texto: value.slice(0, HISTORICO_SITUACAO_MAX_LENGTH),
    })
  }, [])

  const startEditing = useCallback(() => {
    setRascunho({ ...dados })
    setSaveError(null)
    setIsEditing(true)
  }, [dados])

  const cancel = useCallback(() => {
    setDados({ ...rascunho })
    setSaveError(null)
    setIsEditing(false)
  }, [rascunho])

  const save = useCallback(async () => {
    setIsSaving(true)
    setSaveError(null)

    try {
      const result = await saveHistoricoSituacao(projectId, dados)
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
  }, [projectId, dados, resetForm, reload])

  return {
    form: dados,
    ui: {
      isEditing,
      isSaving,
      saveError,
      isLocked,
      canStartEditing,
    },
    actions: {
      setTexto,
      startEditing,
      cancel,
      save,
    },
  }
}
