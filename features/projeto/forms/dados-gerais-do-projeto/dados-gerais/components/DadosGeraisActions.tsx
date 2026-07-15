"use client"

import { Check, Pencil, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { formLayoutStyles } from "@/features/projeto/components/formShared/form-section"

type Props = {
  isEditing: boolean
  isSaving: boolean
  saveError: string | null
  canStartEditing: boolean
  onEdit: () => void
  onCancel: () => void
  onSave: () => void
}

export function DadosGeraisActions({
  isEditing,
  isSaving,
  saveError,
  canStartEditing,
  onEdit,
  onCancel,
  onSave,
}: Props) {
  return (
    <div className={formLayoutStyles.actions}>
      {saveError ? (
        <p className="mr-auto text-sm text-destructive">{saveError}</p>
      ) : null}

      {!isEditing && canStartEditing ? (
        <Button variant="outline" onClick={onEdit}>
          <Pencil className="size-4" />
          Editar
        </Button>
      ) : null}

      {isEditing ? (
        <>
          <Button variant="outline" disabled={isSaving} onClick={onCancel}>
            <X className="size-4" />
            Cancelar
          </Button>
          <Button disabled={isSaving} onClick={onSave}>
            <Check className="size-4" />
            {isSaving ? "Salvando..." : "Salvar"}
          </Button>
        </>
      ) : null}
    </div>
  )
}
