import { cn } from "@/lib/utils"
import type { ProjetoStatus } from "../../types"

import styles from "./status-badge.module.css"

const statusClassMap: Record<ProjetoStatus, string> = {
  Aprovado: styles.aprovado,
  "Em análise": styles.emAnalise,
  Pendente: styles.pendente,
  Concluído: styles.concluido,
}

type ProjetoStatusBadgeProps = {
  status: ProjetoStatus
}

export function ProjetoStatusBadge({ status }: ProjetoStatusBadgeProps) {
  return (
    <span className={cn(styles.badge, statusClassMap[status])}>{status}</span>
  )
}
