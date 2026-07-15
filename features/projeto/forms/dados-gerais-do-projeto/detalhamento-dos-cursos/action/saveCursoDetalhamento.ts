import type { CursoDetalhamentoDados } from "@/features/projeto/types/general-project-data"
import { syncCursosByQuantidade } from "@/features/projeto/types/general-project-data"
import type { ProjectModelData } from "@/features/projeto/types/ted"

import { readCursos } from "../../dados-gerais/types/dados-gerais-form"

type UpdateProjectData = (patch: Partial<ProjectModelData>) => void

/**
 * Atualiza um curso específico no detalhamento e persiste no contexto.
 */
export function saveCursoDetalhamento(options: {
  index: number
  value: CursoDetalhamentoDados
  quantidadeCursos: number
  projectData: ProjectModelData | null
  updateProjectData: UpdateProjectData
}) {
  const {
    index,
    value,
    quantidadeCursos,
    projectData,
    updateProjectData,
  } = options

  const nextCursos = syncCursosByQuantidade(
    readCursos(projectData as Record<string, unknown> | null),
    quantidadeCursos,
  ).map((curso, cursoIndex) => (cursoIndex === index ? value : curso))

  updateProjectData({
    detalhamentoCursos: nextCursos,
  })
}
