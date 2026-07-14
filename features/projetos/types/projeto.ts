import type { ProjetoTipo } from "../constants/project-types"

/** Status = nome em SIGTRP_TB_PROJECT_STAGES.nome (vem do banco). */
export type ProjetoStatus = string

export type { ProjetoTipo }

/** Modelo de projeto usado na aplicação (camelCase). */
export type Projeto = {
  id: string
  tipoProjeto: ProjetoTipo
  nome: string
  responsavelInternoId: string
  responsavelExternoId: string
  responsavelInternoNome: string
  responsavelExternoNome: string
  criadoPorId: string
  criadoPorNome: string
  criadoEm: string
  atualizadoEm: string
  responsavel: string
  status: ProjetoStatus
  tipo: string
  etapaId: string | null
  etapaNome: string
  etapaOrdem: number | null
}

export type ResponsavelOption = {
  id: string
  nome: string
  email: string
}

export type NewProjetoFormValues = {
  tipoProjeto: ProjetoTipo
  nome: string
  responsavelInternoId: string
  responsavelExternoId: string
}
