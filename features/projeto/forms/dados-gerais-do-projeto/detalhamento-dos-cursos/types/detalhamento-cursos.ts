import type { CursoDetalhamentoDados } from "@/features/projeto/types/general-project-data"
import { syncCursosByQuantidade } from "@/features/projeto/types/general-project-data"

import {
  readCursos,
  readDadosGerais,
} from "../../dados-gerais/types/dados-gerais-form"

/** Quantidade mínima padrão: 1 curso. */
export const QUANTIDADE_CURSOS_PADRAO = 1

export function getQuantidadeCursos(
  projectData: Record<string, unknown> | null | undefined,
): number {
  return (
    readDadosGerais(projectData)?.quantidadeCursos ?? QUANTIDADE_CURSOS_PADRAO
  )
}

export function getCursosSincronizados(
  projectData: Record<string, unknown> | null | undefined,
): CursoDetalhamentoDados[] {
  const quantidade = getQuantidadeCursos(projectData)

  return syncCursosByQuantidade(readCursos(projectData), quantidade)
}

export type { CursoDetalhamentoDados }
