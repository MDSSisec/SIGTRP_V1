"use client"

import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"

import type { ProjectFormSectionProps } from "../../types"
import { JustificativaActions, JustificativaFields } from "./components"
import { useJustificativa } from "./hooks/useJustificativa"
import styles from "./descricao-da-justificativa-e-motivacao.module.css"

/**
 * Formulário da seção "Justificativa e Motivação".
 *
 * Compõe a UI e delega a lógica a `useJustificativa`.
 */
export function FormularioJustificativa({
  projectId,
  readOnlyView,
}: ProjectFormSectionProps) {
  const form = useJustificativa({ projectId, readOnlyView })

  return (
    <div className={styles.container}>
      <SecaoReviewBanner />

      <JustificativaFields
        dados={form.form}
        isLocked={form.ui.isLocked}
        fieldClass={form.review.fieldClass}
        onChange={form.actions.handleChange}
      />

      {!readOnlyView ? (
        <JustificativaActions
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

export default FormularioJustificativa
