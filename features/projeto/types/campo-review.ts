/** Campo marcado na revisão do projeto (camelCase). */
export type CampoReview = {
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
export type CampoReviewSyncInput = {
  secaoSlug: string
  campoKeys: string[]
  comentario?: string | null
}
