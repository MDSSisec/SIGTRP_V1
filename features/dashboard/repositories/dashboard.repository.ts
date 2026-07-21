import { getDbPool } from "@/lib/db"
import { PROJETO_TIPOS } from "@/features/projeto/constants/projeto-tipos"

import { ufIbgeToSigla } from "../constants/uf-ibge"
import type { DashboardStats, DashboardUfCount } from "../types"

type UfRow = {
  uf_ibge: number | null
  total: string | number
}

type TotalsRow = {
  total_projetos: string | number
  preenchimento_trp: string | number
  instrumentos_celebrados: string | number
  total_ted: string | number
  total_emenda: string | number
  total_convenio: string | number
}

function toInt(value: string | number | null | undefined): number {
  if (value == null) return 0
  const n = typeof value === "number" ? value : Number.parseInt(String(value), 10)
  return Number.isFinite(n) ? n : 0
}

/**
 * Agrega métricas do dashboard a partir de SIGTRP_TB_PROJECTS.
 * Respeita filtro de responsável externo quando informado.
 */
export async function getDashboardStats(options?: {
  responsavelExternoId?: string
}): Promise<DashboardStats> {
  const pool = getDbPool()
  const responsavelExternoId = options?.responsavelExternoId?.trim()
  const filterSql = responsavelExternoId
    ? "WHERE p.responsavel_externo_id = $1"
    : ""
  const params = responsavelExternoId ? [responsavelExternoId] : []

  const [totalsResult, ufResult] = await Promise.all([
    pool.query<TotalsRow>(
      `
        SELECT
          COUNT(*)::int AS total_projetos,
          COUNT(*) FILTER (
            WHERE et.ordem = 1
          )::int AS preenchimento_trp,
          COUNT(*) FILTER (
            WHERE et.ordem = 4
          )::int AS instrumentos_celebrados,
          COUNT(*) FILTER (
            WHERE p.tipo_projeto::text = '${PROJETO_TIPOS.TED}'
          )::int AS total_ted,
          COUNT(*) FILTER (
            WHERE p.tipo_projeto::text = '${PROJETO_TIPOS.EMENDA}'
          )::int AS total_emenda,
          COUNT(*) FILTER (
            WHERE p.tipo_projeto::text = '${PROJETO_TIPOS.CONVENIO}'
          )::int AS total_convenio
        FROM "SIGTRP_TB_PROJECTS" p
        LEFT JOIN "SIGTRP_TB_PROJECT_STAGES" et ON et.id = p.etapa_id
        ${filterSql}
      `,
      params,
    ),
    pool.query<UfRow>(
      `
        SELECT
          i.proponente_uf_ibge AS uf_ibge,
          COUNT(*)::int AS total
        FROM "SIGTRP_TB_PROJECTS" p
        LEFT JOIN "SIGTRP_TB_PROJECT_SESSION_01_IDENTIFICACAO" i
          ON i.projeto_id = p.id
        ${filterSql}
        GROUP BY i.proponente_uf_ibge
      `,
      params,
    ),
  ])

  const byUfMap = new Map<string, number>()
  let semUf = 0

  for (const row of ufResult.rows) {
    const total = toInt(row.total)
    const sigla = ufIbgeToSigla(row.uf_ibge)
    if (!sigla) {
      semUf += total
      continue
    }
    byUfMap.set(sigla, (byUfMap.get(sigla) ?? 0) + total)
  }

  const byUf: DashboardUfCount[] = [...byUfMap.entries()]
    .map(([uf, total]) => ({ uf, total }))
    .sort((a, b) => b.total - a.total || a.uf.localeCompare(b.uf))

  const totals = totalsResult.rows[0]

  return {
    totalProjetos: toInt(totals?.total_projetos),
    preenchimentoTrp: toInt(totals?.preenchimento_trp),
    instrumentosCelebrados: toInt(totals?.instrumentos_celebrados),
    totalTed: toInt(totals?.total_ted),
    totalEmenda: toInt(totals?.total_emenda),
    totalConvenio: toInt(totals?.total_convenio),
    byUf,
    semUf,
  }
}
