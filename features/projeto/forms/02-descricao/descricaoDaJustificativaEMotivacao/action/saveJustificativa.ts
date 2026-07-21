import { notifyError, notifySuccess } from "@/features/projeto/utils/notify"
import { saveProjectSession02DescriptionJustificativa } from "@/features/projeto/services"
import type { ProjectSession02Description } from "@/features/projeto/types/project-session-02-description"

import {
  toJustificativaInput,
  type DadosJustificativa,
} from "../types/justificativa-form"

/** Resultado da operaÃ§Ã£o de salvamento da justificativa. */
type SaveJustificativaResult =
  | { ok: true; data: ProjectSession02Description | null }
  | { ok: false; error: string }

/**
 * Persiste a justificativa do projeto via API.
 */
export async function saveJustificativa(
  projectId: string,
  dados: DadosJustificativa,
): Promise<SaveJustificativaResult> {
  if (!projectId) {
    return {
      ok: false,
      error: notifyError(
        new Error("Projeto nÃ£o identificado."),
        "NÃ£o foi possÃ­vel salvar a justificativa.",
      ),
    }
  }

  try {
    const data = await saveProjectSession02DescriptionJustificativa(
      projectId,
      toJustificativaInput(dados),
    )

    notifySuccess("Justificativa salva com sucesso!")

    return { ok: true, data }
  } catch (error) {
    return {
      ok: false,
      error: notifyError(
        error,
        "NÃ£o foi possÃ­vel salvar a justificativa.",
      ),
    }
  }
}
