"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

import { useCronograma } from "@/features/projeto/contexts/cronograma/CronogramaContext"
import type { Etapa } from "@/features/projeto/contexts/cronograma/types"
import {
  useProjectData,
  useUpdateProjectData,
} from "@/features/projeto/contexts/project-data-context"

import { saveEtapasCronograma } from "../action/saveEtapasCronograma"
import {
  createEmptyEtapa,
  createEmptyMeta,
  toEtapasCronogramaForm,
  totalGeral,
  VAZIO_ETAPAS_CRONOGRAMA,
  type DadosEtapasCronograma,
} from "../types/etapas-cronograma-form"
import { maskDataBr } from "../utils/formatters"
import { useEtapasCronogramaReview } from "./useEtapasCronogramaReview"

type UseEtapasCronogramaOptions = {
  projectId?: string
  readOnlyView?: boolean
}

type EditingValor = {
  metaIndex: number
  etapaIndex: number
  value: string
}

type MetaFormulario = DadosEtapasCronograma["metas"][number]

/**
 * Hook responsável por controlar o formulário da seção
 * "Descrição das Etapas e Cronograma".
 *
 * Responsabilidades:
 * - sincronizar os dados com o contexto;
 * - controlar modo de edição;
 * - adicionar/remover metas e etapas;
 * - atualizar valores e datas;
 * - calcular o valor total;
 * - salvar alterações;
 * - aplicar regras de revisão.
 */
export function useEtapasCronograma({
  projectId,
  readOnlyView,
}: UseEtapasCronogramaOptions) {
  const { data, replaceMetas } = useCronograma()

  const projectData = useProjectData()
  const updateProjectData = useUpdateProjectData()

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const [dadosFormulario, setDadosFormulario] =
    useState<DadosEtapasCronograma>(VAZIO_ETAPAS_CRONOGRAMA)

  const [editingValor, setEditingValor] =
    useState<EditingValor | null>(null)

  const review = useEtapasCronogramaReview({
    readOnlyView,
    isEditing,
  })

  /**
   * Restaura o formulário utilizando os dados atuais
   * do contexto do cronograma.
   */
  const resetForm = useCallback(() => {
    setDadosFormulario(toEtapasCronogramaForm(data))
    setEditingValor(null)
  }, [data])

  useEffect(() => {
    if (!isEditing) {
      resetForm()
    }
  }, [isEditing, resetForm])

  /**
   * Soma o valor total do cronograma.
   */
  const total = useMemo(
    () => totalGeral(dadosFormulario),
    [dadosFormulario],
  )

  /**
   * Atualiza uma meta específica do formulário.
   */
  const updateMetaAt = useCallback(
    (
      metaIndex: number,
      updater: (meta: MetaFormulario) => MetaFormulario,
    ) => {
      setSaveError(null)

      setDadosFormulario((prev) => ({
        metas: prev.metas.map((meta, index) =>
          index === metaIndex ? updater(meta) : meta,
        ),
      }))
    },
    [],
  )

  /**
   * Adiciona uma nova etapa à meta.
   */
  const addLinha = useCallback(
    (metaIndex: number) => {
      updateMetaAt(metaIndex, (meta) => ({
        ...meta,
        etapas: [...meta.etapas, createEmptyEtapa()],
      }))
    },
    [updateMetaAt],
  )

  /**
   * Atualiza um campo de uma etapa.
   */
  const updateEtapa = useCallback(
    (
      metaIndex: number,
      etapaIndex: number,
      field: keyof Etapa,
      value: string | number,
    ) => {
      updateMetaAt(metaIndex, (meta) => {
        const etapas = [...meta.etapas]

        etapas[etapaIndex] = {
          ...etapas[etapaIndex],
          [field]: field === "valor" ? Number(value) : value,
        }

        return {
          ...meta,
          etapas,
        }
      })
    },
    [updateMetaAt],
  )

  /**
   * Remove uma etapa da meta.
   */
  const removeEtapa = useCallback(
    (metaIndex: number, etapaIndex: number) => {
      updateMetaAt(metaIndex, (meta) => ({
        ...meta,
        etapas: meta.etapas.filter((_, index) => index !== etapaIndex),
      }))
    },
    [updateMetaAt],
  )

  /**
   * Atualiza as datas de início ou término da meta.
   */
  const updateMetaData = useCallback(
    (
      metaIndex: number,
      field: "inicio" | "termino",
      value: string,
    ) => {
      updateMetaAt(metaIndex, (meta) => ({
        ...meta,
        [field]: maskDataBr(value),
      }))
    },
    [updateMetaAt],
  )

  /**
   * Adiciona uma nova meta.
   */
  const adicionarMeta = useCallback(() => {
    setSaveError(null)

    setDadosFormulario((prev) => ({
      metas: [...prev.metas, createEmptyMeta()],
    }))
  }, [])

  /**
   * Entra em modo de edição.
   */
  const startEditing = useCallback(() => {
    setDadosFormulario(toEtapasCronogramaForm(data))
    setSaveError(null)
    setIsEditing(true)
  }, [data])

  /**
   * Cancela a edição e restaura o formulário.
   */
  const cancel = useCallback(() => {
    resetForm()
    setSaveError(null)
    setIsEditing(false)
  }, [resetForm])

  /**
   * Persiste o cronograma.
   */
  const save = useCallback(async () => {
    if (!projectId) return

    setIsSaving(true)
    setSaveError(null)

    try {
      const result = await saveEtapasCronograma({
        projectId,
        dados: dadosFormulario,
        replaceMetas,
        updateProjectData,
        currentEtapasCronograma: projectData?.etapas_cronograma,
      })

      if (!result.ok) {
        setSaveError(result.error)
        return
      }

      setIsEditing(false)
    } finally {
      setIsSaving(false)
    }
  }, [
    projectId,
    dadosFormulario,
    replaceMetas,
    updateProjectData,
    projectData?.etapas_cronograma,
  ])

  return {
    form: dadosFormulario,

    meta: {
      totalGeral: total,
      editingValor,
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
      canManageList: isEditing && !review.isLocked,
      showActionsColumn: isEditing && !review.isLocked,
    },

    actions: {
      setEditingValor,
      addLinha,
      updateEtapa,
      removeEtapa,
      updateMetaData,
      adicionarMeta,
      startEditing,
      cancel,
      save,
    },
  }
}