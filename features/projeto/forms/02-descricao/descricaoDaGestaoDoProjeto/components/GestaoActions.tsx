"use client"

import { Check, Pencil, X } from "lucide-react"

import { GenericButton } from "@/features/projeto/components/genericButton/generic-button"

import styles from "../descricao-da-gestao-do-projeto.module.css"

/**
 * Propriedades do componente de ações da seção Gestão do Projeto.
 */
type GestaoActionsProps = {
  /** Indica se o formulário está em modo de edição. */
  isEditing: boolean

  /** Indica se existe um salvamento em andamento. */
  isSaving: boolean

  /** Mensagem de erro exibida após uma tentativa de salvamento. */
  saveError: string | null

  /** Define se o usuário pode iniciar a edição da seção. */
  canStartEditing: boolean

  /** Inicia o modo de edição. */
  onEdit: () => void

  /** Cancela a edição e restaura os dados originais. */
  onCancel: () => void

  /** Salva as alterações realizadas. */
  onSave: () => void
}

/**
 * Renderiza os botões de ação da seção Gestão do Projeto.
 *
 * Comportamento:
 * - Exibe **Editar** quando a seção está em modo de visualização.
 * - Exibe **Cancelar** e **Salvar** durante a edição.
 * - Mostra mensagens de erro quando o salvamento falha.
 * - Desabilita os botões durante o processo de salvamento.
 */
export function GestaoActions({
  isEditing,
  isSaving,
  saveError,
  canStartEditing,
  onEdit,
  onCancel,
  onSave,
}: GestaoActionsProps) {
  return (
    <div className={styles.actions}>
      {saveError ? (
        <p className="mr-auto text-sm text-destructive">{saveError}</p>
      ) : null}

      {!isEditing && canStartEditing ? (
        <GenericButton
          variant="editar"
          icon={Pencil}
          onClick={onEdit}
        >
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