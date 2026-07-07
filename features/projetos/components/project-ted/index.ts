export { ProjectTEDEditContent } from "./edit/ProjectTEDEdit"
export { DEFAULT_FORM_SECTION, PROJECT_FORM_SECTIONS } from "./forms"
export type { ProjectFormSectionProps } from "./forms"
export {
  mapModeloCronogramaToForm,
  statusToStepIndex,
  STATUS_PROJETO_STEPS,
} from "@/features/projetos/services/project-ted.service"
export type {
  ProjectModelData,
  CronogramaDataMapped,
} from "@/features/projetos/types/ted"
