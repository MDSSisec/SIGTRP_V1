"use client"

import { Fragment, type Dispatch, type SetStateAction } from "react"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CampoReviewLabel } from "@/features/projeto/components/formShared/secao-review-actions"
import {
  ETAPAS_CRONOGRAMA_TABLE,
  ETAPAS_CRONOGRAMA_TEXT,
  ETAPAS_CRONOGRAMA_TITLE,
  ETAPAS_CRONOGRAMA_TITLE_SUBTITLE,
} from "@/features/projeto/constants/etapas-cronograma"
import type { Etapa } from "@/features/projeto/contexts/cronograma/types"
import { cn } from "@/lib/utils"

import {
  etapaCampoKey,
  metaInicioCampoKey,
  metaTerminoCampoKey,
} from "../constants/form"
import styles from "../descricao-das-etapas-e-cronograma.module.css"
import {
  totalMeta,
  type DadosEtapasCronograma,
} from "../types/etapas-cronograma-form"
import {
  formatTotalBr,
  formatValorBr,
  maskDataBr,
  parseValorBr,
} from "../utils/formatters"

type EditingValor = {
  metaIndex: number
  etapaIndex: number
  value: string
} | null

type EtapasCronogramaFieldsProps = {
  dados: DadosEtapasCronograma
  totalGeral: number
  isLocked: boolean
  canManageList: boolean
  showActionsColumn: boolean
  editingValor: EditingValor
  fieldClass: (campoKey: string, baseClass?: string, extra?: string) => string
  setEditingValor: Dispatch<SetStateAction<EditingValor>>
  onAddLinha: (metaIndex: number) => void
  onUpdateEtapa: (
    metaIndex: number,
    etapaIndex: number,
    field: keyof Etapa,
    value: string | number,
  ) => void
  onRemoveEtapa: (metaIndex: number, etapaIndex: number) => void
  onUpdateMetaData: (
    metaIndex: number,
    field: "inicio" | "termino",
    value: string,
  ) => void
  onAdicionarMeta: () => void
}

/**
 * Tabela de etapas e cronograma por meta.
 */
