"use client"

import { useCallback, useMemo, useState } from "react"

import {
  VAZIO_CRONOGRAMA_DESEMBOLSO,
  type CampoParcela,
  type DadosCronogramaDesembolso,
} from "../types"
import {
  calcularValores,
  maskMesAno,
  sanitizeMoedaInput,
} from "../utils"
import { useCronogramaDesembolsoReview } from "./useCronogramaDesembolsoReview"

type UseCronogramaDesembolsoOptions = {
  projectId?: string
  readOnlyView?: boolean
}

function cloneDados(
  dados: DadosCronogramaDesembolso,
): DadosCronogramaDesembolso {
  return {
    parcelas: dados.parcelas.map((parcela) => ({ ...parcela })),
  }
}

/**
 * Lógica do formulário de Cronograma de desembolso.
 */
export function useCronogramaDesembolso({
  readOnlyView,
}: UseCronogramaDesembolsoOptions) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [dados, setDados] = useState<DadosCronogramaDesembolso>(
    VAZIO_CRONOGRAMA_DESEMBOLSO,
  )
  const [rascunho, setRascunho] = useState<DadosCronogramaDesembolso>(
    VAZIO_CRONOGRAMA_DESEMBOLSO,
  )

  const review = useCronogramaDesembolsoReview({ readOnlyView, isEditing })
  const valores = useMemo(() => calcularValores(dados), [dados])

  const setParcelaCampo = useCallback(
    (index: number, campo: CampoParcela, value: string) => {
      setSaveError(null)
      setDados((prev) => ({
        parcelas: prev.parcelas.map((parcela, i) => {
          if (i !== index) return parcela

          if (campo === "mesAno") {
            return { ...parcela, mesAno: maskMesAno(value) }
          }

          return { ...parcela, [campo]: sanitizeMoedaInput(value) }
        }),
      }))
    },
    [],
  )

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
      setSaveError("Não foi possível salvar o cronograma de desembolso.")
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
      setParcelaCampo,
      startEditing,
      cancel,
      save,
    },
  }
}
