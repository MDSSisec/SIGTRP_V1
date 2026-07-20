"use client"

import { useCallback, useState } from "react"

import { isIdExclusivo } from "@/features/projeto/constants/perfil-socio-ocupacional"

import { savePerfilSocioOcupacional } from "../action/savePerfilSocioOcupacional"
import {
  VAZIO_PERFIL_SOCIO_OCUPACIONAL,
  type DadosPerfilSocioOcupacional,
} from "../types/perfil-socio-ocupacional-form"

type UsePerfilSocioOcupacionalOptions = {
  projectId?: string
  readOnlyView?: boolean
}

function cloneDados(
  dados: DadosPerfilSocioOcupacional,
): DadosPerfilSocioOcupacional {
  return {
    selecoes: [...dados.selecoes],
    outrosEspecificar: dados.outrosEspecificar,
  }
}

/**
 * Lógica do formulário de Perfil sócio-ocupacional.
 */
export function usePerfilSocioOcupacional({
  projectId,
  readOnlyView,
}: UsePerfilSocioOcupacionalOptions) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [dados, setDados] = useState<DadosPerfilSocioOcupacional>(
    VAZIO_PERFIL_SOCIO_OCUPACIONAL,
  )
  const [rascunho, setRascunho] = useState<DadosPerfilSocioOcupacional>(
    VAZIO_PERFIL_SOCIO_OCUPACIONAL,
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
      const result = await savePerfilSocioOcupacional({
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
