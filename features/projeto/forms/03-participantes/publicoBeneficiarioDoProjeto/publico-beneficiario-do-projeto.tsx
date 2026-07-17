"use client"

import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"

import type { ProjectFormSectionProps } from "../../types"
import {
  PublicoBeneficiarioActions,
  PublicoBeneficiarioFields,
} from "./components"
import { usePublicoBeneficiario } from "./hooks/usePublicoBeneficiario"
import styles from "./publico-beneficiario-do-projeto.module.css"

/**
 * Formulário da seção "Público beneficiário do projeto".
 *
 * Compõe a UI e delega a lógica a `usePublicoBeneficiario`.
 */
export function FormularioPublicoBeneficiarioDoProjeto({
  readOnlyView,
}: ProjectFormSectionProps) {
  const form = usePublicoBeneficiario({ readOnlyView })

  return (
    <div className={styles.container}>
      <SecaoReviewBanner />

      <PublicoBeneficiarioFields
        dados={form.form}
        valores={form.meta.valores}
        isLocked={form.ui.isLocked}
        onHomensChange={form.actions.setHomensDiretos}
        onMulheresChange={form.actions.setMulheresDiretos}
      />

      {!readOnlyView ? (
        <PublicoBeneficiarioActions
          isEditing={form.ui.isEditing}
          canStartEditing={form.ui.canStartEditing}
          onEdit={form.actions.startEditing}
          onCancel={form.actions.cancel}
          onSave={form.actions.save}
        />
      ) : null}
    </div>
  )
}

export default FormularioPublicoBeneficiarioDoProjeto
