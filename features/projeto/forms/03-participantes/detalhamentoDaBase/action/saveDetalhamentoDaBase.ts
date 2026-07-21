import { notifyError, notifySuccess } from "@/features/projeto/utils/notify"
import { saveProjectSession03BaseTerritorial } from "@/features/projeto/services/project-session-03-participants.service"
import type { ProjectSession03Participants } from "@/features/projeto/types/project-session-03-participants"

import {
  toDetalhamentoDaBaseInput,
  type DadosDetalhamentoDaBase,
} from "../types/detalhamento-da-base-form"

type SaveDetalhamentoDaBaseResult =
  | { ok: true; data: ProjectSession03Participants | null }
  | { ok: false; error: string }

export async function saveDetalhamentoDaBase(
  projectId: string | undefined,
  dados: DadosDetalhamentoDaBase,
): Promise<SaveDetalhamentoDaBaseResult> {
  if (!projectId) {
    return {
      ok: false,
      error: notifyError(
        new Error("Projeto não identificado."),
        "Não foi possível salvar o detalhamento da base territorial.",
      ),
    }
  }

  try {
    const data = await saveProjectSession03BaseTerritorial(
      projectId,
      toDetalhamentoDaBaseInput(dados),
    )

    notifySuccess("Detalhamento da base territorial salvo com sucesso!")

    return { ok: true, data }
  } catch (error) {
    return {
      ok: false,
      error: notifyError(
        error,
        "Não foi possível salvar o detalhamento da base territorial.",
      ),
    }
  }
}
