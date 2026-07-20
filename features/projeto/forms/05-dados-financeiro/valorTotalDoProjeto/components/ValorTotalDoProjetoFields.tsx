"use client"

import { Input } from "@/components/ui/input"
import { PROJETO_SECOES } from "@/features/projeto/constants/secoes-projeto"

import { VALOR_TOTAL_DO_PROJETO_TABLE } from "../constants"
import type {
  DadosValorTotalDoProjeto,
  ValoresValorTotalDoProjeto,
} from "../types"
import { formatMoeda } from "../utils"
import styles from "../valor-total-do-projeto.module.css"

type ValorTotalDoProjetoFieldsProps = {
  dados: DadosValorTotalDoProjeto
  valores: ValoresValorTotalDoProjeto
  isLocked: boolean
  onCampoChange: (campo: keyof DadosValorTotalDoProjeto, value: string) => void
}

/**
 * Tabela Fonte de Recurso | Custeio | Investimento | Total.
 */
export function ValorTotalDoProjetoFields({
  dados,
  valores,
  isLocked,
  onCampoChange,
}: ValorTotalDoProjetoFieldsProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{PROJETO_SECOES.valorTotal.title}</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{VALOR_TOTAL_DO_PROJETO_TABLE.COL_FONTE}</th>
              <th>{VALOR_TOTAL_DO_PROJETO_TABLE.COL_CUSTEIO}</th>
              <th>{VALOR_TOTAL_DO_PROJETO_TABLE.COL_INVESTIMENTO}</th>
              <th>{VALOR_TOTAL_DO_PROJETO_TABLE.COL_TOTAL}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{VALOR_TOTAL_DO_PROJETO_TABLE.ROW_REPASSE_MDS}</td>
              <td>
                <Input
                  type="text"
                  inputMode="numeric"
                  value={dados.repasseMdsCusteio}
                  onChange={(e) =>
                    onCampoChange("repasseMdsCusteio", e.target.value)
                  }
                  className={styles.input}
                  aria-label="Repasse do MDS — Custeio"
                  disabled={isLocked}
                  placeholder="R$ 0,00"
                />
              </td>
              <td>
                <Input
                  type="text"
                  inputMode="numeric"
                  value={dados.repasseMdsInvestimento}
                  onChange={(e) =>
                    onCampoChange("repasseMdsInvestimento", e.target.value)
                  }
                  className={styles.input}
                  aria-label="Repasse do MDS — Investimento"
                  disabled={isLocked}
                  placeholder="R$ 0,00"
                />
              </td>
              <td>{formatMoeda(valores.repasseMdsTotal)}</td>
            </tr>

            <tr>
              <td>{VALOR_TOTAL_DO_PROJETO_TABLE.ROW_CONTRAPARTIDA}</td>
              <td>
                <Input
                  type="text"
                  inputMode="numeric"
                  value={dados.contrapartidaCusteio}
                  onChange={(e) =>
                    onCampoChange("contrapartidaCusteio", e.target.value)
                  }
                  className={styles.input}
                  aria-label="Contrapartida — Custeio"
                  disabled={isLocked}
                  placeholder="R$ 0,00"
                />
              </td>
              <td>
                <Input
                  type="text"
                  inputMode="numeric"
                  value={dados.contrapartidaInvestimento}
                  onChange={(e) =>
                    onCampoChange("contrapartidaInvestimento", e.target.value)
                  }
                  className={styles.input}
                  aria-label="Contrapartida — Investimento"
                  disabled={isLocked}
                  placeholder="R$ 0,00"
                />
              </td>
              <td>{formatMoeda(valores.contrapartidaTotal)}</td>
            </tr>

            <tr className={styles.totalRow}>
              <td>{VALOR_TOTAL_DO_PROJETO_TABLE.ROW_TOTAL}</td>
              <td>{formatMoeda(valores.totalCusteio)}</td>
              <td>{formatMoeda(valores.totalInvestimento)}</td>
              <td>{formatMoeda(valores.totalGeral)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
