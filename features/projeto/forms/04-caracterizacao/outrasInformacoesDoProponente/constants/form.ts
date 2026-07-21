/** Limite de caracteres do campo de outras informações. */
export const OUTRAS_INFORMACOES_MAX_LENGTH = 2000

export const OUTRAS_INFORMACOES_IDS = {
  ID_TEXTO: "outras-informacoes-proponente",
} as const

export const OUTRAS_INFORMACOES_LABELS = {
  LABEL_CAMPO: "Informações adicionais",
} as const

export const OUTRAS_INFORMACOES_PLACEHOLDERS = {
  PLACEHOLDER_CAMPO:
    "Descreva outras informações relevantes sobre o(a) proponente...",
} as const

export const OUTRAS_INFORMACOES_TEXT = {
  SAVE_SUCCESS: "Outras informações salvas com sucesso!",
  SAVE_ERROR: "Não foi possível salvar as outras informações.",
} as const

export const VIEW_MODE_FIELD_CLASS =
  "!bg-[var(--field)] disabled:!bg-[var(--field)] disabled:!opacity-100 text-foreground " +
  "placeholder:text-muted-foreground disabled:placeholder:text-muted-foreground"

export const ATTENTION_FIELD_CLASS =
  "!border-destructive !ring-2 !ring-destructive/30 bg-destructive/5"
