import { parseApiResponse } from "@/lib/parse-api-response"
import type {
  ProjectSession02Description,
  ProjectSession02DescriptionJustificativaInput,
  ProjectSession02DescriptionMetodologiaInput,
} from "@/features/projeto/types/project-session-02-description"

type ProjectSession02DescriptionResponse = {
  descricao: ProjectSession02Description | null
}

async function patchDescricaoBloco(
  projetoId: string,
  bloco: string,
  data: unknown,
) {
  const response = await fetch(
    `/api/projetos/${projetoId}/ted/descricao/${bloco}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  )

  const result =
    await parseApiResponse<ProjectSession02DescriptionResponse>(response)
  return result.descricao
}

export async function fetchProjectSession02Description(projetoId: string) {
  const response = await fetch(`/api/projetos/${projetoId}/ted/descricao`)
  const data =
    await parseApiResponse<ProjectSession02DescriptionResponse>(response)
  return data.descricao
}

export async function saveProjectSession02DescriptionJustificativa(
  projetoId: string,
  data: ProjectSession02DescriptionJustificativaInput,
) {
  return patchDescricaoBloco(projetoId, "justificativa", data)
}

export async function saveProjectSession02DescriptionMetodologia(
  projetoId: string,
  data: ProjectSession02DescriptionMetodologiaInput,
) {
  return patchDescricaoBloco(projetoId, "metodologia", data)
}
