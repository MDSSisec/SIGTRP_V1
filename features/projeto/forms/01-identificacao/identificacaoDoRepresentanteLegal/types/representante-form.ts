import type { ProjectSession01Identificacao } from "@/features/projeto/types/project-session-01-identificacao"

import { formatTelefone, sanitizeMatriculaFuncional } from "../utils/formatters"

/**
 * Estado do formulário de
 * Identificação do Representante Legal.
 */
export type DadosIdentificacaoRepresentanteLegal = {
  nome: string
  matriculaFuncional: string
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
    matriculaFuncional: "",
    profissao: "",
    cargo: "",
    estadoCivil: "",
    telefone: "",
    email: "",
  }

/**
 * Converte os dados retornados pela API para o modelo
 * utilizado pelo formulário.
 */
export function toIdentificacaoRepresentanteForm(
  identificacao: ProjectSession01Identificacao | null,
): DadosIdentificacaoRepresentanteLegal {
  if (!identificacao) {
    return VAZIO_IDENTIFICACAO_REPRESENTANTE
  }

  return {
    nome: identificacao.representanteNome ?? "",

    matriculaFuncional: sanitizeMatriculaFuncional(
      identificacao.representanteMatriculaFuncional ?? "",
    ),

    profissao: identificacao.representanteProfissao ?? "",

    cargo: identificacao.representanteCargo ?? "",

    estadoCivil: identificacao.representanteEstadoCivil ?? "",

    telefone: formatTelefone(identificacao.representanteTelefone ?? ""),

    email: identificacao.representanteEmail ?? "",
  }
}
