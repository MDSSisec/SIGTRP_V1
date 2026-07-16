export const OBJETIVOS_TITLE = {
  TITLE_OBJETIVOS: "6. Objetivos",
} as const

export const OBJETIVOS_LABELS = {
  LABEL_OBJETIVO_GERAL: "6.1. Objetivo Geral",
  LABEL_OBJETIVOS_ESPECIFICOS: "6.2. Objetivos Específicos",
  LABEL_OBJETIVO_ESPECIFICO: (indice: number) =>
    `Objetivo específico ${indice + 1}`,
} as const

export const OBJETIVOS_PLACEHOLDERS = {
  PLACEHOLDER_OBJETIVO_GERAL: "Promover a capacitação de pessoas em situação de vulnerabilidade no (Município/Região/Estado) de .................., inscritas no Cadastro Único de Programas Sociais do Governo Federal - CadÚnico, com vistas à empregabilidade ou ao empreendedorismo, possibilitando-lhes inclusão socioeconômica.",
  PLACEHOLDER_OBJETIVO_ESPECIFICO:
    "Ex: Realizar 10 oficinas de capacitação",
} as const

export const OBJETIVOS_TEXT = {
  ADICIONAR: "Adicionar objetivo",
  EXCLUIR: "Excluir",
  SAVE_SUCCESS: "Objetivos salvos com sucesso!",
  SAVE_ERROR: "Não foi possível salvar os objetivos.",
} as const
