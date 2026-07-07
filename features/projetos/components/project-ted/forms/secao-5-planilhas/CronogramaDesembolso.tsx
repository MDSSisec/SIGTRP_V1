"use client"

import React, { useMemo } from "react"
import { DataTable, type TableColumn } from "@/features/projetos/components/project-ted/shared/data-table"
import { FormSectionCard, formLayoutStyles } from "@/features/projetos/components/project-ted/shared/form-section"
import { useProjectData } from "@/features/projetos/contexts/project-data-context"

type Props = { projectId?: string }

interface CronogramaDesembolsoRow extends Record<string, unknown> {
  parcela: string
  mesAno: string
  mdsSisec: string
  contrapartida: string
  total: string
}

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

interface CronogramaRowRaw {
  parcela: string
  mesAno: string
  mdsSisec: number
  contrapartida: number
  total: number
}

function getCronogramaFromModel(projectData: ReturnType<typeof useProjectData>): CronogramaRowRaw[] | null {
  const dados = (projectData as { dados_fisico_financeiros?: { cronograma_desembolso?: Record<string, unknown> } } | null)?.dados_fisico_financeiros?.cronograma_desembolso
  if (!dados || typeof dados !== "object") return null
  const d = dados as { parcela?: string; mes_ano?: string; mds_sisec?: number; contrapartida?: number; total?: number }
  return [
    {
      parcela: d.parcela ?? "—",
      mesAno: d.mes_ano ?? "—",
      mdsSisec: Number(d.mds_sisec) || 0,
      contrapartida: Number(d.contrapartida) || 0,
      total: Number(d.total) || 0,
    },
  ]
}

function withTotalRow(rows: CronogramaRowRaw[]): CronogramaDesembolsoRow[] {
  const somaMds = rows.reduce((s, r) => s + r.mdsSisec, 0)
  const somaContra = rows.reduce((s, r) => s + r.contrapartida, 0)
  const somaTotal = rows.reduce((s, r) => s + r.total, 0)
  const dataRows: CronogramaDesembolsoRow[] = rows.map((r) => ({
    parcela: r.parcela,
    mesAno: r.mesAno,
    mdsSisec: formatCurrency(r.mdsSisec),
    contrapartida: formatCurrency(r.contrapartida),
    total: formatCurrency(r.total),
  }))
  dataRows.push({
    parcela: "Total desembolso",
    mesAno: "—",
    mdsSisec: formatCurrency(somaMds),
    contrapartida: formatCurrency(somaContra),
    total: formatCurrency(somaTotal),
  })
  return dataRows
}

const columns: TableColumn<CronogramaDesembolsoRow>[] = [
  {
    id: "parcela",
    label: "Parcela",
    align: "left",
    render: (row) =>
      row.parcela === "Total desembolso" ? (
        <span className="font-bold uppercase">{row.parcela}</span>
      ) : (
        row.parcela
      ),
  },
  { id: "mesAno", label: "Mês/Ano", align: "left" },
  {
    id: "mdsSisec",
    label: "MDS SISEC (R$)",
    align: "right",
    render: (row) =>
      row.parcela === "Total desembolso" ? (
        <span className="font-bold">{row.mdsSisec}</span>
      ) : (
        row.mdsSisec
      ),
  },
  {
    id: "contrapartida",
    label: "Contrapartida (R$)",
    align: "right",
    render: (row) =>
      row.parcela === "Total desembolso" ? (
        <span className="font-bold">{row.contrapartida}</span>
      ) : (
        row.contrapartida
      ),
  },
  {
    id: "total",
    label: "Total (R$)",
    align: "right",
    render: (row) =>
      row.parcela === "Total desembolso" ? (
        <span className="font-bold">{row.total}</span>
      ) : (
        row.total
      ),
  },
]

export function CronogramaDesembolso({ projectId: _projectId }: Props) {
  const projectData = useProjectData()
  const data = useMemo(() => {
    if (!projectData) return []

    const fromModel = getCronogramaFromModel(projectData)
    if (!fromModel?.length) return []

    return withTotalRow(fromModel)
  }, [projectData])

  return (
    <FormSectionCard>
      <h2 className={formLayoutStyles.title}>20. Cronograma de desembolso</h2>
      <DataTable<CronogramaDesembolsoRow>
        columns={columns}
        data={data}
        emptyMessage="Nenhum cronograma de desembolso cadastrado."
        getRowKey={(row) => (row.parcela === "Total desembolso" ? "total-desembolso" : row.parcela + row.mesAno)}
      />
    </FormSectionCard>
  )
}
