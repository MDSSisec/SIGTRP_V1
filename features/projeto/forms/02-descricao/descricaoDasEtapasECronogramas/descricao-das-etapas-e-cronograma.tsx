"use client"

import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"

import type { ProjectFormSectionProps } from "../../types"
import {
  EtapasCronogramaActions,
  EtapasCronogramaFields,
} from "./components"
import { useEtapasCronograma } from "./hooks/useEtapasCronograma"
import styles from "./descricao-das-etapas-e-cronograma.module.css"

/**
 * Renderiza a seção "Etapas e Cronograma de Execução" do projeto.
 *
 * Responsabilidades:
 * - exibir os campos do cronograma;
 * - integrar as ações de edição e salvamento;
 * - exibir informações de revisão da seção.
 *
 * Toda a lógica de negócio e gerenciamento de estado é
 * delegada ao hook {@link useEtapasCronograma}.
 */
export function FormularioEtapasCronograma({
  projectId,
  readOnlyView,
}: ProjectFormSectionProps) {
  const etapasCronograma = useEtapasCronograma({
    projectId,
    readOnlyView,
  })

  const { form, meta, review, ui, actions } = etapasCronograma

  return (
    <div className={styles.container}>
      <SecaoReviewBanner />

      <EtapasCronogramaFields
        dados={form}
        totalGeral={meta.totalGeral}
        editingValor={meta.editingValor}
        isLocked={ui.isLocked}
        canManageList={ui.canManageList}
        showActionsColumn={ui.showActionsColumn}
        fieldClass={review.fieldClass}
        setEditingValor={actions.setEditingValor}
        onAddLinha={actions.addLinha}
        onUpdateEtapa={actions.updateEtapa}
        onRemoveEtapa={actions.removeEtapa}
        onUpdateMetaData={actions.updateMetaData}
        onAdicionarMeta={actions.adicionarMeta}
      />

      {!readOnlyView ? (
        <EtapasCronogramaActions
          isEditing={ui.isEditing}
          isSaving={ui.isSaving}
          saveError={ui.saveError}
          canStartEditing={ui.canStartEditing}
          onEdit={actions.startEditing}
          onCancel={actions.cancel}
          onSave={() => void actions.save()}
        />
      ) : null}
    </div>
  )
}

export default FormularioEtapasCronograma