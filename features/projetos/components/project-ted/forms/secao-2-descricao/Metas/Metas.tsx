"use client"

import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"
import { notifyFormSaveSuccess } from "@/features/projetos/components/project-ted/shared/form-save-toast"
import { useCronograma } from "../CronogramaContext/CronogramaContext"
import styles from "./Metas.module.css"
import { METAS_PLACEHOLDER, METAS_TITLE } from "@/features/projetos/constants/ted/metas"

interface PropsFormularioMetas {
  onChange?: (dados: { metas: string[] }) => void
  projectId?: string
}

function FormularioMetas({ onChange }: PropsFormularioMetas) {
  const { data, addMeta, updateMeta, removeMeta } = useCronograma()
  const metas = data.metas

  const aoAlterarTitulo = (indice: number, valor: string) => {
    updateMeta(indice, { ...metas[indice], titulo: valor })
    onChange?.({ metas: metas.map((m) => m.titulo) })
  }

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div className={styles.header}>
          <h2 className={styles.title}>{METAS_TITLE.TITLE_METAS}</h2>
          <GenericButton variant="outline" size="sm" onClick={() => addMeta()}>
            Adicionar meta
          </GenericButton>
        </div>

        {metas.length === 0 ? (
          <p className={styles.emptyText}>
            Nenhuma meta cadastrada. Clique em &quot;Adicionar meta&quot; para começar.
          </p>
        ) : (
          <div className={styles.list}>
            {metas.map((meta, indice) => (
              <div key={indice} className={styles.itemCard}>
                <Label htmlFor={`meta-${indice}`} className={styles.label}>
                  {METAS_PLACEHOLDER.PLACE_HOLDER_META} {indice + 1}
                </Label>
                <Input
                  id={`meta-${indice}`}
                  value={meta.titulo}
                  onChange={(e) => aoAlterarTitulo(indice, e.target.value)}
                  placeholder={METAS_PLACEHOLDER.PLACE_HOLDER_META}
                  className={styles.input}
                />
                <div className={styles.cardActions}>
                  {metas.length > 1 && (
                    <GenericButton
                      variant="destructive"
                      size="sm"
                      onClick={() => removeMeta(indice)}
                    >
                      Excluir
                    </GenericButton>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className={styles.actions}>
        <GenericButton variant="editar" onClick={() => {}} />
        <GenericButton
          variant="salvar"
          onClick={() => notifyFormSaveSuccess("Metas salvas com sucesso!")}
        />
      </div>
    </div>
  )
}

export default FormularioMetas
