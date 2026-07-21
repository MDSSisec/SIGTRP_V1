"use client"

import { campoReviewVisualClasses } from "@/features/projeto/components/formShared/secao-review-actions"
import { useSecaoFormLock } from "@/features/projeto/hooks/useSecaoFormLock"
import { cn } from "@/lib/utils"

import {
  ATTENTION_FIELD_CLASS,
  VIEW_MODE_FIELD_CLASS,
} from "../constants/form"
import styles from "../descricao-da-gestao-do-projeto.module.css"

type UseGestaoReviewOptions = {
  readOnlyView?: boolean
  isEditing: boolean
}

/**
 * Centraliza as regras de revisão da seção Gestão do Projeto.
 *
 * Responsabilidades:
 * - bloquear a edição quando necessário;
 * - identificar o modo de visualização;
 * - informar se a edição pode ser iniciada;
 * - aplicar estilos de revisão aos campos.
 */
export function useGestaoReview({
  readOnlyView,
  isEditing,
}: UseGestaoReviewOptions) {
  const lock = useSecaoFormLock({ readOnlyView, isEditing })

  /**
   * Monta a lista de classes CSS aplicadas a um campo do formulário.
   */
  function fieldClass(
    campoKey: string,
    baseClass = styles.textarea,
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
