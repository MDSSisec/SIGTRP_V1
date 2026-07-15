"use client"

import { FormSectionCard } from "@/features/projeto/components/formShared/form-section"

import styles from "../detalhamentoDosCursos.module.css"

/** Estado vazio quando a quantidade de cursos ainda não foi definida. */
export function DetalhamentoCursosEmpty() {
  return (
    <FormSectionCard>
      <p className={styles.emptyMessage}>
        Informe e salve a quantidade de cursos em{" "}
        <strong>Dados gerais do projeto</strong> para liberar os formulários.
      </p>
    </FormSectionCard>
  )
}
