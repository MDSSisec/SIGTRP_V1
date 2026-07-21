"use client"

import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"

import type { ProjectFormSectionProps } from "../../types"
import {
  IdentificacaoResponsavelTecnicoActions,
  IdentificacaoResponsavelTecnicoFields,
} from "./components"
import { useIdentificacaoResponsavelTecnico } from "./hooks/useIdentificacaoResponsavelTecnico"
import styles from "./identificacao-do-responsavel-tecnico.module.css"

/**
 * Formulário da seção "Identificação do Responsável Técnico".
 *
 * Compõe a UI e delega a lógica a `useIdentificacaoResponsavelTecnico`.
 */
function FormularioIdentificacaoResponsavelTecnico({
  projectId,
  readOnlyView,
}: ProjectFormSectionProps) {
  const form = useIdentificacaoResponsavelTecnico({
    projectId,
    readOnlyView,
  })

  return (
    <div className={styles.container}>
      <SecaoReviewBanner />

      <IdentificacaoResponsavelTecnicoFields
        dados={form.form}
        isCampoLocked={form.ui.isCampoLocked}
        emailInvalido={form.ui.emailInvalido}
        fieldClass={form.review.fieldClass}
        onChange={form.actions.handleChange}
        onEmailBlur={form.actions.markEmailTouched}
      />

      {!readOnlyView && (
        <IdentificacaoResponsavelTecnicoActions
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

export default FormularioIdentificacaoResponsavelTecnico
