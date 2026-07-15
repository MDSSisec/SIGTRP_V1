import {
  formatProjetoTipoLabel,
  normalizeProjetoTipo,
  PROJETO_TIPOS,
} from "@/features/projeto/constants/projeto-tipos"
import type { Projeto } from "@/features/projeto/types/projeto"

/** Registro bruto da tabela de projetos (snake_case). */
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

const ETAPA_FALLBACK = "Sem etapa"

export function toProjeto(row: ProjetoRow): Projeto {
  const tipoProjeto =
    normalizeProjetoTipo(row.tipo_projeto) ?? PROJETO_TIPOS.TED

  const responsavelInternoNome = row.responsavel_interno_nome ?? ""
  const responsavelExternoNome = row.responsavel_externo_nome ?? ""
  const criadoPorNome = row.criado_por_nome ?? ""
  const etapaNome = row.etapa_nome?.trim() || ETAPA_FALLBACK

  return {
    id: row.id,
    tipoProjeto,
    nome: row.nome,
    responsavelInternoId: row.responsavel_interno_id,
    responsavelExternoId: row.responsavel_externo_id,
    responsavelInternoNome,
    responsavelExternoNome,
    criadoPorId: row.criado_por_id,
    criadoPorNome,
    criadoEm: row.criado_em,
    atualizadoEm: row.atualizado_em,
    responsavel: responsavelInternoNome,
    status: etapaNome,
    tipo: formatProjetoTipoLabel(tipoProjeto),
    etapaId: row.etapa_id ?? null,
    etapaNome,
    etapaOrdem: row.etapa_ordem ?? null,
  }
}
