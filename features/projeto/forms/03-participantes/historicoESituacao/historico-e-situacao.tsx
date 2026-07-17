"use client"

import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"
import { HISTORICO_SITUACAO_TITLE } from "@/features/projeto/constants/historico-situacao"

import type { ProjectFormSectionProps } from "../../types"
import styles from "./historico-e-situacao.module.css"

/**
 * Seção "Histórico e situação socioeconômica do território".
 *
 * Estrutura mínima (título + card) até os campos serem definidos.
 * Bloquear / Marcar atenção / Voltar para projetos ficam no header
 * da tela de edição (via `TED_SECOES_COM_REVIEW`).
 */
export function FormularioHistoricoSituacao(_props: ProjectFormSectionProps) {
  return (
    <div className={styles.container}>
      <SecaoReviewBanner />

      <section className={styles.section}>
        <h2 className={styles.title}>{HISTORICO_SITUACAO_TITLE.TITLE}</h2>
      </section>
    </div>
  )
}

export default FormularioHistoricoSituacao
