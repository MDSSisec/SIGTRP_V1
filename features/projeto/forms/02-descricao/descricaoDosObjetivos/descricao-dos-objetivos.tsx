"use client"

import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"

import type { ProjectFormSectionProps } from "../../types"
import { ObjetivosActions, ObjetivosFields } from "./components"
import { useObjetivos } from "./hooks/useObjetivos"
import styles from "./descricao-dos-objetivos.module.css"

/**
 * Formulário da seção "Objetivos".
 *
 * Compõe a UI e delega a lógica a `useObjetivos`.
 */
export function FormularioObjetivos({
  projectId,
  readOnlyView,
}: ProjectFormSectionProps) {
  const form = useObjetivos({ projectId, readOnlyView })

  return (
    <div className={styles.container}>
      <SecaoReviewBanner />

      <ObjetivosFields
        dados={form.form}
        isLocked={form.ui.isLocked}
        canManageList={form.ui.canManageList}
        fieldClass={form.review.fieldClass}
        onObjetivoGeralChange={form.actions.handleObjetivoGeralChange}
        onEspecificoChange={form.actions.handleEspecificoChange}
        onAdicionar={form.actions.adicionarObjetivo}
        onRemover={form.actions.removerObjetivo}
      />

      {!readOnlyView ? (
        <ObjetivosActions
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

export default FormularioObjetivos
