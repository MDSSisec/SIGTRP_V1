import type { ProjectModelData } from "@/features/projeto/types"

/** Estado do formulário de Justificativa e Motivação. */
export type DadosJustificativa = {
  caracterizacaoInteresses: string
  publicoAlvo: string
  problema: string
  resultadosEsperados: string
  relacaoPrograma: string
}

/** Estado inicial vazio. */
export const VAZIO_JUSTIFICATIVA: DadosJustificativa = {
  caracterizacaoInteresses: "",
  publicoAlvo: "",
  problema: "",
  resultadosEsperados: "",
  relacaoPrograma: "",
}

/**
 * Converte `descricao_projeto` do contexto para o formato do formulário.
 */
export function toJustificativaForm(
  projectData: ProjectModelData | null | undefined,
): DadosJustificativa {
  const d = projectData?.descricao_projeto
  const j = d?.justificativa_motivacao

  if (!d && !j) return VAZIO_JUSTIFICATIVA

  return {
    caracterizacaoInteresses:
      j?.caracterizacao_interesses_reciprocos ?? "",
    publicoAlvo: d?.publico_alvo ?? j?.publico_alvo ?? "",
    problema: d?.problema ?? j?.problema ?? "",
    resultadosEsperados:
      d?.resultados_esperados ?? j?.resultados_esperados ?? "",
    relacaoPrograma:
      d?.relacao_proposta_programa ?? j?.relacao_proposta_programa ?? "",
  }
}

/**
 * Monta o patch de `descricao_projeto` a partir do formulário.
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
      caracterizacao_interesses_reciprocos: dados.caracterizacaoInteresses,
      publico_alvo: dados.publicoAlvo,
      problema: dados.problema,
      resultados_esperados: dados.resultadosEsperados,
      relacao_proposta_programa: dados.relacaoPrograma,
    },
  }
}
