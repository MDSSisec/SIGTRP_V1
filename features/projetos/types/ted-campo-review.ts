export type TedCampoReviewRow = {
  id: string
  projeto_id: string
  secao_slug: string
  campo_key: string
  precisa_atencao: boolean
  comentario: string | null
  atualizado_por: string | null
  atualizado_em: string
}

export type TedCampoReview = {
  id: string
  projetoId: string
  secaoSlug: string
  campoKey: string
  precisaAtencao: boolean
  comentario: string | null
  atualizadoPor: string | null
  atualizadoEm: string
}

export type TedCampoReviewSyncInput = {
  secaoSlug: string
  campoKeys: string[]
  comentario?: string | null
}

export function toTedCampoReview(row: TedCampoReviewRow): TedCampoReview {
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
