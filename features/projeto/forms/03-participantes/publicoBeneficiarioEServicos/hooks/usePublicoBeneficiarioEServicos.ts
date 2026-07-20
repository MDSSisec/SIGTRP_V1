"use client"

import { useCallback, useState } from "react"

import { PUBLICO_BENEFICIARIO_ESERVICOS_OUTROS_ID } from "@/features/projeto/constants/publico-beneficiario-e-servico"

import { savePublicoBeneficiarioEServicos } from "../action/savePublicoBeneficiarioEServicos"
import {
  VAZIO_PUBLICO_BENEFICIARIO_E_SERVICOS,
  type DadosPublicoBeneficiarioEServicos,
} from "../types/publico-beneficiario-e-servicos-form"

type UsePublicoBeneficiarioEServicosOptions = {
  projectId?: string
  readOnlyView?: boolean
}

function cloneDados(
  dados: DadosPublicoBeneficiarioEServicos,
): DadosPublicoBeneficiarioEServicos {
  return {
    selecoes: [...dados.selecoes],
    outrosEspecificar: dados.outrosEspecificar,
  }
}

/**
 * Lógica do formulário de Público beneficiário e serviços.
 */
export function usePublicoBeneficiarioEServicos({
  projectId,
  readOnlyView,
}: UsePublicoBeneficiarioEServicosOptions) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [dados, setDados] = useState<DadosPublicoBeneficiarioEServicos>(
    VAZIO_PUBLICO_BENEFICIARIO_E_SERVICOS,
  )
  const [rascunho, setRascunho] = useState<DadosPublicoBeneficiarioEServicos>(
    VAZIO_PUBLICO_BENEFICIARIO_E_SERVICOS,
  )

  const isLocked = Boolean(readOnlyView) || !isEditing
  const canStartEditing = !readOnlyView
  const outrosMarcado = dados.selecoes.includes(
    PUBLICO_BENEFICIARIO_ESERVICOS_OUTROS_ID,
  )

  const toggle = useCallback(
    (id: string, checked: boolean) => {
      if (isLocked) return

      setDados((prev) => {
        if (id === PUBLICO_BENEFICIARIO_ESERVICOS_OUTROS_ID) {
          return {
            ...prev,
            selecoes: checked ? [PUBLICO_BENEFICIARIO_ESERVICOS_OUTROS_ID] : [],
            outrosEspecificar: checked ? prev.outrosEspecificar : "",
          }
        }

        if (prev.selecoes.includes(PUBLICO_BENEFICIARIO_ESERVICOS_OUTROS_ID)) {
          return prev
        }

        return {
          ...prev,
          selecoes: checked
            ? [...prev.selecoes, id]
            : prev.selecoes.filter((item) => item !== id),
        }
      })
    },
    [isLocked],
  )

  const setOutrosEspecificar = useCallback(
    (value: string) => {
      if (isLocked) return
      setDados((prev) => ({ ...prev, outrosEspecificar: value }))
    },
    [isLocked],
  )

  const startEditing = useCallback(() => {
    setRascunho(cloneDados(dados))
    setIsEditing(true)
  }, [dados])

  const cancel = useCallback(() => {
    setDados(cloneDados(rascunho))
    setIsEditing(false)
  }, [rascunho])

  const save = useCallback(async () => {
    setIsSaving(true)
    try {
      const result = await savePublicoBeneficiarioEServicos({
        projectId,
        dados,
      })
      if (result.ok) {
        setIsEditing(false)
      }
    } finally {
      setIsSaving(false)
    }
  }, [dados, projectId])

  return {
    form: dados,
    meta: { outrosMarcado },
    ui: { isEditing, isLocked, isSaving, canStartEditing },
    actions: { toggle, setOutrosEspecificar, startEditing, cancel, save },
  }
}
