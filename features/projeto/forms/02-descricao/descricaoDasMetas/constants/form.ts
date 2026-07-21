/** Em modo visualização: fundo branco e opacidade plena. */
export const VIEW_MODE_FIELD_CLASS =
  "!bg-[var(--field)] disabled:!bg-[var(--field)] disabled:!opacity-100 text-foreground " +
  "placeholder:text-muted-foreground disabled:placeholder:text-muted-foreground"

/** Classe aplicada aos campos marcados durante a revisão. */
export const ATTENTION_FIELD_CLASS =
  "!border-destructive !ring-2 !ring-destructive/30 bg-destructive/5"

/** Chave de revisão da meta por índice. */
export function metaCampoKey(indice: number) {
  return `meta-${indice}`
}
