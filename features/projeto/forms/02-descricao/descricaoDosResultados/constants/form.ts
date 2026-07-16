/** Em modo visualização: fundo branco e opacidade plena. */
export const VIEW_MODE_FIELD_CLASS =
  "!bg-[#ffffff] disabled:!bg-[#ffffff] disabled:!opacity-100 text-foreground " +
  "placeholder:text-muted-foreground disabled:placeholder:text-muted-foreground"

/** Classe aplicada aos campos marcados durante a revisão. */
export const ATTENTION_FIELD_CLASS =
  "!border-destructive !ring-2 !ring-destructive/30 bg-destructive/5"

/** Limite de caracteres por resultado esperado. */
export const RESULTADO_MAX_LENGTH = 1000

export function resultadoCampoKey(indice: number) {
  return `resultado-${indice}`
}
