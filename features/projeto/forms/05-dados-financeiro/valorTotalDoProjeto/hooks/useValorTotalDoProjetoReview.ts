"use client"

import { useSecaoFormLock } from "@/features/projeto/hooks/useSecaoFormLock"

type UseValorTotalDoProjetoReviewOptions = {
  readOnlyView?: boolean
  isEditing: boolean
}

export function useValorTotalDoProjetoReview({
  readOnlyView,
  isEditing,
}: UseValorTotalDoProjetoReviewOptions) {
  const lock = useSecaoFormLock({ readOnlyView, isEditing })

  return {
    isLocked: lock.isLocked,
    isCampoLocked: lock.isCampoLocked,
    isViewMode: lock.isViewMode,
    canStartEditing: lock.canStartEditing,
  }
}
