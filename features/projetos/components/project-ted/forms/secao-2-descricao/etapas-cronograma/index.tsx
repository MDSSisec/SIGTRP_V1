"use client"

import React, { useEffect, useState } from "react"
import { Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"
import { notifyFormSaveSuccess } from "@/features/projetos/components/project-ted/shared/form-save-toast"
import { useCronograma } from "../CronogramaContext/CronogramaContext"
import type { CronogramaData, Etapa } from "./types"
import styles from "./etapas-cronograma.module.css"

interface CronogramaFormProps {
  projectId?: string
  onChange?: (data: CronogramaData) => void
  /** Oculta a coluna Ações (ex.: na visão geral do projeto). */
  readOnlyView?: boolean
}

const novaEtapaVazia = (): Etapa => ({
  descricao: "",
  valor: 0,
  inicio: "",
  termino: "",
})

/** Máscara DD/MM/AAAA: só dígitos, formata com barras. */
function maskDataBr(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

/** Formata número para exibição em R$ (BR): 100906.07 → "100.906,07" */
function formatValorBr(num: number): string {
  if (num === 0 || Number.isNaN(num)) return ""
  return num.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

/** Converte string em formato BR para número: "100.906,07" → 100906.07 */
function parseValorBr(str: string): number {
  const s = str.replace(/\./g, "").replace(",", ".").trim()
  if (s === "") return 0
  const num = parseFloat(s)
  return Number.isNaN(num) ? 0 : num
}

type EditingValor = { metaIndex: number; etapaIndex: number; value: string }

const CronogramaForm: React.FC<CronogramaFormProps> = ({
  projectId: _projectId,
  onChange,
  readOnlyView = false,
}) => {
  const { data, addMeta, updateMeta, removeMeta } = useCronograma()
  const [editingValor, setEditingValor] = useState<EditingValor | null>(null)

  useEffect(() => {
    onChange?.(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- propagar apenas quando data mudar
  }, [data])

  const totalGeral = data.metas.reduce((acc, meta) => {
    const totalMeta = meta.etapas.reduce(
      (soma, etapa) => soma + (etapa.valor || 0),
      0
    )
    return acc + totalMeta
  }, 0)

  const addLinha = (metaIndex: number) => {
    const meta = data.metas[metaIndex]
    if (!meta) return
    updateMeta(metaIndex, {
      ...meta,
      etapas: [...meta.etapas, novaEtapaVazia()],
    })
  }

  const updateEtapa = (
    metaIndex: number,
    etapaIndex: number,
    field: keyof Etapa,
    value: string | number
  ) => {
    const meta = data.metas[metaIndex]
    if (!meta) return
    const etapas = [...meta.etapas]
    etapas[etapaIndex] = {
      ...etapas[etapaIndex],
      [field]: field === "valor" ? Number(value) : value,
    }
    updateMeta(metaIndex, { ...meta, etapas })
  }

  const removeEtapa = (metaIndex: number, etapaIndex: number) => {
    const meta = data.metas[metaIndex]
    if (!meta) return
    const etapas = meta.etapas.filter((_, i) => i !== etapaIndex)
    updateMeta(metaIndex, { ...meta, etapas })
  }

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.title}>8. Etapas e cronograma de execução</h2>

        <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <colgroup>
            <col className="w-0" />
            <col className="min-w-[200px]" />
            <col style={{ minWidth: "10rem", width: "auto" }} />
            <col style={{ minWidth: "7.5rem", width: "auto" }} />
            <col style={{ minWidth: "7.5rem", width: "auto" }} />
            {!readOnlyView && <col className="w-[52px]" />}
          </colgroup>
          <thead>
            <tr>
              <th className={styles.th}>Meta nº</th>
              <th className={styles.th}>Etapa</th>
              <th className={styles.th}>Valor (R$)</th>
              <th className={styles.th}>Início</th>
              <th className={styles.th}>Término</th>
              {!readOnlyView && <th className={styles.th}>Ações</th>}
            </tr>
          </thead>
          <tbody>
            {data.metas.map((meta, metaIndex) => {
              const totalMeta = meta.etapas.reduce(
                (s, e) => s + (e.valor || 0),
                0
              )
              const rowSpan = meta.etapas.length + 1 // etapas + linha total

              return (
                <React.Fragment key={metaIndex}>
                  {meta.etapas.length === 0 ? (
                    <>
                      <tr>
                        <td className={styles.tdMeta} rowSpan={2}>
                          Meta {metaIndex + 1}
                        </td>
                        <td className={styles.tdMuted}>Nenhuma etapa.</td>
                        <td colSpan={3} className={styles.td} />
                        {!readOnlyView && (
                          <td className={styles.tdActions}>
                            <GenericButton
                              variant="outline"
                              size="xs"
                              onClick={() => addLinha(metaIndex)}
                            >
                              + Linha
                            </GenericButton>
                          </td>
                        )}
                      </tr>
                      <tr className={styles.rowTotal}>
                        <td className={styles.td}>Total da Meta {metaIndex + 1}</td>
                        <td className={styles.td}>R$ 0,00</td>
                        <td className={styles.td}>
                          <Input
                            type="text"
                            inputMode="numeric"
                            maxLength={10}
                            placeholder="00/00/0000"
                            value={meta.inicio ?? ""}
                            onChange={(e) =>
                              updateMeta(metaIndex, { ...meta, inicio: maskDataBr(e.target.value) })
                            }
                            className={styles.input}
                          />
                        </td>
                        <td className={styles.td}>
                          <Input
                            type="text"
                            inputMode="numeric"
                            maxLength={10}
                            placeholder="00/00/0000"
                            value={meta.termino ?? ""}
                            onChange={(e) =>
                              updateMeta(metaIndex, { ...meta, termino: maskDataBr(e.target.value) })
                            }
                            className={styles.input}
                          />
                        </td>
                        {!readOnlyView && <td className={styles.td} />}
                      </tr>
                    </>
                  ) : (
                    meta.etapas.map((etapa, etapaIndex) => (
                      <tr key={etapaIndex}>
                        {etapaIndex === 0 && (
                          <td className={styles.tdMeta} rowSpan={rowSpan}>
                            Meta {metaIndex + 1}
                          </td>
                        )}
                        <td className={styles.etapaCell}>
                          <div className={styles.etapaField}>
                            <span className={styles.etapaLabel}>Etapa:</span>
                            <textarea
                              value={etapa.descricao}
                              onChange={(e) =>
                                updateEtapa(
                                  metaIndex,
                                  etapaIndex,
                                  "descricao",
                                  e.target.value
                                )
                              }
                              placeholder="Descrição da etapa"
                              rows={2}
                              className={styles.textarea}
                            />
                          </div>
                        </td>
                        <td className={styles.td}>
                          <Input
                            type="text"
                            inputMode="decimal"
                            placeholder="0,00"
                            value={
                              editingValor?.metaIndex === metaIndex &&
                                editingValor?.etapaIndex === etapaIndex
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
                                  }
                              )
                            }
                            onBlur={() => {
                              setEditingValor((prev) => {
                                if (
                                  prev &&
                                  prev.metaIndex === metaIndex &&
                                  prev.etapaIndex === etapaIndex
                                ) {
                                  const num = parseValorBr(prev.value)
                                  updateEtapa(metaIndex, etapaIndex, "valor", num)
                                  return null
                                }
                                return prev
                              })
                            }}
                            className={styles.input}
                          />
                        </td>
                        <td className={styles.td}>
                          <Input
                            type="text"
                            inputMode="numeric"
                            maxLength={10}
                            placeholder="00/00/0000"
                            value={etapa.inicio}
                            onChange={(e) =>
                              updateEtapa(
                                metaIndex,
                                etapaIndex,
                                "inicio",
                                maskDataBr(e.target.value)
                              )
                            }
                            className={styles.input}
                          />
                        </td>
                        <td className={styles.td}>
                          <Input
                            type="text"
                            inputMode="numeric"
                            maxLength={10}
                            placeholder="00/00/0000"
                            value={etapa.termino}
                            onChange={(e) =>
                              updateEtapa(
                                metaIndex,
                                etapaIndex,
                                "termino",
                                maskDataBr(e.target.value)
                              )
                            }
                            className={styles.input}
                          />
                        </td>
                        {!readOnlyView && (
                          <td className={styles.tdActions}>
                            <GenericButton
                              variant="ghost"
                              size="icon-sm"
                              icon={Trash2}
                              title="Excluir etapa"
                              className="bg-black text-white hover:bg-black/90 hover:text-white rounded-md transition-colors"
                              onClick={() => removeEtapa(metaIndex, etapaIndex)}
                            />
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                  {meta.etapas.length > 0 && (
                    <tr className={styles.rowTotal}>
                      <td className={styles.td}>Total da Meta {metaIndex + 1}</td>
                      <td className={styles.td}>
                        R$ {totalMeta.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className={styles.td}>
                        <Input
                          type="text"
                          inputMode="numeric"
                          maxLength={10}
                          placeholder="00/00/0000"
                          value={meta.inicio ?? ""}
                          onChange={(e) =>
                            updateMeta(metaIndex, { ...meta, inicio: maskDataBr(e.target.value) })
                          }
                          className={styles.input}
                        />
                      </td>
                      <td className={styles.td}>
                        <Input
                          type="text"
                          inputMode="numeric"
                          maxLength={10}
                          placeholder="00/00/0000"
                          value={meta.termino ?? ""}
                          onChange={(e) =>
                            updateMeta(metaIndex, { ...meta, termino: maskDataBr(e.target.value) })
                          }
                          className={styles.input}
                        />
                      </td>
                      {!readOnlyView && (
                        <td className={styles.tdActions}>
                          <GenericButton
                            variant="outline"
                            size="xs"
                            onClick={() => addLinha(metaIndex)}
                          >
                            + Linha
                          </GenericButton>
                        </td>
                      )}
                    </tr>
                  )}
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
        </div>

        <div className={styles.toolbar}>
          <GenericButton variant="outline" size="sm" onClick={() => addMeta()}>
            Adicionar meta
          </GenericButton>
          <div className={styles.total}>
            Total Geral: R$ {totalGeral.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
      </section>

      {!readOnlyView && (
        <div className={styles.actions}>
          <GenericButton variant="editar" onClick={() => {}} />
          <GenericButton
            variant="salvar"
            onClick={() => notifyFormSaveSuccess("Etapas e cronograma salvos com sucesso!")}
          />
        </div>
      )}
    </div>
  )
}

export default CronogramaForm
export { CronogramaForm as EtapasCronograma }
