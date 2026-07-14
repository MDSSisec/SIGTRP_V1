/**
 * Formata valores monetários utilizando o padrão brasileiro (Real - BRL).
 */
const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

/**
 * Quantidade de casas decimais utilizada para representar valores monetários.
 * Ex.: "12345" -> 123.45
 */
const CURRENCY_DECIMAL_FACTOR = 100

/**
 * Remove todos os caracteres que não são números.
 *
 * Exemplo:
 * "R$ 1.234,56" -> "123456"
 */
function extractCurrencyDigits(value: string): string {
  return value.replace(/\D/g, "")
}

/**
 * Converte uma sequência de dígitos em um valor numérico.
 *
 * Exemplo:
 * "123456" -> 1234.56
 *
 * Retorna `null` caso o valor seja inválido.
 */
function parseCurrencyDigits(value: string): number | null {
  const digits = extractCurrencyDigits(value)

  if (!digits) {
    return null
  }

  const amount = Number(digits) / CURRENCY_DECIMAL_FACTOR

  return Number.isFinite(amount) ? amount : null
}

/**
 * Formata o valor digitado pelo usuário para o padrão monetário brasileiro.
 *
 * Exemplos:
 * "1"      -> "R$ 0,01"
 * "1234"   -> "R$ 12,34"
 * "123456" -> "R$ 1.234,56"
 */
export function formatCurrencyInput(value: string): string {
  const amount = parseCurrencyDigits(value)

  if (amount === null) {
    return ""
  }

  return currencyFormatter.format(amount)
}

/**
 * Converte um valor monetário formatado em um número.
 *
 * Exemplos:
 * "R$ 1.234,56" -> 1234.56
 * ""            -> null
 */
export function parseCurrencyInput(value: string): number | null {
  return parseCurrencyDigits(value)
}