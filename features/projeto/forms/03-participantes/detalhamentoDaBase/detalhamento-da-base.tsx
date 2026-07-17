"use client"

import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"

import type { ProjectFormSectionProps } from "../../types"
import {
  DetalhamentoDaBaseActions,
  DetalhamentoDaBaseFields,
} from "./components"
import { useDetalhamentoDaBase } from "./hooks/useDetalhamentoDaBase"
import styles from "./detalhamento-da-base.module.css"

/**
 * Formulário da seção "Detalhamento da Base Territorial do Projeto".
 */
export function FormularioDetalhamentoDaBase({
  readOnlyView,
}: ProjectFormSectionProps) {
  const form = useDetalhamentoDaBase({ readOnlyView })

  return (
    <div className={styles.container}>
      <SecaoReviewBanner />

      <DetalhamentoDaBaseFields
        dados={form.form}
        isLocked={form.ui.isLocked}
        onUpdateLinha={form.actions.updateLinha}
        onAddLinha={form.actions.addLinha}
        onRemoveLinha={form.actions.removeLinha}
      />

      {!readOnlyView ? (
        <DetalhamentoDaBaseActions
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

export default FormularioDetalhamentoDaBase
