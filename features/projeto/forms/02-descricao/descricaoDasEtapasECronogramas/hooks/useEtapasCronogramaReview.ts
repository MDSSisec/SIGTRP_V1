"use client"

import { campoReviewVisualClasses } from "@/features/projeto/components/formShared/secao-review-actions"
import { useSecaoFormLock } from "@/features/projeto/hooks/useSecaoFormLock"
import { cn } from "@/lib/utils"

import {
  ATTENTION_FIELD_CLASS,
  VIEW_MODE_FIELD_CLASS,
} from "../constants/form"
import styles from "../descricao-das-etapas-e-cronograma.module.css"

/**
 * Opções utilizadas pelas regras de revisão
 * da seção Etapas e Cronograma.
 */
type UseEtapasCronogramaReviewOptions = {
  /** Indica que o formulário está em modo somente leitura. */
  readOnlyView?: boolean

  /** Indica se a seção está em edição. */
  isEditing: boolean
}

/**
 * Centraliza as regras de revisão da seção
 * "Descrição das Etapas e Cronograma".
 *
 * Responsabilidades:
 * - controlar bloqueio da edição;
 * - definir modo de visualização;
 * - informar quando a edição pode ser iniciada;
 * - aplicar estilos aos campos marcados em revisão.
 */
export function useEtapasCronogramaReview({
  readOnlyView,
  isEditing,
}: UseEtapasCronogramaReviewOptions) {
  const lock = useSecaoFormLock({ readOnlyView, isEditing })

  /**
   * Retorna a classe CSS aplicada a um campo do formulário.
   *
   * @param campoKey Identificador do campo em revisão.
   * @param baseClass Classe CSS base do componente.
   * @param extra Classes CSS adicionais.
   */
  function fieldClass(
    campoKey: string,
    baseClass = styles.input,
    extra = "",
  ): string {
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
