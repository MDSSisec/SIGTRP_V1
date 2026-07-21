"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

import { fetchProjectSession05Financial } from "@/features/projeto/services/project-session-05-financial.service"
import type { ProjectSession05Financial } from "@/features/projeto/types/project-session-05-financial"
import { useAsyncData } from "@/hooks/use-async-data"

import { saveCronogramaDesembolso } from "../action/saveCronogramaDesembolso"
import {
  toCronogramaDesembolsoForm,
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
  projectId,
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

  const loadFinanceiro = useCallback(async () => {
    if (!projectId) return null
    return fetchProjectSession05Financial(projectId)
  }, [projectId])

  const { data: financeiro, reload } = useAsyncData(loadFinanceiro, {
    initialData: null as ProjectSession05Financial | null,
    errorMessage: "Não foi possível carregar o cronograma de desembolso.",
    loadOnMount: Boolean(projectId),
  })

  const resetForm = useCallback((data: ProjectSession05Financial | null) => {
    setDados(toCronogramaDesembolsoForm(data))
  }, [])

  useEffect(() => {
    if (projectId && !isEditing) {
      resetForm(financeiro)
    }
  }, [projectId, financeiro, isEditing, resetForm])

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
    if (!projectId) return

    setIsSaving(true)
    setSaveError(null)

    try {
      const result = await saveCronogramaDesembolso(projectId, dados)
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
