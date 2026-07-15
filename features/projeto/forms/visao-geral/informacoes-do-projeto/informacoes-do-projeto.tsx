"use client"

import { DESCRICAO_INFORMACOES_PROJETO, TITULO_INFORMACOES_PROJETO } from "@/features/projeto/constants/ted/visao-geral"
import { InformacoesProjetoActions, InformacoesProjetoFields, InformacoesProjetoItens } from "./components"
import { FormSectionCard, formLayoutStyles } from "@/features/projeto/components/formShared/form-section"
import { useInformacoesProjeto } from "./hooks/useInformacoesProjeto"
import type { ProjectFormSectionProps } from "../../types"
import styles from "./informacoes-do-projeto.module.css"
import StatusStepper from "@/components/StatusStepper"

/**
 * Formulário da seção "Informações do Projeto".
 *
 * Compõe a UI e delega a lógica a `useInformacoesProjeto`.
 */
export function InformacoesDoProjeto({
  projectId,
  readOnlyView,
}: ProjectFormSectionProps) {
  const form = useInformacoesProjeto({ projectId, readOnlyView })

  return (
    <div className={formLayoutStyles.page}>
      <div className={formLayoutStyles.pageHeader}>
        <h2 className={formLayoutStyles.pageTitle}>{TITULO_INFORMACOES_PROJETO}</h2>
        <p className={formLayoutStyles.subtitle}>{DESCRICAO_INFORMACOES_PROJETO}</p>
      </div>

      {projectId && form.meta.etapaSteps.length > 0 ? (
        <div className={styles.statusCard}>
          <StatusStepper
            steps={form.meta.etapaSteps}
            currentStep={form.meta.currentStep}
            collapsible
            collapsibleLabel="Etapa do projeto"
          />
        </div>
      ) : null}

      <FormSectionCard>
        <InformacoesProjetoFields
          dados={form.form}
          tipoProjetoLabel={form.meta.tipoProjetoLabel}
          etapas={form.meta.etapas}
          responsaveisInternos={form.meta.responsaveisInternos}
          responsaveisExternos={form.meta.responsaveisExternos}
          canEditInfo={form.ui.canEditInfo}
          isInfoLocked={form.ui.isInfoLocked}
          isResponsaveisLocked={form.ui.isResponsaveisLocked}
          isViewMode={form.ui.isViewMode}
          readOnlyView={readOnlyView}
          onChange={form.actions.handleChange}
        />

        <InformacoesProjetoItens
          itensColunaEsquerda={form.meta.itensColunaEsquerda}
          itensColunaDireita={form.meta.itensColunaDireita}
          itensConcluidos={form.meta.itensConcluidos}
          getReview={form.meta.getReview}
          secaoTemAtencao={form.meta.secaoTemAtencao}
        />

        {form.ui.showActions ? (
          <InformacoesProjetoActions
            isEditing={form.ui.isEditing}
            isSaving={form.ui.isSaving}
            saveError={form.ui.saveError}
            canStartEditing={form.ui.canStartEditing}
            onEdit={form.actions.startEditing}
            onCancel={form.actions.cancel}
            onSave={() => void form.actions.save()}
          />
        ) : null}
      </FormSectionCard>
    </div>
  )
}

export default InformacoesDoProjeto
