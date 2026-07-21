"use client"

import { useCallback, useEffect, useState } from "react"

import { isIdExclusivo } from "@/features/projeto/constants/povos-ou-comunidades-tradicionais"
import { fetchProjectSession03Participants } from "@/features/projeto/services/project-session-03-participants.service"
import type { ProjectSession03Participants } from "@/features/projeto/types/project-session-03-participants"
import { useAsyncData } from "@/hooks/use-async-data"

import { savePovosOuComunidadesTradicionais } from "../action/savePovosOuComunidadesTradicionais"
import {
  toPovosOuComunidadesTradicionaisForm,
  VAZIO_POVOS_OU_COMUNIDADES_TRADICIONAIS,
  type DadosPovosOuComunidadesTradicionais,
} from "../types/povos-ou-comunidades-tradicionais-form"

type UsePovosOuComunidadesTradicionaisOptions = {
  projectId?: string
  readOnlyView?: boolean
}

function cloneDados(
  dados: DadosPovosOuComunidadesTradicionais,
): DadosPovosOuComunidadesTradicionais {
  return {
    selecoes: [...dados.selecoes],
    outrosEspecificar: dados.outrosEspecificar,
  }
}

/**
 * Lógica do formulário de Povos ou comunidades tradicionais.
 */
export function usePovosOuComunidadesTradicionais({
  projectId,
  readOnlyView,
}: UsePovosOuComunidadesTradicionaisOptions) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [dados, setDados] = useState<DadosPovosOuComunidadesTradicionais>(
    VAZIO_POVOS_OU_COMUNIDADES_TRADICIONAIS,
  )
  const [rascunho, setRascunho] =
    useState<DadosPovosOuComunidadesTradicionais>(
      VAZIO_POVOS_OU_COMUNIDADES_TRADICIONAIS,
    )

  const isLocked = Boolean(readOnlyView) || !isEditing
  const canStartEditing = !readOnlyView
  const exclusivoMarcado = dados.selecoes.find(isIdExclusivo)

  const loadParticipantes = useCallback(async () => {
    if (!projectId) return null
    return fetchProjectSession03Participants(projectId)
  }, [projectId])

  const { data: participantes, reload } = useAsyncData(loadParticipantes, {
    initialData: null as ProjectSession03Participants | null,
    errorMessage:
      "Não foi possível carregar povos ou comunidades tradicionais.",
    loadOnMount: Boolean(projectId),
  })

  const resetForm = useCallback((data: ProjectSession03Participants | null) => {
    setDados(toPovosOuComunidadesTradicionaisForm(data))
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
        if (isIdExclusivo(id)) {
          return {
            ...prev,
            selecoes: checked ? [id] : [],
            outrosEspecificar: checked ? prev.outrosEspecificar : "",
          }
        }

        if (prev.selecoes.some(isIdExclusivo)) return prev

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
      const result = await savePovosOuComunidadesTradicionais({
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
    meta: { exclusivoMarcado },
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
