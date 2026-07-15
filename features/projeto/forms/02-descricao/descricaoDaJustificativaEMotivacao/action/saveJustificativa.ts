import { notifyError, notifySuccess } from "@/features/projeto/utils/notify"
import type { ProjectModelData } from "@/features/projeto/types"

import {
  toDescricaoProjetoPatch,
  type DadosJustificativa,
} from "../types/justificativa-form"

type SaveJustificativaResult =
  | { ok: true }
  | { ok: false; error: string }

type SaveJustificativaOptions = {
  projectId: string
  dados: DadosJustificativa
  currentDescricao?: ProjectModelData["descricao_projeto"]
  updateProjectData: (patch: Partial<ProjectModelData>) => void
}

/**
 * Persiste a justificativa no contexto do projeto.
 *
 * A API dedicada ainda não existe — o salvamento atualiza
 * apenas o estado local até a rota de backend ser criada.
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
      descricao_projeto: toDescricaoProjetoPatch(dados, currentDescricao),
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
