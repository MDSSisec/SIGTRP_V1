"use client"

import { useTedReview } from "@/features/projeto/contexts/ted-review-context"
import { cn } from "@/lib/utils"

import {
  ATTENTION_FIELD_CLASS,
  VIEW_MODE_FIELD_CLASS,
} from "../constants/form"
import styles from "../identificacao-do-representante-legal.module.css"

type UseIdentificacaoRepresentanteReviewOptions = {
  /** Indica se o formulário está em modo somente leitura. */
  readOnlyView?: boolean

  /** Indica se o usuário iniciou a edição do formulário. */
  isEditing: boolean
}

/**
 * Centraliza as regras de revisão da seção
 * "Identificação do Representante Legal".
 *
 * Responsabilidades:
 * - controlar bloqueio de edição;
 * - definir modo visualização;
 * - informar se a edição pode ser iniciada;
 * - aplicar estilos de campos em atenção.
 */
export function useIdentificacaoRepresentanteReview({
  readOnlyView,
  isEditing,
}: UseIdentificacaoRepresentanteReviewOptions) {
  const reviewContext = useTedReview()

  const review = reviewContext?.review
  const canManageReview = Boolean(reviewContext?.canManage)

  const isBlockedForUser =
    Boolean(review?.bloqueada) && !canManageReview

  const isViewMode = !isEditing || isBlockedForUser

  const isLocked =
    Boolean(readOnlyView) ||
    isViewMode

  const canStartEditing =
    !readOnlyView &&
    !isBlockedForUser &&
    !reviewContext?.isMarkingAtencao

  /**
   * Retorna as classes CSS de um campo,
   * aplicando estilos de visualização e destaque
   * quando o campo estiver marcado em revisão.
   */
  function fieldClass(campoKey: string): string {
    return cn(
      styles.input,
      isViewMode && VIEW_MODE_FIELD_CLASS,
      reviewContext?.isCampoAtencao(campoKey) &&
        ATTENTION_FIELD_CLASS,
    )
  }

  return {
    isLocked,
    isViewMode,
    canStartEditing,
    fieldClass,
  }
}