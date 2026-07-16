"use client"

import { Check, Pencil, X } from "lucide-react"

import { GenericButton } from "@/features/projeto/components/genericButton/generic-button"

import styles from "../descricao-da-justificativa-e-motivacao.module.css"

/** Propriedades do componente de ações da Justificativa. */
type JustificativaActionsProps = {
  /** Indica se o formulário está em modo de edição. */
  isEditing: boolean

  /** Indica se o salvamento está em andamento. */
  isSaving: boolean

  /** Mensagem de erro exibida após falha no salvamento. */
  saveError: string | null

  /** Define se o usuário pode iniciar a edição. */
  canStartEditing: boolean

  /** Inicia o modo de edição. */
  onEdit: () => void

  /** Cancela a edição e restaura os dados anteriores. */
  onCancel: () => void

  /** Salva as alterações realizadas. */
  onSave: () => void
}

/**
 * Renderiza os botões de ação da seção de Justificativa.
 *
 * Estados suportados:
 * - Visualização: exibe apenas o botão **Editar**;
 * - Edição: exibe os botões **Cancelar** e **Salvar**;
 * - Salvando: desabilita as ações e altera o texto do botão para
 *   "Salvando...".
 */
export function JustificativaActions({
  isEditing,
  isSaving,
  saveError,
  canStartEditing,
  onEdit,
  onCancel,
  onSave,
}: JustificativaActionsProps) {
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