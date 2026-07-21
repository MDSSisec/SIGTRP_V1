"use client"

import { Check, Pencil, X } from "lucide-react"

import { GenericButton } from "@/features/projeto/components/genericButton/generic-button"

import styles from "../detalhamento-da-base.module.css"

type DetalhamentoDaBaseActionsProps = {
  isEditing: boolean
  isSaving: boolean
  saveError: string | null
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
  isSaving,
  saveError,
  canStartEditing,
  onEdit,
  onCancel,
  onSave,
}: DetalhamentoDaBaseActionsProps) {
  return (
    <div className={styles.actions}>
      {saveError ? (
        <p className="mr-auto text-sm text-destructive">{saveError}</p>
      ) : null}

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
            disabled={isSaving}
            onClick={onCancel}
          >
            Cancelar
          </GenericButton>
          <GenericButton
            variant="salvar"
            icon={Check}
            disabled={isSaving}
            onClick={onSave}
          >
            {isSaving ? "Salvando..." : "Salvar"}
          </GenericButton>
        </>
      ) : null}
    </div>
  )
}
