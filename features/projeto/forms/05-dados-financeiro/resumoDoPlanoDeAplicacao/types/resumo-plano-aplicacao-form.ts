/** Linha editável do resumo do plano de aplicação. */
export type LinhaResumoPlanoAplicacao = {
  id: string
  elementoDespesa: string
  codigo: string
  mds: string
  contrapartida: string
}

/** Estado editável do resumo do plano de aplicação. */
export type DadosResumoPlanoAplicacao = {
  linhas: LinhaResumoPlanoAplicacao[]
}

/** Totais derivados por linha e no rodapé. */
export type ValoresResumoPlanoAplicacao = {
  totaisLinha: number[]
  totalMds: number
  totalContrapartida: number
  totalGeral: number
}

export type CampoLinhaResumo =
  | "elementoDespesa"
  | "codigo"
  | "mds"
  | "contrapartida"

export function criarLinhaVazia(): LinhaResumoPlanoAplicacao {
  return {
    id: crypto.randomUUID(),
    elementoDespesa: "",
    codigo: "",
    mds: "",
    contrapartida: "",
  }
}

export const VAZIO_RESUMO_PLANO_APLICACAO: DadosResumoPlanoAplicacao = {
  linhas: [criarLinhaVazia()],
}

import type { ProjectSession05Financial } from "@/features/projeto/types/project-session-05-financial"
import { formatCurrencyInput, parseCurrencyInput } from "@/features/projeto/utils/currency"

function moedaFromDb(value: number | null | undefined): string {
  if (value == null) return ""
  return formatCurrencyInput(String(Math.round(value * 100)))
}

function moedaToDb(value: string): number | null {
  const trimmed = value.trim()
  if (!trimmed) return null
  return parseCurrencyInput(trimmed)
}

export function toResumoPlanoAplicacaoForm(
  financeiro: ProjectSession05Financial | null,
): DadosResumoPlanoAplicacao {
  const saved = financeiro?.resumoPlanoAplicacaoLinhas

  if (!saved?.length) {
    return { linhas: [criarLinhaVazia()] }
  }

  return {
    linhas: saved.map((linha) => ({
      id: crypto.randomUUID(),
      elementoDespesa: linha.elementoDespesa ?? "",
      codigo: linha.codigo ?? "",
      mds: moedaFromDb(linha.mds),
      contrapartida: moedaFromDb(linha.contrapartida),
    })),
  }
}

export function toResumoPlanoAplicacaoInput(dados: DadosResumoPlanoAplicacao) {
  return {
    resumoPlanoAplicacaoLinhas: dados.linhas.map(
      ({ elementoDespesa, codigo, mds, contrapartida }) => ({
        elementoDespesa: elementoDespesa.trim(),
        codigo: codigo.trim(),
        mds: moedaToDb(mds),
        contrapartida: moedaToDb(contrapartida),
      }),
    ),
  }
}
