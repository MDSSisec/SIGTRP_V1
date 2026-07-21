import { parseApiResponse } from "@/lib/parse-api-response"
import type {
  ProjectSession04Characterization,
  ProjectSession04OutrasInformacoesInput,
} from "@/features/projeto/types/project-session-04-characterization"

type ProjectSession04CharacterizationResponse = {
  caracterizacao: ProjectSession04Characterization | null
}

async function patchCaracterizacaoBloco(
  projetoId: string,
  bloco: string,
  data: unknown,
) {
  const response = await fetch(
    `/api/projetos/${projetoId}/ted/caracterizacao/${bloco}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  )

  const result =
    await parseApiResponse<ProjectSession04CharacterizationResponse>(response)
  return result.caracterizacao
}

export async function fetchProjectSession04Characterization(projetoId: string) {
  const response = await fetch(`/api/projetos/${projetoId}/ted/caracterizacao`)
  const data =
    await parseApiResponse<ProjectSession04CharacterizationResponse>(response)
  return data.caracterizacao
}

export async function saveProjectSession04OutrasInformacoes(
  projetoId: string,
  data: ProjectSession04OutrasInformacoesInput,
) {
  return patchCaracterizacaoBloco(projetoId, "outras-informacoes", data)
}
