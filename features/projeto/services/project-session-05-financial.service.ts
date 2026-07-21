import { parseApiResponse } from "@/lib/parse-api-response"
import type {
  ProjectSession05CronogramaDesembolsoInput,
  ProjectSession05Financial,
  ProjectSession05ResumoPlanoAplicacaoInput,
  ProjectSession05ValorTotalInput,
} from "@/features/projeto/types/project-session-05-financial"

type ProjectSession05FinancialResponse = {
  financeiro: ProjectSession05Financial | null
}

async function patchFinanceiroBloco(
  projetoId: string,
  bloco: string,
  data: unknown,
) {
  const response = await fetch(
    `/api/projetos/${projetoId}/ted/dados-financeiros/${bloco}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  )

  const result =
    await parseApiResponse<ProjectSession05FinancialResponse>(response)
  return result.financeiro
}

export async function fetchProjectSession05Financial(projetoId: string) {
  const response = await fetch(
    `/api/projetos/${projetoId}/ted/dados-financeiros`,
  )
  const data =
    await parseApiResponse<ProjectSession05FinancialResponse>(response)
  return data.financeiro
}

export async function saveProjectSession05ValorTotal(
  projetoId: string,
  data: ProjectSession05ValorTotalInput,
) {
  return patchFinanceiroBloco(projetoId, "valor-total", data)
}

export async function saveProjectSession05CronogramaDesembolso(
  projetoId: string,
  data: ProjectSession05CronogramaDesembolsoInput,
) {
  return patchFinanceiroBloco(projetoId, "cronograma-desembolso", data)
}

export async function saveProjectSession05ResumoPlanoAplicacao(
  projetoId: string,
  data: ProjectSession05ResumoPlanoAplicacaoInput,
) {
  return patchFinanceiroBloco(projetoId, "resumo-plano-aplicacao", data)
}
