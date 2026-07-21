"use client"

import { campoReviewVisualClasses } from "@/features/projeto/components/formShared/secao-review-actions"
import { useSecaoFormLock } from "@/features/projeto/hooks/useSecaoFormLock"
import { cn } from "@/lib/utils"

import {
  ATTENTION_FIELD_CLASS,
  VIEW_MODE_FIELD_CLASS,
} from "../constants/form"
import styles from "../descricao-das-metas.module.css"

type UseMetasReviewOptions = {
  /** Indica se a seção está somente para visualização. */
  readOnlyView?: boolean

  /** Indica se o formulário está em modo de edição. */
  isEditing: boolean
}

type UseMetasReviewReturn = {
  /** Bloqueia todos os campos da seção. */
  isLocked: boolean

  /** Impede alteração de um campo específico (atenção parcial). */
  isCampoLocked: (campoKey: string) => boolean

  /** Indica que os campos devem ser exibidos em modo visualização. */
  isViewMode: boolean

  /** Permite iniciar a edição da seção. */
  canStartEditing: boolean

  /**
   * Retorna a classe CSS do campo considerando:
   * - modo visualização;
   * - campos marcados com atenção;
   * - classes adicionais.
   */
  fieldClass: (campoKey: string, extra?: string) => string
}

/**
 * Centraliza todas as regras de revisão da seção **Metas**.
 *
 * Responsável por:
 * - bloquear edição quando a seção estiver travada;
 * - impedir edição em modo somente leitura;
 * - destacar campos marcados com atenção;
 * - aplicar o estilo de visualização.
 */
export function useMetasReview({
  readOnlyView,
  isEditing,
}: UseMetasReviewOptions): UseMetasReviewReturn {
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
