import type { ProjectSession03Participants } from "@/features/projeto/types/project-session-03-participants"

export type DadosHistoricoSituacao = {
  texto: string
}

export const VAZIO_HISTORICO_SITUACAO: DadosHistoricoSituacao = {
  texto: "",
}

export function toHistoricoSituacaoForm(
  participantes: ProjectSession03Participants | null,
): DadosHistoricoSituacao {
  if (!participantes?.historicoSituacaoTexto) {
    return VAZIO_HISTORICO_SITUACAO
  }

  return { texto: participantes.historicoSituacaoTexto }
}

export function toHistoricoSituacaoInput(dados: DadosHistoricoSituacao) {
  return { historicoSituacaoTexto: dados.texto }
}
