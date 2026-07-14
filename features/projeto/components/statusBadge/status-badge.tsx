import { cn } from "@/lib/utils"

import styles from "./status-badge.module.css"

type ProjetoStatusBadgeProps = {
  /** Nome da etapa (SIGTRP_TB_PROJECT_STAGES.nome). */
  status: string
  /** Ordem da etapa no catálogo (opcional, melhora a cor do badge). */
  ordem?: number | null
}

function resolveVariant(status: string, ordem?: number | null) {
  if (typeof ordem === "number") {
    if (ordem <= 2) return styles.elaboracao
    if (ordem === 3) return styles.analise
    if (ordem === 4) return styles.aprovado
    if (ordem === 5) return styles.celebrado
    if (ordem === 6) return styles.execucao
    if (ordem === 7) return styles.analise
    if (ordem === 8) return styles.aprovado
    if (ordem === 9) return styles.glosa
    return styles.encerrado
  }

  const normalized = status.toLowerCase()

  if (normalized.includes("glosa")) return styles.glosa
  if (normalized.includes("encerrado")) return styles.encerrado
  if (normalized.includes("conclu")) return styles.concluido
  if (normalized.includes("aprovad")) return styles.aprovado
  if (normalized.includes("celebrado")) return styles.celebrado
  if (normalized.includes("execução") || normalized.includes("execucao")) {
    return styles.execucao
  }
  if (
    normalized.includes("elaboração") ||
    normalized.includes("elaboracao") ||
    normalized.includes("dados gerais")
  ) {
    return styles.elaboracao
  }
  if (
    normalized.includes("análise") ||
    normalized.includes("analise") ||
    normalized.includes("submetido")
  ) {
    return styles.analise
  }

  return styles.default
}

/**
 * Exibe o status do projeto conforme o nome vindo do banco
 * (SIGTRP_TB_PROJECT_STAGES.nome).
 */
export function ProjetoStatusBadge({
  status,
  ordem,
}: ProjetoStatusBadgeProps) {
  return (
    <span
      className={cn(styles.badge, resolveVariant(status, ordem))}
      title={status}
    >
      {status}
    </span>
  )
}
