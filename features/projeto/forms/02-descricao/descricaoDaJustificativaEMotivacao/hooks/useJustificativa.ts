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
import { fetchProjectSession02Description } from "@/features/projeto/services"
import type { ProjectSession02Description } from "@/features/projeto/types/project-session-02-description"
import { useAsyncData } from "@/hooks/use-async-data"

import { saveJustificativa } from "../action/saveJustificativa"
import { JUSTIFICATIVA_MAX_LENGTH } from "../constants/form"
import {
  toJustificativaForm,
  VAZIO_JUSTIFICATIVA,
  type DadosJustificativa,
} from "../types/justificativa-form"
import { useJustificativaReview } from "./useJustificativaReview"

/** OpÃ§Ãµes de inicializaÃ§Ã£o do hook. */
type UseJustificativaOptions = {
  /** Identificador do projeto. */
  projectId?: string

  /** Indica se o formulÃ¡rio serÃ¡ exibido somente para visualizaÃ§Ã£o. */
  readOnlyView?: boolean
}

/**
 * Gerencia toda a lÃ³gica da seÃ§Ã£o
 * "DescriÃ§Ã£o da Justificativa e MotivaÃ§Ã£o".
 */
export function useJustificativa({
  projectId,
  readOnlyView,
}: UseJustificativaOptions) {
  const projectData = useProjectData()
  const updateProjectData = useUpdateProjectData()

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [dadosFormulario, setDadosFormulario] =
    useState<DadosJustificativa>(VAZIO_JUSTIFICATIVA)

  const review = useJustificativaReview({
    readOnlyView,
    isEditing,
  })

  const loadDescricao = useCallback(async () => {
    if (!projectId) return null
    return fetchProjectSession02Description(projectId)
  }, [projectId])

  const { data: descricao, reload } = useAsyncData(loadDescricao, {
    initialData: null as ProjectSession02Description | null,
    errorMessage: "NÃ£o foi possÃ­vel carregar a justificativa do projeto.",
    loadOnMount: Boolean(projectId),
  })

  const resetForm = useCallback((data: ProjectSession02Description | null) => {
    setDadosFormulario(toJustificativaForm(data))
  }, [])

  const atualizarFormulario = useCallback(
    (salvo: ProjectSession02Description) => {
      resetForm(salvo)

      updateProjectData({
        descricao_projeto: {
          ...projectData?.descricao_projeto,
          publico_alvo: salvo.justificativaPublicoAlvo ?? "",
          problema: salvo.justificativaProblema ?? "",
          resultados_esperados: salvo.justificativaResultadosEsperados ?? "",
          relacao_proposta_programa: salvo.justificativaRelacaoPrograma ?? "",
          justificativa_motivacao: {
            caracterizacao_interesses_reciprocos:
              salvo.justificativaCaracterizacaoInteresses ?? "",
            publico_alvo: salvo.justificativaPublicoAlvo ?? "",
            problema: salvo.justificativaProblema ?? "",
            resultados_esperados: salvo.justificativaResultadosEsperados ?? "",
            relacao_proposta_programa:
              salvo.justificativaRelacaoPrograma ?? "",
          },
        },
      })
    },
    [resetForm, updateProjectData, projectData?.descricao_projeto],
  )

  useEffect(() => {
    if (projectId) {
      void reload()
    }
  }, [projectId, reload])

  useEffect(() => {
    resetForm(descricao)
  }, [descricao, resetForm])

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

  const startEditing = useCallback(() => {
    setIsEditing(true)
    setSaveError(null)
  }, [])

  const cancel = useCallback(() => {
    resetForm(descricao)
    setSaveError(null)
    setIsEditing(false)
  }, [descricao, resetForm])

  const save = useCallback(async () => {
    if (!projectId) return

    setIsSaving(true)
    setSaveError(null)

    try {
      const result = await saveJustificativa(projectId, dadosFormulario)

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
  }, [projectId, dadosFormulario, atualizarFormulario, reload])

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
