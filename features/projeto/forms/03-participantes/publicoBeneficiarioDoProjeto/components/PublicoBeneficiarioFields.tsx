"use client"

import { Input } from "@/components/ui/input"
import {
  PUBLICO_BENEFICIARIO_DO_PROJETO_FOOTNOTE,
  PUBLICO_BENEFICIARIO_DO_PROJETO_TABLE,
  PUBLICO_BENEFICIARIO_DO_PROJETO_TITLE,
} from "@/features/projeto/constants/publico-beneficiario-do-projeto"

import type {
  DadosPublicoBeneficiario,
  ValoresPublicoBeneficiario,
} from "../types/publico-beneficiario-form"
import { formatQuantidade } from "../utils/formatters"
import styles from "../publico-beneficiario-do-projeto.module.css"

type PublicoBeneficiarioFieldsProps = {
  dados: DadosPublicoBeneficiario
  valores: ValoresPublicoBeneficiario
  isLocked: boolean
  onHomensChange: (value: string) => void
  onMulheresChange: (value: string) => void
}

/**
 * Tabela e notas da seção Público beneficiário.
 */
export function PublicoBeneficiarioFields({
  dados,
  valores,
  isLocked,
  onHomensChange,
  onMulheresChange,
}: PublicoBeneficiarioFieldsProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        {PUBLICO_BENEFICIARIO_DO_PROJETO_TITLE.TITLE}
      </h2>

      <p className={styles.hint}>
        {PUBLICO_BENEFICIARIO_DO_PROJETO_TABLE.HINT_TEXTO}
      </p>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{PUBLICO_BENEFICIARIO_DO_PROJETO_TABLE.COL_BENEFICIARIOS}</th>
              <th>{PUBLICO_BENEFICIARIO_DO_PROJETO_TABLE.COL_DIRETOS}</th>
              <th>{PUBLICO_BENEFICIARIO_DO_PROJETO_TABLE.COL_INDIRETOS}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{PUBLICO_BENEFICIARIO_DO_PROJETO_TABLE.ROW_HOMENS}</td>
              <td>
                <Input
                  type="text"
                  inputMode="numeric"
                  value={dados.homensDiretos}
                  onChange={(e) => onHomensChange(e.target.value)}
                  className={styles.input}
                  aria-label="Homens diretos"
                  disabled={isLocked}
                />
              </td>
              <td>{formatQuantidade(valores.homensIndiretos) || "—"}</td>
            </tr>
            <tr>
              <td>{PUBLICO_BENEFICIARIO_DO_PROJETO_TABLE.ROW_MULHERES}</td>
              <td>
                <Input
                  type="text"
                  inputMode="numeric"
                  value={dados.mulheresDiretos}
                  onChange={(e) => onMulheresChange(e.target.value)}
                  className={styles.input}
                  aria-label="Mulheres diretos"
                  disabled={isLocked}
                />
              </td>
              <td>{formatQuantidade(valores.mulheresIndiretos) || "—"}</td>
            </tr>
            <tr className={styles.totalRow}>
              <td>{PUBLICO_BENEFICIARIO_DO_PROJETO_TABLE.ROW_TOTAL}</td>
              <td>{formatQuantidade(valores.totalDiretos) || "—"}</td>
              <td>{formatQuantidade(valores.totalIndiretos) || "—"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className={styles.footnote}>
        {PUBLICO_BENEFICIARIO_DO_PROJETO_FOOTNOTE.TEXTO_ANTES}
        <a
          href={PUBLICO_BENEFICIARIO_DO_PROJETO_FOOTNOTE.LINK_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footnoteLink}
        >
          {PUBLICO_BENEFICIARIO_DO_PROJETO_FOOTNOTE.LINK_LABEL}
        </a>
      </p>
    </section>
  )
}
