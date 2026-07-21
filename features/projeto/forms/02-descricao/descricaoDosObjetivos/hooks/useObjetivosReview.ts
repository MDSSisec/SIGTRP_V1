"use client"

import { campoReviewVisualClasses } from "@/features/projeto/components/formShared/secao-review-actions"
import { useSecaoFormLock } from "@/features/projeto/hooks/useSecaoFormLock"
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
  const lock = useSecaoFormLock({ readOnlyView, isEditing })

  function fieldClass(
    campoKey: string,
    baseClass: string = styles.textarea,
    extra = "",
  ) {
    return cn(
      baseClass,
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
