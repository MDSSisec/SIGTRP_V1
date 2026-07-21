import { notifyError, notifySuccess } from "@/features/projeto/utils/notify"
import { saveProjectSession03Povos } from "@/features/projeto/services/project-session-03-participants.service"
import type { ProjectSession03Participants } from "@/features/projeto/types/project-session-03-participants"

import {
  toPovosOuComunidadesTradicionaisInput,
  type DadosPovosOuComunidadesTradicionais,
} from "../types/povos-ou-comunidades-tradicionais-form"

type SavePovosOuComunidadesTradicionaisResult =
  | { ok: true; data: ProjectSession03Participants | null }
  | { ok: false; error: string }

type SavePovosOuComunidadesTradicionaisOptions = {
  projectId?: string
  dados: DadosPovosOuComunidadesTradicionais
}

export async function savePovosOuComunidadesTradicionais({
  projectId,
  dados,
}: SavePovosOuComunidadesTradicionaisOptions): Promise<SavePovosOuComunidadesTradicionaisResult> {
  if (!projectId) {
    return {
      ok: false,
      error: notifyError(
        new Error("Projeto não identificado."),
        "Não foi possível salvar povos ou comunidades tradicionais.",
      ),
    }
  }

  try {
    const data = await saveProjectSession03Povos(
      projectId,
      toPovosOuComunidadesTradicionaisInput(dados),
    )

    notifySuccess("Povos ou comunidades tradicionais salvos com sucesso!")

    return { ok: true, data }
  } catch (error) {
    return {
      ok: false,
      error: notifyError(
        error,
        "Não foi possível salvar povos ou comunidades tradicionais.",
      ),
    }
  }
}
