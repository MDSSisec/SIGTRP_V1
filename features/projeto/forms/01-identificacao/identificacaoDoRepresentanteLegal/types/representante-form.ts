import type { TedIdentificacao } from "@/features/projetos/types/ted-identificacao"

import { formatCpf, formatTelefone } from "../utils/formatters"

/**
 * Estado do formulário de
 * Identificação do Representante Legal.
 */
export type DadosIdentificacaoRepresentanteLegal = {
  nome: string
  cpf: string
  profissao: string
  cargo: string
  estadoCivil: string
  telefone: string
  email: string
}

/**
 * Estado inicial do formulário.
 */
export const VAZIO_IDENTIFICACAO_REPRESENTANTE: Readonly<DadosIdentificacaoRepresentanteLegal> =
  {
    nome: "",
    cpf: "",
    profissao: "",
    cargo: "",
    estadoCivil: "",
    telefone: "",
    email: "",
  }

/**
 * Converte os dados retornados pela API para o modelo
 * utilizado pelo formulário.
 *
 * Também aplica as máscaras de CPF e telefone para
 * exibição na interface.
 */
export function toIdentificacaoRepresentanteForm(
  identificacao: TedIdentificacao | null,
): DadosIdentificacaoRepresentanteLegal {
  if (!identificacao) {
    return VAZIO_IDENTIFICACAO_REPRESENTANTE
  }

  return {
    nome: identificacao.representanteNome ?? "",

    cpf: formatCpf(identificacao.representanteCpf ?? ""),

    profissao: identificacao.representanteProfissao ?? "",

    cargo: identificacao.representanteCargo ?? "",

    estadoCivil: identificacao.representanteEstadoCivil ?? "",

    telefone: formatTelefone(
      identificacao.representanteTelefone ?? "",
    ),

    email: identificacao.representanteEmail ?? "",
  }
}