"use client"

import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"

import type { ProjectFormSectionProps } from "../../types"
import { ResultadosActions, ResultadosFields } from "./components"
import { useResultados } from "./hooks/useResultados"
import styles from "./resultados-esperados.module.css"

/**
 * Formulário da seção "Resultados Esperados".
 *
 * Compõe a UI e delega a lógica a `useResultados`.
 */
export function FormularioResultados({
  projectId,
  readOnlyView,
}: ProjectFormSectionProps) {
  const form = useResultados({ projectId, readOnlyView })

  return (
    <div className={styles.container}>
      <SecaoReviewBanner />

      <ResultadosFields
        dados={form.form}
        isLocked={form.ui.isLocked}
        canManageList={form.ui.canManageList}
        fieldClass={form.review.fieldClass}
        onChange={form.actions.handleChange}
        onAdicionar={form.actions.adicionar}
        onRemover={form.actions.remover}
      />

      {!readOnlyView ? (
        <ResultadosActions
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

export default FormularioResultados
