import { METAS_TEXT } from "@/features/projeto/constants/metas"
import type { MetaCronograma } from "@/features/projeto/contexts/cronograma/types"
import type { ProjectModelData } from "@/features/projeto/types"
import { notifyError, notifySuccess } from "@/features/projeto/utils/notify"

import type { DadosMetas } from "../types/metas-form"

type SaveMetasResult =
  | { ok: true }
  | { ok: false; error: string }

type SaveMetasOptions = {
  projectId: string
  dados: DadosMetas
  replaceMetas: (metas: MetaCronograma[]) => void
  updateProjectData: (patch: Partial<ProjectModelData>) => void
  currentEtapasCronograma?: ProjectModelData["etapas_cronograma"]
}

/**
 * Persiste as metas no CronogramaContext e no contexto do projeto.
 *
 * A API dedicada ainda não existe — o salvamento atualiza
 * apenas o estado local até a rota de backend ser criada.
 */
export async function saveMetas({
  projectId,
  dados,
  replaceMetas,
  updateProjectData,
  currentEtapasCronograma,
}: SaveMetasOptions): Promise<SaveMetasResult> {
  if (!projectId) {
    return {
      ok: false,
      error: notifyError(
        new Error("Projeto não identificado."),
        METAS_TEXT.SAVE_ERROR,
      ),
    }
  }

  try {
    replaceMetas(dados.metas)

    updateProjectData({
      etapas_cronograma: {
        ...(typeof currentEtapasCronograma === "object"
          ? currentEtapasCronograma
          : {}),
        metas: dados.metas,
      },
    })

    notifySuccess(METAS_TEXT.SAVE_SUCCESS)
    return { ok: true }
  } catch (error) {
    return {
      ok: false,
      error: notifyError(error, METAS_TEXT.SAVE_ERROR),
    }
  }
}
