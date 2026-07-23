"use client"

import { formLayoutStyles } from "@/features/projeto/components/formShared/form-section"
import { EtapaDespesasForm } from "@/features/projeto/components/cursoDetalhamentoForm"
import {
  SESSOES_VISAO_GERAL_SUBTITLE,
  SESSOES_VISAO_GERAL_TITLE,
} from "@/features/projeto/constants/visao-geral"

import type { ProjectFormSectionProps } from "../../types"
import { useDespesasEtapa11 } from "./hooks/useDespesasEtapa11"

/**
 * Seção "Planejamento, Mobilização, Execução e Monitoramento — Etapa 1.1".
 * Reutiliza o mesmo padrão de card/tabela do detalhamento de cursos.
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
