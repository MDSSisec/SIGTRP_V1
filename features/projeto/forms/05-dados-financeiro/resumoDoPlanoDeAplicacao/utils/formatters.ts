import {
  formatCurrencyInput,
  parseCurrencyInput,
} from "@/features/projeto/utils/currency"

import type {
  DadosResumoPlanoAplicacao,
  ValoresResumoPlanoAplicacao,
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

/** Mantém apenas dígitos no código (máx. 6). */
export function sanitizeCodigoInput(value: string): string {
  return value.replace(/\D/g, "").slice(0, 6)
}

/** Calcula totais por linha e colunas. */
export function calcularValores(
  dados: DadosResumoPlanoAplicacao,
): ValoresResumoPlanoAplicacao {
  const totaisLinha = dados.linhas.map(
    (linha) => parseMoeda(linha.mds) + parseMoeda(linha.contrapartida),
  )

  const totalMds = dados.linhas.reduce(
    (acc, linha) => acc + parseMoeda(linha.mds),
    0,
  )
  const totalContrapartida = dados.linhas.reduce(
    (acc, linha) => acc + parseMoeda(linha.contrapartida),
    0,
  )

  return {
    totaisLinha,
    totalMds,
    totalContrapartida,
    totalGeral: totalMds + totalContrapartida,
  }
}
