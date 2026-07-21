import type {
  ProjectSession05CronogramaParcela,
  ProjectSession05Financial,
  ProjectSession05ResumoPlanoLinha,
} from "../types/project-session-05-financial"

type DbNumeric = string | number | null

type CronogramaParcelaRow = {
  mes_ano?: string
  mds?: DbNumeric
  contrapartida?: DbNumeric
}

type ResumoLinhaRow = {
  elemento_despesa?: string
  codigo?: string
  mds?: DbNumeric
  contrapartida?: DbNumeric
}

/** Registro bruto da tabela financeira (snake_case). */
export type ProjectSession05FinancialRow = {
  id: string
  projeto_id: string
  valor_repasse_mds_custeio: DbNumeric
  valor_repasse_mds_investimento: DbNumeric
  valor_contrapartida_custeio: DbNumeric
  valor_contrapartida_investimento: DbNumeric
  cronograma_desembolso_parcelas: CronogramaParcelaRow[] | null
  resumo_plano_aplicacao_linhas: ResumoLinhaRow[] | null
  criado_em: string
  atualizado_em: string
}

function toNullableNumber(value: DbNumeric): number | null {
  if (value == null || value === "") return null
  const num = Number(value)
  return Number.isFinite(num) ? num : null
}

function mapCronogramaParcela(
  row: CronogramaParcelaRow,
): ProjectSession05CronogramaParcela {
  return {
    mesAno: row.mes_ano?.trim() ?? "",
    mds: toNullableNumber(row.mds ?? null),
    contrapartida: toNullableNumber(row.contrapartida ?? null),
  }
}

function mapResumoLinha(row: ResumoLinhaRow): ProjectSession05ResumoPlanoLinha {
  return {
    elementoDespesa: row.elemento_despesa?.trim() ?? "",
    codigo: row.codigo?.trim() ?? "",
    mds: toNullableNumber(row.mds ?? null),
    contrapartida: toNullableNumber(row.contrapartida ?? null),
  }
}

export function toProjectSession05Financial(
  row: ProjectSession05FinancialRow,
): ProjectSession05Financial {
  const cronogramaRaw = row.cronograma_desembolso_parcelas
  const resumoRaw = row.resumo_plano_aplicacao_linhas

  return {
    id: row.id,
    projetoId: row.projeto_id,
    valorRepasseMdsCusteio: toNullableNumber(row.valor_repasse_mds_custeio),
    valorRepasseMdsInvestimento: toNullableNumber(
      row.valor_repasse_mds_investimento,
    ),
    valorContrapartidaCusteio: toNullableNumber(row.valor_contrapartida_custeio),
    valorContrapartidaInvestimento: toNullableNumber(
      row.valor_contrapartida_investimento,
    ),
    cronogramaDesembolsoParcelas: Array.isArray(cronogramaRaw)
      ? cronogramaRaw.map(mapCronogramaParcela)
      : null,
    resumoPlanoAplicacaoLinhas: Array.isArray(resumoRaw)
      ? resumoRaw.map(mapResumoLinha)
      : null,
    criadoEm: row.criado_em,
    atualizadoEm: row.atualizado_em,
  }
}
