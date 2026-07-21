import type { ProjectSession03Participants } from "@/features/projeto/types/project-session-03-participants"

export type DadosPublicoBeneficiarioEServicos = {
  selecoes: string[]
  outrosEspecificar: string
}

export const VAZIO_PUBLICO_BENEFICIARIO_E_SERVICOS: DadosPublicoBeneficiarioEServicos =
  {
    selecoes: [],
    outrosEspecificar: "",
  }

export function toPublicoBeneficiarioEServicosForm(
  participantes: ProjectSession03Participants | null,
): DadosPublicoBeneficiarioEServicos {
  if (!participantes) {
    return VAZIO_PUBLICO_BENEFICIARIO_E_SERVICOS
  }

  return {
    selecoes: participantes.servicosSelecoes ?? [],
    outrosEspecificar: participantes.servicosOutrosEspecificar ?? "",
  }
}

export function toPublicoBeneficiarioEServicosInput(
  dados: DadosPublicoBeneficiarioEServicos,
) {
  return {
    servicosSelecoes: dados.selecoes,
    servicosOutrosEspecificar: dados.outrosEspecificar,
  }
}
