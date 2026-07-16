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

import { OBJETIVO_GERAL_MAX_LENGTH } from "../constants/form"
import { saveObjetivos } from "../action/saveObjetivos"
import {
  toObjetivosForm,
  VAZIO_OBJETIVOS,
  type DadosObjetivos,
} from "../types/objetivos-form"
import { useObjetivosReview } from "./useObjetivosReview"

type UseObjetivosOptions = {
  projectId?: string
  readOnlyView?: boolean
}

/**
 * Lógica do formulário de Objetivos.
 *
 * - carrega dados do contexto do projeto;
 * - controla edição/salvamento e lista de específicos;
 * - aplica regras de revisão.
 */
export function useObjetivos({
  projectId,
  readOnlyView,
}: UseObjetivosOptions) {
  const projectData = useProjectData()
  const updateProjectData = useUpdateProjectData()

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [dadosFormulario, setDadosFormulario] =
    useState<DadosObjetivos>(VAZIO_OBJETIVOS)

  const review = useObjetivosReview({
    readOnlyView,
    isEditing,
  })

  const resetForm = useCallback(() => {
    setDadosFormulario(toObjetivosForm(projectData))
  }, [projectData])

  useEffect(() => {
    resetForm()
  }, [resetForm])

  const handleObjetivoGeralChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setSaveError(null)
      setDadosFormulario((prev) => ({
        ...prev,
        objetivoGeral: event.target.value.slice(0, OBJETIVO_GERAL_MAX_LENGTH),
      }))
    },
    [],
  )

  const handleEspecificoChange = useCallback(
    (indice: number, valor: string) => {
      setSaveError(null)
      setDadosFormulario((prev) => {
        const especificos = [...prev.objetivosEspecificos]
        especificos[indice] = valor
        return { ...prev, objetivosEspecificos: especificos }
      })
    },
    [],
  )

  const adicionarObjetivo = useCallback(() => {
    setSaveError(null)
    setDadosFormulario((prev) => ({
      ...prev,
      objetivosEspecificos: [...prev.objetivosEspecificos, ""],
    }))
  }, [])

  const removerObjetivo = useCallback((indice: number) => {
    setSaveError(null)
    setDadosFormulario((prev) => {
      if (prev.objetivosEspecificos.length <= 1) return prev
      return {
        ...prev,
        objetivosEspecificos: prev.objetivosEspecificos.filter(
          (_, i) => i !== indice,
        ),
      }
    })
  }, [])

  const startEditing = useCallback(() => {
    setIsEditing(true)
    setSaveError(null)
  }, [])

  const cancel = useCallback(() => {
    resetForm()
    setSaveError(null)
    setIsEditing(false)
  }, [resetForm])

  const save = useCallback(async () => {
    if (!projectId) return

    setIsSaving(true)
    setSaveError(null)

    try {
      const result = await saveObjetivos({
        projectId,
        dados: dadosFormulario,
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
  }, [projectId, dadosFormulario, updateProjectData])

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
      isViewMode: review.isViewMode,
      canStartEditing: review.canStartEditing,
      canManageList: isEditing && !review.isLocked,
    },
    actions: {
      handleObjetivoGeralChange,
      handleEspecificoChange,
      adicionarObjetivo,
      removerObjetivo,
      startEditing,
      cancel,
      save,
    },
  }
}
