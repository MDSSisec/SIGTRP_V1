"use client"

import { Plus, Trash2 } from "lucide-react"

import { Input } from "@/components/ui/input"
import { GenericButton } from "@/features/projeto/components/genericButton/generic-button"
import {
  DETALHAMENTO_DA_BASE_TABLE,
  DETALHAMENTO_DA_BASE_TITLE,
} from "@/features/projeto/constants/detalhamento-da-base"

import type { DadosDetalhamentoDaBase } from "../types"
import styles from "../detalhamento-da-base.module.css"

type DetalhamentoDaBaseFieldsProps = {
  dados: DadosDetalhamentoDaBase
  isLocked: boolean
  onUpdateLinha: (
    id: string,
    campo: "territorio" | "municipio",
    value: string,
  ) => void
  onAddLinha: () => void
  onRemoveLinha: (id: string) => void
}

/**
 * Tabela Território | Município do detalhamento da base territorial.
 */
export function DetalhamentoDaBaseFields({
  dados,
  isLocked,
  onUpdateLinha,
  onAddLinha,
  onRemoveLinha,
}: DetalhamentoDaBaseFieldsProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{DETALHAMENTO_DA_BASE_TITLE.TITLE}</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{DETALHAMENTO_DA_BASE_TABLE.COL_TERRITORIO}</th>
              <th>{DETALHAMENTO_DA_BASE_TABLE.COL_MUNICIPIO}</th>
              {!isLocked ? <th className={styles.colAcoes} /> : null}
            </tr>
          </thead>
          <tbody>
            {dados.linhas.map((linha) => (
              <tr key={linha.id}>
                <td>
                  <Input
                    type="text"
                    value={linha.territorio}
                    onChange={(e) =>
                      onUpdateLinha(linha.id, "territorio", e.target.value)
                    }
                    className={styles.input}
                    aria-label="Território"
                    disabled={isLocked}
                    placeholder="Território"
                  />
                </td>
                <td>
                  <Input
                    type="text"
                    value={linha.municipio}
                    onChange={(e) =>
                      onUpdateLinha(linha.id, "municipio", e.target.value)
                    }
                    className={styles.input}
                    aria-label="Município"
                    disabled={isLocked}
                    placeholder="Município"
                  />
                </td>
                {!isLocked ? (
                  <td className={styles.colAcoes}>
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => onRemoveLinha(linha.id)}
                      aria-label="Remover linha"
                      disabled={dados.linhas.length <= 1}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
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
    </section>
  )
}
