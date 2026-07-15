/**
 * Tipos relacionados ao domínio de Projetos.
 */

import type { ProjetoTipo } from "../constants/projeto-tipos"

/**
 * Nome da etapa do projeto (SIGTRP_TB_PROJECT_STAGES.nome).
 * @deprecated Prefer `etapaNome` / `ProjetoEtapa`.
 */
export type ProjetoStatus = string

export type { ProjetoTipo }

/**
 * Modelo de projeto utilizado pela aplicação.
 *
 * Diferentemente do modelo retornado pelo banco de dados,
 * todas as propriedades seguem o padrão camelCase.
 */
export type Projeto = {
  id: string
  tipoProjeto: ProjetoTipo
  nome: string

  responsavelInternoId: string
  responsavelExternoId: string

  responsavelInternoNome: string
  responsavelExternoNome: string

  criadoPorId: string
  criadoPorNome: string

  criadoEm: string
  atualizadoEm: string

  /**
   * Nome do responsável exibido na listagem.
   * Atualmente corresponde ao responsável interno.
   */
  responsavel: string

  /**
   * Alias legado do nome da etapa (SIGTRP_TB_PROJECT_STAGES.nome).
   * Preferir `etapaNome`.
   */
  status: ProjetoStatus

  /**
   * Descrição amigável do tipo de projeto
   * utilizada na interface.
   */
  tipo: string

  etapaId: string | null
  etapaNome: string
  etapaOrdem: number | null
}

/**
 * Etapa do catálogo SIGTRP_TB_PROJECT_STAGES.
 */
export type ProjetoEtapa = {
  id: string
  ordem: number
  nome: string
}

/**
 * Opção utilizada nos campos de seleção de responsáveis.
 */
export type ResponsavelOption = {
  id: string
  nome: string
  email: string
}

/**
 * Dados necessários para criação de um projeto.
 */
export type CreateProjetoInput = {
  tipoProjeto: ProjetoTipo
  nome: string
  responsavelInternoId: string
  responsavelExternoId: string
}
