"use client"

import { Check, Pencil, X } from "lucide-react"

import { GenericButton } from "@/features/projeto/components/genericButton/generic-button"

import styles from "../publico-beneficiario-e-servicos.module.css"

type PublicoBeneficiarioEServicosActionsProps = {
  isEditing: boolean
  isSaving: boolean
  canStartEditing: boolean
  onEdit: () => void
  onCancel: () => void
  onSave: () => void
}

/**
 * Ações Editar / Cancelar / Salvar de público beneficiário e serviços.
 */
export function PublicoBeneficiarioEServicosActions({
  isEditing,
  isSaving,
  canStartEditing,
  onEdit,
  onCancel,
  onSave,
}: PublicoBeneficiarioEServicosActionsProps) {
  return (
    <div className={styles.actions}>
      {!isEditing && canStartEditing ? (
        <GenericButton variant="editar" icon={Pencil} onClick={onEdit}>
          Editar
        </GenericButton>
      ) : null}

      {isEditing ? (
        <>
          <GenericButton
            variant="outline"
            icon={X}
            onClick={onCancel}
            disabled={isSaving}
          >
            Cancelar
          </GenericButton>
          <GenericButton
            variant="salvar"
            icon={Check}
            onClick={onSave}
            disabled={isSaving}
          >
            {isSaving ? "Salvando..." : "Salvar"}
          </GenericButton>
        </>
      ) : null}
    </div>
  )
}
