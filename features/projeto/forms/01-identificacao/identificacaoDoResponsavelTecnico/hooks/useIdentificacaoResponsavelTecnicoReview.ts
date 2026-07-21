"use client"

import { campoReviewVisualClasses } from "@/features/projeto/components/formShared/secao-review-actions"
import { useSecaoFormLock } from "@/features/projeto/hooks/useSecaoFormLock"
import { cn } from "@/lib/utils"

import {
  ATTENTION_FIELD_CLASS,
  VIEW_MODE_FIELD_CLASS,
} from "../constants/form"
import styles from "../identificacao-do-responsavel-tecnico.module.css"

type Options = {
  readOnlyView?: boolean
  isEditing: boolean
}

/**
 * Regras de revisão do formulário de Responsável Técnico.
 */
export function useIdentificacaoResponsavelTecnicoReview({
  readOnlyView,
  isEditing,
}: Options) {
  const lock = useSecaoFormLock({ readOnlyView, isEditing })

  function fieldClass(campoKey: string, extra = "") {
    return cn(
      styles.input,
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
