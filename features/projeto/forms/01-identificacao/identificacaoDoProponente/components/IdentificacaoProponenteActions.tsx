"use client"

import { Check, Pencil, X } from "lucide-react"

import { Button } from "@/components/ui/button"

import styles from "../identificacao-do-proponente.module.css"

type IdentificacaoProponenteActionsProps = {
  /** Indica se o formulário está em modo de edição. */
  isEditing: boolean

  /** Indica se existe um salvamento em andamento. */
  isSaving: boolean

  /** Mensagem de erro exibida após falha no salvamento. */
  saveError: string | null

  /** Define se o usuário pode iniciar a edição. */
  canStartEditing: boolean

  /** Inicia a edição do formulário. */
  onEdit: () => void

  /** Cancela a edição e restaura os dados. */
  onCancel: () => void

  /** Salva as alterações realizadas. */
  onSave: () => void
}

/**
 * Renderiza as ações disponíveis para o formulário
 * de Identificação do(a) Proponente.
 *
 * Exibe:
 * - botão "Editar" quando o formulário está em visualização;
 * - botões "Cancelar" e "Salvar" durante a edição;
 * - mensagem de erro quando o salvamento falha.
 */
export function IdentificacaoProponenteActions({
  isEditing,
  isSaving,
  saveError,
  canStartEditing,
  onEdit,
  onCancel,
  onSave,
}: IdentificacaoProponenteActionsProps) {
  const showEditButton = !isEditing && canStartEditing
  const showSaveActions = isEditing

  return (
    <div className={styles.actions}>
      {saveError && (
        <p className="mr-auto text-sm text-destructive">
          {saveError}
        </p>
      )}

      {showEditButton && (
        <Button variant="outline" onClick={onEdit}>
          <Pencil className="size-4" />
          Editar
        </Button>
      )}

      {showSaveActions && (
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
      )}
    </div>
  )
}
