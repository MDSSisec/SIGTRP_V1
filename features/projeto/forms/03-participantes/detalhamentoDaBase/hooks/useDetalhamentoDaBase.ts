"use client"

import { useCallback, useState } from "react"

import {
  criarLinhaVazia,
  VAZIO_DETALHAMENTO_DA_BASE,
  type DadosDetalhamentoDaBase,
} from "../types"

type UseDetalhamentoDaBaseOptions = {
  readOnlyView?: boolean
}

/**
 * Lógica do formulário de Detalhamento da base territorial.
 */
export function useDetalhamentoDaBase({
  readOnlyView,
}: UseDetalhamentoDaBaseOptions) {
  const [isEditing, setIsEditing] = useState(false)
  const [dados, setDados] = useState<DadosDetalhamentoDaBase>(
    VAZIO_DETALHAMENTO_DA_BASE,
  )
  const [rascunho, setRascunho] = useState<DadosDetalhamentoDaBase>(
    VAZIO_DETALHAMENTO_DA_BASE,
  )

  const isLocked = Boolean(readOnlyView) || !isEditing
  const canStartEditing = !readOnlyView

  const updateLinha = useCallback(
    (id: string, campo: "territorio" | "municipio", value: string) => {
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
    setDados((prev) => ({
      ...prev,
      linhas: [...prev.linhas, criarLinhaVazia()],
    }))
  }, [])

  const removeLinha = useCallback((id: string) => {
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
    setIsEditing(true)
  }, [dados])

  const cancel = useCallback(() => {
    setDados({
      linhas: rascunho.linhas.map((linha) => ({ ...linha })),
    })
    setIsEditing(false)
  }, [rascunho])

  const save = useCallback(() => {
    setIsEditing(false)
  }, [])

  return {
    form: dados,
    ui: {
      isEditing,
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
