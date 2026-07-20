import {
  formatCurrencyInput,
  parseCurrencyInput,
} from "@/features/projeto/utils/currency"

import type {
  DadosCronogramaDesembolso,
  ValoresCronogramaDesembolso,
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

/** Máscara MM/AAAA (ex.: 03/2026). */
export function maskMesAno(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 6)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

/** Calcula totais por linha e colunas. */
export function calcularValores(
  dados: DadosCronogramaDesembolso,
): ValoresCronogramaDesembolso {
  const totaisLinha = dados.parcelas.map(
    (parcela) => parseMoeda(parcela.mds) + parseMoeda(parcela.contrapartida),
  )

  const totalMds = dados.parcelas.reduce(
    (acc, parcela) => acc + parseMoeda(parcela.mds),
    0,
  )
  const totalContrapartida = dados.parcelas.reduce(
    (acc, parcela) => acc + parseMoeda(parcela.contrapartida),
    0,
  )

  return {
    totaisLinha,
    totalMds,
    totalContrapartida,
    totalGeral: totalMds + totalContrapartida,
  }
}
