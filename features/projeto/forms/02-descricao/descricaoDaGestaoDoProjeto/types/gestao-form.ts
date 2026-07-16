import type { ProjectModelData } from "@/features/projeto/types"

/** Estado do formulário da seção Gestão do Projeto. */
export type DadosGestao = {
  dimensionamentoEquipe: string
  dimensionamentoContratacoes: string
}

/** Estado inicial vazio do formulário. */
export const VAZIO_GESTAO: DadosGestao = {
  dimensionamentoEquipe: "",
  dimensionamentoContratacoes: "",
}

type GestaoProjetoModel = {
  dimensionamento_equipe?: string
  dimensionamento_contratacoes?:
    | string
    | Record<string, unknown>
}

/**
 * Converte os dados de `gestao_projeto` para o formato
 * utilizado pelo formulário.
 */
export function toGestaoForm(
  projectData: ProjectModelData | null | undefined,
): DadosGestao {
  const gestao =
    projectData?.gestao_projeto as
      | GestaoProjetoModel
      | undefined

  if (!gestao) {
    return VAZIO_GESTAO
  }

  return {
    dimensionamentoEquipe:
      gestao.dimensionamento_equipe ?? "",

    dimensionamentoContratacoes:
      typeof gestao.dimensionamento_contratacoes ===
      "string"
        ? gestao.dimensionamento_contratacoes
        : "",
  }
}

/**
 * Converte o estado do formulário para o formato esperado
 * pelo modelo do projeto.
 */
export function toGestaoPatch(
  dados: DadosGestao,
): NonNullable<ProjectModelData["gestao_projeto"]> {
  return {
    dimensionamento_equipe:
      dados.dimensionamentoEquipe,

    dimensionamento_contratacoes:
      dados.dimensionamentoContratacoes,
  }
}