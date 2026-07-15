import { cn } from "@/lib/utils"

import styles from "./etapa-badge.module.css"

type ProjetoEtapaBadgeProps = {
  /** Nome da etapa (SIGTRP_TB_PROJECT_STAGES.nome). */
  etapa?: string
  /**
   * @deprecated Use `etapa`.
   * Mantido para compatibilidade com imports antigos.
   */
  status?: string
  /** Ordem no catálogo SIGTRP_TB_PROJECT_STAGES.ordem. */
  ordem?: number | null
}

function resolveVariant(etapa: string, ordem?: number | null) {
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

  const normalized = etapa.toLowerCase()

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
 * Exibe a etapa do projeto conforme SIGTRP_TB_PROJECT_STAGES
 * (`nome` + `ordem` opcional para a variante visual).
 */
export function ProjetoEtapaBadge({
  etapa,
  status,
  ordem,
}: ProjetoEtapaBadgeProps) {
  const label = (etapa ?? status ?? "").trim() || "Sem etapa"

  return (
    <span
      className={cn(styles.badge, resolveVariant(label, ordem))}
      title={label}
    >
      {label}
    </span>
  )
}

/** @deprecated Use ProjetoEtapaBadge */
export const ProjetoStatusBadge = ProjetoEtapaBadge
