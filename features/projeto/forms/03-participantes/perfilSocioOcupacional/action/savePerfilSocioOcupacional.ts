import { notifyError, notifySuccess } from "@/features/projeto/utils/notify"
import { saveProjectSession03Perfil } from "@/features/projeto/services/project-session-03-participants.service"
import type { ProjectSession03Participants } from "@/features/projeto/types/project-session-03-participants"

import {
  toPerfilSocioOcupacionalInput,
  type DadosPerfilSocioOcupacional,
} from "../types/perfil-socio-ocupacional-form"

type SavePerfilSocioOcupacionalResult =
  | { ok: true; data: ProjectSession03Participants | null }
  | { ok: false; error: string }

type SavePerfilSocioOcupacionalOptions = {
  projectId?: string
  dados: DadosPerfilSocioOcupacional
}

export async function savePerfilSocioOcupacional({
  projectId,
  dados,
}: SavePerfilSocioOcupacionalOptions): Promise<SavePerfilSocioOcupacionalResult> {
  if (!projectId) {
    return {
      ok: false,
      error: notifyError(
        new Error("Projeto não identificado."),
        "Não foi possível salvar o perfil sócio-ocupacional.",
      ),
    }
  }

  try {
    const data = await saveProjectSession03Perfil(
      projectId,
      toPerfilSocioOcupacionalInput(dados),
    )

    notifySuccess("Perfil sócio-ocupacional salvo com sucesso!")

    return { ok: true, data }
  } catch (error) {
    return {
      ok: false,
      error: notifyError(
        error,
        "Não foi possível salvar o perfil sócio-ocupacional.",
      ),
    }
  }
}
