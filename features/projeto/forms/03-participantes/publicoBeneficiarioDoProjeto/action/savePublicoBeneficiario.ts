import { notifyError, notifySuccess } from "@/features/projeto/utils/notify"
import { saveProjectSession03PublicoBeneficiario } from "@/features/projeto/services/project-session-03-participants.service"
import type { ProjectSession03Participants } from "@/features/projeto/types/project-session-03-participants"

import {
  toPublicoBeneficiarioInput,
  type DadosPublicoBeneficiario,
} from "../types/publico-beneficiario-form"

type SavePublicoBeneficiarioResult =
  | { ok: true; data: ProjectSession03Participants | null }
  | { ok: false; error: string }

export async function savePublicoBeneficiario(
  projectId: string | undefined,
  dados: DadosPublicoBeneficiario,
): Promise<SavePublicoBeneficiarioResult> {
  if (!projectId) {
    return {
      ok: false,
      error: notifyError(
        new Error("Projeto não identificado."),
        "Não foi possível salvar o público beneficiário.",
      ),
    }
  }

  try {
    const data = await saveProjectSession03PublicoBeneficiario(
      projectId,
      toPublicoBeneficiarioInput(dados),
    )

    notifySuccess("Público beneficiário salvo com sucesso!")

    return { ok: true, data }
  } catch (error) {
    return {
      ok: false,
      error: notifyError(
        error,
        "Não foi possível salvar o público beneficiário.",
      ),
    }
  }
}
