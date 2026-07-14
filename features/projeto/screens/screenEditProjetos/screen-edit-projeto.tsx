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

  const hasData = Boolean(
    screen.projeto &&
      screen.modelo &&
      screen.secao &&
      screen.FormSection,
  )

  if (!screen.isLoading && !hasData) {
    return (
      <AsyncLoadState {...loadProps}>
        <p className="p-6 text-sm text-muted-foreground">
          {PROJETOS_TEXT.edit.notFound}
        </p>
      </AsyncLoadState>
    )
  }

  if (!hasData) {
    return <AsyncLoadState {...loadProps} />
  }

  const Section = screen.FormSection

  return (
    <AsyncLoadState {...loadProps}>
      <EditProviders
        projeto={screen.projeto}
        projectId={screen.projectId}
        secaoId={screen.secao.id}
      >
        <div className={styles.pageWrapper}>
          <EditProjetoHeader tipoProjeto={screen.projeto.tipoProjeto} />

          <div className={styles.formContainer}>
            <Section projectId={screen.projectId} />
          </div>
        </div>
      </EditProviders>
    </AsyncLoadState>
  )
}