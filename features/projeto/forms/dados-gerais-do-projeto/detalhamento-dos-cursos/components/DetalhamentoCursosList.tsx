"use client"

import { CursoDetalhamentoForm } from "@/features/projeto/components/cursoDetalhamentoForm"
import type { CursoDetalhamentoDados } from "@/features/projeto/types/general-project-data"

import styles from "../detalhamentoDosCursos.module.css"

type Props = {
  cursos: CursoDetalhamentoDados[]
  readOnlyView?: boolean
  onSaveCurso: (index: number, value: CursoDetalhamentoDados) => void
}

/** Lista de formulários de detalhamento por curso. */
export function DetalhamentoCursosList({
  cursos,
  readOnlyView,
  onSaveCurso,
}: Props) {
  return (
    <div className={styles.list}>
      {cursos.map((curso, index) => (
        <CursoDetalhamentoForm
          key={curso.id}
          courseNumber={index + 1}
          value={curso}
          readOnlyView={readOnlyView}
          onSave={(value) => onSaveCurso(index, value)}
        />
      ))}
    </div>
  )
}
