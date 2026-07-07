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

export type ProjectTipo = "TED" | "EMENDA"

export const PROJECT_TYPE_OPTIONS = [
  { value: "", label: "Selecione..." },
  { value: "TED", label: "TED" },
  { value: "EMENDA", label: "Emenda" },
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
