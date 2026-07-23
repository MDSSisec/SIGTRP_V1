"use client"

import { campoReviewVisualClasses } from "@/features/projeto/components/formShared/secao-review-actions"
import { useSecaoFormLock } from "@/features/projeto/hooks/useSecaoFormLock"
import { cn } from "@/lib/utils"

import {
  ATTENTION_FIELD_CLASS,
  VIEW_MODE_FIELD_CLASS,
} from "../constants/form"

type UseDadosGeraisReviewOptions = {
  readOnlyView?: boolean
  isEditing: boolean
}

type UseDadosGeraisReviewReturn = {
  isLocked: boolean
  isCampoLocked: (campoKey: string) => boolean
  isViewMode: boolean
  canStartEditing: boolean
  fieldClass: (campoKey: string, baseClass?: string) => string
}

/**
 * Regras de bloqueio / marcar atenção da seção Dados Gerais.
 */
export function useDadosGeraisReview({
  readOnlyView,
  isEditing,
}: UseDadosGeraisReviewOptions): UseDadosGeraisReviewReturn {
  const lock = useSecaoFormLock({ readOnlyView, isEditing })

  function fieldClass(campoKey: string, baseClass?: string) {
    return cn(
      baseClass,
      campoReviewVisualClasses(
        {
          isCampoOkMuted: lock.isCampoOkMuted,
          isCampoViewMode: lock.isCampoViewMode,
          isCampoAtencao: (key) =>
            Boolean(lock.reviewContext?.isCampoAtencao(key)),
          viewModeClass: VIEW_MODE_FIELD_CLASS,
          attentionClass: ATTENTION_FIELD_CLASS,
        },
        campoKey,
      ),
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
