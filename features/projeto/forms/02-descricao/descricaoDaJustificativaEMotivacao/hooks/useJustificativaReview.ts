"use client"

import { campoReviewVisualClasses } from "@/features/projeto/components/formShared/secao-review-actions"
import { useSecaoFormLock } from "@/features/projeto/hooks/useSecaoFormLock"
import { cn } from "@/lib/utils"

import {
  ATTENTION_FIELD_CLASS,
  VIEW_MODE_FIELD_CLASS,
} from "../constants/form"
import styles from "../descricao-da-justificativa-e-motivacao.module.css"

type UseJustificativaReviewOptions = {
  readOnlyView?: boolean
  isEditing: boolean
}

/**
 * Gerencia as regras de revisão da seção
 * "Descrição da Justificativa e Motivação".
 */
export function useJustificativaReview({
  readOnlyView,
  isEditing,
}: UseJustificativaReviewOptions) {
  const lock = useSecaoFormLock({ readOnlyView, isEditing })

  function fieldClass(campoKey: string, extra = "") {
    return cn(
      styles.textarea,
      campoReviewVisualClasses(
        {
          isCampoOkMuted: lock.isCampoOkMuted,
          isCampoViewMode: lock.isCampoViewMode,
          isCampoAtencao: (key) => Boolean(lock.reviewContext?.isCampoAtencao(key)),
          viewModeClass: VIEW_MODE_FIELD_CLASS,
          attentionClass: ATTENTION_FIELD_CLASS,
        },
        campoKey,
      ),
      extra,
    )
  }

  return {
    isLocked: lock.isLocked,
    isCampoLocked: lock.isCampoLocked,
    isViewMode: lock.isViewMode,
    canStartEditing: lock.canStartEditing,
    fieldClass,
  }
}
