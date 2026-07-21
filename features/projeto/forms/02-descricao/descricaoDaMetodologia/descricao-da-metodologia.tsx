"use client"

import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"

import type { ProjectFormSectionProps } from "../../types"
import { MetodologiaActions, MetodologiaFields } from "./components"
import { useMetodologia } from "./hooks/useMetodologia"
import styles from "./descricao-da-metodologia.module.css"

/**
 * Formulário da seção "Metodologia".
 */
export function FormularioMetodologia({
  projectId,
  readOnlyView,
}: ProjectFormSectionProps) {
  const form = useMetodologia({ projectId, readOnlyView })

  return (
    <div className={styles.container}>
      <SecaoReviewBanner />

      <MetodologiaFields
        metaTexto={form.form.metaTexto}
        etapasTexto={form.form.etapasTexto}
        isLocked={form.ui.isLocked}
        onMetaChange={form.actions.setMetaTexto}
        onEtapaChange={form.actions.setEtapaTexto}
      />

      {!readOnlyView ? (
        <MetodologiaActions
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

export default FormularioMetodologia
