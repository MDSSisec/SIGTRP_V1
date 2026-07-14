/**
 * Rotas base para edição de projetos.
 */
import { PROJETOS_ROUTE } from "../constants"
import { type ProjetoTipo } from "../constants/projeto-tipos"
import { getModeloConfig } from "../config/modelos"

/** Segmento unificado de edição (qualquer modelo). */
export const PROJETO_EDIT_SEGMENT = "editar"

/** @deprecated Prefer getModeloConfig(tipo).defaultSecao */
export const PROJETO_EDIT_DEFAULT_SECAO = "informacoes-projeto"

/**
 * Monta a URL de edição de um projeto, com a seção default do modelo.
 */
export function getProjetoEditPath(
  id: string,
  tipoProjeto: ProjetoTipo,
): string {
  const config = getModeloConfig(tipoProjeto)
  return `${PROJETOS_ROUTE}/${id}/${PROJETO_EDIT_SEGMENT}?secao=${encodeURIComponent(config.defaultSecao)}`
}

export function getProjetoEditSectionPath(
  id: string,
  secaoId: string,
): string {
  return `${PROJETOS_ROUTE}/${id}/${PROJETO_EDIT_SEGMENT}?secao=${encodeURIComponent(secaoId)}`
}

export function parseProjetoEditPath(
  pathname: string,
): { projectId: string } | null {
  const match = pathname.match(
    new RegExp(`^${PROJETOS_ROUTE}/([^/]+)/${PROJETO_EDIT_SEGMENT}/?$`),
  )

  if (!match?.[1]) return null
  return { projectId: match[1] }
}
