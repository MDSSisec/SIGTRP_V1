"use client"

import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"
import { PROJETO_SECOES } from "@/features/projeto/constants/secoes-projeto"

import type { ProjectFormSectionProps } from "../../types"
import styles from "./detalhamento-do-orcamento.module.css"

/**
 * Seção "Detalhamento do orçamento".
 *
 * Estrutura mínima (título + card) até os campos serem definidos.
 * Bloquear / Marcar atenção / Voltar ficam no header da tela de edição
 * (via `TED_SECOES_COM_REVIEW`).
 */
export function FormularioDetalhamentoDoOrcamento(_props: ProjectFormSectionProps) {
  return (
    <div className={styles.container}>
      <SecaoReviewBanner />

      <section className={styles.section}>
        <h2 className={styles.title}>{PROJETO_SECOES.detalhamentoOrcamento.title}</h2>
      </section>
    </div>
  )
}

export default FormularioDetalhamentoDoOrcamento
