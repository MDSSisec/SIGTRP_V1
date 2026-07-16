import { notifyError, notifySuccess } from "@/features/projeto/utils/notify"
import type { ProjectModelData } from "@/features/projeto/types"

import {
  toDescricaoProjetoPatch,
  type DadosJustificativa,
} from "../types/justificativa-form"

/** Resultado da operação de salvamento da justificativa. */
type SaveJustificativaResult =
  | { ok: true }
  | { ok: false; error: string }

/** Dados necessários para persistir a justificativa do projeto. */
type SaveJustificativaOptions = {
  /** Identificador do projeto. */
  projectId: string

  /** Dados preenchidos no formulário. */
  dados: DadosJustificativa

  /** Estado atual da descrição do projeto. */
  currentDescricao?: ProjectModelData["descricao_projeto"]

  /** Atualiza o contexto global do projeto. */
  updateProjectData: (patch: Partial<ProjectModelData>) => void
}

/**
 * Persiste a justificativa do projeto.
 *
 * Atualmente a funcionalidade atualiza apenas o estado local do projeto,
 * pois ainda não existe uma API dedicada para essa seção.
 *
 * Fluxo:
 * 1. Valida se o projeto foi informado.
 * 2. Gera o patch da descrição do projeto.
 * 3. Atualiza o contexto global.
 * 4. Exibe uma notificação de sucesso ou erro.
 */
export async function saveJustificativa({
  projectId,
  dados,
  currentDescricao,
  updateProjectData,
}: SaveJustificativaOptions): Promise<SaveJustificativaResult> {
  if (!projectId) {
    return {
      ok: false,
      error: notifyError(
        new Error("Projeto não identificado."),
        "Não foi possível salvar a justificativa.",
      ),
    }
  }

  try {
    updateProjectData({
      descricao_projeto: toDescricaoProjetoPatch(
        dados,
        currentDescricao,
      ),
    })

    notifySuccess("Justificativa salva com sucesso!")

    return { ok: true }
  } catch (error) {
    return {
      ok: false,
      error: notifyError(
        error,
        "Não foi possível salvar a justificativa.",
      ),
    }
  }
}