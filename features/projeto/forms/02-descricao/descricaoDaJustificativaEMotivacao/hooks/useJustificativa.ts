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

import { saveJustificativa } from "../action/saveJustificativa"
import { JUSTIFICATIVA_MAX_LENGTH } from "../constants/form"
import {
  toJustificativaForm,
  VAZIO_JUSTIFICATIVA,
  type DadosJustificativa,
} from "../types/justificativa-form"
import { useJustificativaReview } from "./useJustificativaReview"

/** Opções de inicialização do hook. */
type UseJustificativaOptions = {
  /** Identificador do projeto. */
  projectId?: string

  /** Indica se o formulário será exibido somente para visualização. */
  readOnlyView?: boolean
}

/**
 * Gerencia toda a lógica da seção
 * "Descrição da Justificativa e Motivação".
 *
 * Responsabilidades:
 * - carregar os dados do contexto do projeto;
 * - controlar o modo de edição;
 * - controlar o processo de salvamento;
 * - limitar o tamanho dos textos;
 * - restaurar os dados originais;
 * - aplicar as regras de revisão;
 * - disponibilizar estados e ações para a interface.
 */
export function useJustificativa({
  projectId,
  readOnlyView,
}: UseJustificativaOptions) {
  const projectData = useProjectData()
  const updateProjectData = useUpdateProjectData()

  /** Controla o modo de edição do formulário. */
  const [isEditing, setIsEditing] = useState(false)

  /** Indica se existe um salvamento em andamento. */
  const [isSaving, setIsSaving] = useState(false)

  /** Mensagem de erro exibida na interface. */
  const [saveError, setSaveError] = useState<string | null>(null)

  /** Estado local do formulário. */
  const [dadosFormulario, setDadosFormulario] =
    useState<DadosJustificativa>(VAZIO_JUSTIFICATIVA)

  /** Regras relacionadas ao processo de revisão. */
  const review = useJustificativaReview({
    readOnlyView,
    isEditing,
  })

  /**
   * Recarrega os dados do formulário a partir do contexto
   * do projeto.
   */
  const resetForm = useCallback(() => {
    setDadosFormulario(toJustificativaForm(projectData))
  }, [projectData])

  /** Mantém o formulário sincronizado com o contexto. */
  useEffect(() => {
    resetForm()
  }, [resetForm])

  /**
   * Atualiza um campo do formulário.
   *
   * Também remove mensagens de erro anteriores e garante
   * o limite máximo de caracteres.
   */
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = event.target

      setSaveError(null)

      setDadosFormulario((prev) => ({
        ...prev,
        [name]: value.slice(0, JUSTIFICATIVA_MAX_LENGTH),
      }))
    },
    [],
  )

  /** Habilita o modo de edição. */
  const startEditing = useCallback(() => {
    setIsEditing(true)
    setSaveError(null)
  }, [])

  /**
   * Cancela a edição e restaura os dados carregados
   * originalmente.
   */
  const cancel = useCallback(() => {
    resetForm()
    setSaveError(null)
    setIsEditing(false)
  }, [resetForm])

  /**
   * Persiste as alterações realizadas pelo usuário.
   */
  const save = useCallback(async () => {
    if (!projectId) return

    setIsSaving(true)
    setSaveError(null)

    try {
      const result = await saveJustificativa({
        projectId,
        dados: dadosFormulario,
        currentDescricao: projectData?.descricao_projeto,
        updateProjectData,
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
    projectData?.descricao_projeto,
    updateProjectData,
  ])

  return {
    /** Estado do formulário. */
    form: dadosFormulario,

    /** Informações relacionadas à revisão. */
    review: {
      fieldClass: review.fieldClass,
    },

    /** Estados utilizados pela interface. */
    ui: {
      isEditing,
      isSaving,
      saveError,
      isLocked: review.isLocked,
      isViewMode: review.isViewMode,
      canStartEditing: review.canStartEditing,
    },

    /** Ações disponíveis para o componente. */
    actions: {
      handleChange,
      startEditing,
      cancel,
      save,
    },
  }
}