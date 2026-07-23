"use client"

import { formLayoutStyles } from "@/features/projeto/components/formShared/form-section"
import { EtapaDespesasForm } from "@/features/projeto/components/cursoDetalhamentoForm"
import { CATALOGO_DESPESAS_ETAPA_12 } from "@/features/projeto/constants/catalogo-despesas-etapa-12"
import {
  SESSOES_VISAO_GERAL_SUBTITLE,
  SESSOES_VISAO_GERAL_TITLE,
} from "@/features/projeto/constants/visao-geral"

import type { ProjectFormSectionProps } from "../../types"
import { useDespesasEtapa12 } from "./hooks/useDespesasEtapa12"

/**
 * Seção "Estruturação e Equipamento dos Espaços — Etapa 1.2".
 * Reutiliza o mesmo EtapaDespesasForm da Etapa 1.1.
 */
export function DespesasEtapa12({
  readOnlyView,
}: ProjectFormSectionProps) {
  const form = useDespesasEtapa12({ readOnlyView })

  return (
    <div className={formLayoutStyles.page}>
      <div className={formLayoutStyles.pageHeader}>
        <h2 className={formLayoutStyles.pageTitle}>
          {SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_DESPESAS_ETAPA_1_2}
        </h2>
        <p className={formLayoutStyles.subtitle}>
          {SESSOES_VISAO_GERAL_SUBTITLE.SUBTITLE_SESSAO_DESPESAS_ETAPA_1_2}
        </p>
      </div>

      <EtapaDespesasForm
        tableTitle="Despesas da Etapa 1.2"
        value={form.form}
        onSave={form.actions.save}
        readOnlyView={readOnlyView}
        successMessage="Despesas da Etapa 1.2 salvas com sucesso!"
        summaryMeta={{
          label: "Tipo predominante",
          value: "Estruturação",
        }}
        catalogoEtapa={CATALOGO_DESPESAS_ETAPA_12}
        fieldIdPrefix="etapa-1-2"
      />
    </div>
  )
}

export default DespesasEtapa12
