"use client"

import type { ProjectFormSectionProps } from "../../types"
import {
  MetodologiaActions,
  MetodologiaFields,
} from "./components"
import { useMetodologiaVisual } from "./hooks/useMetodologiaVisual"
import styles from "./descricao-da-metodologia.module.css"

/**
 * Formulário da seção "Metodologia".
 *
 * Atualmente a seção funciona apenas como uma prévia visual,
 * mantendo os dados em memória. A integração com o backend e
 * com as demais seções será implementada futuramente.
 */
export function FormularioMetodologia({
  readOnlyView,
}: ProjectFormSectionProps) {
  const form = useMetodologiaVisual({ readOnlyView })

  return (
    <div className={styles.container}>
      <MetodologiaFields
        metaTexto={form.form.metaTexto}
        etapasTexto={form.form.etapasTexto}
        isLocked={form.ui.isLocked}
        onMetaChange={form.actions.setMetaTexto}
        onEtapaChange={form.actions.setEtapaTexto}
      />

      {!readOnlyView && (
        <MetodologiaActions
          isEditing={form.ui.isEditing}
          canStartEditing={form.ui.canStartEditing}
          onEdit={form.actions.startEditing}
          onCancel={form.actions.cancel}
          onSave={form.actions.save}
        />
      )}
    </div>
  )
}

export default FormularioMetodologia