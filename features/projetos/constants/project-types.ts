export const PROJETO_TIPOS = {
  TED: "TED",
  EMENDA: "EMENDA",
} as const

export type ProjetoTipo = (typeof PROJETO_TIPOS)[keyof typeof PROJETO_TIPOS]

export function normalizeProjetoTipo(tipo: string): ProjetoTipo | null {
  const normalized = tipo.trim().toUpperCase()

  if (normalized === PROJETO_TIPOS.TED) {
    return PROJETO_TIPOS.TED
  }

  if (normalized === PROJETO_TIPOS.EMENDA) {
    return PROJETO_TIPOS.EMENDA
  }

  return null
}

export function formatProjetoTipoLabel(tipo: ProjetoTipo) {
  return tipo === PROJETO_TIPOS.EMENDA ? "Emenda" : "TED"
}
