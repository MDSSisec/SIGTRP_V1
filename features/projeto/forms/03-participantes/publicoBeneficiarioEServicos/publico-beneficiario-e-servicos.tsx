"use client"

import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"

import type { ProjectFormSectionProps } from "../../types"
import {
  PublicoBeneficiarioEServicosActions,
  PublicoBeneficiarioEServicosFields,
} from "./components"
import { usePublicoBeneficiarioEServicos } from "./hooks/usePublicoBeneficiarioEServicos"
import styles from "./publico-beneficiario-e-servicos.module.css"

/**
 * Formulário da seção "Público beneficiário e serviços".
 */
export function FormularioPublicoBeneficiarioEServicos({
  projectId,
  readOnlyView,
}: ProjectFormSectionProps) {
  const form = usePublicoBeneficiarioEServicos({ projectId, readOnlyView })

  return (
    <div className={styles.container}>
      <SecaoReviewBanner />

      <PublicoBeneficiarioEServicosFields
        dados={form.form}
        isLocked={form.ui.isLocked}
        outrosMarcado={form.meta.outrosMarcado}
        onToggle={form.actions.toggle}
        onOutrosChange={form.actions.setOutrosEspecificar}
      />

      {!readOnlyView ? (
        <PublicoBeneficiarioEServicosActions
          isEditing={form.ui.isEditing}
          isSaving={form.ui.isSaving}
          canStartEditing={form.ui.canStartEditing}
          onEdit={form.actions.startEditing}
          onCancel={form.actions.cancel}
          onSave={() => void form.actions.save()}
        />
      ) : null}
    </div>
  )
}

export default FormularioPublicoBeneficiarioEServicos
