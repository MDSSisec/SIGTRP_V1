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

import type { StatusItem } from "./statusStepper"

/** Ícones ciclados por ordem quando as etapas vêm do banco. */
const ETAPA_ICONS: LucideIcon[] = [
  FileEdit,
  Send,
  ThumbsUp,
  FileSignature,
  PlayCircle,
  CheckCircle2,
  ClipboardCheck,
  CircleCheck,
  AlertCircle,
  Flag,
]

export type ProjetoEtapaStepSource = {
  id?: string
  nome: string
  ordem: number
}

function shortenEtapaTitle(nome: string): string {
  const trimmed = nome.trim()
  if (trimmed.length <= 28) return trimmed

  const cutoff = trimmed.slice(0, 28)
  const lastSpace = cutoff.lastIndexOf(" ")
  const base = lastSpace > 12 ? cutoff.slice(0, lastSpace) : cutoff
  return `${base}…`
}

/** Mapeia SIGTRP_TB_PROJECT_STAGES → itens do stepper. */
export function buildEtapaSteps(
  etapas: ProjetoEtapaStepSource[],
): StatusItem[] {
  return [...etapas]
    .sort((a, b) => a.ordem - b.ordem)
    .map((etapa, index) => ({
      title: etapa.nome,
      shortTitle: shortenEtapaTitle(etapa.nome),
      icon: ETAPA_ICONS[index % ETAPA_ICONS.length],
    }))
}

/** Ordem 1-based do banco → índice 0-based do stepper. */
export function getEtapaStepIndex(
  ordem: number | null | undefined,
  etapasCount: number,
): number {
  if (!ordem || ordem < 1 || etapasCount <= 0) return 0
  return Math.min(ordem - 1, etapasCount - 1)
}

/**
 * Resolve o índice atual priorizando `etapaOrdem`,
 * depois o nome da etapa no catálogo.
 */
export function resolveEtapaStepIndex(
  etapas: ProjetoEtapaStepSource[],
  options: {
    etapaOrdem?: number | null
    etapaNome?: string | null
    status?: string | null
  } = {},
): number {
  const ordered = [...etapas].sort((a, b) => a.ordem - b.ordem)

  if (options.etapaOrdem != null && options.etapaOrdem >= 1) {
    return getEtapaStepIndex(options.etapaOrdem, ordered.length)
  }

  const nome = options.etapaNome ?? options.status
  if (nome) {
    const byName = ordered.findIndex((etapa) => etapa.nome === nome)
    if (byName >= 0) return byName
  }

  return 0
}
