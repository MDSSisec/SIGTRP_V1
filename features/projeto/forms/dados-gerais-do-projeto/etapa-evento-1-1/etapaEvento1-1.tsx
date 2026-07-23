"use client"

import { formLayoutStyles } from "@/features/projeto/components/formShared/form-section"
import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"
import { EtapaDespesasForm } from "@/features/projeto/components/cursoDetalhamentoForm"
import {
  SESSOES_VISAO_GERAL_SUBTITLE,
  SESSOES_VISAO_GERAL_TITLE,
} from "@/features/projeto/constants/visao-geral"

import type { ProjectFormSectionProps } from "../../types"
import { useDespesasEtapa11 } from "./hooks/useDespesasEtapa11"

/**
 * Seção "Planejamento, Mobilização, Execução e Monitoramento — Etapa 1.1".
 * Review aplica-se ao período; a tabela de despesas fica fora do bloqueio/atenção.
 */
export function DespesasEtapa11({
  readOnlyView,
}: ProjectFormSectionProps) {
  const form = useDespesasEtapa11({ readOnlyView })

  return (
    <div className={formLayoutStyles.page}>
      <div className={formLayoutStyles.pageHeader}>
        <h2 className={formLayoutStyles.pageTitle}>
          {SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_DESPESAS_ETAPA_1_1}
        </h2>
        <p className={formLayoutStyles.subtitle}>
          {SESSOES_VISAO_GERAL_SUBTITLE.SUBTITLE_SESSAO_DESPESAS_ETAPA_1_1}
        </p>
      </div>

      <SecaoReviewBanner />

      <EtapaDespesasForm
        tableTitle="Despesas da Etapa 1.1"
        value={form.form}
        onSave={form.actions.save}
        readOnlyView={readOnlyView}
        successMessage="Despesas da Etapa 1.1 salvas com sucesso!"
        fieldIdPrefix="etapa-1-1"
      />
    </div>
  )
}

export default DespesasEtapa11
