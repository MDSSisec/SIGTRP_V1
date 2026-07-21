"use client"

import { useSecaoFormLock } from "@/features/projeto/hooks/useSecaoFormLock"

type UsePublicoBeneficiarioReviewOptions = {
  readOnlyView?: boolean
  isEditing: boolean
}

export function usePublicoBeneficiarioReview({
  readOnlyView,
  isEditing,
}: UsePublicoBeneficiarioReviewOptions) {
  const lock = useSecaoFormLock({ readOnlyView, isEditing })

  return {
    isLocked: lock.isLocked,
    isCampoLocked: lock.isCampoLocked,
    isViewMode: lock.isViewMode,
    canStartEditing: lock.canStartEditing,
  }
}
