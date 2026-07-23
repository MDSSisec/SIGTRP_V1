"use client"

import { PlusIcon, Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  CATALOGO_DESPESAS_ETAPA_11,
  FONTES_RECURSO_ETAPA,
  type CatalogoItemEtapa,
} from "@/features/projeto/constants/catalogo-despesas-etapa-11"
import {
  findItemCurso,
  findTipoItemCurso,
  TIPOS_ITEM_CURSO,
} from "@/features/projeto/constants/catalogo-despesas-curso"
import type { CursoDespesaRow } from "@/features/projeto/types/general-project-data"
import {
  createEmptyDespesa,
  createEmptyDespesaEtapa,
} from "@/features/projeto/types/general-project-data"
import {
  formatCurrencyInput,
  parseCurrencyInput,
} from "@/features/projeto/utils/currency"
import { cn } from "@/lib/utils"

import styles from "./DetalhamentoGastosCurso.module.css"

const VIEW_MODE_FIELD_CLASS =
  "!bg-[var(--field)] disabled:!bg-[var(--field)] disabled:!opacity-100 text-foreground"

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

function formatMonthYearInput(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 6)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

export type DetalhamentoGastosCursoProps = {
  despesas: CursoDespesaRow[]
  onChange: (despesas: CursoDespesaRow[]) => void
  disabled?: boolean
  isViewMode?: boolean
  /** `curso` (padrão) ou `etapa` (colunas da POC etapa 1.1/1.2/evento). */
  variant?: "curso" | "etapa"
  title?: string
  emptyMessage?: string
  /** Catálogo de itens quando `variant="etapa"` (padrão: Etapa 1.1). */
  catalogoEtapa?: CatalogoItemEtapa[]
}

