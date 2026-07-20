"use client"

import { Plus, Trash2 } from "lucide-react"

import { Input } from "@/components/ui/input"
import { GenericButton } from "@/features/projeto/components/genericButton/generic-button"
import { PROJETO_SECOES } from "@/features/projeto/constants/secoes-projeto"

import {
  RESUMO_PLANO_APLICACAO_FOOTNOTE,
  RESUMO_PLANO_APLICACAO_TABLE,
} from "../constants"
import type {
  CampoLinhaResumo,
  DadosResumoPlanoAplicacao,
  ValoresResumoPlanoAplicacao,
} from "../types"
import { formatMoeda } from "../utils"
import styles from "../resumo-do-plano-de-aplicacao.module.css"

type ResumoPlanoAplicacaoFieldsProps = {
  dados: DadosResumoPlanoAplicacao
  valores: ValoresResumoPlanoAplicacao
  isLocked: boolean
  onLinhaChange: (id: string, campo: CampoLinhaResumo, value: string) => void
  onAddLinha: () => void
  onRemoveLinha: (id: string) => void
}

/**
 * Tabela Elemento | Código | MDS | Contrapartida | Total.
 */
export function ResumoPlanoAplicacaoFields({
  dados,
  valores,
  isLocked,
  onLinhaChange,
  onAddLinha,
  onRemoveLinha,
}: ResumoPlanoAplicacaoFieldsProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        {PROJETO_SECOES.resumoPlanoAplicacao.title}
      </h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{RESUMO_PLANO_APLICACAO_TABLE.COL_ELEMENTO}</th>
              <th>{RESUMO_PLANO_APLICACAO_TABLE.COL_CODIGO}</th>
              <th>{RESUMO_PLANO_APLICACAO_TABLE.COL_MDS}</th>
              <th>{RESUMO_PLANO_APLICACAO_TABLE.COL_CONTRAPARTIDA}</th>
              <th>{RESUMO_PLANO_APLICACAO_TABLE.COL_TOTAL}</th>
              {!isLocked ? <th className={styles.colAcoes} /> : null}
            </tr>
          </thead>
          <tbody>
            {dados.linhas.map((linha, index) => (
              <tr key={linha.id}>
                <td>
                  <Input
                    type="text"
                    value={linha.elementoDespesa}
                    onChange={(e) =>
                      onLinhaChange(linha.id, "elementoDespesa", e.target.value)
                    }
                    className={styles.input}
                    aria-label={`Elemento de despesa — linha ${index + 1}`}
                    disabled={isLocked}
                    placeholder="Elemento de despesa"
                  />
                </td>
                <td>
                  <Input
                    type="text"
                    inputMode="numeric"
                    value={linha.codigo}
                    onChange={(e) =>
                      onLinhaChange(linha.id, "codigo", e.target.value)
                    }
                    className={styles.inputCenter}
                    aria-label={`Código — linha ${index + 1}`}
                    disabled={isLocked}
                    placeholder={
                      RESUMO_PLANO_APLICACAO_TABLE.PLACEHOLDER_CODIGO
                    }
                    maxLength={RESUMO_PLANO_APLICACAO_TABLE.CODIGO_MAX_DIGITOS}
                  />
                </td>
                <td>
                  <Input
                    type="text"
                    inputMode="numeric"
                    value={linha.mds}
                    onChange={(e) =>
                      onLinhaChange(linha.id, "mds", e.target.value)
                    }
                    className={styles.inputCenter}
                    aria-label={`MDS — linha ${index + 1}`}
                    disabled={isLocked}
                    placeholder="R$ 0,00"
                  />
                </td>
                <td>
                  <Input
                    type="text"
                    inputMode="numeric"
                    value={linha.contrapartida}
                    onChange={(e) =>
                      onLinhaChange(linha.id, "contrapartida", e.target.value)
                    }
                    className={styles.inputCenter}
                    aria-label={`Contrapartida — linha ${index + 1}`}
                    disabled={isLocked}
                    placeholder="R$ 0,00"
                  />
                </td>
                <td className={styles.cellCenter}>
                  {formatMoeda(valores.totaisLinha[index] ?? 0)}
                </td>
                {!isLocked ? (
                  <td className={styles.colAcoes}>
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => onRemoveLinha(linha.id)}
                      aria-label={`Remover linha ${index + 1}`}
                      disabled={dados.linhas.length <= 1}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}

            <tr className={styles.totalRow}>
              <td colSpan={2} className={styles.cellCenter}>
                {RESUMO_PLANO_APLICACAO_TABLE.ROW_TOTAL}
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
              {!isLocked ? <td /> : null}
            </tr>
          </tbody>
        </table>
      </div>

      {!isLocked ? (
        <div className={styles.tableActions}>
          <GenericButton variant="outline" icon={Plus} onClick={onAddLinha}>
            Adicionar linha
          </GenericButton>
        </div>
      ) : null}

      <div className={styles.footnote}>
        <p className={styles.footnoteTitle}>
          {RESUMO_PLANO_APLICACAO_FOOTNOTE.TITLE}
        </p>
        <ul className={styles.footnoteList}>
          {RESUMO_PLANO_APLICACAO_FOOTNOTE.ITENS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
