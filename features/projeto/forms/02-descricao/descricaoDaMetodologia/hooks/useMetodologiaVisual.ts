"use client"

import { useCallback, useState } from "react"

import { METODOLOGIA_ETAPAS_VISUAIS } from "@/features/projeto/constants/metodologia"

/** Estado visual da seção Metodologia. */
type DadosMetodologiaVisual = {
  metaTexto: string
  etapasTexto: Record<string, string>
}

type UseMetodologiaVisualOptions = {
  readOnlyView?: boolean
}

/**
 * Cria o objeto inicial contendo todas as etapas da metodologia.
 */
function createEmptyEtapas(): Record<string, string> {
  return Object.fromEntries(
    METODOLOGIA_ETAPAS_VISUAIS.map((etapa) => [
      `metodologia-${etapa.item.replaceAll(".", "-")}`,
      "",
    ]),
  )
}

/** Estado inicial da seção. */
const VAZIO_METODOLOGIA: DadosMetodologiaVisual = {
  metaTexto: "",
  etapasTexto: createEmptyEtapas(),
}

/**
 * Clona os dados para evitar compartilhamento de referências.
 */
function cloneDados(
  dados: DadosMetodologiaVisual,
): DadosMetodologiaVisual {
  return {
    metaTexto: dados.metaTexto,
    etapasTexto: { ...dados.etapasTexto },
  }
}

/**
 * Hook responsável pelo estado visual da seção Metodologia.
 *
 * Atualmente os dados permanecem apenas em memória.
 * A persistência será implementada quando a API da seção
 * estiver disponível.
 */
export function useMetodologiaVisual({
  readOnlyView,
}: UseMetodologiaVisualOptions) {
  const [isEditing, setIsEditing] = useState(false)

  const [dados, setDados] =
    useState<DadosMetodologiaVisual>(VAZIO_METODOLOGIA)

  const [rascunho, setRascunho] =
    useState<DadosMetodologiaVisual>(VAZIO_METODOLOGIA)

  const isLocked = Boolean(readOnlyView) || !isEditing
  const canStartEditing = !readOnlyView

  /**
   * Entra em modo de edição preservando o estado atual.
   */
  const startEditing = useCallback(() => {
    setRascunho(cloneDados(dados))
    setIsEditing(true)
  }, [dados])

  /**
   * Restaura os dados anteriores e cancela a edição.
   */
  const cancel = useCallback(() => {
    setDados(cloneDados(rascunho))
    setIsEditing(false)
  }, [rascunho])

  /**
   * Finaliza a edição.
   *
   * Atualmente não existe persistência.
   */
  const save = useCallback(() => {
    setIsEditing(false)
  }, [])

  /**
   * Atualiza o texto da meta.
   */
  const setMetaTexto = useCallback((value: string) => {
    setDados((prev) => ({
      ...prev,
      metaTexto: value,
    }))
  }, [])

  /**
   * Atualiza o texto de uma etapa.
   */
  const setEtapaTexto = useCallback(
    (id: string, value: string) => {
      setDados((prev) => ({
        ...prev,
        etapasTexto: {
          ...prev.etapasTexto,
          [id]: value,
        },
      }))
    },
    [],
  )

  return {
    form: dados,

    ui: {
      isEditing,
      isLocked,
      canStartEditing,
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