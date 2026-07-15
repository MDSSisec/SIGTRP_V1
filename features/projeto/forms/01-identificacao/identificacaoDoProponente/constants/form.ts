/**
 * Classe aplicada aos campos em modo somente leitura.
 *
 * Mantém o fundo branco e impede que o estado `disabled`
 * altere a aparência visual do componente.
 */
export const VIEW_MODE_FIELD_CLASS =
  "!bg-[#ffffff] disabled:!bg-[#ffffff] disabled:!opacity-100 text-foreground"

/**
 * Classe base utilizada pelos elementos `<select>`
 * do formulário.
 */
export const SELECT_CLASS_NAME =
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none " +
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 " +
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 md:text-sm dark:bg-input/30"

/**
 * Classe aplicada aos campos marcados durante a revisão.
 */
export const ATTENTION_FIELD_CLASS =
  "!border-destructive !ring-2 !ring-destructive/30 bg-destructive/5"

/**
 * Estados possíveis durante a busca de um CEP.
 */
export type CepStatus =
  | "idle"
  | "loading"
  | "success"
  | "error"

type CepFeedback = {
  texto: string
  cor: string
}

/**
 * Mensagens exibidas conforme o estado da consulta de CEP.
 */
export const CEP_FEEDBACK: Record<
  "loading" | "success" | "error",
  CepFeedback
> = {
  loading: {
    texto: "Buscando CEP...",
    cor: "gray",
  },
  success: {
    texto: "CEP encontrado ✓",
    cor: "green",
  },
  error: {
    texto: "CEP não encontrado.",
    cor: "red",
  },
}