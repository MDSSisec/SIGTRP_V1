import type { ProjectSession03Participants } from "@/features/projeto/types/project-session-03-participants"

export type DadosPerfilSocioOcupacional = {
  selecoes: string[]
  outrosEspecificar: string
}

export const VAZIO_PERFIL_SOCIO_OCUPACIONAL: DadosPerfilSocioOcupacional = {
  selecoes: [],
  outrosEspecificar: "",
}

export function toPerfilSocioOcupacionalForm(
  participantes: ProjectSession03Participants | null,
): DadosPerfilSocioOcupacional {
  if (!participantes) {
    return VAZIO_PERFIL_SOCIO_OCUPACIONAL
  }

  return {
    selecoes: participantes.perfilSelecoes ?? [],
    outrosEspecificar: participantes.perfilOutrosEspecificar ?? "",
  }
}

export function toPerfilSocioOcupacionalInput(dados: DadosPerfilSocioOcupacional) {
  return {
    perfilSelecoes: dados.selecoes,
    perfilOutrosEspecificar: dados.outrosEspecificar,
  }
}
