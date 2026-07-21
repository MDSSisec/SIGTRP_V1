import { parseApiResponse } from "@/lib/parse-api-response"
import type {
  ProjectSession01Identificacao,
  ProjectSession01IdentificacaoProjetoInput,
  ProjectSession01IdentificacaoProponenteInput,
  ProjectSession01IdentificacaoRepresentanteInput,
  ProjectSession01IdentificacaoResponsavelTecnicoInput,
} from "@/features/projeto/types/project-session-01-identificacao"

type ProjectSession01IdentificacaoResponse = {
  identificacao: ProjectSession01Identificacao | null
}

async function patchIdentificacaoBloco(
  projetoId: string,
  bloco: string,
  data: unknown,
) {
  const response = await fetch(
    `/api/projetos/${projetoId}/ted/identificacao/${bloco}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  )

  const result =
    await parseApiResponse<ProjectSession01IdentificacaoResponse>(response)
  return result.identificacao
}

export async function fetchProjectSession01Identificacao(projetoId: string) {
  const response = await fetch(`/api/projetos/${projetoId}/ted/identificacao`)
  const data =
    await parseApiResponse<ProjectSession01IdentificacaoResponse>(response)
  return data.identificacao
}

export async function saveProjectSession01IdentificacaoProjeto(
  projetoId: string,
  data: ProjectSession01IdentificacaoProjetoInput,
) {
  return patchIdentificacaoBloco(projetoId, "projeto", data)
}

export async function saveProjectSession01IdentificacaoProponente(
  projetoId: string,
  data: ProjectSession01IdentificacaoProponenteInput,
) {
  return patchIdentificacaoBloco(projetoId, "proponente", data)
}

export async function saveProjectSession01IdentificacaoRepresentante(
  projetoId: string,
  data: ProjectSession01IdentificacaoRepresentanteInput,
) {
  return patchIdentificacaoBloco(projetoId, "representante", data)
}

export async function saveProjectSession01IdentificacaoResponsavelTecnico(
  projetoId: string,
  data: ProjectSession01IdentificacaoResponsavelTecnicoInput,
) {
  return patchIdentificacaoBloco(projetoId, "responsavel-tecnico", data)
}
