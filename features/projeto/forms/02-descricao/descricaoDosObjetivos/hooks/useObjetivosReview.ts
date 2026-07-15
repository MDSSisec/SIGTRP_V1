"use client"

import { useTedReview } from "@/features/projeto/contexts/ted-review-context"
import { cn } from "@/lib/utils"

import {
  ATTENTION_FIELD_CLASS,
  VIEW_MODE_FIELD_CLASS,
} from "../constants/form"
import styles from "../descricao-dos-objetivos.module.css"

type UseObjetivosReviewOptions = {
  readOnlyView?: boolean
  isEditing: boolean
}

/**
 * Regras de revisão da seção Objetivos
 * (bloquear seção / marcar atenção).
 */
export function useObjetivosReview({
  readOnlyView,
  isEditing,
}: UseObjetivosReviewOptions) {
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
    baseClass: string = styles.textarea,
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
