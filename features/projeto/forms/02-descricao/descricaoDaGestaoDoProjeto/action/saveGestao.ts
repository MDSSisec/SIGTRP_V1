import { GESTAO_TEXT } from "@/features/projeto/constants/gestao-projeto"
import type { ProjectModelData } from "@/features/projeto/types"
import { notifyError, notifySuccess } from "@/features/projeto/utils/notify"

import {
  toGestaoPatch,
  type DadosGestao,
} from "../types/gestao-form"

/**
 * Resultado da operação de salvamento da seção Gestão do Projeto.
 */
type SaveGestaoResult =
  | { ok: true }
  | { ok: false; error: string }

/**
 * Parâmetros necessários para salvar a Gestão do Projeto.
 */
type SaveGestaoOptions = {
  /** Identificador do projeto. */
  projectId: string

  /** Dados preenchidos no formulário. */
  dados: DadosGestao

  /** Atualiza o estado global do projeto. */
  updateProjectData: (patch: Partial<ProjectModelData>) => void
}

/**
 * Salva os dados da seção Gestão do Projeto.
 *
 * Atualmente a aplicação ainda não possui uma API específica para esta seção.
 * Por isso, o salvamento atualiza apenas o estado do projeto em memória.
 *
 * Fluxo:
 * - valida a existência do projeto;
 * - converte os dados do formulário para o modelo da aplicação;
 * - atualiza o contexto do projeto;
 * - exibe uma notificação de sucesso ou erro.
 */
export async function saveGestao({
  projectId,
  dados,
  updateProjectData,
}: SaveGestaoOptions): Promise<SaveGestaoResult> {
  if (!projectId) {
    return {
      ok: false,
      error: notifyError(
        new Error("Projeto não identificado."),
        GESTAO_TEXT.SAVE_ERROR,
      ),
    }
  }

  try {
    updateProjectData({
      gestao_projeto: toGestaoPatch(dados),
    })

    notifySuccess(GESTAO_TEXT.SAVE_SUCCESS)

    return {
      ok: true,
    }
  } catch (error) {
    return {
      ok: false,
      error: notifyError(error, GESTAO_TEXT.SAVE_ERROR),
    }
  }
}