export function EtapasCronogramaFields({
  dados,
  totalGeral,
  isLocked,
  canManageList,
  showActionsColumn,
  editingValor,
  fieldClass,
  setEditingValor,
  onAddLinha,
  onUpdateEtapa,
  onRemoveEtapa,
  onUpdateMetaData,
  onAdicionarMeta,
}: EtapasCronogramaFieldsProps) {
  return (
    <section className={styles.section}>
      <div className={styles.headerText}>
        <h2 className={styles.title}>{ETAPAS_CRONOGRAMA_TITLE.TITLE}</h2>
        <h3 className={styles.subtitle}>
          {ETAPAS_CRONOGRAMA_TITLE_SUBTITLE.TITLE_SUBTITLE}
        </h3>
      </div>

      {dados.metas.length === 0 ? (
        <p className={styles.emptyText}>{ETAPAS_CRONOGRAMA_TEXT.EMPTY}</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <colgroup>
              <col className="w-0" />
              <col className="min-w-[200px]" />
              <col style={{ minWidth: "10rem", width: "auto" }} />
              <col style={{ minWidth: "7.5rem", width: "auto" }} />
              <col style={{ minWidth: "7.5rem", width: "auto" }} />
              {showActionsColumn ? <col className="w-[52px]" /> : null}
            </colgroup>
            <thead>
              <tr>
                <th className={styles.th}>{ETAPAS_CRONOGRAMA_TABLE.META}</th>
                <th className={styles.th}>{ETAPAS_CRONOGRAMA_TABLE.ETAPA}</th>
                <th className={styles.th}>{ETAPAS_CRONOGRAMA_TABLE.VALOR}</th>
                <th className={styles.th}>{ETAPAS_CRONOGRAMA_TABLE.INICIO}</th>
                <th className={styles.th}>{ETAPAS_CRONOGRAMA_TABLE.TERMINO}</th>
                {showActionsColumn ? (
                  <th className={styles.th}>{ETAPAS_CRONOGRAMA_TABLE.ACOES}</th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {dados.metas.map((meta, metaIndex) => {
                const metaTotal = totalMeta(meta)
                const rowSpan = meta.etapas.length + 1

                if (meta.etapas.length === 0) {
                  return (
                    <Fragment key={`meta-${metaIndex}`}>
                      <tr>
                        <td className={styles.tdMeta} rowSpan={2}>
                          Meta {metaIndex + 1}
                        </td>
                        <td className={styles.tdMuted}>
                          {ETAPAS_CRONOGRAMA_TEXT.NENHUMA_ETAPA}
                        </td>
                        <td colSpan={3} className={styles.td} />
                        {showActionsColumn ? (
                          <td className={styles.tdActions}>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onAddLinha(metaIndex)}
                            >
                              {ETAPAS_CRONOGRAMA_TEXT.ADICIONAR_LINHA}
                            </Button>
                          </td>
                        ) : null}
                      </tr>
                      <tr className={styles.rowTotal}>
                        <td className={styles.td}>
                          {ETAPAS_CRONOGRAMA_TEXT.TOTAL_META(metaIndex + 1)}
                        </td>
                        <td className={styles.td}>R$ 0,00</td>
                        <td className={styles.td}>
                          <Input
                            type="text"
                            inputMode="numeric"
                            maxLength={10}
                            placeholder={ETAPAS_CRONOGRAMA_TEXT.PLACEHOLDER_DATA}
                            value={meta.inicio ?? ""}
                            onChange={(e) =>
                              onUpdateMetaData(
                                metaIndex,
                                "inicio",
                                e.target.value,
                              )
                            }
                            className={fieldClass(
                              metaInicioCampoKey(metaIndex),
                            )}
                            disabled={isLocked}
                          />
                        </td>
                        <td className={styles.td}>
                          <Input
                            type="text"
                            inputMode="numeric"
                            maxLength={10}
                            placeholder={ETAPAS_CRONOGRAMA_TEXT.PLACEHOLDER_DATA}
                            value={meta.termino ?? ""}
                            onChange={(e) =>
                              onUpdateMetaData(
                                metaIndex,
                                "termino",
                                e.target.value,
                              )
                            }
                            className={fieldClass(
                              metaTerminoCampoKey(metaIndex),
                            )}
                            disabled={isLocked}
                          />
                        </td>
                        {showActionsColumn ? (
                          <td className={styles.td} />
                        ) : null}
                      </tr>
                    </Fragment>
                  )
                }

                return (
                  <Fragment key={`meta-${metaIndex}`}>
                    {meta.etapas.map((etapa, etapaIndex) => {
                      const campoKey = etapaCampoKey(metaIndex, etapaIndex)
                      const isEditingValor =
                        editingValor?.metaIndex === metaIndex &&
                        editingValor?.etapaIndex === etapaIndex

                      return (
                        <tr key={campoKey}>
                          {etapaIndex === 0 ? (
                            <td className={styles.tdMeta} rowSpan={rowSpan}>
                              Meta {metaIndex + 1}
                            </td>
                          ) : null}
                          <td className={styles.etapaCell}>
                            <div className={styles.etapaField}>
                              <CampoReviewLabel
                                htmlFor={campoKey}
                                campoKey={campoKey}
                                className={styles.etapaLabel}
                              >
                                Etapa:
                              </CampoReviewLabel>
                              <textarea
                                id={campoKey}
                                value={etapa.descricao}
                                onChange={(e) =>
                                  onUpdateEtapa(
                                    metaIndex,
                                    etapaIndex,
                                    "descricao",
                                    e.target.value,
                                  )
                                }
                                placeholder={
                                  ETAPAS_CRONOGRAMA_TEXT.PLACEHOLDER_ETAPA
                                }
                                rows={2}
                                className={fieldClass(
                                  campoKey,
                                  styles.textarea,
                                )}
                                disabled={isLocked}
                              />
                            </div>
                          </td>
                          <td className={styles.td}>
                            <Input
                              type="text"
                              inputMode="decimal"
                              placeholder={
                                ETAPAS_CRONOGRAMA_TEXT.PLACEHOLDER_VALOR
                              }
                              value={
                                isEditingValor
                                  ? editingValor.value
                                  : etapa.valor === 0
                                    ? ""
                                    : formatValorBr(etapa.valor)
                              }
                              onFocus={() =>
                                setEditingValor({
                                  metaIndex,
                                  etapaIndex,
                                  value:
                                    etapa.valor === 0
                                      ? ""
                                      : formatValorBr(etapa.valor),
                                })
                              }
                              onChange={(e) =>
                                setEditingValor((prev) =>
                                  prev &&
                                  prev.metaIndex === metaIndex &&
                                  prev.etapaIndex === etapaIndex
                                    ? { ...prev, value: e.target.value }
                                    : {
                                        metaIndex,
                                        etapaIndex,
                                        value: e.target.value,
                                      },
                                )
                              }
                              onBlur={() => {
                                setEditingValor((prev) => {
                                  if (
                                    prev &&
                                    prev.metaIndex === metaIndex &&
                                    prev.etapaIndex === etapaIndex
                                  ) {
                                    onUpdateEtapa(
                                      metaIndex,
                                      etapaIndex,
                                      "valor",
                                      parseValorBr(prev.value),
                                    )
                                    return null
                                  }
                                  return prev
                                })
                              }}
                              className={fieldClass(`${campoKey}-valor`)}
                              disabled={isLocked}
                            />
                          </td>
                          <td className={styles.td}>
                            <Input
                              type="text"
                              inputMode="numeric"
                              maxLength={10}
                              placeholder={
                                ETAPAS_CRONOGRAMA_TEXT.PLACEHOLDER_DATA
                              }
                              value={etapa.inicio}
                              onChange={(e) =>
                                onUpdateEtapa(
                                  metaIndex,
                                  etapaIndex,
                                  "inicio",
                                  maskDataBr(e.target.value),
                                )
                              }
                              className={fieldClass(`${campoKey}-inicio`)}
                              disabled={isLocked}
                            />
                          </td>
                          <td className={styles.td}>
                            <Input
                              type="text"
                              inputMode="numeric"
                              maxLength={10}
                              placeholder={
                                ETAPAS_CRONOGRAMA_TEXT.PLACEHOLDER_DATA
                              }
                              value={etapa.termino}
                              onChange={(e) =>
                                onUpdateEtapa(
                                  metaIndex,
                                  etapaIndex,
                                  "termino",
                                  maskDataBr(e.target.value),
                                )
                              }
                              className={fieldClass(`${campoKey}-termino`)}
                              disabled={isLocked}
                            />
                          </td>
                          {showActionsColumn ? (
                            <td className={styles.tdActions}>
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                title={ETAPAS_CRONOGRAMA_TEXT.EXCLUIR_ETAPA}
                                className="rounded-md bg-black text-white transition-colors hover:bg-black/90 hover:text-white"
                                onClick={() =>
                                  onRemoveEtapa(metaIndex, etapaIndex)
                                }
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </td>
                          ) : null}
                        </tr>
                      )
                    })}
                    <tr className={styles.rowTotal}>
                      <td className={styles.td}>
                        {ETAPAS_CRONOGRAMA_TEXT.TOTAL_META(metaIndex + 1)}
                      </td>
                      <td className={styles.td}>
                        R$ {formatTotalBr(metaTotal)}
                      </td>
                      <td className={styles.td}>
                        <Input
                          type="text"
                          inputMode="numeric"
                          maxLength={10}
                          placeholder={ETAPAS_CRONOGRAMA_TEXT.PLACEHOLDER_DATA}
                          value={meta.inicio ?? ""}
                          onChange={(e) =>
                            onUpdateMetaData(
                              metaIndex,
                              "inicio",
                              e.target.value,
                            )
                          }
                          className={fieldClass(metaInicioCampoKey(metaIndex))}
                          disabled={isLocked}
                        />
                      </td>
                      <td className={styles.td}>
                        <Input
                          type="text"
                          inputMode="numeric"
                          maxLength={10}
                          placeholder={ETAPAS_CRONOGRAMA_TEXT.PLACEHOLDER_DATA}
                          value={meta.termino ?? ""}
                          onChange={(e) =>
                            onUpdateMetaData(
                              metaIndex,
                              "termino",
                              e.target.value,
                            )
                          }
                          className={fieldClass(
                            metaTerminoCampoKey(metaIndex),
                          )}
                          disabled={isLocked}
                        />
                      </td>
                      {showActionsColumn ? (
                        <td className={styles.tdActions}>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onAddLinha(metaIndex)}
                          >
                            {ETAPAS_CRONOGRAMA_TEXT.ADICIONAR_LINHA}
                          </Button>
                        </td>
                      ) : null}
                    </tr>
                  </Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className={styles.toolbar}>
        {canManageList ? (
          <Button variant="outline" size="sm" onClick={onAdicionarMeta}>
            <Plus className="size-4" />
            {ETAPAS_CRONOGRAMA_TEXT.ADICIONAR_META}
          </Button>
        ) : (
          <span />
        )}
        <div className={cn(styles.total)}>
          {ETAPAS_CRONOGRAMA_TEXT.TOTAL_GERAL}: R$ {formatTotalBr(totalGeral)}
        </div>
      </div>
    </section>
  )
}
