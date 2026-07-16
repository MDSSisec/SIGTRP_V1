import type { MetaCronograma } from "@/features/projeto/contexts/cronograma/types"

/**
 * Estado do formulário da seção Metas.
 */
export type DadosMetas = {
  /** Lista de metas exibidas e editadas no formulário. */
  metas: MetaCronograma[]
}

/**
 * Estado inicial vazio do formulário.
 */
export const VAZIO_METAS: DadosMetas = {
  metas: [],
}

/**
 * Cria uma nova meta vazia.
 */
export function createEmptyMeta(): MetaCronograma {
  return {
    titulo: "",
    etapas: [],
  }
}

/**
 * Converte as metas do cronograma para o estado do formulário.
 *
 * Também normaliza os campos opcionais para evitar valores `null`
 * ou `undefined` durante a edição.
 */
export function toMetasForm(metas: MetaCronograma[]): DadosMetas {
  return {
    metas: metas.map((meta) => ({
      ...meta,
      titulo: meta.titulo ?? "",
      etapas: meta.etapas ?? [],
    })),
  }
}