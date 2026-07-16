"use client"

import { useTedReview } from "@/features/projeto/contexts/ted-review-context"
import { cn } from "@/lib/utils"

import {
  ATTENTION_FIELD_CLASS,
  VIEW_MODE_FIELD_CLASS,
} from "../constants/form"
import styles from "../descricao-da-justificativa-e-motivacao.module.css"

/** Opções de configuração das regras de revisão. */
type UseJustificativaReviewOptions = {
  /** Indica se a seção está em modo somente leitura. */
  readOnlyView?: boolean

  /** Indica se o formulário está em modo de edição. */
  isEditing: boolean
}

/**
 * Gerencia as regras de revisão da seção
 * "Descrição da Justificativa e Motivação".
 *
 * Responsabilidades:
 * - bloquear a edição quando necessário;
 * - controlar o modo de visualização;
 * - indicar quando a edição pode ser iniciada;
 * - aplicar estilos de revisão aos campos marcados como atenção.
 */
export function useJustificativaReview({
  readOnlyView,
  isEditing,
}: UseJustificativaReviewOptions) {
  const reviewContext = useTedReview()

  /** Indica se o usuário possui permissão para gerenciar a revisão. */
  const canManageReview = Boolean(reviewContext?.canManage)

  /** Dados da revisão da seção. */
  const review = reviewContext?.review

  /** Indica se o modo de marcação de atenção está ativo. */
  const isMarkingAtencao = Boolean(reviewContext?.isMarkingAtencao)

  /**
   * Usuários comuns não podem editar quando a seção
   * estiver bloqueada para revisão.
   */
  const isBlockedForUser =
    Boolean(review?.bloqueada) && !canManageReview

  /** Define se os campos permanecem bloqueados. */
  const isLocked =
    Boolean(readOnlyView) || !isEditing || isBlockedForUser

  /** Indica se os campos devem ser exibidos em modo visualização. */
  const isViewMode = !isEditing || isBlockedForUser

  /** Define se o usuário pode iniciar a edição da seção. */
  const canStartEditing =
    !readOnlyView &&
    !isBlockedForUser &&
    !isMarkingAtencao

  /**
   * Retorna as classes CSS aplicadas ao campo conforme
   * o estado atual da revisão.
   */
  function fieldClass(campoKey: string, extra = "") {
    return cn(
      styles.textarea,
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