"use client"

import { useTedReview } from "@/features/projeto/contexts/ted-review-context"

type UseResumoPlanoAplicacaoReviewOptions = {
  readOnlyView?: boolean
  isEditing: boolean
}

export function useResumoPlanoAplicacaoReview({
  readOnlyView,
  isEditing,
}: UseResumoPlanoAplicacaoReviewOptions) {
  const reviewContext = useTedReview()

  const canManageReview = Boolean(reviewContext?.canManage)
  const review = reviewContext?.review
  const isMarkingAtencao = Boolean(reviewContext?.isMarkingAtencao)

  const isBlockedForUser = Boolean(review?.bloqueada) && !canManageReview

  const isLocked = Boolean(readOnlyView) || !isEditing || isBlockedForUser

  const canStartEditing =
    !readOnlyView && !isBlockedForUser && !isMarkingAtencao

  return {
    isLocked,
    canStartEditing,
  }
}
