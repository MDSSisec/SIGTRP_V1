"use client"

import { formLayoutStyles } from "@/features/projeto/components/formShared/form-section"
import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"
import { EtapaDespesasForm } from "@/features/projeto/components/cursoDetalhamentoForm"
import { CATALOGO_DESPESAS_EVENTO_FINAL } from "@/features/projeto/constants/catalogo-despesas-evento-final"
import {
  SESSOES_VISAO_GERAL_SUBTITLE,
  SESSOES_VISAO_GERAL_TITLE,
} from "@/features/projeto/constants/visao-geral"

import type { ProjectFormSectionProps } from "../../types"
import { useDespesasEventoFinal } from "./hooks/useDespesasEventoFinal"

/**
 * Seção "Celebração, Certificação e Encerramento — Etapa Final".
 * Review aplica-se ao período; a tabela de despesas fica fora do bloqueio/atenção.
 */
export function DespesasEventoFinal({
  readOnlyView,
}: ProjectFormSectionProps) {
  const form = useDespesasEventoFinal({ readOnlyView })

  return (
    <div className={formLayoutStyles.page}>
      <div className={formLayoutStyles.pageHeader}>
        <h2 className={formLayoutStyles.pageTitle}>
          {SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_DESPESAS_EVENTO_FINAL}
        </h2>
        <p className={formLayoutStyles.subtitle}>
          {SESSOES_VISAO_GERAL_SUBTITLE.SUBTITLE_SESSAO_DESPESAS_EVENTO_FINAL}
        </p>
      </div>

      <SecaoReviewBanner />

      <EtapaDespesasForm
        tableTitle="Despesas do evento final"
        value={form.form}
        onSave={form.actions.save}
        readOnlyView={readOnlyView}
        successMessage="Despesas do evento final salvas com sucesso!"
        summaryMeta={{
          label: "Aplicação",
          value: "Evento final",
        }}
        catalogoEtapa={CATALOGO_DESPESAS_EVENTO_FINAL}
        fieldIdPrefix="evento-final"
      />
    </div>
  )
}

export default DespesasEventoFinal
