import { notifyError, notifySuccess } from "@/features/projeto/utils/notify"
import { saveProjectSession03Historico } from "@/features/projeto/services/project-session-03-participants.service"
import type { ProjectSession03Participants } from "@/features/projeto/types/project-session-03-participants"

import {
  toHistoricoSituacaoInput,
  type DadosHistoricoSituacao,
} from "../types/historico-situacao-form"

type SaveHistoricoSituacaoResult =
  | { ok: true; data: ProjectSession03Participants | null }
  | { ok: false; error: string }

export async function saveHistoricoSituacao(
  projectId: string | undefined,
  dados: DadosHistoricoSituacao,
): Promise<SaveHistoricoSituacaoResult> {
  if (!projectId) {
    return {
      ok: false,
      error: notifyError(
        new Error("Projeto não identificado."),
        "Não foi possível salvar o histórico e situação.",
      ),
    }
  }

  try {
    const data = await saveProjectSession03Historico(
      projectId,
      toHistoricoSituacaoInput(dados),
    )

    notifySuccess("Histórico e situação salvos com sucesso!")

    return { ok: true, data }
  } catch (error) {
    return {
      ok: false,
      error: notifyError(
        error,
        "Não foi possível salvar o histórico e situação.",
      ),
    }
  }
}
