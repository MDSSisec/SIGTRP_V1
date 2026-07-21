import { notifyError, notifySuccess } from "@/features/projeto/utils/notify"
import { saveProjectSession03Servicos } from "@/features/projeto/services/project-session-03-participants.service"
import type { ProjectSession03Participants } from "@/features/projeto/types/project-session-03-participants"

import {
  toPublicoBeneficiarioEServicosInput,
  type DadosPublicoBeneficiarioEServicos,
} from "../types/publico-beneficiario-e-servicos-form"

type SavePublicoBeneficiarioEServicosResult =
  | { ok: true; data: ProjectSession03Participants | null }
  | { ok: false; error: string }

type SavePublicoBeneficiarioEServicosOptions = {
  projectId?: string
  dados: DadosPublicoBeneficiarioEServicos
}

export async function savePublicoBeneficiarioEServicos({
  projectId,
  dados,
}: SavePublicoBeneficiarioEServicosOptions): Promise<SavePublicoBeneficiarioEServicosResult> {
  if (!projectId) {
    return {
      ok: false,
      error: notifyError(
        new Error("Projeto não identificado."),
        "Não foi possível salvar o público beneficiário e serviços.",
      ),
    }
  }

  try {
    const data = await saveProjectSession03Servicos(
      projectId,
      toPublicoBeneficiarioEServicosInput(dados),
    )

    notifySuccess("Público beneficiário e serviços salvos com sucesso!")

    return { ok: true, data }
  } catch (error) {
    return {
      ok: false,
      error: notifyError(
        error,
        "Não foi possível salvar o público beneficiário e serviços.",
      ),
    }
  }
}
