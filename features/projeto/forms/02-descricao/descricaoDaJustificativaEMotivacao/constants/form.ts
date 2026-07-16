/**
 * Classes aplicadas aos campos quando o formulário está em modo
 * somente leitura (visualização).
 *
 * Mantém:
 * - fundo branco;
 * - opacidade total mesmo quando desabilitado;
 * - cores de texto e placeholder consistentes com o tema.
 */
export const VIEW_MODE_FIELD_CLASS =
  "!bg-[#ffffff] disabled:!bg-[#ffffff] disabled:!opacity-100 text-foreground " +
  "placeholder:text-muted-foreground disabled:placeholder:text-muted-foreground"

/**
 * Classe aplicada aos campos marcados como "Atenção" durante o
 * processo de revisão.
 *
 * Destaca o campo utilizando a cor destrutiva do tema.
 */
export const ATTENTION_FIELD_CLASS =
  "!border-destructive !ring-2 !ring-destructive/30 bg-destructive/5"

/**
 * Quantidade máxima de caracteres permitida em cada campo textual
 * da seção "Descrição da Justificativa e Motivação".
 */
export const JUSTIFICATIVA_MAX_LENGTH = 1000