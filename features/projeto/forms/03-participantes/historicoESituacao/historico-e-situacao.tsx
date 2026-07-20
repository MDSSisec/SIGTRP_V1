"use client"

import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"

import type { ProjectFormSectionProps } from "../../types"
import {
  HistoricoSituacaoActions,
  HistoricoSituacaoFields,
} from "./components"
import { useHistoricoSituacao } from "./hooks/useHistoricoSituacao"
import styles from "./historico-e-situacao.module.css"

/**
 * Formulário da seção "Histórico e situação socioeconômica do território".
 */
export function FormularioHistoricoSituacao({
  readOnlyView,
}: ProjectFormSectionProps) {
  const form = useHistoricoSituacao({ readOnlyView })

  return (
    <div className={styles.container}>
      <SecaoReviewBanner />

      <HistoricoSituacaoFields
        dados={form.form}
        isLocked={form.ui.isLocked}
        onChange={form.actions.setTexto}
      />

      {!readOnlyView ? (
        <HistoricoSituacaoActions
          isEditing={form.ui.isEditing}
          canStartEditing={form.ui.canStartEditing}
          onEdit={form.actions.startEditing}
          onCancel={form.actions.cancel}
          onSave={form.actions.save}
        />
      ) : null}
    </div>
  )
}

export default FormularioHistoricoSituacao
