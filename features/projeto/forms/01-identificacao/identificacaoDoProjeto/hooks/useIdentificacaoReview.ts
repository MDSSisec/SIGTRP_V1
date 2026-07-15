"use client"

import { useCampoAtencaoClass } from "@/features/projeto/components/formShared/secao-review-actions"
import { useTedReview } from "@/features/projeto/contexts/ted-review-context"

type UseIdentificacaoReviewOptions = {
  /** Indica que a tela inteira está em modo somente leitura. */
  readOnlyView?: boolean

  /** Indica se o formulário está em modo de edição. */
  isEditing: boolean
}

type UseIdentificacaoReviewReturn = {
  /** Impede alterações nos campos. */
  isLocked: boolean

  /** Define se os campos devem ser exibidos em modo visualização. */
  isViewMode: boolean

  /** Indica se o usuário pode iniciar a edição. */
  canStartEditing: boolean

  /** Classes CSS aplicadas aos campos marcados em revisão. */
  attention: {
    localExecucao: string
    duracao: string
    resumoProjeto: string
  }
}

/**
 * Centraliza todas as regras relacionadas ao fluxo de revisão da
 * Identificação do Projeto.
 *
 * Responsabilidades:
 * - verificar permissões do usuário;
 * - identificar se a seção está bloqueada;
 * - definir quando o formulário pode ser editado;
 * - fornecer as classes visuais para campos marcados com atenção.
 */
export function useIdentificacaoReview({
  readOnlyView,
  isEditing,
}: UseIdentificacaoReviewOptions): UseIdentificacaoReviewReturn {
  const reviewContext = useTedReview()

  const canManageReview = Boolean(reviewContext?.canManage)
  const review = reviewContext?.review
  const isMarkingAtencao = Boolean(reviewContext?.isMarkingAtencao)

  const localExecucao = useCampoAtencaoClass("localExecucao")
  const duracao = useCampoAtencaoClass("duracao")
  const resumoProjeto = useCampoAtencaoClass("resumoProjeto")

  /** Usuários sem permissão não podem editar se a revisão estiver bloqueada. */
  const isBlockedForUser =
    Boolean(review?.bloqueada) && !canManageReview

  /** Campos permanecem bloqueados enquanto não estiver editando ou a seção estiver bloqueada. */
  const isLocked =
    Boolean(readOnlyView) || !isEditing || isBlockedForUser

  /** Modo visualização mantém o estilo de leitura dos campos. */
  const isViewMode = !isEditing || isBlockedForUser

  /** Permite iniciar edição somente quando não houver bloqueios. */
  const canStartEditing =
    !readOnlyView &&
    !isBlockedForUser &&
    !isMarkingAtencao

  return {
    isLocked,
    isViewMode,
    canStartEditing,
    attention: {
      localExecucao,
      duracao,
      resumoProjeto,
    },
  }
}