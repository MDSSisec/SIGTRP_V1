import type { ProjectSession02Description } from "@/features/projeto/types/project-session-02-description"

/**
 * Estado utilizado pelo formulÃ¡rio da seÃ§Ã£o
 * "DescriÃ§Ã£o da Justificativa e MotivaÃ§Ã£o".
 */
export type DadosJustificativa = {
  /** CaracterizaÃ§Ã£o dos interesses recÃ­procos entre as partes. */
  caracterizacaoInteresses: string

  /** PÃºblico-alvo beneficiado pelo projeto. */
  publicoAlvo: string

  /** Problema que motivou a elaboraÃ§Ã£o da proposta. */
  problema: string

  /** Resultados esperados apÃ³s a execuÃ§Ã£o do projeto. */
  resultadosEsperados: string

  /** RelaÃ§Ã£o da proposta com os objetivos e diretrizes do programa. */
  relacaoPrograma: string
}

/**
 * Estado inicial do formulÃ¡rio.
 *
 * Utilizado durante a criaÃ§Ã£o de um novo projeto ou enquanto
 * os dados ainda nÃ£o foram carregados.
 */
export const VAZIO_JUSTIFICATIVA: DadosJustificativa = {
  caracterizacaoInteresses: "",
  publicoAlvo: "",
  problema: "",
  resultadosEsperados: "",
  relacaoPrograma: "",
}

/**
 * Converte os dados carregados do banco para o formato do formulÃ¡rio.
 */
export function toJustificativaForm(
  descricao: ProjectSession02Description | null,
): DadosJustificativa {
  if (!descricao) {
    return VAZIO_JUSTIFICATIVA
  }

  return {
    caracterizacaoInteresses:
      descricao.justificativaCaracterizacaoInteresses ?? "",
    publicoAlvo: descricao.justificativaPublicoAlvo ?? "",
    problema: descricao.justificativaProblema ?? "",
    resultadosEsperados: descricao.justificativaResultadosEsperados ?? "",
    relacaoPrograma: descricao.justificativaRelacaoPrograma ?? "",
  }
}

/**
 * Converte o formulÃ¡rio para o payload da API/repositÃ³rio.
 */
export function toJustificativaInput(dados: DadosJustificativa) {
  return {
    justificativaCaracterizacaoInteresses: dados.caracterizacaoInteresses,
    justificativaPublicoAlvo: dados.publicoAlvo,
    justificativaProblema: dados.problema,
    justificativaResultadosEsperados: dados.resultadosEsperados,
    justificativaRelacaoPrograma: dados.relacaoPrograma,
  }
}
