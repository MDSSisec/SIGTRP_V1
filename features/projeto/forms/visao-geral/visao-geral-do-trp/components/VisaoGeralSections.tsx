"use client"

import { getFormSection } from "../../../sections-map"
import { SECOES_VISAO_GERAL } from "../constants/secoes"
import styles from "../visao-geral-do-trp.module.css"
import { ReadOnlyWrapper } from "./ReadOnlyWrapper"

type VisaoGeralSectionsProps = {
  projectId?: string
}

/**
 * Lista as seções do TRP em modo somente leitura.
 */
export function VisaoGeralSections({ projectId }: VisaoGeralSectionsProps) {
  return (
    <div className={styles.sectionsWrapper}>
      {SECOES_VISAO_GERAL.map(({ slug }) => {
        const FormSection = getFormSection(slug)
        if (!FormSection) return null

        return (
          <section key={slug} id={`secao-${slug}`} className={styles.section}>
            <ReadOnlyWrapper>
              <FormSection projectId={projectId} readOnlyView />
            </ReadOnlyWrapper>
          </section>
        )
      })}
    </div>
  )
}
