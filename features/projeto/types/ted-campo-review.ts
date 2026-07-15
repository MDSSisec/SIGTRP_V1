/** Campo marcado na revisão do TED (camelCase). */
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

/** Payload para sincronizar campos "precisa de atenção" de uma seção. */
export type TedCampoReviewSyncInput = {
  secaoSlug: string
  campoKeys: string[]
  comentario?: string | null
}
