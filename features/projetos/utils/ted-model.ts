export function parseValorModelo(value: string | number | null | undefined) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0
  }

  if (value == null) {
    return 0
  }

  const normalized = String(value).trim().replace(/\./g, "").replace(",", ".")
  const parsed = Number(normalized)

  return Number.isFinite(parsed) ? parsed : 0
}
