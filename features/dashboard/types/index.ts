export type DashboardUfCount = {
  uf: string
  total: number
}

export type DashboardStats = {
  totalProjetos: number
  /** Etapa "TRP em Elaboração" (ordem 1). */
  preenchimentoTrp: number
  /** Etapa "Instrumento Celebrado" (ordem 4). */
  instrumentosCelebrados: number
  totalTed: number
  totalEmenda: number
  totalConvenio: number
  byUf: DashboardUfCount[]
  semUf: number
}
