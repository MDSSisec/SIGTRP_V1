import { parseApiResponse } from "@/lib/parse-api-response"
import type {
  NewProjetoFormValues,
  Projeto,
  ResponsavelOption,
} from "../types/projeto"

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

export async function createProjeto(data: NewProjetoFormValues) {
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
