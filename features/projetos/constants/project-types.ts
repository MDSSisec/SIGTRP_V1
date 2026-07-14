export const PROJETO_TIPOS = {
  TED: "TED",
  EMENDA: "EMENDA",
  CONVENIO: "CONVENIO",
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

  if (normalized === PROJETO_TIPOS.CONVENIO) {
    return PROJETO_TIPOS.CONVENIO
  }

  return null
}

export function formatProjetoTipoLabel(tipo: ProjetoTipo) {
  if (tipo === PROJETO_TIPOS.EMENDA) return "Emenda"
  if (tipo === PROJETO_TIPOS.CONVENIO) return "Convênio"
  return "TED"
}
