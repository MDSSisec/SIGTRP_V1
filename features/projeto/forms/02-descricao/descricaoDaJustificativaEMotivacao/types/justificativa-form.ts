import type { ProjectModelData } from "@/features/projeto/types"

/**
 * Estado utilizado pelo formulário da seção
 * "Descrição da Justificativa e Motivação".
 */
export type DadosJustificativa = {
  /** Caracterização dos interesses recíprocos entre as partes. */
  caracterizacaoInteresses: string

  /** Público-alvo beneficiado pelo projeto. */
  publicoAlvo: string

  /** Problema que motivou a elaboração da proposta. */
  problema: string

  /** Resultados esperados após a execução do projeto. */
  resultadosEsperados: string

  /** Relação da proposta com os objetivos e diretrizes do programa. */
  relacaoPrograma: string
}

/**
 * Estado inicial do formulário.
 *
 * Utilizado durante a criação de um novo projeto ou enquanto
 * os dados ainda não foram carregados.
 */
export const VAZIO_JUSTIFICATIVA: DadosJustificativa = {
  caracterizacaoInteresses: "",
  publicoAlvo: "",
  problema: "",
  resultadosEsperados: "",
  relacaoPrograma: "",
}

/**
 * Converte os dados armazenados em `descricao_projeto`
 * para o formato utilizado pelo formulário.
 *
 * A função também mantém compatibilidade com versões antigas,
 * priorizando os novos campos e utilizando os campos internos de
 * `justificativa_motivacao` quando necessário.
 */
export function toJustificativaForm(
  projectData: ProjectModelData | null | undefined,
): DadosJustificativa {
  const descricaoProjeto = projectData?.descricao_projeto
  const justificativa = descricaoProjeto?.justificativa_motivacao

  if (!descricaoProjeto && !justificativa) {
    return VAZIO_JUSTIFICATIVA
  }

  return {
    caracterizacaoInteresses:
      justificativa?.caracterizacao_interesses_reciprocos ?? "",

    publicoAlvo:
      descricaoProjeto?.publico_alvo ??
      justificativa?.publico_alvo ??
      "",

    problema:
      descricaoProjeto?.problema ??
      justificativa?.problema ??
      "",

    resultadosEsperados:
      descricaoProjeto?.resultados_esperados ??
      justificativa?.resultados_esperados ??
      "",

    relacaoPrograma:
      descricaoProjeto?.relacao_proposta_programa ??
      justificativa?.relacao_proposta_programa ??
      "",
  }
}

/**
 * Converte os dados do formulário para o formato esperado
 * pelo contexto do projeto.
 *
 * Preserva as propriedades existentes em `descricao_projeto`
 * e atualiza apenas os campos relacionados à justificativa.
 */
export function toDescricaoProjetoPatch(
  dados: DadosJustificativa,
  current?: ProjectModelData["descricao_projeto"],
): NonNullable<ProjectModelData["descricao_projeto"]> {
  return {
    ...current,

    publico_alvo: dados.publicoAlvo,
    problema: dados.problema,
    resultados_esperados: dados.resultadosEsperados,
    relacao_proposta_programa: dados.relacaoPrograma,

    justificativa_motivacao: {
      ...(typeof current?.justificativa_motivacao === "object"
        ? current.justificativa_motivacao
        : {}),

      caracterizacao_interesses_reciprocos:
        dados.caracterizacaoInteresses,

      publico_alvo: dados.publicoAlvo,
      problema: dados.problema,
      resultados_esperados: dados.resultadosEsperados,
      relacao_proposta_programa: dados.relacaoPrograma,
    },
  }
}