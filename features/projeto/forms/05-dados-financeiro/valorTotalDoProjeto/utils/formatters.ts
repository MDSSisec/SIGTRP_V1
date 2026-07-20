import {
  formatCurrencyInput,
  parseCurrencyInput,
} from "@/features/projeto/utils/currency"

import type {
  DadosValorTotalDoProjeto,
  ValoresValorTotalDoProjeto,
} from "../types"

/** Converte campo monetário formatado em número (0 se vazio). */
export function parseMoeda(value: string): number {
  return parseCurrencyInput(value) ?? 0
}

/** Formata número para exibição em R$; zero vira "—". */
export function formatMoeda(value: number): string {
  if (!value) return "—"
  return formatCurrencyInput(String(Math.round(value * 100)))
}

/** Mantém o input no padrão monetário brasileiro. */
export function sanitizeMoedaInput(value: string): string {
  return formatCurrencyInput(value)
}

/** Calcula totais por linha e por coluna. */
export function calcularValores(
  dados: DadosValorTotalDoProjeto,
): ValoresValorTotalDoProjeto {
  const repasseMdsCusteio = parseMoeda(dados.repasseMdsCusteio)
  const repasseMdsInvestimento = parseMoeda(dados.repasseMdsInvestimento)
  const contrapartidaCusteio = parseMoeda(dados.contrapartidaCusteio)
  const contrapartidaInvestimento = parseMoeda(dados.contrapartidaInvestimento)

  const repasseMdsTotal = repasseMdsCusteio + repasseMdsInvestimento
  const contrapartidaTotal = contrapartidaCusteio + contrapartidaInvestimento
  const totalCusteio = repasseMdsCusteio + contrapartidaCusteio
  const totalInvestimento = repasseMdsInvestimento + contrapartidaInvestimento

  return {
    repasseMdsTotal,
    contrapartidaTotal,
    totalCusteio,
    totalInvestimento,
    totalGeral: totalCusteio + totalInvestimento,
  }
}
