export {
  PROJETO_SECOES,
  PROJETO_SECOES_TRP_VISAO_GERAL,
  SECAO_SLUG_TO_TITLE,
  SECOES_VISAO_GERAL,
  SESSOES_VISAO_GERAL_SLUG,
  SESSOES_VISAO_GERAL_SUBTITLE,
  SESSOES_VISAO_GERAL_TITLE,
  type ProjetoSecaoId,
} from "./secoes-projeto"

export const TITULO_VISAO_GERAL = "Visão geral do projeto"
export const DESCRICAO_VISAO_GERAL =
  "Confira o resumo do documento TRP e exporte em PDF."
export const TITULO_INFORMACOES_PROJETO = "Informações do projeto"
export const DESCRICAO_INFORMACOES_PROJETO =
  "Defina o status, os responsáveis e acompanhe o preenchimento das seções do TRP."
export const TITULO_DOCUMENTO_TRP =
  "TERMO DE REFERÊNCIA DE PROJETO - TRP (Portaria MDS nº 1.131, de 25 de novembro de 2025)"

export const VISAO_GERAL_ASSINATURA = {
  LOCAL_LABEL: "Local:",
  LOCAL_VALOR_FALLBACK: "município/UF.",
  DATA_LABEL: "Data:",
  DATA_VALOR: "na data da assinatura eletrônica.",
  NOME_REPRESENTANTE_FALLBACK: "Nome do representante legal do(a) proponente",
  CARGO_FUNCAO_FALLBACK: "Cargo/Função",
} as const
