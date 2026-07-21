"use client"

import { campoReviewVisualClasses } from "@/features/projeto/components/formShared/secao-review-actions"
import { useSecaoFormLock } from "@/features/projeto/hooks/useSecaoFormLock"
import { cn } from "@/lib/utils"

import {
  ATTENTION_FIELD_CLASS,
  VIEW_MODE_FIELD_CLASS,
} from "../constants/form"
import styles from "../identidicacao-do-projeto.module.css"

type UseIdentificacaoReviewOptions = {
  /** Indica que a tela inteira está em modo somente leitura. */
  readOnlyView?: boolean

  /** Indica se o formulário está em modo de edição. */
  isEditing: boolean
}

type UseIdentificacaoReviewReturn = {
  /** Impede alterações nos campos (modo base / bloqueio total). */
  isLocked: boolean

  /** Impede alteração de um campo específico (atenção parcial). */
  isCampoLocked: (campoKey: string) => boolean

  /** Define se os campos devem ser exibidos em modo visualização. */
  isViewMode: boolean

  /** Indica se o usuário pode iniciar a edição. */
  canStartEditing: boolean

  /** Classes CSS aplicadas aos campos (atenção / OK muteado). */
  fieldClass: (campoKey: string, baseClass?: string) => string
}

/**
 * Centraliza todas as regras relacionadas ao fluxo de revisão da
 * Identificação do Projeto.
 */
export function useIdentificacaoReview({
  readOnlyView,
  isEditing,
}: UseIdentificacaoReviewOptions): UseIdentificacaoReviewReturn {
  const lock = useSecaoFormLock({ readOnlyView, isEditing })

  function fieldClass(campoKey: string, baseClass = styles.input) {
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
