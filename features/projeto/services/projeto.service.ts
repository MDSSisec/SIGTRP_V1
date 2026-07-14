import { parseApiResponse } from "@/lib/parse-api-response"
import type {
  CreateProjetoInput,
  Projeto,
  ProjetoEtapa,
  ResponsavelOption,
} from "../types/projeto"

/**
 * Cliente HTTP do BFF — chama /api/projetos.
 * Sem acesso ao banco e sem regras de negócio.
 */

type ProjetosResponse = {
  projetos: Projeto[]
}

type CreateProjetoResponse = {
  projeto: Projeto
}

type ResponsaveisResponse = {
  responsaveis: ResponsavelOption[]
}

export async function fetchProjetos() {
  const response = await fetch("/api/projetos")
  const data = await parseApiResponse<ProjetosResponse>(response)
  return data.projetos
}

export async function createProjeto(data: CreateProjetoInput) {
  const response = await fetch("/api/projetos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const result = await parseApiResponse<CreateProjetoResponse>(response)
  return result.projeto
}

export async function deleteProjeto(id: string) {
  const response = await fetch(`/api/projetos/${id}`, {
    method: "DELETE",
  })

  await parseApiResponse<{ success: boolean }>(response)
}

export async function fetchResponsaveisInternos() {
  const response = await fetch("/api/projetos/responsaveis/internos")
  const data = await parseApiResponse<ResponsaveisResponse>(response)
  return data.responsaveis
}

export async function fetchResponsaveisExternos() {
  const response = await fetch("/api/projetos/responsaveis/externos")
  const data = await parseApiResponse<ResponsaveisResponse>(response)
  return data.responsaveis
}

type ProjectStagesResponse = {
  etapas: ProjetoEtapa[]
}

/** Catálogo SIGTRP_TB_PROJECT_STAGES. */
export async function fetchProjectStages() {
  const response = await fetch("/api/projetos/etapas")
  const data = await parseApiResponse<ProjectStagesResponse>(response)
  return data.etapas
}
