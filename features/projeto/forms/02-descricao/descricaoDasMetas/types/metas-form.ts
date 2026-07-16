import type { MetaCronograma } from "@/features/projeto/contexts/cronograma/types"

/** Estado do formulário de Metas (títulos editáveis). */
export type DadosMetas = {
  metas: MetaCronograma[]
}

export const VAZIO_METAS: DadosMetas = {
  metas: [],
}

export function createEmptyMeta(): MetaCronograma {
  return {
    titulo: "",
    etapas: [],
  }
}

/**
 * Clona as metas do cronograma para o estado do formulário.
 */
export function toMetasForm(metas: MetaCronograma[]): DadosMetas {
  return {
    metas: metas.map((meta) => ({
      ...meta,
      titulo: meta.titulo ?? "",
      etapas: Array.isArray(meta.etapas) ? meta.etapas : [],
    })),
  }
}
