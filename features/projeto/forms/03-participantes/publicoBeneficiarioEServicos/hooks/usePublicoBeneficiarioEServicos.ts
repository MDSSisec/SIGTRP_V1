"use client"

import { useCallback, useEffect, useState } from "react"

import { PUBLICO_BENEFICIARIO_ESERVICOS_OUTROS_ID } from "@/features/projeto/constants/publico-beneficiario-e-servico"
import { fetchProjectSession03Participants } from "@/features/projeto/services/project-session-03-participants.service"
import type { ProjectSession03Participants } from "@/features/projeto/types/project-session-03-participants"
import { useAsyncData } from "@/hooks/use-async-data"

import { savePublicoBeneficiarioEServicos } from "../action/savePublicoBeneficiarioEServicos"
import {
  toPublicoBeneficiarioEServicosForm,
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
  const [saveError, setSaveError] = useState<string | null>(null)
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

  const loadParticipantes = useCallback(async () => {
    if (!projectId) return null
    return fetchProjectSession03Participants(projectId)
  }, [projectId])

  const { data: participantes, reload } = useAsyncData(loadParticipantes, {
    initialData: null as ProjectSession03Participants | null,
    errorMessage:
      "Não foi possível carregar o público beneficiário e serviços.",
    loadOnMount: Boolean(projectId),
  })

  const resetForm = useCallback((data: ProjectSession03Participants | null) => {
    setDados(toPublicoBeneficiarioEServicosForm(data))
  }, [])

  useEffect(() => {
    if (projectId) {
      resetForm(participantes)
    }
  }, [projectId, participantes, resetForm])

  const toggle = useCallback(
    (id: string, checked: boolean) => {
      if (isLocked) return

      setSaveError(null)
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
      setSaveError(null)
      setDados((prev) => ({ ...prev, outrosEspecificar: value }))
    },
    [isLocked],
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
      const result = await savePublicoBeneficiarioEServicos({
        projectId,
        dados,
      })
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
  }, [dados, projectId, resetForm, reload])

  return {
    form: dados,
    meta: { outrosMarcado },
    ui: {
      isEditing,
      isLocked,
      isSaving,
      saveError,
      canStartEditing,
    },
    actions: { toggle, setOutrosEspecificar, startEditing, cancel, save },
  }
}
