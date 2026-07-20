export const CRONOGRAMA_DESEMBOLSO_TABLE = {
  COL_PARCELA: "Parcela",
  COL_MES_ANO: "Mês/Ano",
  COL_MDS: "MDS (R$)",
  COL_CONTRAPARTIDA: "Contrapartida (R$)",
  COL_TOTAL: "Total (R$)",
  ROW_TOTAL: "Total",
  PLACEHOLDER_MES_ANO: "../....",
} as const

export const CRONOGRAMA_DESEMBOLSO_PARCELAS = [
  { id: "parcela-1", label: "1ª" },
  { id: "parcela-2", label: "2ª" },
  { id: "parcela-3", label: "3ª" },
] as const
