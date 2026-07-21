import { notifyError, notifySuccess } from "@/features/projeto/utils/notify"
import { saveProjectSession05CronogramaDesembolso } from "@/features/projeto/services/project-session-05-financial.service"
import type { ProjectSession05Financial } from "@/features/projeto/types/project-session-05-financial"

import {
  toCronogramaDesembolsoInput,
  type DadosCronogramaDesembolso,
} from "../types/cronograma-desembolso-form"

type SaveCronogramaDesembolsoResult =
  | { ok: true; data: ProjectSession05Financial | null }
  | { ok: false; error: string }

export async function saveCronogramaDesembolso(
  projectId: string | undefined,
  dados: DadosCronogramaDesembolso,
): Promise<SaveCronogramaDesembolsoResult> {
  if (!projectId) {
    return {
      ok: false,
      error: notifyError(
        new Error("Projeto não identificado."),
        "Não foi possível salvar o cronograma de desembolso.",
      ),
    }
  }

  try {
    const data = await saveProjectSession05CronogramaDesembolso(
      projectId,
      toCronogramaDesembolsoInput(dados),
    )

    notifySuccess("Cronograma de desembolso salvo com sucesso!")

    return { ok: true, data }
  } catch (error) {
    return {
      ok: false,
      error: notifyError(
        error,
        "Não foi possível salvar o cronograma de desembolso.",
      ),
    }
  }
}
