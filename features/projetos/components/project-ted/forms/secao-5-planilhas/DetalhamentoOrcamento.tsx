"use client"

import React, { useMemo } from "react"
import { useProjectData } from "@/features/projetos/contexts/project-data-context"
import { FormSectionCard, formLayoutStyles } from "@/features/projetos/components/project-ted/shared/form-section"
import styles from "@/features/projetos/components/project-ted/shared/data-table.module.css"

type Props = { projectId?: string }

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

interface DetalhamentoRow extends Record<string, unknown> {
  rowKey: string
  tipo: "item" | "total_etapa" | "total_projeto"
  /** Label da meta (só preenchido na primeira linha da meta) */
  meta: string
  /** rowSpan da célula Meta nesta linha (só > 0 na primeira linha da meta) */
  metaRowSpan: number
  /** Descrição da etapa (ou "TOTAL ETAPA X.X" na linha de total) */
  descricaoEtapa: string
  /** rowSpan da célula Etapa nesta linha (só > 0 na primeira linha da etapa; não inclui a linha TOTAL ETAPA) */
  etapaRowSpan: number
  itemDespesa: string
  codigo: string
  unidade: string
  quantidade: string
  valorUnitario: string
  valorTotal: string
  fonteRecurso: string
}

type MetaModel = {
  meta?: string
  etapas?: Array<{
    descricao_etapa?: string
    total_etapa?: number
    itens?: Array<{
      item_despesa?: string
      codigo?: string
      unidade?: string
      quantidade?: number
      valor_unitario?: number
      valor_total?: number
      fonte_recurso?: string
    }>
  }>
}

function getDetalhamentoFromModel(projectData: ReturnType<typeof useProjectData>): DetalhamentoRow[] | null {
  const det = (projectData as { dados_fisico_financeiros?: { detalhamento_orcamento?: { metas?: MetaModel[]; total_projeto?: number } } } | null)?.dados_fisico_financeiros?.detalhamento_orcamento
  if (!det?.metas?.length) return null
  const metaRowCounts: number[] = det.metas.map((m) => {
    let c = 0
    for (const e of m.etapas ?? []) {
      c += (e.itens?.length ?? 0) + 1
    }
    return c
  })
  const rows: DetalhamentoRow[] = []
  let keyIdx = 0
  for (let mi = 0; mi < det.metas.length; mi++) {
    const m = det.metas[mi]
    const metaLabel = m.meta ?? ""
    const metaSpan = metaRowCounts[mi] ?? 0
    for (let ei = 0; ei < (m.etapas ?? []).length; ei++) {
      const e = m.etapas![ei]
      const etapaLabel = e.descricao_etapa ?? ""
      const itens = e.itens ?? []
      const etapaSpan = itens.length
      for (let ii = 0; ii < itens.length; ii++) {
        const item = itens[ii]
        const isFirstRowOfMeta = ei === 0 && ii === 0
        const isFirstRowOfEtapa = ii === 0
        rows.push({
          rowKey: `row-${keyIdx++}`,
          tipo: "item",
          meta: isFirstRowOfMeta ? metaLabel : "",
          metaRowSpan: isFirstRowOfMeta ? metaSpan : 0,
          descricaoEtapa: isFirstRowOfEtapa ? etapaLabel : "",
          etapaRowSpan: isFirstRowOfEtapa ? etapaSpan : 0,
          itemDespesa: item.item_despesa ?? "",
          codigo: item.codigo ?? "",
          unidade: item.unidade ?? "",
          quantidade: String(item.quantidade ?? ""),
          valorUnitario: formatCurrency(Number(item.valor_unitario) || 0),
          valorTotal: formatCurrency(Number(item.valor_total) || 0),
          fonteRecurso: item.fonte_recurso ?? "",
        })
      }
      const totalEtapa = Number(e.total_etapa) || 0
      const etapaNum = etapaLabel.match(/Etapa\s*(\d+\.\d+)/)?.[1] ?? ""
      rows.push({
        rowKey: `total-etapa-${keyIdx++}`,
        tipo: "total_etapa",
        meta: "",
        metaRowSpan: 0,
        descricaoEtapa: etapaNum ? `TOTAL ETAPA ${etapaNum}` : "TOTAL ETAPA",
        etapaRowSpan: 0,
        itemDespesa: "",
        codigo: "",
        unidade: "",
        quantidade: "",
        valorUnitario: "",
        valorTotal: formatCurrency(totalEtapa),
        fonteRecurso: "",
      })
    }
  }
  const totalProjeto = Number(det.total_projeto) || 0
  rows.push({
    rowKey: "total-projeto",
    tipo: "total_projeto",
    meta: "",
    metaRowSpan: 0,
    descricaoEtapa: "",
    etapaRowSpan: 0,
    itemDespesa: "TOTAL DO PROJETO",
    codigo: "",
    unidade: "",
    quantidade: "",
    valorUnitario: "",
    valorTotal: formatCurrency(totalProjeto),
    fonteRecurso: "",
  })
  return rows
}

const isTotalEtapa = (row: DetalhamentoRow) => row.tipo === "total_etapa"
const isTotalProjeto = (row: DetalhamentoRow) => row.tipo === "total_projeto"
const isTotalRow = (row: DetalhamentoRow) => row.tipo === "total_etapa" || row.tipo === "total_projeto"

