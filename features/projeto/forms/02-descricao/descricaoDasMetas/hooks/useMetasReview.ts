"use client"

import { useTedReview } from "@/features/projeto/contexts/ted-review-context"
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
  const reviewContext = useTedReview()

  const canManageReview = Boolean(reviewContext?.canManage)
  const review = reviewContext?.review
  const isMarkingAtencao = Boolean(reviewContext?.isMarkingAtencao)

  /**
   * Usuários sem permissão de revisão não podem editar
   * quando a seção estiver bloqueada.
   */
  const isBlockedForUser =
    Boolean(review?.bloqueada) && !canManageReview

  /**
   * Campo completamente bloqueado.
   */
  const isLocked =
    Boolean(readOnlyView) ||
    !isEditing ||
    isBlockedForUser

  /**
   * Apenas visualização (sem permitir edição).
   */
  const isViewMode =
    !isEditing || isBlockedForUser

  /**
   * Apenas usuários permitidos podem iniciar edição.
   */
  const canStartEditing =
    !readOnlyView &&
    !isBlockedForUser &&
    !isMarkingAtencao

  function fieldClass(
    campoKey: string,
    extra = "",
  ) {
    return cn(
      styles.input,
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