"use client"

import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"

import type { ProjectFormSectionProps } from "../../types"
import { OutrasInformacoesActions, OutrasInformacoesFields } from "./components"
import { useOutrasInformacoesProponente } from "./hooks/useOutrasInformacoesProponente"
import styles from "./outras-informacoes-do-proponente.module.css"

/**
 * Seção 18 — Outras informações sobre o(a) proponente.
 */
export function FormularioOutrasInformacoesProponente({
  projectId,
  readOnlyView,
}: ProjectFormSectionProps) {
  const { form, review, ui, actions } = useOutrasInformacoesProponente({
    projectId,
    readOnlyView,
  })

  return (
    <div className={styles.container}>
      <SecaoReviewBanner />

      <OutrasInformacoesFields
        dados={form}
        isLocked={ui.isLocked}
        fieldClass={review.fieldClass}
        onChange={actions.handleChange}
      />

      {!readOnlyView ? (
        <OutrasInformacoesActions
          isEditing={ui.isEditing}
          isSaving={ui.isSaving}
          saveError={ui.saveError}
          canStartEditing={ui.canStartEditing}
          onEdit={actions.startEditing}
          onCancel={actions.cancel}
          onSave={() => void actions.save()}
        />
      ) : null}
    </div>
  )
}

export default FormularioOutrasInformacoesProponente
