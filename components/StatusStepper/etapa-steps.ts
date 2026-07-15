import type { LucideIcon } from "lucide-react"
import {
  BadgeCheck,
  ClipboardList,
  FilePenLine,
  FilePlus2,
  FileSignature,
  FileText,
  Flag,
} from "lucide-react"

import type { StatusItem } from "./statusStepper"

/**
 * Ícones por ordem do catálogo SIGTRP_TB_PROJECT_STAGES.
 *
 * 1 Projeto Criado
 * 2 Preenchimento dos Dados Gerais
 * 3 Preenchimento do TRP
 * 4 Correção do TRP
 * 5 TRP Aprovado
 * 6 Instrumento Celebrado
 */
const ETAPA_ICON_BY_ORDEM: Record<number, LucideIcon> = {
  1: FilePlus2,
  2: ClipboardList,
  3: FileText,
  4: FilePenLine,
  5: BadgeCheck,
  6: FileSignature,
}

const ETAPA_ICON_BY_NOME_KEYWORD: Array<{ match: RegExp; icon: LucideIcon }> = [
  { match: /criado/i, icon: FilePlus2 },
  { match: /dados\s+gerais/i, icon: ClipboardList },
  { match: /corre(c|ç)(a|ã)o/i, icon: FilePenLine },
  { match: /aprovad/i, icon: BadgeCheck },
  { match: /celebrado|instrumento/i, icon: FileSignature },
  { match: /preenchimento.*trp|trp/i, icon: FileText },
]

const FALLBACK_ICON = Flag

function resolveEtapaIcon(ordem: number, nome: string): LucideIcon {
  const byOrdem = ETAPA_ICON_BY_ORDEM[ordem]
  if (byOrdem) return byOrdem

  const byName = ETAPA_ICON_BY_NOME_KEYWORD.find(({ match }) =>
    match.test(nome),
  )
  return byName?.icon ?? FALLBACK_ICON
}

export type ProjetoEtapaStepSource = {
  id?: string
  nome: string
  ordem: number
}

/** Mapeia SIGTRP_TB_PROJECT_STAGES → itens do stepper (título completo + ícone). */
export function buildEtapaSteps(
  etapas: ProjetoEtapaStepSource[],
): StatusItem[] {
  return [...etapas]
    .sort((a, b) => a.ordem - b.ordem)
    .map((etapa) => ({
      title: etapa.nome.trim(),
      icon: resolveEtapaIcon(etapa.ordem, etapa.nome),
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
