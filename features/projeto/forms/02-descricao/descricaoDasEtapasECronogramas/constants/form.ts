/**
 * Classes aplicadas aos campos quando o formulário
 * está apenas em modo de visualização.
 *
 * Mantém fundo branco, opacidade total e placeholders visíveis,
 * evitando a aparência padrão de campos desabilitados.
 */
export const VIEW_MODE_FIELD_CLASS =
  "!bg-[var(--field)] disabled:!bg-[var(--field)] disabled:!opacity-100 text-foreground " +
  "placeholder:text-muted-foreground disabled:placeholder:text-muted-foreground"

/**
 * Classe aplicada aos campos marcados como "Atenção"
 * durante o processo de revisão.
 */
export const ATTENTION_FIELD_CLASS =
  "!border-destructive !ring-2 !ring-destructive/30 bg-destructive/5"

/**
 * Gera a chave de revisão de uma etapa do cronograma.
 *
 * @param metaIndex Índice da meta.
 * @param etapaIndex Índice da etapa dentro da meta.
 * @returns Identificador único do campo.
 */
export function etapaCampoKey(
  metaIndex: number,
  etapaIndex: number,
): string {
  return `meta-${metaIndex}-etapa-${etapaIndex}`
}

/**
 * Gera a chave de revisão do campo "Início" de uma meta.
 *
 * @param metaIndex Índice da meta.
 * @returns Identificador único do campo.
 */
export function metaInicioCampoKey(metaIndex: number): string {
  return `meta-${metaIndex}-inicio`
}

/**
 * Gera a chave de revisão do campo "Término" de uma meta.
 *
 * @param metaIndex Índice da meta.
 * @returns Identificador único do campo.
 */
export function metaTerminoCampoKey(metaIndex: number): string {
  return `meta-${metaIndex}-termino`
}