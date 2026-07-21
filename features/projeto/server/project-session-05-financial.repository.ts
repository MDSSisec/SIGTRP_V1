import { parseCurrencyInput } from "@/features/projeto/utils/currency"
import { getDbPool } from "@/lib/db"
import {
  toProjectSession05Financial,
  type ProjectSession05FinancialRow,
} from "../mappers/project-session-05-financial.mapper"
import type {
  ProjectSession05CronogramaDesembolsoInput,
  ProjectSession05CronogramaParcela,
  ProjectSession05Financial,
  ProjectSession05ResumoPlanoAplicacaoInput,
  ProjectSession05ResumoPlanoLinha,
  ProjectSession05ValorTotalInput,
} from "../types/project-session-05-financial"

const FINANCIAL_SELECT = `
  SELECT *
  FROM "SIGTRP_TB_PROJECT_SESSION_05_FINANCIAL"
`

function currencyStringToNull(value: string | undefined): number | null {
  if (value == null) return null
  const trimmed = value.trim()
  if (!trimmed) return null
  return parseCurrencyInput(trimmed)
}

function toCronogramaJson(
  parcelas: ProjectSession05CronogramaParcela[] | undefined,
): string | null {
  if (!parcelas?.length) return null

  const mapped = parcelas.map((parcela) => ({
    mes_ano: parcela.mesAno?.trim() ?? "",
    mds: parcela.mds,
    contrapartida: parcela.contrapartida,
  }))

  const hasContent = mapped.some(
    (p) => p.mes_ano || p.mds != null || p.contrapartida != null,
  )

  return hasContent ? JSON.stringify(mapped) : null
}

function toResumoJson(
  linhas: ProjectSession05ResumoPlanoLinha[] | undefined,
): string | null {
  if (!linhas?.length) return null

  const mapped = linhas.map((linha) => ({
    elemento_despesa: linha.elementoDespesa?.trim() ?? "",
    codigo: linha.codigo?.trim() ?? "",
    mds: linha.mds,
    contrapartida: linha.contrapartida,
  }))

  const hasContent = mapped.some(
    (l) =>
      l.elemento_despesa ||
      l.codigo ||
      l.mds != null ||
      l.contrapartida != null,
  )

  return hasContent ? JSON.stringify(mapped) : null
}

export async function getProjectSession05FinancialByProjetoId(
  projetoId: string,
): Promise<ProjectSession05Financial | null> {
  const pool = getDbPool()

  const result = await pool.query<ProjectSession05FinancialRow>(
    `
      ${FINANCIAL_SELECT}
      WHERE projeto_id = $1
      LIMIT 1
    `,
    [projetoId],
  )

  const row = result.rows[0]
  return row ? toProjectSession05Financial(row) : null
}

async function reloadFinancialOrThrow(
  projetoId: string,
  errorMessage: string,
): Promise<ProjectSession05Financial> {
  const financial = await getProjectSession05FinancialByProjetoId(projetoId)

  if (!financial) {
    throw new Error(errorMessage)
  }

  return financial
}

export async function upsertProjectSession05ValorTotal(
  projetoId: string,
  data: ProjectSession05ValorTotalInput,
): Promise<ProjectSession05Financial> {
  const pool = getDbPool()

  await pool.query(
    `
      INSERT INTO "SIGTRP_TB_PROJECT_SESSION_05_FINANCIAL" (
        projeto_id,
        valor_repasse_mds_custeio,
        valor_repasse_mds_investimento,
        valor_contrapartida_custeio,
        valor_contrapartida_investimento,
        criado_em,
        atualizado_em
      )
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      ON CONFLICT (projeto_id) DO UPDATE SET
        valor_repasse_mds_custeio = EXCLUDED.valor_repasse_mds_custeio,
        valor_repasse_mds_investimento = EXCLUDED.valor_repasse_mds_investimento,
        valor_contrapartida_custeio = EXCLUDED.valor_contrapartida_custeio,
        valor_contrapartida_investimento = EXCLUDED.valor_contrapartida_investimento,
        atualizado_em = NOW()
    `,
    [
      projetoId,
      currencyStringToNull(data.valorRepasseMdsCusteio),
      currencyStringToNull(data.valorRepasseMdsInvestimento),
      currencyStringToNull(data.valorContrapartidaCusteio),
      currencyStringToNull(data.valorContrapartidaInvestimento),
    ],
  )

  return reloadFinancialOrThrow(
    projetoId,
    "Não foi possível salvar o valor total do projeto.",
  )
}

export async function upsertProjectSession05CronogramaDesembolso(
  projetoId: string,
  data: ProjectSession05CronogramaDesembolsoInput,
): Promise<ProjectSession05Financial> {
  const pool = getDbPool()

  const parcelas = toCronogramaJson(data.cronogramaDesembolsoParcelas)

  await pool.query(
    `
      INSERT INTO "SIGTRP_TB_PROJECT_SESSION_05_FINANCIAL" (
        projeto_id,
        cronograma_desembolso_parcelas,
        criado_em,
        atualizado_em
      )
      VALUES ($1, $2::jsonb, NOW(), NOW())
      ON CONFLICT (projeto_id) DO UPDATE SET
        cronograma_desembolso_parcelas = EXCLUDED.cronograma_desembolso_parcelas,
        atualizado_em = NOW()
    `,
    [projetoId, parcelas],
  )

  return reloadFinancialOrThrow(
    projetoId,
    "Não foi possível salvar o cronograma de desembolso.",
  )
}

export async function upsertProjectSession05ResumoPlanoAplicacao(
  projetoId: string,
  data: ProjectSession05ResumoPlanoAplicacaoInput,
): Promise<ProjectSession05Financial> {
  const pool = getDbPool()

  const linhas = toResumoJson(data.resumoPlanoAplicacaoLinhas)

  await pool.query(
    `
      INSERT INTO "SIGTRP_TB_PROJECT_SESSION_05_FINANCIAL" (
        projeto_id,
        resumo_plano_aplicacao_linhas,
        criado_em,
        atualizado_em
      )
      VALUES ($1, $2::jsonb, NOW(), NOW())
      ON CONFLICT (projeto_id) DO UPDATE SET
        resumo_plano_aplicacao_linhas = EXCLUDED.resumo_plano_aplicacao_linhas,
        atualizado_em = NOW()
    `,
    [projetoId, linhas],
  )

  return reloadFinancialOrThrow(
    projetoId,
    "Não foi possível salvar o resumo do plano de aplicação.",
  )
}
