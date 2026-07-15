"use client"

import { Check, Pencil, X } from "lucide-react"

import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"

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
        <GenericButton
          variant="editar"
          icon={Pencil}
          onClick={onEdit}
        >
          Editar
        </GenericButton>
      )}

      {isEditing && (
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
      )}
    </div>
  )
}