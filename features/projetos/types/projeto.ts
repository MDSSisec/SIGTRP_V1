import {
  formatProjetoTipoLabel,
  normalizeProjetoTipo,
  PROJETO_TIPOS,
  type ProjetoTipo,
} from "../constants/project-types"

export type ProjetoStatus =
  | "Aprovado"
  | "Em análise"
  | "Pendente"
  | "Concluído"

export type { ProjetoTipo }

export type ProjetoRow = {
  id: string
  tipo_projeto: string
  nome: string
  responsavel_interno_id: string
  responsavel_externo_id: string
  criado_por_id: string
  etapa_id?: string | null
  criado_em: string
  atualizado_em: string
  responsavel_interno_nome?: string
  responsavel_externo_nome?: string
  criado_por_nome?: string
  etapa_nome?: string | null
  etapa_ordem?: number | null
}

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

export function toProjeto(row: ProjetoRow): Projeto {
  const responsavelInternoNome = row.responsavel_interno_nome ?? ""
  const responsavelExternoNome = row.responsavel_externo_nome ?? ""
  const tipoProjeto = normalizeProjetoTipo(row.tipo_projeto) ?? PROJETO_TIPOS.TED

  return {
    id: row.id,
    tipoProjeto,
    nome: row.nome,
    responsavelInternoId: row.responsavel_interno_id,
    responsavelExternoId: row.responsavel_externo_id,
    responsavelInternoNome,
    responsavelExternoNome,
    criadoPorId: row.criado_por_id,
    criadoPorNome: row.criado_por_nome ?? "",
    criadoEm: row.criado_em,
    atualizadoEm: row.atualizado_em,
    responsavel: responsavelInternoNome,
    status: "Em análise",
    tipo: formatProjetoTipoLabel(tipoProjeto),
    etapaId: row.etapa_id ?? null,
    etapaNome: row.etapa_nome ?? "TRP em Elaboração",
    etapaOrdem: row.etapa_ordem ?? null,
  }
}
