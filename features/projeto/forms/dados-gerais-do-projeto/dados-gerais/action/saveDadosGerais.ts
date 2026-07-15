import { syncCursosByQuantidade } from "@/features/projeto/types/general-project-data"
import {
  notifyError,
  notifySuccess,
} from "@/features/projeto/utils/notify"
import type { ProjectModelData } from "@/features/projeto/types/ted"

import {
  readCursos,
  toDadosGeraisProjetoState,
  validateDadosGeraisForm,
  type DadosGeraisForm,
} from "../types/dados-gerais-form"

type SaveResult =
  | { ok: true; normalized: DadosGeraisForm; patch: Partial<ProjectModelData> }
  | { ok: false; error: string }

type UpdateProjectData = (patch: Partial<ProjectModelData>) => void

/**
 * Valida e persiste os dados gerais no contexto do projeto.
 * Também sincroniza a lista de cursos conforme a quantidade informada.
 */
export function saveDadosGerais(options: {
  dados: DadosGeraisForm
  projectData: ProjectModelData | null
  updateProjectData: UpdateProjectData
}): SaveResult {
  const { dados, projectData, updateProjectData } = options

  const validationError = validateDadosGeraisForm(dados)
  if (validationError) {
    return { ok: false, error: validationError }
  }

  try {
    const quantidadeCursos = Number(dados.quantidadeCursos)
    const normalized: DadosGeraisForm = {
      ...dados,
      quantidadeCursos: String(quantidadeCursos),
    }

    const dadosGeraisProjeto = toDadosGeraisProjetoState(normalized)
    const detalhamentoCursos = syncCursosByQuantidade(
      readCursos(projectData as Record<string, unknown> | null),
      quantidadeCursos,
    )

    const patch = { dadosGeraisProjeto, detalhamentoCursos }
    updateProjectData(patch)
    notifySuccess("Dados gerais do projeto salvos com sucesso!")

    return { ok: true, normalized, patch }
  } catch (error) {
    return {
      ok: false,
      error: notifyError(
        error,
        "Não foi possível salvar os dados gerais do projeto.",
      ),
    }
  }
}
