import { OBJETIVOS_TEXT } from "@/features/projeto/constants/objetivos"
import type { ProjectModelData } from "@/features/projeto/types"
import { notifyError, notifySuccess } from "@/features/projeto/utils/notify"

import {
  toObjetivosPatch,
  type DadosObjetivos,
} from "../types/objetivos-form"

type SaveObjetivosResult =
  | { ok: true }
  | { ok: false; error: string }

type SaveObjetivosOptions = {
  projectId: string
  dados: DadosObjetivos
  updateProjectData: (patch: Partial<ProjectModelData>) => void
}

/**
 * Persiste os objetivos no contexto do projeto.
 *
 * A API dedicada ainda não existe — o salvamento atualiza
 * apenas o estado local até a rota de backend ser criada.
 */
export async function saveObjetivos({
  projectId,
  dados,
  updateProjectData,
}: SaveObjetivosOptions): Promise<SaveObjetivosResult> {
  if (!projectId) {
    return {
      ok: false,
      error: notifyError(
        new Error("Projeto não identificado."),
        OBJETIVOS_TEXT.SAVE_ERROR,
      ),
    }
  }

  try {
    updateProjectData({
      objetivos: toObjetivosPatch(dados),
    })

    notifySuccess(OBJETIVOS_TEXT.SAVE_SUCCESS)
    return { ok: true }
  } catch (error) {
    return {
      ok: false,
      error: notifyError(error, OBJETIVOS_TEXT.SAVE_ERROR),
    }
  }
}
