"use client"

import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"

import type { ProjectFormSectionProps } from "../../types"
import {
  PerfilSocioOcupacionalActions,
  PerfilSocioOcupacionalFields,
} from "./components"
import { usePerfilSocioOcupacional } from "./hooks/usePerfilSocioOcupacional"
import styles from "./perfils-socio-ocupacional.module.css"

/**
 * Formulário da seção "Perfil sócio-ocupacional".
 */
export function FormularioPerfilSocioOcupacional({
  projectId,
  readOnlyView,
}: ProjectFormSectionProps) {
  const form = usePerfilSocioOcupacional({ projectId, readOnlyView })

  return (
    <div className={styles.container}>
      <SecaoReviewBanner />

      <PerfilSocioOcupacionalFields
        dados={form.form}
        isLocked={form.ui.isLocked}
        exclusivoMarcado={form.meta.exclusivoMarcado}
        onToggle={form.actions.toggle}
        onOutrosChange={form.actions.setOutrosEspecificar}
      />

      {!readOnlyView ? (
        <PerfilSocioOcupacionalActions
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

export default FormularioPerfilSocioOcupacional
