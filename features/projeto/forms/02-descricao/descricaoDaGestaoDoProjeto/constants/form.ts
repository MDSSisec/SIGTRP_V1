/**
 * Classes CSS aplicadas aos campos quando a seção está em modo
 * de visualização (somente leitura).
 *
 * Mantém o fundo branco, preserva a opacidade e evita alterações
 * visuais normalmente aplicadas a elementos desabilitados.
 */
export const VIEW_MODE_FIELD_CLASS =
  "!bg-[var(--field)] disabled:!bg-[var(--field)] disabled:!opacity-100 text-foreground " +
  "placeholder:text-muted-foreground disabled:placeholder:text-muted-foreground"

/**
 * Classe CSS aplicada aos campos marcados com atenção durante
 * o processo de revisão do projeto.
 *
 * Destaca o campo utilizando borda, anel e fundo em tom destrutivo.
 */
export const ATTENTION_FIELD_CLASS =
  "!border-destructive !ring-2 !ring-destructive/30 bg-destructive/5"

/**
 * Quantidade máxima de caracteres permitida em cada campo textual
 * da seção Gestão do Projeto.
 */
export const GESTAO_MAX_LENGTH = 1000