"use client"

import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"

import type { ProjectFormSectionProps } from "../../types"
import { GestaoActions, GestaoFields } from "./components"
import { useGestao } from "./hooks/useGestao"
import styles from "./descricao-da-gestao-do-projeto.module.css"

/**
 * Formulário da seção "Gestão do Projeto".
 *
 * Responsável por compor a interface da seção,
 * delegando toda a lógica de negócio ao hook `useGestao`.
 */
export default function FormularioGestao({
  projectId,
  readOnlyView,
}: ProjectFormSectionProps) {
  const {
    form,
    review,
    ui,
    actions,
  } = useGestao({
    projectId,
    readOnlyView,
  })

  return (
    <div className={styles.container}>
      <SecaoReviewBanner />

      <GestaoFields
        dados={form}
        isLocked={ui.isLocked}
        fieldClass={review.fieldClass}
        onChange={actions.handleChange}
      />

      {!readOnlyView && (
        <GestaoActions
          isEditing={ui.isEditing}
          isSaving={ui.isSaving}
          saveError={ui.saveError}
          canStartEditing={ui.canStartEditing}
          onEdit={actions.startEditing}
          onCancel={actions.cancel}
          onSave={() => void actions.save()}
        />
      )}
    </div>
  )
}