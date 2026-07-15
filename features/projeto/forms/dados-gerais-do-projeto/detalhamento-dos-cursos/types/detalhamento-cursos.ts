import type { CursoDetalhamentoDados } from "@/features/projeto/types/general-project-data"
import { syncCursosByQuantidade } from "@/features/projeto/types/general-project-data"

import {
  readCursos,
  readDadosGerais,
} from "../../dados-gerais/types/dados-gerais-form"

export function getQuantidadeCursos(
  projectData: Record<string, unknown> | null | undefined,
): number {
  return readDadosGerais(projectData)?.quantidadeCursos ?? 0
}

export function getCursosSincronizados(
  projectData: Record<string, unknown> | null | undefined,
): CursoDetalhamentoDados[] {
  const quantidade = getQuantidadeCursos(projectData)
  if (!quantidade) return []

  return syncCursosByQuantidade(readCursos(projectData), quantidade)
}

export type { CursoDetalhamentoDados }
