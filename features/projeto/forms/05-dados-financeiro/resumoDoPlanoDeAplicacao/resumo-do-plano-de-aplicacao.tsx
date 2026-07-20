"use client"

import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"

import type { ProjectFormSectionProps } from "../../types"
import {
  ResumoPlanoAplicacaoActions,
  ResumoPlanoAplicacaoFields,
} from "./components"
import { useResumoPlanoAplicacao } from "./hooks"
import styles from "./resumo-do-plano-de-aplicacao.module.css"

/**
 * Formulário da seção "Resumo do plano de aplicação".
 */
export function FormularioResumoDoPlanoDeAplicacao({
  projectId,
  readOnlyView,
}: ProjectFormSectionProps) {
  const form = useResumoPlanoAplicacao({ projectId, readOnlyView })

  return (
    <div className={styles.container}>
      <SecaoReviewBanner />

      <ResumoPlanoAplicacaoFields
        dados={form.form}
        valores={form.meta.valores}
        isLocked={form.ui.isLocked}
        onLinhaChange={form.actions.setLinhaCampo}
        onAddLinha={form.actions.addLinha}
        onRemoveLinha={form.actions.removeLinha}
      />

      {!readOnlyView ? (
        <ResumoPlanoAplicacaoActions
          isEditing={form.ui.isEditing}
          isSaving={form.ui.isSaving}
          saveError={form.ui.saveError}
          canStartEditing={form.ui.canStartEditing}
          onEdit={form.actions.startEditing}
          onCancel={form.actions.cancel}
          onSave={() => void form.actions.save()}
        />
      ) : null}
    </div>
  )
}

export default FormularioResumoDoPlanoDeAplicacao
