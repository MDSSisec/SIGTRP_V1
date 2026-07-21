"use client"

import { useCallback, useEffect, useState } from "react"

import { fetchProjectSession03Participants } from "@/features/projeto/services/project-session-03-participants.service"
import type { ProjectSession03Participants } from "@/features/projeto/types/project-session-03-participants"
import { useAsyncData } from "@/hooks/use-async-data"

import { saveDetalhamentoDaBase } from "../action/saveDetalhamentoDaBase"
import {
  criarLinhaVazia,
  toDetalhamentoDaBaseForm,
  VAZIO_DETALHAMENTO_DA_BASE,
  type DadosDetalhamentoDaBase,
} from "../types/detalhamento-da-base-form"

type UseDetalhamentoDaBaseOptions = {
  projectId?: string
  readOnlyView?: boolean
}

/**
 * Lógica do formulário de Detalhamento da base territorial.
 */
export function useDetalhamentoDaBase({
  projectId,
  readOnlyView,
}: UseDetalhamentoDaBaseOptions) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [dados, setDados] = useState<DadosDetalhamentoDaBase>(
    VAZIO_DETALHAMENTO_DA_BASE,
  )
  const [rascunho, setRascunho] = useState<DadosDetalhamentoDaBase>(
    VAZIO_DETALHAMENTO_DA_BASE,
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
      "Não foi possível carregar o detalhamento da base territorial.",
    loadOnMount: Boolean(projectId),
  })

  const resetForm = useCallback((data: ProjectSession03Participants | null) => {
    setDados(toDetalhamentoDaBaseForm(data))
  }, [])

  useEffect(() => {
    if (projectId) {
      resetForm(participantes)
    }
  }, [projectId, participantes, resetForm])

  const updateLinha = useCallback(
    (id: string, campo: "territorio" | "municipio", value: string) => {
      setSaveError(null)
      setDados((prev) => ({
        ...prev,
        linhas: prev.linhas.map((linha) =>
          linha.id === id ? { ...linha, [campo]: value } : linha,
        ),
      }))
    },
    [],
  )

  const addLinha = useCallback(() => {
    setSaveError(null)
    setDados((prev) => ({
      ...prev,
      linhas: [...prev.linhas, criarLinhaVazia()],
    }))
  }, [])

  const removeLinha = useCallback((id: string) => {
    setSaveError(null)
    setDados((prev) => {
      if (prev.linhas.length <= 1) {
        return { ...prev, linhas: [criarLinhaVazia()] }
      }

      return {
        ...prev,
        linhas: prev.linhas.filter((linha) => linha.id !== id),
      }
    })
  }, [])

  const startEditing = useCallback(() => {
    setRascunho({
      linhas: dados.linhas.map((linha) => ({ ...linha })),
    })
    setSaveError(null)
    setIsEditing(true)
  }, [dados])

  const cancel = useCallback(() => {
    setDados({
      linhas: rascunho.linhas.map((linha) => ({ ...linha })),
    })
    setSaveError(null)
    setIsEditing(false)
  }, [rascunho])

  const save = useCallback(async () => {
    setIsSaving(true)
    setSaveError(null)

    try {
      const result = await saveDetalhamentoDaBase(projectId, dados)
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
      updateLinha,
      addLinha,
      removeLinha,
      startEditing,
      cancel,
      save,
    },
  }
}
