"use client"

import { Check, Pencil, X } from "lucide-react"

import { Button } from "@/components/ui/button"

import styles from "../identidicacao-do-projeto.module.css"

type IdentificacaoProjetoActionsProps = {
  /** Indica se o formulário está em modo de edição. */
  isEditing: boolean

  /** Indica se existe uma operação de salvamento em andamento. */
  isSaving: boolean

  /** Mensagem de erro exibida após uma tentativa de salvar. */
  saveError: string | null

  /** Permite iniciar a edição do formulário. */
  canStartEditing: boolean

  /** Inicia o modo de edição. */
  onEdit: () => void

  /** Cancela as alterações realizadas. */
  onCancel: () => void

  /** Persiste as alterações do formulário. */
  onSave: () => void
}

/**
 * Renderiza as ações disponíveis para o formulário de
 * Identificação do Projeto.
 *
 * Regras:
 * - Fora da edição exibe apenas o botão "Editar";
 * - Durante a edição exibe "Cancelar" e "Salvar";
 * - Exibe mensagens de erro quando houver falha ao salvar.
 */
export function IdentificacaoProjetoActions({
  isEditing,
  isSaving,
  saveError,
  canStartEditing,
  onEdit,
  onCancel,
  onSave,
}: IdentificacaoProjetoActionsProps) {
  return (
    <div className={styles.actions}>
      {saveError && (
        <p className="mr-auto text-sm text-destructive">
          {saveError}
        </p>
      )}

      {!isEditing && canStartEditing && (
        <Button variant="outline" onClick={onEdit}>
          <Pencil className="size-4" />
          Editar
        </Button>
      )}

      {isEditing && (
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
