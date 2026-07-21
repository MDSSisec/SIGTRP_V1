"use client"

import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"
import { IdentificacaoProponenteActions, IdentificacaoProponenteFields } from "./components"
import { useIdentificacaoProponente } from "./hooks/useIdentificacaoProponente"
import styles from "./identificacao-do-proponente.module.css"
import type { ProjectFormSectionProps } from "../../types"

/**
 * Formulário da seção "Identificação do(a) Proponente".
 *
 * Compõe a UI e delega a lógica a `useIdentificacaoProponente`.
 */
function FormularioIdentificacaoProponente({
  projectId,
  readOnlyView,
}: ProjectFormSectionProps) {
  const form = useIdentificacaoProponente({ projectId, readOnlyView })

  return (
    <div className={styles.container}>
      <SecaoReviewBanner />

      <IdentificacaoProponenteFields
        dados={form.form}
        isCampoLocked={form.ui.isCampoLocked}
        cepStatus={form.localidade.cepStatus}
        isCepCompleto={form.localidade.isCepCompleto}
        estados={form.localidade.estados}
        municipios={form.localidade.municipios}
        carregandoMunicipios={form.localidade.carregandoMunicipios}
        fieldClass={form.review.fieldClass}
        onChange={form.actions.handleChange}
        onSelectChange={form.actions.handleSelectChange}
      />

      {!readOnlyView && (
        <IdentificacaoProponenteActions
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

export default FormularioIdentificacaoProponente
