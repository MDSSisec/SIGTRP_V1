import { ETAPAS_CRONOGRAMA_TEXT } from "@/features/projeto/constants/etapas-cronograma"
import type { MetaCronograma } from "@/features/projeto/contexts/cronograma/types"
import type { ProjectModelData } from "@/features/projeto/types"
import { notifyError, notifySuccess } from "@/features/projeto/utils/notify"

import type { DadosEtapasCronograma } from "../types/etapas-cronograma-form"

/**
 * Resultado da operação de salvamento.
 */
type SaveEtapasCronogramaResult =
  | { ok: true }
  | { ok: false; error: string }

/**
 * Parâmetros necessários para salvar as etapas do cronograma.
 */
type SaveEtapasCronogramaOptions = {
  /** Identificador do projeto. */
  projectId: string

  /** Dados do formulário. */
  dados: DadosEtapasCronograma

  /** Atualiza o CronogramaContext. */
  replaceMetas: (metas: MetaCronograma[]) => void

  /** Atualiza o contexto principal do projeto. */
  updateProjectData: (patch: Partial<ProjectModelData>) => void

  /** Estado atual do cronograma armazenado no projeto. */
  currentEtapasCronograma?: ProjectModelData["etapas_cronograma"]
}

/**
 * Persiste as etapas e o cronograma do projeto.
 *
 * Atualmente o salvamento ocorre apenas nos estados locais
 * (`CronogramaContext` e `ProjectDataContext`), pois a API
 * responsável pela persistência ainda não foi implementada.
 *
 * @param options Dados necessários para realizar o salvamento.
 * @returns Resultado da operação.
 */
export async function saveEtapasCronograma({
  projectId,
  dados,
  replaceMetas,
  updateProjectData,
  currentEtapasCronograma,
}: SaveEtapasCronogramaOptions): Promise<SaveEtapasCronogramaResult> {
  if (!projectId) {
    return {
      ok: false,
      error: notifyError(
        new Error("Projeto não identificado."),
        ETAPAS_CRONOGRAMA_TEXT.SAVE_ERROR,
      ),
    }
  }

  try {
    replaceMetas(dados.metas)

    const etapasCronograma = {
      ...(currentEtapasCronograma ?? {}),
      metas: dados.metas,
    }

    updateProjectData({
      etapas_cronograma: etapasCronograma,
    })

    notifySuccess(ETAPAS_CRONOGRAMA_TEXT.SAVE_SUCCESS)

    return { ok: true }
  } catch (error) {
    return {
      ok: false,
      error: notifyError(error, ETAPAS_CRONOGRAMA_TEXT.SAVE_ERROR),
    }
  }
}