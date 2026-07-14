"use client"

import { PlusIcon, Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { CursoDespesaRow } from "@/features/projetos/components/generalProjectData/types"
import { createEmptyDespesa } from "@/features/projetos/components/generalProjectData/types"
import {
  findItemCurso,
  findTipoItemCurso,
  TIPOS_ITEM_CURSO,
} from "@/features/projetos/constants/ted/catalogo-despesas-curso"
import {
  FORM_INPUT_CLASS,
  FORM_SELECT_CLASS,
} from "@/features/projetos/components/project-ted/shared/form-fields"
import {
  formatCurrencyInput,
  parseCurrencyInput,
} from "@/features/projetos/utils/currency"
import { cn } from "@/lib/utils"

import styles from "./DetalhamentoGastosCurso.module.css"

const VIEW_MODE_FIELD_CLASS =
  "!bg-[#ffffff] disabled:!bg-[#ffffff] disabled:!opacity-100 text-foreground"

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

function formatCurrencyAmount(amount: number) {
  return currencyFormatter.format(Number.isFinite(amount) ? amount : 0)
}

function calcRowTotal(row: CursoDespesaRow) {
  const quantidade = Number(row.quantidadeItens)
  const unitario = parseCurrencyInput(row.valorUnitario) ?? 0
  if (!Number.isFinite(quantidade) || quantidade <= 0) return 0
  return quantidade * unitario
}

export type DetalhamentoGastosCursoProps = {
  despesas: CursoDespesaRow[]
  onChange: (despesas: CursoDespesaRow[]) => void
  disabled?: boolean
  isViewMode?: boolean
}

export function DetalhamentoGastosCurso({
  despesas,
  onChange,
  disabled = false,
  isViewMode = false,
}: DetalhamentoGastosCursoProps) {
  function updateRow(rowId: string, patch: Partial<CursoDespesaRow>) {
    onChange(
      despesas.map((row) => (row.id === rowId ? { ...row, ...patch } : row)),
    )
  }

  function handleTipoChange(rowId: string, tipoItemDespesa: string) {
    updateRow(rowId, {
      tipoItemDespesa,
      itemDespesa: "",
      codigoElementoDespesa: "",
      unidade: "",
    })
  }

  function handleItemChange(rowId: string, tipoItemDespesa: string, itemDespesa: string) {
    const item = findItemCurso(tipoItemDespesa, itemDespesa)
    updateRow(rowId, {
      itemDespesa,
      codigoElementoDespesa: item?.codigo ?? "",
      unidade: item?.unidades[0] ?? "",
    })
  }

  function handleAdd() {
    onChange([...despesas, createEmptyDespesa()])
  }

  function handleRemove(rowId: string) {
    onChange(despesas.filter((row) => row.id !== rowId))
  }

  if (despesas.length === 0) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.toolbar}>
          <h4 className={styles.title}>2.2 — Detalhamento de gastos do curso</h4>
          {!disabled && (
            <Button type="button" variant="outline" size="sm" onClick={handleAdd}>
              <PlusIcon />
              Adicionar despesa
            </Button>
          )}
        </div>
        <div className={styles.emptyState}>
          Nenhuma despesa adicionada a este curso.
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <h4 className={styles.title}>2.2 — Detalhamento de gastos do curso</h4>
        {!disabled && (
          <Button type="button" variant="outline" size="sm" onClick={handleAdd}>
            <PlusIcon />
            Adicionar despesa
          </Button>
        )}
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Tipo do item *</th>
              <th>Item *</th>
              <th>Elemento *</th>
              <th>Unidade *</th>
              <th>Qtd. *</th>
              <th>Valor unitário *</th>
              <th>Valor total</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {despesas.map((row) => {
              const tipo = findTipoItemCurso(row.tipoItemDespesa)
              const item = findItemCurso(row.tipoItemDespesa, row.itemDespesa)
              const itens = tipo?.itens ?? []
              const unidades = item?.unidades ?? []
              const valorTotal = calcRowTotal(row)

              return (
                <tr key={row.id}>
                  <td>
                    <select
                      className={cn(
                        FORM_SELECT_CLASS,
                        styles.control,
                        isViewMode && VIEW_MODE_FIELD_CLASS,
                      )}
                      value={row.tipoItemDespesa}
                      disabled={disabled}
                      onChange={(event) =>
                        handleTipoChange(row.id, event.target.value)
                      }
                    >
                      <option value="">Selecione</option>
                      {TIPOS_ITEM_CURSO.map((entry) => (
                        <option key={entry.id} value={entry.id}>
                          {entry.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      className={cn(
                        FORM_SELECT_CLASS,
                        styles.control,
                        isViewMode && VIEW_MODE_FIELD_CLASS,
                      )}
                      value={row.itemDespesa}
                      disabled={disabled || !tipo}
                      onChange={(event) =>
                        handleItemChange(
                          row.id,
                          row.tipoItemDespesa,
                          event.target.value,
                        )
                      }
                    >
                      <option value="">
                        {tipo ? "Selecione" : "Selecione o tipo primeiro"}
                      </option>
                      {itens.map((entry) => (
                        <option key={entry.id} value={entry.id}>
                          {entry.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      className={cn(
                        FORM_SELECT_CLASS,
                        styles.control,
                        isViewMode && VIEW_MODE_FIELD_CLASS,
                      )}
                      value={row.codigoElementoDespesa}
                      disabled={disabled || !item}
                      onChange={(event) =>
                        updateRow(row.id, {
                          codigoElementoDespesa: event.target.value,
                        })
                      }
                    >
                      <option value="">
                        {item ? "Selecione" : "Selecione o item primeiro"}
                      </option>
                      {item ? (
                        <option value={item.codigo}>{item.codigo}</option>
                      ) : null}
                    </select>
                  </td>
                  <td>
                    <select
                      className={cn(
                        FORM_SELECT_CLASS,
                        styles.control,
                        isViewMode && VIEW_MODE_FIELD_CLASS,
                      )}
                      value={row.unidade}
                      disabled={disabled || !item}
                      onChange={(event) =>
                        updateRow(row.id, { unidade: event.target.value })
                      }
                    >
                      <option value="">
                        {item ? "Selecione" : "Selecione o item primeiro"}
                      </option>
                      {unidades.map((unidade) => (
                        <option key={unidade} value={unidade}>
                          {unidade}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min={1}
                      step={1}
                      inputMode="numeric"
                      value={row.quantidadeItens}
                      disabled={disabled}
                      className={cn(
                        FORM_INPUT_CLASS,
                        styles.control,
                        isViewMode && VIEW_MODE_FIELD_CLASS,
                      )}
                      onChange={(event) =>
                        updateRow(row.id, {
                          quantidadeItens: event.target.value.replace(/\D/g, ""),
                        })
                      }
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      placeholder="R$ 0,00"
                      value={row.valorUnitario}
                      disabled={disabled}
                      className={cn(
                        FORM_INPUT_CLASS,
                        styles.control,
                        isViewMode && VIEW_MODE_FIELD_CLASS,
                      )}
                      onChange={(event) =>
                        updateRow(row.id, {
                          valorUnitario: formatCurrencyInput(event.target.value),
                        })
                      }
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      readOnly
                      tabIndex={-1}
                      value={formatCurrencyAmount(valorTotal)}
                      className={cn(
                        FORM_INPUT_CLASS,
                        styles.control,
                        VIEW_MODE_FIELD_CLASS,
                      )}
                      disabled
                    />
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-sm"
                      className={styles.removeButton}
                      disabled={disabled}
                      aria-label="Remover despesa"
                      onClick={() => handleRemove(row.id)}
                    >
                      <Trash2Icon />
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function summarizeCursoDespesas(
  despesas: CursoDespesaRow[],
  quantidadeParticipantes: number,
) {
  const totalItens = despesas.length
  const valorTotal = despesas.reduce((sum, row) => sum + calcRowTotal(row), 0)

  const totalsByType = despesas.reduce<Record<string, number>>((acc, row) => {
    if (!row.tipoItemDespesa) return acc
    acc[row.tipoItemDespesa] =
      (acc[row.tipoItemDespesa] ?? 0) + calcRowTotal(row)
    return acc
  }, {})

  const perStudent = (tipoId: string) =>
    quantidadeParticipantes > 0
      ? (totalsByType[tipoId] ?? 0) / quantidadeParticipantes
      : 0

  return {
    totalItens,
    valorTotal,
    valorTotalFormatado: formatCurrencyAmount(valorTotal),
    kitParticipantePorAluno: formatCurrencyAmount(perStudent("kit_participante")),
    epiPorAluno: formatCurrencyAmount(perStudent("epi")),
    insumosPorAluno: formatCurrencyAmount(perStudent("insumos_gerais")),
    kitTrabalhoPorAluno: formatCurrencyAmount(perStudent("kit_trabalho")),
    temEpi: Boolean(totalsByType.epi),
    temInsumos: Boolean(totalsByType.insumos_gerais),
    temKitTrabalho: Boolean(totalsByType.kit_trabalho),
  }
}
