"use client"

import { useCallback, useState } from "react"

import { isIdExclusivo } from "@/features/projeto/constants/povos-ou-comunidades-tradicionais"

import { savePovosOuComunidadesTradicionais } from "../action/savePovosOuComunidadesTradicionais"
import {
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

  const toggle = useCallback(
    (id: string, checked: boolean) => {
      if (isLocked) return

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
      const result = await savePovosOuComunidadesTradicionais({
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
    meta: { exclusivoMarcado },
    ui: { isEditing, isLocked, isSaving, canStartEditing },
    actions: { toggle, setOutrosEspecificar, startEditing, cancel, save },
  }
}
