import { notifyError, notifySuccess } from "@/features/projeto/utils/notify"
import { saveProjectSession02DescriptionMetodologia } from "@/features/projeto/services/project-session-02-description.service"
import type { ProjectSession02Description } from "@/features/projeto/types/project-session-02-description"

import {
  toMetodologiaInput,
  type DadosMetodologia,
} from "../types/metodologia-form"

type SaveMetodologiaResult =
  | { ok: true; data: ProjectSession02Description | null }
  | { ok: false; error: string }

/** Persiste a metodologia do projeto via API. */
export async function saveMetodologia(
  projectId: string,
  dados: DadosMetodologia,
): Promise<SaveMetodologiaResult> {
  if (!projectId) {
    return {
      ok: false,
      error: notifyError(
        new Error("Projeto não identificado."),
        "Não foi possível salvar a metodologia.",
      ),
    }
  }

  try {
    const data = await saveProjectSession02DescriptionMetodologia(
      projectId,
      toMetodologiaInput(dados),
    )

    notifySuccess("Metodologia salva com sucesso!")

    return { ok: true, data }
  } catch (error) {
    return {
      ok: false,
      error: notifyError(error, "Não foi possível salvar a metodologia."),
    }
  }
}
