import type {
  TedSecaoReview,
  TedSecaoRevisaoStatus,
} from "../types/ted-secao-review"

/** Valor persistido na coluna status_revisao. */
export type TedSecaoRevisaoStatusDb = "ok" | "precisa_atencao"

/** Registro bruto da tabela de revisão de seções (snake_case). */
export type TedSecaoReviewRow = {
  id: string
  projeto_id: string
  secao_slug: string
  bloqueada: boolean
  status_revisao: TedSecaoRevisaoStatusDb
  comentario: string | null
  atualizado_por: string | null
  atualizado_em: string
}

export function toTedSecaoRevisaoStatus(
  value: string | null | undefined,
): TedSecaoRevisaoStatus {
  return value === "precisa_atencao" ? "precisaAtencao" : "ok"
}

export function toTedSecaoRevisaoStatusDb(
  value: TedSecaoRevisaoStatus | null | undefined,
): TedSecaoRevisaoStatusDb {
  return value === "precisaAtencao" ? "precisa_atencao" : "ok"
}

export function toTedSecaoReview(row: TedSecaoReviewRow): TedSecaoReview {
  return {
    id: row.id,
    projetoId: row.projeto_id,
    secaoSlug: row.secao_slug,
    bloqueada: row.bloqueada,
    statusRevisao: toTedSecaoRevisaoStatus(row.status_revisao),
    comentario: row.comentario,
    atualizadoPor: row.atualizado_por,
    atualizadoEm: row.atualizado_em,
  }
}
