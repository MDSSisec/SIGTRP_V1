"use client"

import { useCallback, useMemo } from "react"

import type { CursoDetalhamentoDados } from "@/features/projeto/types/general-project-data"
import {
  useProjectData,
  useUpdateProjectData,
} from "@/features/projeto/contexts/project-data-context"

import { saveCursoDetalhamento } from "../action/saveCursoDetalhamento"
import {
  getCursosSincronizados,
  getQuantidadeCursos,
} from "../types/detalhamento-cursos"

type Options = {
  readOnlyView?: boolean
}

/**
 * Hook responsável pela lógica da seção Detalhamento dos cursos.
 *
 * Responsabilidades:
 * - ler quantidade de cursos dos dados gerais;
 * - sincronizar lista de cursos;
 * - persistir alterações de um curso no contexto.
 */
export function useDetalhamentoCursos(_options: Options = {}) {
  const projectData = useProjectData()
  const updateProjectData = useUpdateProjectData()

  const quantidadeCursos = useMemo(
    () =>
      getQuantidadeCursos(projectData as Record<string, unknown> | null),
    [projectData],
  )

  const cursos = useMemo(
    () =>
      getCursosSincronizados(projectData as Record<string, unknown> | null),
    [projectData],
  )

  const saveCurso = useCallback(
    (index: number, value: CursoDetalhamentoDados) => {
      saveCursoDetalhamento({
        index,
        value,
        quantidadeCursos,
        projectData,
        updateProjectData,
      })
    },
    [quantidadeCursos, projectData, updateProjectData],
  )

  return {
    form: {
      quantidadeCursos,
      cursos,
    },
    ui: {
      hasCursos: quantidadeCursos > 0,
    },
    actions: {
      saveCurso,
    },
  }
}
