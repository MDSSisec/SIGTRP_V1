import type { ProjectSession01Identificacao } from "@/features/projeto/types/project-session-01-identificacao"

import { formatTelefone, formatTelefoneFixo } from "../utils/formatters"

export type DadosIdentificacaoResponsavelTecnico = {
  nome: string
  cargo: string
  telefone: string
  celular: string
  email: string
}

export const VAZIO_IDENTIFICACAO_RESPONSAVEL_TECNICO: DadosIdentificacaoResponsavelTecnico =
  {
    nome: "",
    cargo: "",
    telefone: "",
    celular: "",
    email: "",
  }

export function toIdentificacaoResponsavelTecnicoForm(
  identificacao: ProjectSession01Identificacao | null,
): DadosIdentificacaoResponsavelTecnico {
  if (!identificacao) return VAZIO_IDENTIFICACAO_RESPONSAVEL_TECNICO

  return {
    nome: identificacao.responsavelTecnicoNome ?? "",
    cargo: identificacao.responsavelTecnicoCargo ?? "",
    telefone: identificacao.responsavelTecnicoTelefone
      ? formatTelefoneFixo(identificacao.responsavelTecnicoTelefone)
      : "",
    celular: identificacao.responsavelTecnicoCelular
      ? formatTelefone(identificacao.responsavelTecnicoCelular)
      : "",
    email: identificacao.responsavelTecnicoEmail ?? "",
  }
}
