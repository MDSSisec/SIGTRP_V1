"use client"

import { useTedReview } from "@/features/projetos/contexts/ted-review-context"
import { cn } from "@/lib/utils"

import {
  ATTENTION_FIELD_CLASS,
  VIEW_MODE_FIELD_CLASS,
} from "../constants/form"
import styles from "../identificacao-do-responsavel-tecnico.module.css"

type Options = {
  readOnlyView?: boolean
  isEditing: boolean
}

/**
 * Regras de revisão do formulário de Responsável Técnico.
 */
export function useIdentificacaoResponsavelTecnicoReview({
  readOnlyView,
  isEditing,
}: Options) {
  const reviewContext = useTedReview()

  const canManageReview = Boolean(reviewContext?.canManage)
  const review = reviewContext?.review
  const isMarkingAtencao = Boolean(reviewContext?.isMarkingAtencao)

  const isBlockedForUser =
    Boolean(review?.bloqueada) && !canManageReview

  const isLocked =
    Boolean(readOnlyView) || !isEditing || isBlockedForUser

  const isViewMode = !isEditing || isBlockedForUser

  const canStartEditing =
    !readOnlyView && !isBlockedForUser && !isMarkingAtencao

  function fieldClass(campoKey: string, extra = "") {
    return cn(
      styles.input,
      isViewMode && VIEW_MODE_FIELD_CLASS,
      reviewContext?.isCampoAtencao(campoKey) && ATTENTION_FIELD_CLASS,
      extra,
    )
  }

  return {
    isLocked,
    isViewMode,
    canStartEditing,
    fieldClass,
  }
}
