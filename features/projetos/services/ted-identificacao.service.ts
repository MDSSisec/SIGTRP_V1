import { parseApiResponse } from "@/lib/parse-api-response"
import type {
  TedIdentificacao,
  TedIdentificacaoProjetoInput,
  TedIdentificacaoProponenteInput,
  TedIdentificacaoRepresentanteInput,
  TedIdentificacaoResponsavelTecnicoInput,
} from "../types/ted-identificacao"

type TedIdentificacaoResponse = {
  identificacao: TedIdentificacao | null
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

  const result = await parseApiResponse<TedIdentificacaoResponse>(response)
  return result.identificacao
}

export async function fetchTedIdentificacao(projetoId: string) {
  const response = await fetch(`/api/projetos/${projetoId}/ted/identificacao`)
  const data = await parseApiResponse<TedIdentificacaoResponse>(response)
  return data.identificacao
}

export async function saveTedIdentificacaoProjeto(
  projetoId: string,
  data: TedIdentificacaoProjetoInput,
) {
  return patchIdentificacaoBloco(projetoId, "projeto", data)
}

export async function saveTedIdentificacaoProponente(
  projetoId: string,
  data: TedIdentificacaoProponenteInput,
) {
  return patchIdentificacaoBloco(projetoId, "proponente", data)
}

export async function saveTedIdentificacaoRepresentante(
  projetoId: string,
  data: TedIdentificacaoRepresentanteInput,
) {
  return patchIdentificacaoBloco(projetoId, "representante", data)
}

export async function saveTedIdentificacaoResponsavelTecnico(
  projetoId: string,
  data: TedIdentificacaoResponsavelTecnicoInput,
) {
  return patchIdentificacaoBloco(projetoId, "responsavel-tecnico", data)
}
