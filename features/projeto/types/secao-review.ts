import type { ProjectSession01IdentificacaoSecaoSlug } from "@/features/projeto/constants/secao-review"

export type { ProjectSession01IdentificacaoSecaoSlug }

/** Status de revisão da seção na aplicação (camelCase). */
export type SecaoRevisaoStatus = "ok" | "precisaAtencao"

/** Revisão de seção do projeto (camelCase). */
export type SecaoReview = {
  id: string
  projetoId: string
  secaoSlug: string
  bloqueada: boolean
  statusRevisao: SecaoRevisaoStatus
  comentario: string | null
  atualizadoPor: string | null
  atualizadoEm: string
}

export type SecaoReviewInput = {
  secaoSlug: string
  bloqueada?: boolean
  statusRevisao?: SecaoRevisaoStatus
  comentario?: string | null
}
