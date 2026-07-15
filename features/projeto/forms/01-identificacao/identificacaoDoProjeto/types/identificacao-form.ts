import type { TedIdentificacao } from "@/features/projetos/types/ted-identificacao"

/** Estado utilizado pelo formulário de Identificação do Projeto. */
export type DadosIdentificacaoProjeto = {
  nomeProjeto: string
  localExecucao: string
  duracao: string
  resumoProjeto: string
}

/** Estado inicial do formulário. */
export const VAZIO_IDENTIFICACAO_PROJETO: DadosIdentificacaoProjeto = {
  nomeProjeto: "",
  localExecucao: "",
  duracao: "",
  resumoProjeto: "",
}

/**
 * Converte os dados carregados do banco para o formato utilizado
 * pelo formulário de edição.
 */
export function toIdentificacaoProjetoForm(
  identificacao: TedIdentificacao | null,
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