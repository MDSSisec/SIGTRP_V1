import type { LucideIcon } from "lucide-react"
import {
  AlertCircle,
  CheckCircle2,
  CircleCheck,
  ClipboardCheck,
  FileEdit,
  FileSignature,
  Flag,
  PlayCircle,
  Send,
  ThumbsUp,
} from "lucide-react"

export const STATUS_PROJETO_LIST = [
  "TRP em Elaboração",
  "TRP Submetido à SISEC",
  "TRP Aprovado",
  "Instrumento Celebrado",
  "Projeto em Execução",
  "Projeto Concluído",
  "Prestação de Contas em Análise",
  "Prestação de Contas Aprovada",
  "Prestação de Contas com Glosa",
  "Projeto Encerrado",
] as const

export type StatusProjeto = (typeof STATUS_PROJETO_LIST)[number]

export type ProjectTipo = "TED" | "EMENDA" | "CONVENIO"

export const PROJECT_TYPE_OPTIONS = [
  { value: "", label: "Selecione..." },
  { value: "TED", label: "TED" },
  { value: "EMENDA", label: "Emenda" },
  { value: "CONVENIO", label: "Convênio" },
] as const

export const STATUS_PROJETO_STEPS: { title: StatusProjeto; icon: LucideIcon }[] = [
  { title: "TRP em Elaboração", icon: FileEdit },
  { title: "TRP Submetido à SISEC", icon: Send },
  { title: "TRP Aprovado", icon: ThumbsUp },
  { title: "Instrumento Celebrado", icon: FileSignature },
  { title: "Projeto em Execução", icon: PlayCircle },
  { title: "Projeto Concluído", icon: CheckCircle2 },
  { title: "Prestação de Contas em Análise", icon: ClipboardCheck },
  { title: "Prestação de Contas Aprovada", icon: CircleCheck },
  { title: "Prestação de Contas com Glosa", icon: AlertCircle },
  { title: "Projeto Encerrado", icon: Flag },
]

export function statusToStepIndex(status: StatusProjeto | string) {
  const index = STATUS_PROJETO_LIST.indexOf(status as StatusProjeto)
  return index >= 0 ? index : 0
}

/** Converte ordem da etapa no banco (1–10) para índice do StatusStepper (0–9). */
export function etapaOrdemToStepIndex(ordem: number | null | undefined) {
  if (!ordem || ordem < 1) return 0
  return Math.min(ordem - 1, STATUS_PROJETO_LIST.length - 1)
}

/** Prioriza etapa_ordem do banco; fallback pelo nome do status. */
export function getProjectStepIndex(data: {
  etapaOrdem?: number | null
  status?: string
}) {
  if (data.etapaOrdem != null && data.etapaOrdem >= 1) {
    return etapaOrdemToStepIndex(data.etapaOrdem)
  }

  return statusToStepIndex(data.status ?? "TRP em Elaboração")
}
