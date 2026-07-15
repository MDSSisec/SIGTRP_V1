"use client"

import StatusStepper from "@/components/StatusStepper"
import { formLayoutStyles } from "@/features/projeto/components/formShared/form-section"
import { TITULO_DOCUMENTO_TRP } from "@/features/projeto/constants/ted/visao-geral"

import {
  VisaoGeralHeader,
  VisaoGeralSections,
} from "./components"
import { useVisaoGeralDoTrp } from "./hooks/useVisaoGeralDoTrp"
import type { ProjectFormSectionProps } from "../../types"
import styles from "./visao-geral-do-trp.module.css"

/**
 * Visão geral consolidada do TRP (somente leitura + exportação PDF).
 *
 * Compõe a UI e delega a lógica a `useVisaoGeralDoTrp`.
 */
export function VisaoGeralDoProjeto({ projectId }: ProjectFormSectionProps) {
  const view = useVisaoGeralDoTrp({ projectId })

  return (
    <div className={formLayoutStyles.page}>
      <VisaoGeralHeader
        isExporting={view.ui.isExporting}
        canExport={view.ui.canExport}
        onExportPdf={() => void view.actions.exportPdf()}
      />

      <div
        ref={view.refs.pdfExportRef}
        data-visao-geral-pdf-root
        className={styles.pdfExportRoot}
      >
        <div className={styles.statusCard}>
          {view.ui.showStepper ? (
            <StatusStepper
              steps={view.meta.etapaSteps}
              currentStep={view.meta.currentStep}
              collapsible
              collapsibleLabel="Etapa do projeto"
              forceExpanded={view.ui.isExporting}
            />
          ) : null}
        </div>

        <div className={styles.documentHeader}>
          <h1 className={styles.documentTitle}>{TITULO_DOCUMENTO_TRP}</h1>
        </div>

        <VisaoGeralSections projectId={projectId} />
      </div>
    </div>
  )
}

export default VisaoGeralDoProjeto
