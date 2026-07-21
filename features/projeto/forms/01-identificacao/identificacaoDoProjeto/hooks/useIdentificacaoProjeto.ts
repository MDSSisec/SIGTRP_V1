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
import { fetchProjectSession01Identificacao } from "@/features/projeto/services"
import type { ProjectSession01Identificacao } from "@/features/projeto/types/project-session-01-identificacao"
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
 * Hook responsÃ¡vel por toda a lÃ³gica do formulÃ¡rio de
 * IdentificaÃ§Ã£o do Projeto.
 *
 * Responsabilidades:
 * - carregar dados da API;
 * - controlar ediÃ§Ã£o;
 * - salvar alteraÃ§Ãµes;
 * - sincronizar o contexto do projeto;
 * - aplicar regras de revisÃ£o.
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

    return fetchProjectSession01Identificacao(projectId)
  }, [projectId])

  const { data: identificacao, reload } = useAsyncData(
    loadIdentificacao,
    {
      initialData: null as ProjectSession01Identificacao | null,
      errorMessage:
        "NÃ£o foi possÃ­vel carregar a identificaÃ§Ã£o do projeto.",
      loadOnMount: Boolean(projectId),
    },
  )

  /**
   * Sincroniza o estado do formulÃ¡rio com os dados vindos da API.
   */
  const resetForm = useCallback(
    (data: ProjectSession01Identificacao | null) => {
      setDadosFormulario(
        toIdentificacaoProjetoForm(data, nomeProjeto),
      )
    },
    [nomeProjeto],
  )

  /**
   * Atualiza o formulÃ¡rio e o contexto global apÃ³s salvar.
   */
  const atualizarFormulario = useCallback(
    (salvo: ProjectSession01Identificacao) => {
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
   * Atualiza um campo do formulÃ¡rio.
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
   * Habilita o modo de ediÃ§Ã£o.
   */
  const startEditing = useCallback(() => {
    setIsEditing(true)
  }, [])

  /**
   * Descarta alteraÃ§Ãµes locais.
   */
  const cancel = useCallback(() => {
    resetForm(identificacao)
    setSaveError(null)
    setIsEditing(false)
  }, [identificacao, resetForm])

  /**
   * Persiste o formulÃ¡rio.
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
      startEditing,
      cancel,
      save,
    },
  }
}