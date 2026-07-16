"use client"

import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"

import type { ProjectFormSectionProps } from "../../types"
import { MetasActions, MetasFields } from "./components"
import { useMetas } from "./hooks/useMetas"
import styles from "./descricao-das-metas.module.css"

/**
 * Formulário da seção "Metas".
 *
 * Responsável apenas por compor a interface da seção,
 * delegando toda a lógica de negócio ao hook `useMetas`.
 */
export function FormularioMetas({
  projectId,
  readOnlyView,
}: ProjectFormSectionProps) {
  const form = useMetas({
    projectId,
    readOnlyView,
  })

  return (
    <div className={styles.container}>
      <SecaoReviewBanner />

      <MetasFields
        dados={form.form}
        isLocked={form.ui.isLocked}
        canManageList={form.ui.canManageList}
        fieldClass={form.review.fieldClass}
        onTituloChange={form.actions.handleTituloChange}
        onAdicionar={form.actions.adicionarMeta}
        onRemover={form.actions.removerMeta}
      />

      {!readOnlyView && (
        <MetasActions
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

export default FormularioMetas