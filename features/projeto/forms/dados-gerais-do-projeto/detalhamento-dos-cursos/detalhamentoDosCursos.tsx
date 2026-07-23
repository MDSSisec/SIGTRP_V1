"use client"

import { formLayoutStyles } from "@/features/projeto/components/formShared/form-section"
import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"
import {
  SESSOES_VISAO_GERAL_SUBTITLE,
  SESSOES_VISAO_GERAL_TITLE,
} from "@/features/projeto/constants/visao-geral"

import type { ProjectFormSectionProps } from "../../types"
import {
  DetalhamentoCursosEmpty,
  DetalhamentoCursosList,
} from "./components"
import { useDetalhamentoCursos } from "./hooks/useDetalhamentoCursos"

/**
 * Formulário da seção "Detalhamento dos cursos".
 *
 * Compõe a UI e delega a lógica a `useDetalhamentoCursos`.
 * Review (bloquear/atenção) aplica-se aos dados gerais do curso,
 * não à tabela de gastos.
 */
export function DetalhamentoCursos({
  readOnlyView,
}: ProjectFormSectionProps) {
  const form = useDetalhamentoCursos({ readOnlyView })

  return (
    <div className={formLayoutStyles.page}>
      <div className={formLayoutStyles.pageHeader}>
        <h2 className={formLayoutStyles.pageTitle}>
          {SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_DETALHAMENTO_CURSOS}
        </h2>
        <p className={formLayoutStyles.subtitle}>
          {SESSOES_VISAO_GERAL_SUBTITLE.SUBTITLE_SESSAO_DETALHAMENTO_CURSOS}
        </p>
      </div>

      <SecaoReviewBanner />

      {!form.ui.hasCursos ? (
        <DetalhamentoCursosEmpty />
      ) : (
        <DetalhamentoCursosList
          cursos={form.form.cursos}
          readOnlyView={readOnlyView}
          onSaveCurso={form.actions.saveCurso}
        />
      )}
    </div>
  )
}

export default DetalhamentoCursos
