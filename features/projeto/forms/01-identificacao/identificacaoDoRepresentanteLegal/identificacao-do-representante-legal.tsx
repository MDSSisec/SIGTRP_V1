"use client"

import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"

import type { ProjectFormSectionProps } from "../../types"
import {
  IdentificacaoRepresentanteActions,
  IdentificacaoRepresentanteFields,
} from "./components"
import { useIdentificacaoRepresentante } from "./hooks/useIdentificacaoRepresentante"
import styles from "./identificacao-do-representante-legal.module.css"

/**
 * Formulário da seção "Identificação do Representante Legal".
 *
 * Compõe a UI e delega a lógica a `useIdentificacaoRepresentante`.
 */
function FormularioIdentificacaoRepresentanteLegal({
  projectId,
  readOnlyView,
}: ProjectFormSectionProps) {
  const form = useIdentificacaoRepresentante({ projectId, readOnlyView })

  return (
    <div className={styles.container}>
      <SecaoReviewBanner />

      <IdentificacaoRepresentanteFields
        dados={form.form}
        isLocked={form.ui.isLocked}
        fieldClass={form.review.fieldClass}
        onChange={form.actions.handleChange}
      />

      {!readOnlyView && (
        <IdentificacaoRepresentanteActions
          isEditing={form.ui.isEditing}
          isSaving={form.ui.isSaving}
          saveError={form.ui.saveError}
          canStartEditing={form.ui.canStartEditing}
          onEdit={form.actions.startEditing}
          onCancel={form.actions.cancel}
          onSave={() => void form.actions.save()}
        />
      )}
    </div>
  )
}

export default FormularioIdentificacaoRepresentanteLegal
