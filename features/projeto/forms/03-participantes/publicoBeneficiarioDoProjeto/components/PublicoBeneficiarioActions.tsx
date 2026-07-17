"use client"

import { Check, Pencil, X } from "lucide-react"

import { GenericButton } from "@/features/projeto/components/genericButton/generic-button"

import styles from "../publico-beneficiario-do-projeto.module.css"

type PublicoBeneficiarioActionsProps = {
  isEditing: boolean
  canStartEditing: boolean
  onEdit: () => void
  onCancel: () => void
  onSave: () => void
}

/**
 * Ações Editar / Cancelar / Salvar da seção Público beneficiário.
 */
export function PublicoBeneficiarioActions({
  isEditing,
  canStartEditing,
  onEdit,
  onCancel,
  onSave,
}: PublicoBeneficiarioActionsProps) {
  return (
    <div className={styles.actions}>
      {!isEditing && canStartEditing ? (
        <GenericButton variant="editar" icon={Pencil} onClick={onEdit}>
          Editar
        </GenericButton>
      ) : null}

      {isEditing ? (
        <>
          <GenericButton variant="outline" icon={X} onClick={onCancel}>
            Cancelar
          </GenericButton>
          <GenericButton variant="salvar" icon={Check} onClick={onSave}>
            Salvar
          </GenericButton>
        </>
      ) : null}
    </div>
  )
}
