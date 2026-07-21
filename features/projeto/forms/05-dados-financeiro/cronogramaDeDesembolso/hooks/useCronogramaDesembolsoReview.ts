"use client"

import { useSecaoFormLock } from "@/features/projeto/hooks/useSecaoFormLock"

type UseCronogramaDesembolsoReviewOptions = {
  readOnlyView?: boolean
  isEditing: boolean
}

export function useCronogramaDesembolsoReview({
  readOnlyView,
  isEditing,
}: UseCronogramaDesembolsoReviewOptions) {
  const lock = useSecaoFormLock({ readOnlyView, isEditing })

  return {
    isLocked: lock.isLocked,
    isCampoLocked: lock.isCampoLocked,
    isViewMode: lock.isViewMode,
    canStartEditing: lock.canStartEditing,
  }
}
