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
  projectId,
  readOnlyView,
}: ProjectFormSectionProps) {
  const form = useHistoricoSituacao({ projectId, readOnlyView })

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
          isSaving={form.ui.isSaving}
          saveError={form.ui.saveError}
          canStartEditing={form.ui.canStartEditing}
          onEdit={form.actions.startEditing}
          onCancel={form.actions.cancel}
          onSave={() => void form.actions.save()}
        />
      ) : null}
    </div>
  )
}

export default FormularioHistoricoSituacao
