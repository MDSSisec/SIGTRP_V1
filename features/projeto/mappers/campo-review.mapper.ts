import type { CampoReview } from "../types/campo-review"

/** Registro bruto da tabela de revisão de campos (snake_case). */
export type CampoReviewRow = {
  id: string
  projeto_id: string
  secao_slug: string
  campo_key: string
  precisa_atencao: boolean
  comentario: string | null
  atualizado_por: string | null
  atualizado_em: string
}

export function toCampoReview(row: CampoReviewRow): CampoReview {
  return {
    id: row.id,
    projetoId: row.projeto_id,
    secaoSlug: row.secao_slug,
    campoKey: row.campo_key,
    precisaAtencao: row.precisa_atencao,
    comentario: row.comentario,
    atualizadoPor: row.atualizado_por,
    atualizadoEm: row.atualizado_em,
  }
}
