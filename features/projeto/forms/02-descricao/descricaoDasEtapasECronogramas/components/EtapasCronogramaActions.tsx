"use client"

import { Check, Pencil, X } from "lucide-react"

import { Button } from "@/components/ui/button"

import styles from "../descricao-das-etapas-e-cronograma.module.css"

type EtapasCronogramaActionsProps = {
  /** Indica se o formulário está em modo de edição. */
  isEditing: boolean

  /** Indica se a operação de salvamento está em andamento. */
  isSaving: boolean

  /** Mensagem de erro exibida após falha ao salvar. */
  saveError: string | null

  /** Define se o usuário pode iniciar a edição. */
  canStartEditing: boolean

  /** Inicia o modo de edição. */
  onEdit: () => void

  /** Cancela a edição e restaura os dados. */
  onCancel: () => void

  /** Salva as alterações realizadas. */
  onSave: () => void
}

/**
 * Ações Editar / Cancelar / Salvar da seção Etapas e Cronograma.
 */
export function EtapasCronogramaActions({
  isEditing,
  isSaving,
  saveError,
  canStartEditing,
  onEdit,
  onCancel,
  onSave,
}: EtapasCronogramaActionsProps) {
  return (
    <div className={styles.actions}>
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
