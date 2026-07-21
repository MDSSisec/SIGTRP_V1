import type { ProjectSession03Participants } from "@/features/projeto/types/project-session-03-participants"

import {
  formatQuantidade,
  parseQuantidade,
} from "../utils/formatters"

/** Estado editável da tabela de público beneficiário. */
export type DadosPublicoBeneficiario = {
  homensDiretos: string
  mulheresDiretos: string
}

/** Totais e indiretos derivados dos diretos. */
export type ValoresPublicoBeneficiario = {
  homensIndiretos: number
  mulheresIndiretos: number
  totalDiretos: number
  totalIndiretos: number
}

export const VAZIO_PUBLICO_BENEFICIARIO: DadosPublicoBeneficiario = {
  homensDiretos: "",
  mulheresDiretos: "",
}

export function toPublicoBeneficiarioForm(
  participantes: ProjectSession03Participants | null,
): DadosPublicoBeneficiario {
  if (!participantes) {
    return VAZIO_PUBLICO_BENEFICIARIO
  }

  return {
    homensDiretos: formatQuantidade(participantes.publicoHomensDiretos ?? 0),
    mulheresDiretos: formatQuantidade(participantes.publicoMulheresDiretos ?? 0),
  }
}

export function toPublicoBeneficiarioInput(dados: DadosPublicoBeneficiario) {
  const homens = parseQuantidade(dados.homensDiretos)
  const mulheres = parseQuantidade(dados.mulheresDiretos)

  return {
    publicoHomensDiretos: homens === 0 ? null : homens,
    publicoMulheresDiretos: mulheres === 0 ? null : mulheres,
  }
}
