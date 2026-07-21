import type { ProjectSession01Identificacao } from "@/features/projeto/types/project-session-01-identificacao"

/** Estado utilizado pelo formulÃ¡rio de IdentificaÃ§Ã£o do Projeto. */
export type DadosIdentificacaoProjeto = {
  nomeProjeto: string
  localExecucao: string
  duracao: string
  resumoProjeto: string
}

/** Estado inicial do formulÃ¡rio. */
export const VAZIO_IDENTIFICACAO_PROJETO: DadosIdentificacaoProjeto = {
  nomeProjeto: "",
  localExecucao: "",
  duracao: "",
  resumoProjeto: "",
}

/**
 * Converte os dados carregados do banco para o formato utilizado
 * pelo formulÃ¡rio de ediÃ§Ã£o.
 */
export function toIdentificacaoProjetoForm(
  identificacao: ProjectSession01Identificacao | null,
  nomeProjeto: string,
): DadosIdentificacaoProjeto {
  if (!identificacao) {
    return {
      ...VAZIO_IDENTIFICACAO_PROJETO,
      nomeProjeto,
    }
  }

  return {
    nomeProjeto,
    localExecucao: identificacao.localExecucao ?? "",
    duracao: identificacao.duracao ?? "",
    resumoProjeto: identificacao.resumoProjeto ?? "",
  }
}