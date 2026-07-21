"use client"

import { useTedReview } from "@/features/projeto/contexts/ted-review-context"
import { cn } from "@/lib/utils"

import {
  ATTENTION_FIELD_CLASS,
  VIEW_MODE_FIELD_CLASS,
} from "../constants/form"
import styles from "../descricao-da-metodologia.module.css"

type UseMetodologiaReviewOptions = {
  readOnlyView?: boolean
  isEditing: boolean
}

/** Regras de revisão da seção Metodologia. */
export function useMetodologiaReview({
  readOnlyView,
  isEditing,
}: UseMetodologiaReviewOptions) {
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
      styles.textarea,
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
