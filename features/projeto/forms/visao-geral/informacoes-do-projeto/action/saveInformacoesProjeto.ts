import { notifyError, notifySuccess } from "@/features/projeto/utils/notify"
import { updateProjetoInformacoes } from "@/features/projeto/services"
import type { Projeto } from "@/features/projeto/types"

import type { DadosInformacoesProjeto } from "../types/informacoes-form"

type SaveInformacoesProjetoInput = {
  responsavelInternoId: string
  responsavelExternoId: string
  etapaId?: string
}

type SaveInformacoesProjetoResult =
  | { ok: true; data: Projeto }
  | { ok: false; error: string }

/**
 * Salva as informações gerais do projeto (etapa + responsáveis).
 */
export async function saveInformacoesProjeto(
  projectId: string,
  formData: SaveInformacoesProjetoInput,
): Promise<SaveInformacoesProjetoResult> {
  try {
    const data = await updateProjetoInformacoes(projectId, formData)
    notifySuccess("Informações do projeto salvas com sucesso!")
    return { ok: true, data }
  } catch (error) {
    const message = notifyError(
      error,
      "Não foi possível salvar as informações do projeto.",
    )
    return { ok: false, error: message }
  }
}

export function validateInformacoesProjeto(
  dados: DadosInformacoesProjeto,
  canEditInfo: boolean,
): string | null {
  if (!dados.responsavelInternoId || !dados.responsavelExternoId) {
    return "Selecione os responsáveis interno e externo."
  }

  if (canEditInfo && !dados.etapaId) {
    return "Selecione a etapa do projeto."
  }

  return null
}
