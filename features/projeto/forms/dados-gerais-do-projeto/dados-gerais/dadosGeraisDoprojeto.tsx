"use client"

import { FormSectionCard, formLayoutStyles } from "@/features/projeto/components/formShared/form-section"
import { SESSOES_VISAO_GERAL_SUBTITLE, SESSOES_VISAO_GERAL_TITLE } from "@/features/projeto/constants/visao-geral"

import type { ProjectFormSectionProps } from "../../types"
import { DadosGeraisActions, DadosGeraisFields } from "./components"
import { useDadosGerais } from "./hooks/useDadosGerais"

/**
 * Formulário da seção "Dados gerais do projeto".
 *
 * Compõe a UI e delega a lógica a `useDadosGerais`.
 */
export function DadosGeraisDoProjeto({
  readOnlyView,
}: ProjectFormSectionProps) {
  const form = useDadosGerais({ readOnlyView })

  return (
    <div className={formLayoutStyles.page}>
      <div className={formLayoutStyles.pageHeader}>
        <h2 className={formLayoutStyles.pageTitle}>
          {SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_DADOS_GERAIS_PROJETO}
        </h2>
        <p className={formLayoutStyles.subtitle}>
          {SESSOES_VISAO_GERAL_SUBTITLE.SUBTITLE_SESSAO_DADOS_GERAIS_PROJETO}
        </p>
      </div>

      <FormSectionCard>
        <DadosGeraisFields
          dados={form.form}
          isLocked={form.ui.isLocked}
          isViewMode={form.ui.isViewMode}
          onCurrencyChange={form.actions.handleCurrencyChange}
          onQuantidadeChange={form.actions.handleQuantidadeChange}
          onCheckboxChange={form.actions.handleCheckboxChange}
        />

        {!readOnlyView && (
          <DadosGeraisActions
            isEditing={form.ui.isEditing}
            isSaving={form.ui.isSaving}
            saveError={form.ui.saveError}
            canStartEditing={form.ui.canStartEditing}
            onEdit={form.actions.startEditing}
            onCancel={form.actions.cancel}
            onSave={() => void form.actions.save()}
          />
        )}
      </FormSectionCard>
    </div>
  )
}

export default DadosGeraisDoProjeto
