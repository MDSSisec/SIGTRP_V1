"use client"

import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"

import type { ProjectFormSectionProps } from "../../types"
import {
  PovosOuComunidadesTradicionaisActions,
  PovosOuComunidadesTradicionaisFields,
} from "./components"
import { usePovosOuComunidadesTradicionais } from "./hooks/usePovosOuComunidadesTradicionais"
import styles from "./povos-ou-comunidades-tradicionais.module.css"

/**
 * Formulário da seção "Povos ou Comunidades Tradicionais".
 */
export function FormularioPovosOuComunidadesTradicionais({
  projectId,
  readOnlyView,
}: ProjectFormSectionProps) {
  const form = usePovosOuComunidadesTradicionais({ projectId, readOnlyView })

  return (
    <div className={styles.container}>
      <SecaoReviewBanner />

      <PovosOuComunidadesTradicionaisFields
        dados={form.form}
        isLocked={form.ui.isLocked}
        exclusivoMarcado={form.meta.exclusivoMarcado}
        onToggle={form.actions.toggle}
        onOutrosChange={form.actions.setOutrosEspecificar}
      />

      {!readOnlyView ? (
        <PovosOuComunidadesTradicionaisActions
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

export default FormularioPovosOuComunidadesTradicionais
