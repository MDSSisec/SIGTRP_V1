export const RESUMO_PLANO_APLICACAO_TABLE = {
  COL_ELEMENTO: "Elemento de Despesa",
  COL_CODIGO: "Código",
  COL_MDS: "MDS (R$)",
  COL_CONTRAPARTIDA: "Contrapartida (R$)",
  COL_TOTAL: "Total (R$)",
  ROW_TOTAL: "Total",
  PLACEHOLDER_CODIGO: "000000",
  CODIGO_MAX_DIGITOS: 6,
} as const

export const RESUMO_PLANO_APLICACAO_FOOTNOTE = {
  TITLE: "*DOA - Despesas Operacionais e Administrativas:",
  ITENS: [
    "Termo de Execução Descentralizada - TED: custos indiretos, até o limite de 20% do valor global pactuado - Decreto nº 10.426, de 2020, art. 8º, § 2º;",
    "Convênio: administrativas, até o limite de 15% do valor global pactuado – Portaria Conjunta MGI/MF/CGU nº 33, de 30 de agosto de 2023, art. 22, inciso I;",
    "Termo de Fomento e Termo de Colaboração: custos indiretos, Decreto nº 8.726, de 27 de abril de 2016, art. 25, inciso V, e art. 39, inciso IV.",
  ],
} as const
