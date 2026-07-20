"use client"

import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"

import type { ProjectFormSectionProps } from "../../types"
import {
  CronogramaDesembolsoActions,
  CronogramaDesembolsoFields,
} from "./components"
import { useCronogramaDesembolso } from "./hooks"
import styles from "./cronograma-de-desembolso.module.css"

/**
 * Formulário da seção "Cronograma de desembolso".
 */
export function FormularioCronogramaDeDesembolso({
  projectId,
  readOnlyView,
}: ProjectFormSectionProps) {
  const form = useCronogramaDesembolso({ projectId, readOnlyView })

  return (
    <div className={styles.container}>
      <SecaoReviewBanner />

      <CronogramaDesembolsoFields
        dados={form.form}
        valores={form.meta.valores}
        isLocked={form.ui.isLocked}
        onParcelaChange={form.actions.setParcelaCampo}
      />

      {!readOnlyView ? (
        <CronogramaDesembolsoActions
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

export default FormularioCronogramaDeDesembolso
