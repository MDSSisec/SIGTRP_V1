export type ProjetoStatus =
  | "Aprovado"
  | "Em análise"
  | "Pendente"
  | "Concluído"

export type ProjetoRow = {
  id: string
  nome: string
  valor_total: string
  responsavel_interno_id: string
  responsavel_externo_id: string
  criado_por_id: string
  criado_em: string
  atualizado_em: string
  responsavel_interno_nome?: string
  responsavel_externo_nome?: string
  criado_por_nome?: string
}

export type Projeto = {
  id: string
  nome: string
  valorTotal: number
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
}

export type ResponsavelOption = {
  id: string
  nome: string
  email: string
}

export type NewProjetoFormValues = {
  nome: string
  valorTotal: number
  responsavelInternoId: string
  responsavelExternoId: string
}

export function toProjeto(row: ProjetoRow): Projeto {
  const valorTotal = Number(row.valor_total)
  const responsavelInternoNome = row.responsavel_interno_nome ?? ""
  const responsavelExternoNome = row.responsavel_externo_nome ?? ""

  return {
    id: row.id,
    nome: row.nome,
    valorTotal: Number.isFinite(valorTotal) ? valorTotal : 0,
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
    tipo: "Projeto",
  }
}
