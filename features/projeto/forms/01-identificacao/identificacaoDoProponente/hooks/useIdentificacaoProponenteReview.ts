"use client"

import { useTedReview } from "@/features/projeto/contexts/ted-review-context"
import { cn } from "@/lib/utils"

import {
  ATTENTION_FIELD_CLASS,
  VIEW_MODE_FIELD_CLASS,
} from "../constants/form"
import styles from "../identificacao-do-proponente.module.css"

type UseIdentificacaoProponenteReviewOptions = {
  readOnlyView?: boolean
  isEditing: boolean
}

/**
 * Regras de revisão do formulário de Identificação do Proponente.
 */
export function useIdentificacaoProponenteReview({
  readOnlyView,
  isEditing,
}: UseIdentificacaoProponenteReviewOptions) {
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

  function fieldClass(campoKey: string) {
    return cn(
      styles.input,
      isViewMode && VIEW_MODE_FIELD_CLASS,
      reviewContext?.isCampoAtencao(campoKey) && ATTENTION_FIELD_CLASS,
    )
  }

  return {
    isLocked,
    isViewMode,
    canStartEditing,
    fieldClass,
  }
}
