/** Máscara DD/MM/AAAA: só dígitos, formata com barras. */
export function maskDataBr(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

/** Formata número para exibição em R$ (BR): 100906.07 → "100.906,07" */
export function formatValorBr(num: number): string {
  if (num === 0 || Number.isNaN(num)) return ""
  return num.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

/** Converte string em formato BR para número: "100.906,07" → 100906.07 */
export function parseValorBr(str: string): number {
  const s = str.replace(/\./g, "").replace(",", ".").trim()
  if (s === "") return 0
  const num = parseFloat(s)
  return Number.isNaN(num) ? 0 : num
}

/** Formata total monetário para exibição. */
export function formatTotalBr(num: number): string {
  return num.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
