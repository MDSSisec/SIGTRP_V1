import { OUTRAS_INFORMACOES_TEXT } from "../constants/form"
import { saveProjectSession04OutrasInformacoes } from "@/features/projeto/services/project-session-04-characterization.service"
import type { ProjectSession04Characterization } from "@/features/projeto/types/project-session-04-characterization"
import { notifyError, notifySuccess } from "@/features/projeto/utils/notify"

import {
  toOutrasInformacoesInput,
  type DadosOutrasInformacoes,
} from "../types/outras-informacoes-form"

type SaveOutrasInformacoesResult =
  | { ok: true; data: ProjectSession04Characterization | null }
  | { ok: false; error: string }

type SaveOutrasInformacoesOptions = {
  projectId: string
  dados: DadosOutrasInformacoes
}

export async function saveOutrasInformacoesProponente({
  projectId,
  dados,
}: SaveOutrasInformacoesOptions): Promise<SaveOutrasInformacoesResult> {
  if (!projectId) {
    return {
      ok: false,
      error: notifyError(
        new Error("Projeto não identificado."),
        OUTRAS_INFORMACOES_TEXT.SAVE_ERROR,
      ),
    }
  }

  try {
    const data = await saveProjectSession04OutrasInformacoes(
      projectId,
      toOutrasInformacoesInput(dados),
    )

    notifySuccess(OUTRAS_INFORMACOES_TEXT.SAVE_SUCCESS)

    return { ok: true, data }
  } catch (error) {
    return {
      ok: false,
      error: notifyError(error, OUTRAS_INFORMACOES_TEXT.SAVE_ERROR),
    }
  }
}
