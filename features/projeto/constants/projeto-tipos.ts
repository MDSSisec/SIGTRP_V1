/**
 * Tipos de projeto suportados pelo sistema.
 */
export const PROJETO_TIPOS = {
  TED: "TED",
  EMENDA: "EMENDA",
  CONVENIO: "CONVENIO",
} as const

/**
 * Tipo derivado dos valores de {@link PROJETO_TIPOS}.
 */
export type ProjetoTipo =
  (typeof PROJETO_TIPOS)[keyof typeof PROJETO_TIPOS]

/**
 * Opções ordenadas para selects do formulário.
 */
export const PROJETO_TIPO_OPTIONS = [
  PROJETO_TIPOS.TED,
  PROJETO_TIPOS.EMENDA,
  PROJETO_TIPOS.CONVENIO,
] as const

/**
 * Rótulos utilizados para exibição dos tipos de projeto na interface.
 */
const PROJETO_TIPO_LABELS: Record<ProjetoTipo, string> = {
  [PROJETO_TIPOS.TED]: "TED",
  [PROJETO_TIPOS.EMENDA]: "Emenda",
  [PROJETO_TIPOS.CONVENIO]: "Convênio",
}

function isProjetoTipo(value: string): value is ProjetoTipo {
  return PROJETO_TIPO_OPTIONS.some((tipo) => tipo === value)
}

/** Converte o valor do select para o tipo do formulário, sem cast. */
export function parseTipoProjetoField(value: string): ProjetoTipo | "" {
  if (value === "") return ""
  return isProjetoTipo(value) ? value : ""
}

/**
 * Converte uma string para um tipo de projeto válido.
 *
 * A comparação é case-insensitive e ignora espaços em branco.
 */
export function normalizeProjetoTipo(tipo: string): ProjetoTipo | null {
  const normalized = tipo.trim().toUpperCase()
  return isProjetoTipo(normalized) ? normalized : null
}

/**
 * Retorna o rótulo utilizado na interface para um tipo de projeto.
 */
export function formatProjetoTipoLabel(tipo: ProjetoTipo): string {
  return PROJETO_TIPO_LABELS[tipo]
}
