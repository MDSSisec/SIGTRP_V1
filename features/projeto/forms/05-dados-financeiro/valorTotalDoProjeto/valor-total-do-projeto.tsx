"use client"

import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"

import type { ProjectFormSectionProps } from "../../types"
import {
  ValorTotalDoProjetoActions,
  ValorTotalDoProjetoFields,
} from "./components"
import { useValorTotalDoProjeto } from "./hooks"
import styles from "./valor-total-do-projeto.module.css"

/**
 * Formulário da seção "Valor total do projeto".
 */
export function FormularioValorTotalDoProjeto({
  projectId,
  readOnlyView,
}: ProjectFormSectionProps) {
  const form = useValorTotalDoProjeto({ projectId, readOnlyView })

  return (
    <div className={styles.container}>
      <SecaoReviewBanner />

      <ValorTotalDoProjetoFields
        dados={form.form}
        valores={form.meta.valores}
        isLocked={form.ui.isLocked}
        onCampoChange={form.actions.setCampo}
      />

      {!readOnlyView ? (
        <ValorTotalDoProjetoActions
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

export default FormularioValorTotalDoProjeto
