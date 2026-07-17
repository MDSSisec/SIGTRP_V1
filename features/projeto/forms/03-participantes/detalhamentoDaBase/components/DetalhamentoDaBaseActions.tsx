"use client"

import { Check, Pencil, X } from "lucide-react"

import { GenericButton } from "@/features/projeto/components/genericButton/generic-button"

import styles from "../detalhamento-da-base.module.css"

type DetalhamentoDaBaseActionsProps = {
  isEditing: boolean
  canStartEditing: boolean
  onEdit: () => void
  onCancel: () => void
  onSave: () => void
}

/**
 * Ações Editar / Cancelar / Salvar da seção Detalhamento da base.
 */
export function DetalhamentoDaBaseActions({
  isEditing,
  canStartEditing,
  onEdit,
  onCancel,
  onSave,
}: DetalhamentoDaBaseActionsProps) {
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
