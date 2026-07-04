import { cn } from "@/lib/utils"
import type { ProjetoStatus } from "../types"

const statusStyles: Record<ProjetoStatus, string> = {
  Aprovado:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400",
  "Em análise":
    "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-400",
  Pendente:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-400",
  Concluído:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400",
}

type ProjetoStatusBadgeProps = {
  status: ProjetoStatus
}

export function ProjetoStatusBadge({ status }: ProjetoStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium",
        statusStyles[status],
      )}
    >
      {status}
    </span>
  )
}
