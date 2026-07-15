"use client"

import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"

import type { ProjectFormSectionProps } from "../../types"
import {
  IdentificacaoProjetoActions,
  IdentificacaoProjetoFields,
} from "./components"
import { useIdentificacaoProjeto } from "./hooks/useIdentificacaoProjeto"
import styles from "./identidicacao-do-projeto.module.css"

/**
 * Formulário da seção "Identificação do Projeto".
 *
 * Compõe a UI e delega a lógica a `useIdentificacaoProjeto`.
 */
function FormularioIdentificacaoProjeto({
  projectId,
  readOnlyView,
}: ProjectFormSectionProps) {
  const form = useIdentificacaoProjeto({ projectId, readOnlyView })

  return (
    <div className={styles.container}>
      <SecaoReviewBanner />

      <IdentificacaoProjetoFields
        dados={form.form}
        isLocked={form.ui.isLocked}
        isViewMode={form.ui.isViewMode}
        attention={form.review}
        onChange={form.actions.handleChange}
      />

      {!readOnlyView && (
        <IdentificacaoProjetoActions
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

export default FormularioIdentificacaoProjeto
