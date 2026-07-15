import type { TedIdentificacaoSecaoSlug } from "@/features/projeto/constants/secao-review"

export type { TedIdentificacaoSecaoSlug }

/** Status de revisão da seção na aplicação (camelCase). */
export type TedSecaoRevisaoStatus = "ok" | "precisaAtencao"

/** Revisão de seção do TED (camelCase). */
export type TedSecaoReview = {
  id: string
  projetoId: string
  secaoSlug: string
  bloqueada: boolean
  statusRevisao: TedSecaoRevisaoStatus
  comentario: string | null
  atualizadoPor: string | null
  atualizadoEm: string
}

export type TedSecaoReviewInput = {
  secaoSlug: string
  bloqueada?: boolean
  statusRevisao?: TedSecaoRevisaoStatus
  comentario?: string | null
}
