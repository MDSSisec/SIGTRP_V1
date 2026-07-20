import { OUTRAS_INFORMACOES_TEXT } from "../constants/form"
import type { ProjectModelData } from "@/features/projeto/types"
import { notifyError, notifySuccess } from "@/features/projeto/utils/notify"

import {
  toOutrasInformacoesPatch,
  type DadosOutrasInformacoes,
} from "../types/outras-informacoes-form"

type SaveOutrasInformacoesResult = { ok: true } | { ok: false; error: string }

type SaveOutrasInformacoesOptions = {
  projectId: string
  dados: DadosOutrasInformacoes
  updateProjectData: (patch: Partial<ProjectModelData>) => void
}

export async function saveOutrasInformacoesProponente({
  projectId,
  dados,
  updateProjectData,
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
    updateProjectData({
      caracterizacao_proponente: toOutrasInformacoesPatch(dados),
    })

    notifySuccess(OUTRAS_INFORMACOES_TEXT.SAVE_SUCCESS)

    return { ok: true }
  } catch (error) {
    return {
      ok: false,
      error: notifyError(error, OUTRAS_INFORMACOES_TEXT.SAVE_ERROR),
    }
  }
}
