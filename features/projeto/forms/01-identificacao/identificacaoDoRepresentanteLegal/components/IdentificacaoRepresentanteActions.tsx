"use client"

import { Check, Pencil, X } from "lucide-react"

import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"

import styles from "../identificacao-do-representante-legal.module.css"

type Props = {
  isEditing: boolean
  isSaving: boolean
  saveError: string | null
  canStartEditing: boolean
  onEdit: () => void
  onCancel: () => void
  onSave: () => void
}

export function IdentificacaoRepresentanteActions({
  isEditing,
  isSaving,
  saveError,
  canStartEditing,
  onEdit,
  onCancel,
  onSave,
}: Props) {
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
