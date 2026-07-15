/**
 * Converte um valor monetário para número.
 *
 * Aceita:
 * - `number`
 * - `string` no formato brasileiro (ex.: "1.234,56")
 * - `null` ou `undefined`
 *
 * Valores inválidos retornam `0`.
 *
 * @param value - Valor a ser convertido.
 * @returns Valor numérico correspondente ou `0` caso seja inválido.
 */
export function parseValorModelo(
  value: string | number | null | undefined,
): number {
  // Retorna o número diretamente quando já é um valor válido.
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0
  }

  // Considera ausência de valor como zero.
  if (value == null) {
    return 0
  }

  // Converte do formato brasileiro (1.234,56) para o formato aceito pelo JavaScript (1234.56).
  const normalizedValue = value
    .trim()
    .replace(/\./g, "")
    .replace(",", ".")

  const parsedValue = Number(normalizedValue)

  return Number.isFinite(parsedValue) ? parsedValue : 0
}