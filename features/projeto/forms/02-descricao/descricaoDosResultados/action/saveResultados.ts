import { RESULTADOS_TEXT } from "@/features/projeto/constants/resultados"
import type { ProjectModelData } from "@/features/projeto/types"
import { notifyError, notifySuccess } from "@/features/projeto/utils/notify"

import {
  toResultadosPatch,
  type DadosResultados,
} from "../types/resultados-form"

type SaveResultadosResult =
  | { ok: true }
  | { ok: false; error: string }

type SaveResultadosOptions = {
  projectId: string
  dados: DadosResultados
  updateProjectData: (patch: Partial<ProjectModelData>) => void
}

/**
 * Persiste resultados esperados no contexto do projeto.
 *
 * A API dedicada ainda não existe — o salvamento atualiza
 * apenas o estado local até a rota de backend ser criada.
 */
export async function saveResultados({
  projectId,
  dados,
  updateProjectData,
}: SaveResultadosOptions): Promise<SaveResultadosResult> {
  if (!projectId) {
    return {
      ok: false,
      error: notifyError(
        new Error("Projeto não identificado."),
        RESULTADOS_TEXT.SAVE_ERROR,
      ),
    }
  }

  try {
    updateProjectData({
      resultados_esperados: toResultadosPatch(dados),
    })

    notifySuccess(RESULTADOS_TEXT.SAVE_SUCCESS)
    return { ok: true }
  } catch (error) {
    return {
      ok: false,
      error: notifyError(error, RESULTADOS_TEXT.SAVE_ERROR),
    }
  }
}
