"use client"

import { useCallback } from "react"

import { useTedReview } from "@/features/projeto/contexts/ted-review-context"

type UseSecaoFormLockOptions = {
  readOnlyView?: boolean
  isEditing: boolean
}

/**
 * Regras compartilhadas de bloqueio / atenção por seção.
 *
 * - Bloquear (sem atenção): fecha todos os campos para quem não gerencia.
 * - Marcar atenção: fecha a seção, mas deixa abertos só os campos marcados.
 */
export function useSecaoFormLock({
  readOnlyView,
  isEditing,
}: UseSecaoFormLockOptions) {
  const reviewContext = useTedReview()

  const canManageReview = Boolean(reviewContext?.canManage)
  const review = reviewContext?.review
  const isMarkingAtencao = Boolean(reviewContext?.isMarkingAtencao)
  const camposAtencao = reviewContext?.camposAtencao

  const temAtencao =
    Boolean(camposAtencao && camposAtencao.size > 0) ||
    review?.statusRevisao === "precisaAtencao"

  /** Bloqueio total (tudo certo → só “Bloquear”). */
  const isFullyBlockedForUser =
    Boolean(review?.bloqueada) && !temAtencao && !canManageReview

  /** Seção fechada com itens abertos para correção. */
  const isAtencaoEditMode = temAtencao && !canManageReview

  const isLocked =
    Boolean(readOnlyView) || !isEditing || isFullyBlockedForUser

  const isViewMode = !isEditing || isFullyBlockedForUser

  const canStartEditing =
    !readOnlyView && !isFullyBlockedForUser && !isMarkingAtencao

  const isCampoLocked = useCallback(
    (campoKey: string) => {
      if (Boolean(readOnlyView)) return true
      if (!isEditing) return true
      if (canManageReview) return false
      if (isFullyBlockedForUser) return true
      if (isAtencaoEditMode) {
        return !camposAtencao?.has(campoKey)
      }
      return false
    },
    [
      readOnlyView,
      isEditing,
      canManageReview,
      isFullyBlockedForUser,
      isAtencaoEditMode,
      camposAtencao,
    ],
  )

  const isCampoViewMode = useCallback(
    (campoKey: string) => {
      if (!isEditing || isFullyBlockedForUser) return true
      if (canManageReview) return false
      if (isAtencaoEditMode) return !camposAtencao?.has(campoKey)
      return false
    },
    [
      isEditing,
      isFullyBlockedForUser,
      canManageReview,
      isAtencaoEditMode,
      camposAtencao,
    ],
  )

  /**
   * Campo OK (sem atenção) em destaque reduzido.
   * Só na marcação / edição — na visualização fica normal.
   */
  const isCampoOkMuted = useCallback(
    (campoKey: string) => {
      if (Boolean(readOnlyView)) return false

      if (isMarkingAtencao) {
        return !reviewContext?.selectedCampoKeys.has(campoKey)
      }

      if (!isEditing) return false

      if (isAtencaoEditMode) {
        return !camposAtencao?.has(campoKey)
      }

      return false
    },
    [
      readOnlyView,
      isMarkingAtencao,
      reviewContext?.selectedCampoKeys,
      isEditing,
      isAtencaoEditMode,
      camposAtencao,
    ],
  )

  return {
    canManageReview,
    review,
    isMarkingAtencao,
    temAtencao,
    isFullyBlockedForUser,
    isAtencaoEditMode,
    isLocked,
    isViewMode,
    canStartEditing,
    isCampoLocked,
    isCampoViewMode,
    isCampoOkMuted,
    reviewContext,
  }
}
