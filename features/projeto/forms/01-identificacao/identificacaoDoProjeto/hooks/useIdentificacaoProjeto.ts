"use client"

import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
} from "react"

import {
  useProjectData,
  useUpdateProjectData,
} from "@/features/projeto/contexts/project-data-context"
import { fetchTedIdentificacao } from "@/features/projeto/services"
import type { TedIdentificacao } from "@/features/projeto/types/ted-identificacao"
import { useAsyncData } from "@/hooks/use-async-data"

import { saveIdentificacaoProjeto } from "../action/saveIdentificacaoProjeto"
import {
  toIdentificacaoProjetoForm,
  VAZIO_IDENTIFICACAO_PROJETO,
  type DadosIdentificacaoProjeto,
} from "../types/identificacao-form"
import { useIdentificacaoReview } from "./useIdentificacaoReview"

type UseIdentificacaoProjetoOptions = {
  projectId?: string
  readOnlyView?: boolean
}

/**
 * Hook responsável por toda a lógica do formulário de
 * Identificação do Projeto.
 *
 * Responsabilidades:
 * - carregar dados da API;
 * - controlar edição;
 * - salvar alterações;
 * - sincronizar o contexto do projeto;
 * - aplicar regras de revisão.
 */
export function useIdentificacaoProjeto({
  projectId,
  readOnlyView,
}: UseIdentificacaoProjetoOptions) {
  const projectData = useProjectData()
  const updateProjectData = useUpdateProjectData()
  const nomeProjeto = projectData?.nome ?? ""

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [dadosFormulario, setDadosFormulario] =
    useState<DadosIdentificacaoProjeto>(
      VAZIO_IDENTIFICACAO_PROJETO,
    )

  const review = useIdentificacaoReview({
    readOnlyView,
    isEditing,
  })

  const loadIdentificacao = useCallback(async () => {
    if (!projectId) return null

    return fetchTedIdentificacao(projectId)
  }, [projectId])

  const { data: identificacao, reload } = useAsyncData(
    loadIdentificacao,
    {
      initialData: null as TedIdentificacao | null,
      errorMessage:
        "Não foi possível carregar a identificação do projeto.",
      loadOnMount: Boolean(projectId),
    },
  )

  /**
   * Sincroniza o estado do formulário com os dados vindos da API.
   */
  const resetForm = useCallback(
    (data: TedIdentificacao | null) => {
      setDadosFormulario(
        toIdentificacaoProjetoForm(data, nomeProjeto),
      )
    },
    [nomeProjeto],
  )

  /**
   * Atualiza o formulário e o contexto global após salvar.
   */
  const atualizarFormulario = useCallback(
    (salvo: TedIdentificacao) => {
      resetForm(salvo)

      updateProjectData({
        identificacao: {
          ...projectData?.identificacao,
          projeto: {
            nome: nomeProjeto,
            local_execucao: salvo.localExecucao ?? "",
            duracao: salvo.duracao ?? "",
            resumo: salvo.resumoProjeto ?? "",
          },
        },
      })
    },
    [
      resetForm,
      updateProjectData,
      projectData,
      nomeProjeto,
    ],
  )

  useEffect(() => {
    if (projectId) {
      void reload()
    }
  }, [projectId, reload])

  useEffect(() => {
    resetForm(identificacao)
  }, [identificacao, resetForm])

  /**
   * Atualiza um campo do formulário.
   */
  const handleChange = useCallback(
    (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      const { name, value } = event.target

      setSaveError(null)

      setDadosFormulario((prev) => ({
        ...prev,
        [name]: value,
      }))
    },
    [],
  )

  /**
   * Habilita o modo de edição.
   */
  const startEditing = useCallback(() => {
    setIsEditing(true)
  }, [])

  /**
   * Descarta alterações locais.
   */
  const cancel = useCallback(() => {
    resetForm(identificacao)
    setSaveError(null)
    setIsEditing(false)
  }, [identificacao, resetForm])

  /**
   * Persiste o formulário.
   */
  const save = useCallback(async () => {
    if (!projectId) return

    setIsSaving(true)
    setSaveError(null)

    try {
      const result = await saveIdentificacaoProjeto(projectId, {
        localExecucao: dadosFormulario.localExecucao,
        duracao: dadosFormulario.duracao,
        resumoProjeto: dadosFormulario.resumoProjeto,
      })

      if (!result.ok) {
        setSaveError(result.error)
        return
      }

      if (result.data) {
        atualizarFormulario(result.data)
      }

      setIsEditing(false)

      await reload()
    } finally {
      setIsSaving(false)
    }
  }, [
    projectId,
    dadosFormulario,
    atualizarFormulario,
    reload,
  ])

  return {
    form: dadosFormulario,

    review: review.attention,

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
      startEditing,
      cancel,
      save,
    },
  }
}