"use client"

import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"

import type { ProjectFormSectionProps } from "../../types"
import { JustificativaActions, JustificativaFields } from "./components"
import { useJustificativa } from "./hooks/useJustificativa"
import styles from "./descricao-da-justificativa-e-motivacao.module.css"

/**
 * Seção "Justificativa e Motivação".
 *
 * Responsabilidades:
 * - renderizar o banner de revisão;
 * - exibir os campos da justificativa;
 * - renderizar as ações de edição;
 * - delegar toda a lógica para `useJustificativa`.
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
        isCampoLocked={form.ui.isCampoLocked}
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
