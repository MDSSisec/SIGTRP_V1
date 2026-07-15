"use client"

import { toIdentificacaoProponenteForm, VAZIO_IDENTIFICACAO_PROPONENTE, type DadosIdentificacaoProponente } from "../types/proponente-form"
import { useIdentificacaoProponenteReview } from "./useIdentificacaoProponenteReview"
import { saveIdentificacaoProponente } from "../action/saveIdentificacaoProponente"
import type { TedIdentificacao } from "@/features/projeto/types/ted-identificacao"
import { formatCEP, formatCNPJ, formatTelefone } from "../utils/formatters"
import { useCallback, useEffect, useState, type ChangeEvent } from "react"
import { fetchTedIdentificacao } from "@/features/projeto/services"
import { useProponenteLocalidade } from "./useProponenteLocalidade"
import { useAsyncData } from "@/hooks/use-async-data"

type UseIdentificacaoProponenteOptions = {
  projectId?: string
  readOnlyView?: boolean
}

/**
 * Hook responsável pela lógica do formulário de
 * Identificação do(a) Proponente.
 *
 * Responsabilidades:
 * - carregar dados da API;
 * - controlar edição;
 * - salvar alterações;
 * - aplicar máscaras de CNPJ/CEP/telefone;
 * - sincronizar UF/município e ViaCEP;
 * - aplicar regras de revisão.
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
    return fetchTedIdentificacao(projectId)
  }, [projectId])

  const { data: identificacao, reload } = useAsyncData(loadIdentificacao, {
    initialData: null as TedIdentificacao | null,
    errorMessage: "Não foi possível carregar o proponente.",
    loadOnMount: Boolean(projectId),
  })

  const resetForm = useCallback((data: TedIdentificacao | null) => {
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
    },
    review: {
      fieldClass: review.fieldClass,
    },
    ui: {
      isEditing,
      isSaving,
      saveError,
      isLocked: review.isLocked,
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
