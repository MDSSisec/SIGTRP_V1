"use client"

import { useTedReview } from "@/features/projeto/contexts/ted-review-context"
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
  const reviewContext = useTedReview()

  const canManageReview = Boolean(reviewContext?.canManage)
  const review = reviewContext?.review
  const isMarkingAtencao = Boolean(reviewContext?.isMarkingAtencao)

  const isBlockedForUser =
    Boolean(review?.bloqueada) && !canManageReview

  const isLocked =
    Boolean(readOnlyView) || !isEditing || isBlockedForUser

  const isViewMode = !isEditing || isBlockedForUser

  const canStartEditing =
    !readOnlyView &&
    !isBlockedForUser &&
    !isMarkingAtencao

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
      isViewMode && VIEW_MODE_FIELD_CLASS,
      reviewContext?.isCampoAtencao(campoKey) &&
        ATTENTION_FIELD_CLASS,
      extra,
    )
  }

  return {
    isLocked,
    isViewMode,
    canStartEditing,
    fieldClass,
  }
}