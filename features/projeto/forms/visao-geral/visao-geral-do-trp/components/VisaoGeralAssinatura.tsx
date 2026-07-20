"use client"

import {
  FormSectionCard,
  formLayoutStyles,
} from "@/features/projeto/components/formShared/form-section"
import { VISAO_GERAL_ASSINATURA } from "@/features/projeto/constants/visao-geral"

import styles from "../visao-geral-do-trp.module.css"

type VisaoGeralAssinaturaProps = {
  local: string
  nome: string
  cargo: string
}

/**
 * Card de local, data e assinatura do representante legal.
 */
export function VisaoGeralAssinatura({
  local,
  nome,
  cargo,
}: VisaoGeralAssinaturaProps) {
  return (
    <FormSectionCard>
      <section className={formLayoutStyles.section}>
        <div className={styles.assinaturaMeta}>
          <p className={styles.assinaturaLinha}>
            <span className={styles.assinaturaLabel}>
              {VISAO_GERAL_ASSINATURA.LOCAL_LABEL}
            </span>{" "}
            {local}
          </p>
          <p className={styles.assinaturaLinha}>
            <span className={styles.assinaturaLabel}>
              {VISAO_GERAL_ASSINATURA.DATA_LABEL}
            </span>{" "}
            {VISAO_GERAL_ASSINATURA.DATA_VALOR}
          </p>
        </div>

        <div className={styles.assinaturaBloco}>
          <p className={styles.assinaturaNome}>{nome}</p>
          <p className={styles.assinaturaCargo}>{cargo}</p>
        </div>
      </section>
    </FormSectionCard>
  )
}
