"use client"

import { useTedReview } from "@/features/projeto/contexts/ted-review-context"
import { cn } from "@/lib/utils"

import {
  ATTENTION_FIELD_CLASS,
  VIEW_MODE_FIELD_CLASS,
} from "../constants/form"
import styles from "../resultados-esperados.module.css"

type UseResultadosReviewOptions = {
  readOnlyView?: boolean
  isEditing: boolean
}

/**
 * Regras de revisão da seção Resultados Esperados.
 */
export function useResultadosReview({
  readOnlyView,
  isEditing,
}: UseResultadosReviewOptions) {
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

  function fieldClass(
    campoKey: string,
    baseClass: string = styles.input,
    extra = "",
  ) {
    return cn(
      baseClass,
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
