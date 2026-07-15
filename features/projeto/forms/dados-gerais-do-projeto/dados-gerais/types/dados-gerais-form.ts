import type {
  CursoDetalhamentoDados,
  DadosGeraisProjetoState,
} from "@/features/projeto/types/general-project-data"
import { parseCurrencyInput } from "@/features/projeto/utils/currency"

/** Estado editável do formulário de Dados Gerais. */
export type DadosGeraisForm = {
  custoTotalProjeto: string
  quantidadeCursos: string
  possuiEventoCertificacao: boolean
}

export const VAZIO_DADOS_GERAIS: DadosGeraisForm = {
  custoTotalProjeto: "",
  quantidadeCursos: "1",
  possuiEventoCertificacao: false,
}

export function toDadosGeraisForm(
  data: DadosGeraisProjetoState | null,
): DadosGeraisForm {
  if (!data) return VAZIO_DADOS_GERAIS

  return {
    custoTotalProjeto: data.custoTotalProjeto,
    quantidadeCursos: String(data.quantidadeCursos),
    possuiEventoCertificacao: data.possuiEventoCertificacao,
  }
}

export function readDadosGerais(
  projectData: Record<string, unknown> | null | undefined,
): DadosGeraisProjetoState | null {
  const raw = projectData?.dadosGeraisProjeto
  if (!raw || typeof raw !== "object") return null

  const data = raw as Partial<DadosGeraisProjetoState>
  const quantidade = Number(data.quantidadeCursos)
  if (!Number.isInteger(quantidade) || quantidade < 1) return null

  return {
    custoTotalProjeto: String(data.custoTotalProjeto ?? ""),
    quantidadeCursos: quantidade,
    possuiEventoCertificacao: Boolean(data.possuiEventoCertificacao),
  }
}

export function readCursos(
  projectData: Record<string, unknown> | null | undefined,
): CursoDetalhamentoDados[] {
  const raw = projectData?.detalhamentoCursos
  if (!Array.isArray(raw)) return []
  return raw as CursoDetalhamentoDados[]
}

export function validateDadosGeraisForm(
  dados: DadosGeraisForm,
): string | null {
  const custo = parseCurrencyInput(dados.custoTotalProjeto)
  if (!dados.custoTotalProjeto.trim() || custo === null || custo < 0) {
    return "Informe o custo total do projeto."
  }

  const quantidade = Number(dados.quantidadeCursos)
  if (!Number.isInteger(quantidade) || quantidade < 1) {
    return "Informe a quantidade de cursos (mínimo 1)."
  }

  return null
}

export function toDadosGeraisProjetoState(
  dados: DadosGeraisForm,
): DadosGeraisProjetoState {
  return {
    custoTotalProjeto: dados.custoTotalProjeto,
    quantidadeCursos: Number(dados.quantidadeCursos),
    possuiEventoCertificacao: dados.possuiEventoCertificacao,
  }
}
