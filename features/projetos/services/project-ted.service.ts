export {
  STATUS_PROJETO_STEPS,
  etapaOrdemToStepIndex,
  getProjectStepIndex,
  statusToStepIndex,
} from "../constants/ted/project"

export type {
  CronogramaDataMapped,
  ProjectModelData,
} from "@/features/projeto/types/ted"

export { mapModeloCronogramaToForm } from "@/features/projeto/services/project-ted.service"
