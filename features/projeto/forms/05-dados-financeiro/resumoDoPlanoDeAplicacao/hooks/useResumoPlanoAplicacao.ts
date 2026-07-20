"use client"

import { useCallback, useMemo, useState } from "react"

import {
  criarLinhaVazia,
  VAZIO_RESUMO_PLANO_APLICACAO,
  type CampoLinhaResumo,
  type DadosResumoPlanoAplicacao,
} from "../types"
import { calcularValores, sanitizeCodigoInput, sanitizeMoedaInput } from "../utils"
import { useResumoPlanoAplicacaoReview } from "./useResumoPlanoAplicacaoReview"

type UseResumoPlanoAplicacaoOptions = {
  projectId?: string
  readOnlyView?: boolean
}

function cloneDados(
  dados: DadosResumoPlanoAplicacao,
): DadosResumoPlanoAplicacao {
  return {
    linhas: dados.linhas.map((linha) => ({ ...linha })),
  }
}

/**
 * Lógica do formulário de Resumo do plano de aplicação.
 */
export function useResumoPlanoAplicacao({
  readOnlyView,
}: UseResumoPlanoAplicacaoOptions) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [dados, setDados] = useState<DadosResumoPlanoAplicacao>(
    VAZIO_RESUMO_PLANO_APLICACAO,
  )
  const [rascunho, setRascunho] = useState<DadosResumoPlanoAplicacao>(
    VAZIO_RESUMO_PLANO_APLICACAO,
  )

  const review = useResumoPlanoAplicacaoReview({ readOnlyView, isEditing })
  const valores = useMemo(() => calcularValores(dados), [dados])

  const setLinhaCampo = useCallback(
    (id: string, campo: CampoLinhaResumo, value: string) => {
      setSaveError(null)
      setDados((prev) => ({
        linhas: prev.linhas.map((linha) => {
          if (linha.id !== id) return linha

          if (campo === "mds" || campo === "contrapartida") {
            return { ...linha, [campo]: sanitizeMoedaInput(value) }
          }

          if (campo === "codigo") {
            return { ...linha, codigo: sanitizeCodigoInput(value) }
          }

          return { ...linha, [campo]: value }
        }),
      }))
    },
    [],
  )

  const addLinha = useCallback(() => {
    setSaveError(null)
    setDados((prev) => ({
      linhas: [...prev.linhas, criarLinhaVazia()],
    }))
  }, [])

  const removeLinha = useCallback((id: string) => {
    setSaveError(null)
    setDados((prev) => {
      if (prev.linhas.length <= 1) {
        return { linhas: [criarLinhaVazia()] }
      }
      return { linhas: prev.linhas.filter((linha) => linha.id !== id) }
    })
  }, [])

  const startEditing = useCallback(() => {
    setRascunho(cloneDados(dados))
    setSaveError(null)
    setIsEditing(true)
  }, [dados])

  const cancel = useCallback(() => {
    setDados(cloneDados(rascunho))
    setSaveError(null)
    setIsEditing(false)
  }, [rascunho])

  const save = useCallback(async () => {
    setIsSaving(true)
    setSaveError(null)

    try {
      // TODO: integrar API / banco quando disponível
      setIsEditing(false)
    } catch {
      setSaveError("Não foi possível salvar o resumo do plano de aplicação.")
    } finally {
      setIsSaving(false)
    }
  }, [])

  return {
    form: dados,
    meta: { valores },
    ui: {
      isEditing,
      isSaving,
      saveError,
      isLocked: review.isLocked,
      canStartEditing: review.canStartEditing,
    },
    actions: {
      setLinhaCampo,
      addLinha,
      removeLinha,
      startEditing,
      cancel,
      save,
    },
  }
}
