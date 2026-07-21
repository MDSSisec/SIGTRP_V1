import { CRONOGRAMA_DESEMBOLSO_PARCELAS } from "../constants"

import type { ProjectSession05Financial } from "@/features/projeto/types/project-session-05-financial"
import { formatCurrencyInput, parseCurrencyInput } from "@/features/projeto/utils/currency"

/** Linha editável de uma parcela. */
export type LinhaParcelaDesembolso = {
  mesAno: string
  mds: string
  contrapartida: string
}

/** Estado editável do cronograma de desembolso. */
export type DadosCronogramaDesembolso = {
  parcelas: LinhaParcelaDesembolso[]
}

/** Totais derivados por linha e no rodapé. */
export type ValoresCronogramaDesembolso = {
  totaisLinha: number[]
  totalMds: number
  totalContrapartida: number
  totalGeral: number
}

export type CampoParcela = keyof LinhaParcelaDesembolso

function criarLinhaVazia(): LinhaParcelaDesembolso {
  return { mesAno: "", mds: "", contrapartida: "" }
}

export const VAZIO_CRONOGRAMA_DESEMBOLSO: DadosCronogramaDesembolso = {
  parcelas: CRONOGRAMA_DESEMBOLSO_PARCELAS.map(() => criarLinhaVazia()),
}

function moedaFromDb(value: number | null | undefined): string {
  if (value == null) return ""
  return formatCurrencyInput(String(Math.round(value * 100)))
}

function moedaToDb(value: string): number | null {
  const trimmed = value.trim()
  if (!trimmed) return null
  return parseCurrencyInput(trimmed)
}

export function toCronogramaDesembolsoForm(
  financeiro: ProjectSession05Financial | null,
): DadosCronogramaDesembolso {
  const saved = financeiro?.cronogramaDesembolsoParcelas ?? []
  const count = CRONOGRAMA_DESEMBOLSO_PARCELAS.length

  return {
    parcelas: Array.from({ length: count }, (_, index) => {
      const parcela = saved[index]
      return {
        mesAno: parcela?.mesAno ?? "",
        mds: moedaFromDb(parcela?.mds),
        contrapartida: moedaFromDb(parcela?.contrapartida),
      }
    }),
  }
}

export function toCronogramaDesembolsoInput(dados: DadosCronogramaDesembolso) {
  return {
    cronogramaDesembolsoParcelas: dados.parcelas.map((parcela) => ({
      mesAno: parcela.mesAno.trim(),
      mds: moedaToDb(parcela.mds),
      contrapartida: moedaToDb(parcela.contrapartida),
    })),
  }
}
