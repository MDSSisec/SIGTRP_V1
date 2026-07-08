import {
  STATUS_PROJETO_STEPS,
  etapaOrdemToStepIndex,
  getProjectStepIndex,
  statusToStepIndex,
} from "../constants/ted/project"
import type {
  CronogramaDataMapped,
  ProjectModelData,
} from "../types/ted"
import { parseValorModelo } from "../utils/ted-model"

export type { CronogramaDataMapped, ProjectModelData } from "../types/ted"
export { STATUS_PROJETO_STEPS, etapaOrdemToStepIndex, getProjectStepIndex, statusToStepIndex } from "../constants/ted/project"

export function mapModeloCronogramaToForm(
  etapasCronograma: ProjectModelData["etapas_cronograma"],
): CronogramaDataMapped {
  if (!etapasCronograma?.metas?.length) return { metas: [] }

  return {
    metas: etapasCronograma.metas.map((meta: Record<string, any>) => ({
      titulo: meta.meta ?? "",
      etapas: (meta.etapas ?? []).map((etapa: Record<string, any>) => ({
        descricao: etapa.atividade ?? "",
        valor: parseValorModelo(etapa.valor),
        inicio: etapa.inicio ?? "",
        termino: etapa.termino ?? "",
      })),
      quadrosConteudosProgramaticos: [],
      quadroInsumosPorCurso: [],
    })),
  }
}
