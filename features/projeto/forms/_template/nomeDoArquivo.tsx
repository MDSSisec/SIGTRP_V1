"use client"

import type { ProjectFormSectionProps } from "../types"

import styles from "./nomeDoArquivo.module.css"

/**
 * Template de seção de formulário.
 *
 * 1. Copie a pasta `_template` e renomeie.
 * 2. Renomeie `nomeDoArquivo.*` e o export em `index.ts`.
 * 3. Preencha: types/, hooks/, action/, components/, constants/, utils/.
 */
export function NomeDoArquivo(_props: ProjectFormSectionProps) {
  return <div className={styles.container}>{/* UI da seção */}</div>
}

export default NomeDoArquivo
