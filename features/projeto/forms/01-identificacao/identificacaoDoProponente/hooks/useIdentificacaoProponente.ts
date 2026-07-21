"use client"

import { toIdentificacaoProponenteForm, VAZIO_IDENTIFICACAO_PROPONENTE, type DadosIdentificacaoProponente } from "../types/proponente-form"
import { useIdentificacaoProponenteReview } from "./useIdentificacaoProponenteReview"
import { saveIdentificacaoProponente } from "../action/saveIdentificacaoProponente"
import type { ProjectSession01Identificacao } from "@/features/projeto/types/project-session-01-identificacao"
import { formatCEP, formatCNPJ, formatTelefone } from "../utils/formatters"
import { useCallback, useEffect, useState, type ChangeEvent } from "react"
import { fetchProjectSession01Identificacao } from "@/features/projeto/services"
import { useProponenteLocalidade } from "./useProponenteLocalidade"
import { useAsyncData } from "@/hooks/use-async-data"

type UseIdentificacaoProponenteOptions = {
  projectId?: string
  readOnlyView?: boolean
}

/**
 * Hook responsÃ¡vel pela lÃ³gica do formulÃ¡rio de
 * IdentificaÃ§Ã£o do(a) Proponente.
 *
 * Responsabilidades:
 * - carregar dados da API;
 * - controlar ediÃ§Ã£o;
 * - salvar alteraÃ§Ãµes;
 * - aplicar mÃ¡scaras de CNPJ/CEP/telefone;
 * - sincronizar UF/municÃ­pio e ViaCEP;
 * - aplicar regras de revisÃ£o.
 */
export function useIdentificacaoProponente({
  projectId,
  readOnlyView,
}: UseIdentificacaoProponenteOptions) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [dadosFormulario, setDadosFormulario] =
    useState<DadosIdentificacaoProponente>(VAZIO_IDENTIFICACAO_PROPONENTE)

  const review = useIdentificacaoProponenteReview({
    readOnlyView,
    isEditing,
  })

  const localidade = useProponenteLocalidade({
    isEditing,
    dados: dadosFormulario,
    setDados: setDadosFormulario,
  })

  const loadIdentificacao = useCallback(async () => {
    if (!projectId) return null
    return fetchProjectSession01Identificacao(projectId)
  }, [projectId])

  const { data: identificacao, reload } = useAsyncData(loadIdentificacao, {
    initialData: null as ProjectSession01Identificacao | null,
    errorMessage: "NÃ£o foi possÃ­vel carregar o proponente.",
    loadOnMount: Boolean(projectId),
  })

  const resetForm = useCallback((data: ProjectSession01Identificacao | null) => {
    setDadosFormulario(toIdentificacaoProponenteForm(data))
  }, [])

  useEffect(() => {
    if (projectId) void reload()
  }, [projectId, reload])

  useEffect(() => {
    resetForm(identificacao)
  }, [identificacao, resetForm])

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      let { name, value } = event.target
      setSaveError(null)

      if (name === "cnpj") value = formatCNPJ(value)
      else if (name === "telefoneFax") value = formatTelefone(value)
      else if (name === "cep") {
        value = formatCEP(value)
        localidade.resetCepStatus()

        const digits = value.replace(/\D/g, "")
        setDadosFormulario((prev) => ({
          ...prev,
          cep: value,
          ...(digits.length < 8
            ? {
                uf: "",
                ufIbge: null,
                municipio: "",
                municipioIbge: null,
                bairro: "",
              }
            : {}),
        }))
        return
      }

      setDadosFormulario((prev) => ({ ...prev, [name]: value }))
    },
    [localidade.resetCepStatus],
  )

  const handleSelectChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = event.target
      setSaveError(null)

      if (name === "uf") {
        const estadoEncontrado = localidade.estados.find(
          (estado) => String(estado.id) === value,
        )
        setDadosFormulario((prev) => ({
          ...prev,
          uf: estadoEncontrado?.sigla ?? "",
          ufIbge: estadoEncontrado?.id ?? null,
          municipio: "",
          municipioIbge: null,
        }))
        return
      }

      if (name === "municipio") {
        const municipioEncontrado = localidade.municipios.find(
          (municipio) => String(municipio.id) === value,
        )
        setDadosFormulario((prev) => ({
          ...prev,
          municipio: municipioEncontrado?.nome ?? "",
          municipioIbge: municipioEncontrado?.id ?? null,
        }))
        return
      }

      setDadosFormulario((prev) => ({ ...prev, [name]: value }))
    },
    [localidade.estados, localidade.municipios],
  )

  const startEditing = useCallback(() => {
    setIsEditing(true)
  }, [])

  const cancel = useCallback(() => {
    resetForm(identificacao)
    setSaveError(null)
    setIsEditing(false)
  }, [identificacao, resetForm])

  const save = useCallback(async () => {
    if (!projectId) return

    setIsSaving(true)
    setSaveError(null)

    try {
      const result = await saveIdentificacaoProponente(
        projectId,
        dadosFormulario,
      )

      if (!result.ok) { setSaveError(result.error); return }
      if (result.data) resetForm(result.data)

      setIsEditing(false)
      await reload()
    } finally {
      setIsSaving(false)
    }
  }, [projectId, dadosFormulario, resetForm, reload])

  return {
    form: dadosFormulario,
    localidade: {
      cepStatus: localidade.cepStatus,
      estados: localidade.estados,
      municipios: localidade.municipios,
      carregandoMunicipios: localidade.carregandoMunicipios,
      isCepCompleto: localidade.isCepCompleto,
    },
    review: {
      fieldClass: review.fieldClass,
    },
    ui: {
      isEditing,
      isSaving,
      saveError,
      isLocked: review.isLocked,
      isCampoLocked: review.isCampoLocked,
      isViewMode: review.isViewMode,
      canStartEditing: review.canStartEditing,
    },
    actions: {
      handleChange,
      handleSelectChange,
      startEditing,
      cancel,
      save,
    },
  }
}
