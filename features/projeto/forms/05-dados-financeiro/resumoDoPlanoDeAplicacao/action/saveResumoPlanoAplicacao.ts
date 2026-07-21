import { notifyError, notifySuccess } from "@/features/projeto/utils/notify"
import { saveProjectSession05ResumoPlanoAplicacao } from "@/features/projeto/services/project-session-05-financial.service"
import type { ProjectSession05Financial } from "@/features/projeto/types/project-session-05-financial"

import {
  toResumoPlanoAplicacaoInput,
  type DadosResumoPlanoAplicacao,
} from "../types/resumo-plano-aplicacao-form"

type SaveResumoPlanoAplicacaoResult =
  | { ok: true; data: ProjectSession05Financial | null }
  | { ok: false; error: string }

export async function saveResumoPlanoAplicacao(
  projectId: string | undefined,
  dados: DadosResumoPlanoAplicacao,
): Promise<SaveResumoPlanoAplicacaoResult> {
  if (!projectId) {
    return {
      ok: false,
      error: notifyError(
        new Error("Projeto não identificado."),
        "Não foi possível salvar o resumo do plano de aplicação.",
      ),
    }
  }

  try {
    const data = await saveProjectSession05ResumoPlanoAplicacao(
      projectId,
      toResumoPlanoAplicacaoInput(dados),
    )

    notifySuccess("Resumo do plano de aplicação salvo com sucesso!")

    return { ok: true, data }
  } catch (error) {
    return {
      ok: false,
      error: notifyError(
        error,
        "Não foi possível salvar o resumo do plano de aplicação.",
      ),
    }
  }
}
