const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

function extractCurrencyDigits(value: string) {
  return value.replace(/\D/g, "")
}

export function formatCurrencyInput(value: string) {
  const digits = extractCurrencyDigits(value)

  if (!digits) {
    return ""
  }

  const amount = Number(digits) / 100

  if (!Number.isFinite(amount)) {
    return ""
  }

  return currencyFormatter.format(amount)
}

export function parseCurrencyInput(value: string) {
  const digits = extractCurrencyDigits(value)

  if (!digits) {
    return null
  }

  const amount = Number(digits) / 100

  return Number.isFinite(amount) ? amount : null
}
