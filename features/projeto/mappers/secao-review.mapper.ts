import type {
  SecaoReview,
  SecaoRevisaoStatus,
} from "../types/secao-review"

/** Valor persistido na coluna status_revisao. */
export type SecaoRevisaoStatusDb = "ok" | "precisa_atencao"

/** Registro bruto da tabela de revisão de seções (snake_case). */
export type SecaoReviewRow = {
  id: string
  projeto_id: string
  secao_slug: string
  bloqueada: boolean
  status_revisao: SecaoRevisaoStatusDb
  comentario: string | null
  atualizado_por: string | null
  atualizado_em: string
}

export function toSecaoRevisaoStatus(
  value: string | null | undefined,
): SecaoRevisaoStatus {
  return value === "precisa_atencao" ? "precisaAtencao" : "ok"
}

export function toSecaoRevisaoStatusDb(
  value: SecaoRevisaoStatus | null | undefined,
): SecaoRevisaoStatusDb {
  return value === "precisaAtencao" ? "precisa_atencao" : "ok"
}

export function toSecaoReview(row: SecaoReviewRow): SecaoReview {
  return {
    id: row.id,
    projetoId: row.projeto_id,
    secaoSlug: row.secao_slug,
    bloqueada: row.bloqueada,
    statusRevisao: toSecaoRevisaoStatus(row.status_revisao),
    comentario: row.comentario,
    atualizadoPor: row.atualizado_por,
    atualizadoEm: row.atualizado_em,
  }
}
