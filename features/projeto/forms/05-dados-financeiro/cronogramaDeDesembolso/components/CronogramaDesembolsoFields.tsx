"use client"

import { Input } from "@/components/ui/input"
import { PROJETO_SECOES } from "@/features/projeto/constants/secoes-projeto"

import {
  CRONOGRAMA_DESEMBOLSO_PARCELAS,
  CRONOGRAMA_DESEMBOLSO_TABLE,
} from "../constants"
import type {
  CampoParcela,
  DadosCronogramaDesembolso,
  ValoresCronogramaDesembolso,
} from "../types"
import { formatMoeda } from "../utils"
import styles from "../cronograma-de-desembolso.module.css"

type CronogramaDesembolsoFieldsProps = {
  dados: DadosCronogramaDesembolso
  valores: ValoresCronogramaDesembolso
  isLocked: boolean
  onParcelaChange: (
    index: number,
    campo: CampoParcela,
    value: string,
  ) => void
}

/**
 * Tabela Parcela | Mês/Ano | MDS | Contrapartida | Total.
 */
export function CronogramaDesembolsoFields({
  dados,
  valores,
  isLocked,
  onParcelaChange,
}: CronogramaDesembolsoFieldsProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        {PROJETO_SECOES.cronogramaDesembolso.title}
      </h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{CRONOGRAMA_DESEMBOLSO_TABLE.COL_PARCELA}</th>
              <th>{CRONOGRAMA_DESEMBOLSO_TABLE.COL_MES_ANO}</th>
              <th>{CRONOGRAMA_DESEMBOLSO_TABLE.COL_MDS}</th>
              <th>{CRONOGRAMA_DESEMBOLSO_TABLE.COL_CONTRAPARTIDA}</th>
              <th>{CRONOGRAMA_DESEMBOLSO_TABLE.COL_TOTAL}</th>
            </tr>
          </thead>
          <tbody>
            {CRONOGRAMA_DESEMBOLSO_PARCELAS.map((parcelaMeta, index) => {
              const parcela = dados.parcelas[index]

              return (
                <tr key={parcelaMeta.id}>
                  <td className={styles.parcelaLabel}>{parcelaMeta.label}</td>
                  <td>
                    <Input
                      type="text"
                      inputMode="numeric"
                      value={parcela.mesAno}
                      onChange={(e) =>
                        onParcelaChange(index, "mesAno", e.target.value)
                      }
                      className={styles.input}
                      aria-label={`${parcelaMeta.label} parcela — Mês/Ano`}
                      disabled={isLocked}
                      placeholder={
                        CRONOGRAMA_DESEMBOLSO_TABLE.PLACEHOLDER_MES_ANO
                      }
                      maxLength={7}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      inputMode="numeric"
                      value={parcela.mds}
                      onChange={(e) =>
                        onParcelaChange(index, "mds", e.target.value)
                      }
                      className={styles.input}
                      aria-label={`${parcelaMeta.label} parcela — MDS`}
                      disabled={isLocked}
                      placeholder="R$ 0,00"
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      inputMode="numeric"
                      value={parcela.contrapartida}
                      onChange={(e) =>
                        onParcelaChange(index, "contrapartida", e.target.value)
                      }
                      className={styles.input}
                      aria-label={`${parcelaMeta.label} parcela — Contrapartida`}
                      disabled={isLocked}
                      placeholder="R$ 0,00"
                    />
                  </td>
                  <td className={styles.cellCenter}>
                    {formatMoeda(valores.totaisLinha[index] ?? 0)}
                  </td>
                </tr>
              )
            })}

            <tr className={styles.totalRow}>
              <td colSpan={2} className={styles.cellCenter}>
                {CRONOGRAMA_DESEMBOLSO_TABLE.ROW_TOTAL}
              </td>
              <td className={styles.cellCenter}>
                {formatMoeda(valores.totalMds)}
              </td>
              <td className={styles.cellCenter}>
                {formatMoeda(valores.totalContrapartida)}
              </td>
              <td className={styles.cellCenter}>
                {formatMoeda(valores.totalGeral)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