export function DetalhamentoGastosCurso({
  despesas,
  onChange,
  disabled = false,
  isViewMode = false,
  variant = "curso",
  title =
    variant === "etapa"
      ? "Despesas da etapa"
      : "2.2 — Detalhamento de gastos do curso",
  emptyMessage =
    variant === "etapa"
      ? "Nenhuma despesa adicionada nesta etapa."
      : "Nenhuma despesa adicionada a este curso.",
  catalogoEtapa = CATALOGO_DESPESAS_ETAPA_11,
}: DetalhamentoGastosCursoProps) {
  const isEtapa = variant === "etapa"

  function findItemEtapa(itemId: string) {
    return catalogoEtapa.find((item) => item.id === itemId)
  }

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

  function handleItemChangeCurso(
    rowId: string,
    tipoItemDespesa: string,
    itemDespesa: string,
  ) {
    const item = findItemCurso(tipoItemDespesa, itemDespesa)
    updateRow(rowId, {
      itemDespesa,
      codigoElementoDespesa: item?.codigo ?? "",
      unidade: item?.unidades[0] ?? "",
    })
  }

  function handleItemChangeEtapa(rowId: string, itemDespesa: string) {
    const item = findItemEtapa(itemDespesa)
    updateRow(rowId, {
      itemDespesa,
      codigoElementoDespesa: item?.codigo ?? "",
      unidade: item?.unidades[0] ?? "",
      tipoDespesa: item?.tipo ?? "",
    })
  }

  function handleAdd() {
    onChange([
      ...despesas,
      isEtapa ? createEmptyDespesaEtapa() : createEmptyDespesa(),
    ])
  }

  function handleRemove(rowId: string) {
    onChange(despesas.filter((row) => row.id !== rowId))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <h4 className={styles.title}>{title}</h4>
        {!disabled && (
          <Button type="button" variant="outline" size="sm" onClick={handleAdd}>
            <PlusIcon />
            Adicionar despesa
          </Button>
        )}
      </div>

      {despesas.length === 0 ? (
        <div className={styles.emptyState}>{emptyMessage}</div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={cn(styles.table, isEtapa && styles.tableEtapa)}>
            <thead>
              <tr>
                {isEtapa ? null : <th>Tipo do item *</th>}
                <th>Item *</th>
                <th>Elemento *</th>
                <th>Unidade *</th>
                <th>Qtd. *</th>
                <th>Valor unitário *</th>
                <th>Valor total</th>
                {isEtapa ? (
                  <>
                    <th>Fonte *</th>
                    <th>Início da etapa *</th>
                    <th>Fim da etapa *</th>
                    <th>Tipo</th>
                  </>
                ) : null}
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {despesas.map((row) => {
                if (isEtapa) {
                  const item = findItemEtapa(row.itemDespesa)
                  const unidades = item?.unidades ?? []
                  const codigos = item?.codigos?.length
                    ? item.codigos
                    : item?.codigo
                      ? [item.codigo]
                      : []
                  const valorTotal = calcRowTotal(row)

                  return (
                    <tr key={row.id}>
                      <td>
                        <select
                          className={cn(
                            styles.control,
                            isViewMode && VIEW_MODE_FIELD_CLASS,
                          )}
                          value={row.itemDespesa}
                          disabled={disabled}
                          onChange={(event) =>
                            handleItemChangeEtapa(row.id, event.target.value)
                          }
                        >
                          <option value="">Selecione ou pesquise</option>
                          {catalogoEtapa.map((entry) => (
                            <option key={entry.id} value={entry.id}>
                              {entry.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          className={cn(
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
                          {codigos.map((codigo) => (
                            <option key={codigo} value={codigo}>
                              {codigo}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          className={cn(
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
                            styles.control,
                            isViewMode && VIEW_MODE_FIELD_CLASS,
                          )}
                          onChange={(event) =>
                            updateRow(row.id, {
                              quantidadeItens: event.target.value.replace(
                                /\D/g,
                                "",
                              ),
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
                            styles.control,
                            isViewMode && VIEW_MODE_FIELD_CLASS,
                          )}
                          onChange={(event) =>
                            updateRow(row.id, {
                              valorUnitario: formatCurrencyInput(
                                event.target.value,
                              ),
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
                          className={cn(styles.control, VIEW_MODE_FIELD_CLASS)}
                          disabled
                        />
                      </td>
                      <td>
                        <select
                          className={cn(
                            styles.control,
                            isViewMode && VIEW_MODE_FIELD_CLASS,
                          )}
                          value={row.fonteRecurso ?? ""}
                          disabled={disabled}
                          onChange={(event) =>
                            updateRow(row.id, {
                              fonteRecurso: event.target.value,
                            })
                          }
                        >
                          <option value="">Selecione</option>
                          {FONTES_RECURSO_ETAPA.map((fonte) => (
                            <option key={fonte} value={fonte}>
                              {fonte}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <Input
                          type="text"
                          inputMode="numeric"
                          maxLength={7}
                          placeholder="MM/AAAA"
                          value={row.inicioEtapa ?? ""}
                          disabled={disabled}
                          className={cn(
                            styles.control,
                            isViewMode && VIEW_MODE_FIELD_CLASS,
                          )}
                          onChange={(event) =>
                            updateRow(row.id, {
                              inicioEtapa: formatMonthYearInput(
                                event.target.value,
                              ),
                            })
                          }
                        />
                      </td>
                      <td>
                        <Input
                          type="text"
                          inputMode="numeric"
                          maxLength={7}
                          placeholder="MM/AAAA"
                          value={row.fimEtapa ?? ""}
                          disabled={disabled}
                          className={cn(
                            styles.control,
                            isViewMode && VIEW_MODE_FIELD_CLASS,
                          )}
                          onChange={(event) =>
                            updateRow(row.id, {
                              fimEtapa: formatMonthYearInput(event.target.value),
                            })
                          }
                        />
                      </td>
                      <td>
                        <Input
                          type="text"
                          readOnly
                          tabIndex={-1}
                          value={row.tipoDespesa ?? ""}
                          className={cn(styles.control, VIEW_MODE_FIELD_CLASS)}
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
                }

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
                          styles.control,
                          isViewMode && VIEW_MODE_FIELD_CLASS,
                        )}
                        value={row.itemDespesa}
                        disabled={disabled || !tipo}
                        onChange={(event) =>
                          handleItemChangeCurso(
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
                          styles.control,
                          isViewMode && VIEW_MODE_FIELD_CLASS,
                        )}
                        onChange={(event) =>
                          updateRow(row.id, {
                            quantidadeItens: event.target.value.replace(
                              /\D/g,
                              "",
                            ),
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
                          styles.control,
                          isViewMode && VIEW_MODE_FIELD_CLASS,
                        )}
                        onChange={(event) =>
                          updateRow(row.id, {
                            valorUnitario: formatCurrencyInput(
                              event.target.value,
                            ),
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
                        className={cn(styles.control, VIEW_MODE_FIELD_CLASS)}
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
      )}
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

export function summarizeEtapaDespesas(despesas: CursoDespesaRow[]) {
  const totalItens = despesas.length
  const valorTotal = despesas.reduce((sum, row) => sum + calcRowTotal(row), 0)

  return {
    totalItens,
    valorTotal,
    valorTotalFormatado: formatCurrencyAmount(valorTotal),
  }
}
