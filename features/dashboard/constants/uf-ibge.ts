import type { BrazilUf } from "@/components/map"

/** Código IBGE da UF → sigla (mesma numeração da API IBGE). */
export const UF_IBGE_TO_SIGLA: Record<number, BrazilUf> = {
  11: "RO",
  12: "AC",
  13: "AM",
  14: "RR",
  15: "PA",
  16: "AP",
  17: "TO",
  21: "MA",
  22: "PI",
  23: "CE",
  24: "RN",
  25: "PB",
  26: "PE",
  27: "AL",
  28: "SE",
  29: "BA",
  31: "MG",
  32: "ES",
  33: "RJ",
  35: "SP",
  41: "PR",
  42: "SC",
  43: "RS",
  50: "MS",
  51: "MT",
  52: "GO",
  53: "DF",
}

export function ufIbgeToSigla(codigo: number | null | undefined): BrazilUf | null {
  if (codigo == null || !Number.isFinite(codigo)) return null
  return UF_IBGE_TO_SIGLA[codigo] ?? null
}
