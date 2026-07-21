import { notifyError, notifySuccess } from "@/features/projeto/utils/notify"
import { saveProjectSession05ValorTotal } from "@/features/projeto/services/project-session-05-financial.service"
import type { ProjectSession05Financial } from "@/features/projeto/types/project-session-05-financial"

import {
  toValorTotalDoProjetoInput,
  type DadosValorTotalDoProjeto,
} from "../types/valor-total-do-projeto-form"

type SaveValorTotalDoProjetoResult =
  | { ok: true; data: ProjectSession05Financial | null }
  | { ok: false; error: string }

export async function saveValorTotalDoProjeto(
  projectId: string | undefined,
  dados: DadosValorTotalDoProjeto,
): Promise<SaveValorTotalDoProjetoResult> {
  if (!projectId) {
    return {
      ok: false,
      error: notifyError(
        new Error("Projeto não identificado."),
        "Não foi possível salvar o valor total do projeto.",
      ),
    }
  }

  try {
    const data = await saveProjectSession05ValorTotal(
      projectId,
      toValorTotalDoProjetoInput(dados),
    )

    notifySuccess("Valor total do projeto salvo com sucesso!")

    return { ok: true, data }
  } catch (error) {
    return {
      ok: false,
      error: notifyError(
        error,
        "Não foi possível salvar o valor total do projeto.",
      ),
    }
  }
}
