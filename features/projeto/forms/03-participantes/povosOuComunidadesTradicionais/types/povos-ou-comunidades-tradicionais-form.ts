import type { ProjectSession03Participants } from "@/features/projeto/types/project-session-03-participants"

export type DadosPovosOuComunidadesTradicionais = {
  selecoes: string[]
  outrosEspecificar: string
}

export const VAZIO_POVOS_OU_COMUNIDADES_TRADICIONAIS: DadosPovosOuComunidadesTradicionais =
  {
    selecoes: [],
    outrosEspecificar: "",
  }

export function toPovosOuComunidadesTradicionaisForm(
  participantes: ProjectSession03Participants | null,
): DadosPovosOuComunidadesTradicionais {
  if (!participantes) {
    return VAZIO_POVOS_OU_COMUNIDADES_TRADICIONAIS
  }

  return {
    selecoes: participantes.povosSelecoes ?? [],
    outrosEspecificar: participantes.povosOutrosEspecificar ?? "",
  }
}

export function toPovosOuComunidadesTradicionaisInput(
  dados: DadosPovosOuComunidadesTradicionais,
) {
  return {
    povosSelecoes: dados.selecoes,
    povosOutrosEspecificar: dados.outrosEspecificar,
  }
}