const cellBold = (content: React.ReactNode) => <span className="font-bold">{content}</span>
const cellBoldUpper = (content: React.ReactNode) => <span className="font-bold uppercase">{content}</span>

function renderCell(row: DetalhamentoRow, col: string): React.ReactNode {
  switch (col) {
    case "descricaoEtapa":
      return isTotalEtapa(row) ? cellBoldUpper(row.descricaoEtapa) : row.descricaoEtapa
    case "itemDespesa":
      return isTotalProjeto(row) ? cellBoldUpper(row.itemDespesa) : row.itemDespesa
    case "valorUnitario":
      return isTotalRow(row) ? "" : (row.valorUnitario ? `R$ ${row.valorUnitario}` : "")
    case "valorTotal": {
      const valor = row.valorTotal ? `R$ ${row.valorTotal}` : ""
      return isTotalRow(row) ? cellBold(valor) : valor
    }
    default:
      return (row[col] as string) ?? ""
  }
}

const COLUMNS: { id: keyof DetalhamentoRow; label: string; align: "left" | "center" | "right" }[] = [
  { id: "meta", label: "Metas", align: "left" },
  { id: "descricaoEtapa", label: "Descrição das Etapas/Produtos", align: "left" },
  { id: "itemDespesa", label: "Itens de Despesa para Realizar a Etapa", align: "left" },
  { id: "codigo", label: "Código do Elemento de Despesa", align: "left" },
  { id: "unidade", label: "Unidade", align: "center" },
  { id: "quantidade", label: "Quantidade de Itens de Despesa", align: "center" },
  { id: "valorUnitario", label: "Valor Unitário (R$)", align: "left" },
  { id: "valorTotal", label: "Valor Total (R$)", align: "left" },
  { id: "fonteRecurso", label: "Fonte do Recurso", align: "left" },
]

export function DetalhamentoOrcamento({ projectId: _projectId }: Props) {
  const projectData = useProjectData()
  const data = useMemo(() => {
    if (!projectData) return []

    return getDetalhamentoFromModel(projectData) ?? []
  }, [projectData])

  return (
    <FormSectionCard>
      <h2 className={formLayoutStyles.title}>
        21. Detalhamento do orçamento de bens e serviços com memória de cálculo por meta, etapa e tipo de despesa
      </h2>
      {data.length > 0 ? (
        <div className={`w-full overflow-x-auto ${styles.wrapper}`}>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <colgroup>
                <col className="min-w-0" />
                <col className="min-w-0" />
                <col className="min-w-0" />
                <col className="min-w-0" />
                <col className="min-w-0" />
                <col className="min-w-0" />
                <col style={{ minWidth: "8rem", width: "1%" }} />
                <col style={{ minWidth: "9rem", width: "1%" }} />
                <col className="min-w-0" />
              </colgroup>
              <thead className={styles.thead}>
                <tr>
                  {COLUMNS.map((col) => (
                    <th
                      key={col.id}
                      className={`${styles.th} ${styles[col.align]} ${col.id === "valorUnitario" || col.id === "valorTotal" ? "whitespace-nowrap" : ""}`}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.rowKey} className={styles.row}>
                    {row.metaRowSpan > 0 ? (
                      <td
                        rowSpan={row.metaRowSpan}
                        className={`${styles.td} ${styles.left} align-top bg-white dark:bg-neutral-900`}
                      >
                        {row.meta}
                      </td>
                    ) : null}
                    {row.etapaRowSpan > 0 ? (
                      <td
                        rowSpan={row.etapaRowSpan}
                        className={`${styles.td} ${styles.left} align-top bg-white dark:bg-neutral-900`}
                      >
                        {row.descricaoEtapa}
                      </td>
                    ) : row.tipo === "total_etapa" || row.tipo === "total_projeto" ? (
                      <td className={`${styles.td} ${styles.left}`}>{renderCell(row, "descricaoEtapa")}</td>
                    ) : null}
                    {row.tipo === "total_projeto" ? (
                      <>
                        <td colSpan={6} className={`${styles.td} ${styles.left} font-bold uppercase`}>
                          {row.itemDespesa}
                        </td>
                        <td className={`${styles.td} ${styles.left} font-bold whitespace-nowrap`}>{row.valorTotal ? `R$ ${row.valorTotal}` : ""}</td>
                        <td className={`${styles.td} ${styles.left}`}>{row.fonteRecurso}</td>
                      </>
                    ) : (
                      <>
                        <td className={`${styles.td} ${styles.left}`}>{renderCell(row, "itemDespesa")}</td>
                        <td className={`${styles.td} ${styles.left}`}>{row.codigo}</td>
                        <td className={`${styles.td} ${styles.center}`}>{row.unidade}</td>
                        <td className={`${styles.td} ${styles.center}`}>{row.quantidade}</td>
                        <td className={`${styles.td} ${styles.left} whitespace-nowrap`}>{renderCell(row, "valorUnitario")}</td>
                        <td className={`${styles.td} ${styles.left} whitespace-nowrap`}>{renderCell(row, "valorTotal")}</td>
                        <td className={`${styles.td} ${styles.left}`}>{row.fonteRecurso}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className={formLayoutStyles.subtitle}>Nenhum dado de detalhamento no projeto.</p>
      )}
    </FormSectionCard>
  )
}
