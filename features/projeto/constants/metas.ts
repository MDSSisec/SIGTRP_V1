export const METAS_TITLE = {
  TITLE_METAS: "7. Metas",
} as const

export const METAS_LABELS = {
  LABEL_META: (indice: number) => `Meta ${indice + 1}`,
} as const

export const METAS_PLACEHOLDERS = {
  PLACEHOLDER_META: "Informe o título da meta",
} as const

export const METAS_TEXT = {
  ADICIONAR: "Adicionar meta",
  EXCLUIR: "Excluir",
  EMPTY: 'Nenhuma meta cadastrada. Clique em "Adicionar meta" para começar.',
  SAVE_SUCCESS: "Metas salvas com sucesso!",
  SAVE_ERROR: "Não foi possível salvar as metas.",
} as const
