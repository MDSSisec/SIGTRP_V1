"use client"

import { Check, Pencil, X } from "lucide-react"

import { GenericButton } from "@/features/projeto/components/genericButton/generic-button"

import styles from "../descricao-da-metodologia.module.css"

type MetodologiaActionsProps = {
  isEditing: boolean
  canStartEditing: boolean
  onEdit: () => void
  onCancel: () => void
  onSave: () => void
}

/**
 * Renderiza as ações de edição da seção Metodologia.
 *
 * - Exibe "Editar" quando a seção está em modo de visualização.
 * - Exibe "Cancelar" e "Salvar" durante a edição.
 */
export function MetodologiaActions({
  isEditing,
  canStartEditing,
  onEdit,
  onCancel,
  onSave,
}: MetodologiaActionsProps) {
  return (
    <div className={styles.actions}>
      {!isEditing && canStartEditing && (
        <GenericButton variant="editar" icon={Pencil} onClick={onEdit}>
          Editar
        </GenericButton>
      )}

      {isEditing && (
        <>
          <GenericButton variant="outline" icon={X} onClick={onCancel}>
            Cancelar
          </GenericButton>

          <GenericButton variant="salvar" icon={Check} onClick={onSave}>
            Salvar
          </GenericButton>
        </>
      )}
    </div>
  )
}