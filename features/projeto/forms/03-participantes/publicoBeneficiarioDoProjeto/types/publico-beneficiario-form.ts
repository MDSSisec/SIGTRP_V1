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
