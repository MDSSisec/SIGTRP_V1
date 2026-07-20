"use client"

import { AsyncLoadState } from "@/components/ui/async-load-state"

import { PROJETOS_TEXT } from "../../constants/projetos.text"
import { useProjetoEditScreen } from "../../hooks/useProjetoEditScreen"
import { EditProjetoHeader } from "./editProjetoHeader"
import { EditProviders } from "./editProviders"
import styles from "./screen-edit-projeto.module.css"

export function ScreenEditProjeto() {
  const screen = useProjetoEditScreen()

  const loadProps = {
    isLoading: screen.isLoading,
    error: screen.error,
    loadingLabel: PROJETOS_TEXT.loading.projeto,
    children: null,
  }

  const { projeto, modelo, secao, FormSection } = screen
  const hasData = Boolean(projeto && modelo && secao && FormSection)

  if (!screen.isLoading && !hasData) {
    return (
      <AsyncLoadState {...loadProps}>
        <p className="p-6 text-sm text-muted-foreground">
          {PROJETOS_TEXT.edit.notFound}
        </p>
      </AsyncLoadState>
    )
  }

  if (!projeto || !modelo || !secao || !FormSection) {
    return <AsyncLoadState {...loadProps} />
  }

  return (
    <AsyncLoadState {...loadProps}>
      <EditProviders
        projeto={projeto}
        projectId={screen.projectId}
        secaoId={secao.id}
      >
        <div className={styles.pageWrapper}>
          <EditProjetoHeader tipoProjeto={projeto.tipoProjeto} />

          <div className={styles.formContainer}>
            <FormSection projectId={screen.projectId} />
          </div>
        </div>
      </EditProviders>
    </AsyncLoadState>
  )
}