"use client"

import { useCallback, useState } from "react"

import { HISTORICO_SITUACAO_MAX_LENGTH } from "@/features/projeto/constants/historico-situacao"

import {
  VAZIO_HISTORICO_SITUACAO,
  type DadosHistoricoSituacao,
} from "../types"

type UseHistoricoSituacaoOptions = {
  readOnlyView?: boolean
}

/**
 * Lógica do formulário de Histórico e situação socioeconômica.
 */
export function useHistoricoSituacao({
  readOnlyView,
}: UseHistoricoSituacaoOptions) {
  const [isEditing, setIsEditing] = useState(false)
  const [dados, setDados] = useState<DadosHistoricoSituacao>(
    VAZIO_HISTORICO_SITUACAO,
  )
  const [rascunho, setRascunho] = useState<DadosHistoricoSituacao>(
    VAZIO_HISTORICO_SITUACAO,
  )

  const isLocked = Boolean(readOnlyView) || !isEditing
  const canStartEditing = !readOnlyView

  const setTexto = useCallback((value: string) => {
    setDados({
      texto: value.slice(0, HISTORICO_SITUACAO_MAX_LENGTH),
    })
  }, [])

  const startEditing = useCallback(() => {
    setRascunho({ ...dados })
    setIsEditing(true)
  }, [dados])

  const cancel = useCallback(() => {
    setDados({ ...rascunho })
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
      setTexto,
      startEditing,
      cancel,
      save,
    },
  }
}
