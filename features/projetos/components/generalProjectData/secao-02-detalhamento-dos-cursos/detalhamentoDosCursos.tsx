"use client"

import { useMemo } from "react"

import { CursoDetalhamentoForm } from "@/features/projetos/components/generalProjectData/shared/CursoDetalhamentoForm"
import type {
  CursoDetalhamentoDados,
  DadosGeraisProjetoState,
} from "@/features/projetos/components/generalProjectData/types"
import { syncCursosByQuantidade } from "@/features/projetos/components/generalProjectData/types"
import {
  FormSectionCard,
  formLayoutStyles,
} from "@/features/projetos/components/project-ted/shared/form-section"
import type { ProjectFormSectionProps } from "@/features/projetos/components/project-ted/forms/sections-map"
import {
  useProjectData,
  useUpdateProjectData,
} from "@/features/projetos/contexts/project-data-context"
import { SESSOES_VISAO_GERAL_TITLE } from "@/features/projetos/constants/ted/visao-geral"

import styles from "./detalhamentoDosCursos.module.css"

function readDadosGerais(
  projectData: Record<string, unknown> | null | undefined,
): DadosGeraisProjetoState | null {
  const raw = projectData?.dadosGeraisProjeto
  if (!raw || typeof raw !== "object") return null

  const data = raw as Partial<DadosGeraisProjetoState>
  const quantidade = Number(data.quantidadeCursos)
  if (!Number.isInteger(quantidade) || quantidade < 1) return null

  return {
    custoTotalProjeto: String(data.custoTotalProjeto ?? ""),
    quantidadeCursos: quantidade,
    possuiEventoCertificacao: Boolean(data.possuiEventoCertificacao),
  }
}

function readCursos(
  projectData: Record<string, unknown> | null | undefined,
): CursoDetalhamentoDados[] {
  const raw = projectData?.detalhamentoCursos
  if (!Array.isArray(raw)) return []
  return raw as CursoDetalhamentoDados[]
}

export function DetalhamentoCursos({ readOnlyView }: ProjectFormSectionProps) {
  const projectData = useProjectData()
  const updateProjectData = useUpdateProjectData()

  const dadosGerais = useMemo(
    () => readDadosGerais(projectData as Record<string, unknown> | null),
    [projectData],
  )

  const quantidadeCursos = dadosGerais?.quantidadeCursos ?? 0

  const cursos = useMemo(() => {
    if (!quantidadeCursos) return []

    return syncCursosByQuantidade(
      readCursos(projectData as Record<string, unknown> | null),
      quantidadeCursos,
    )
  }, [projectData, quantidadeCursos])

  function handleSaveCurso(index: number, value: CursoDetalhamentoDados) {
    const nextCursos = syncCursosByQuantidade(
      readCursos(projectData as Record<string, unknown> | null),
      quantidadeCursos,
    ).map((curso, cursoIndex) => (cursoIndex === index ? value : curso))

    updateProjectData({
      detalhamentoCursos: nextCursos,
    })
  }

  return (
    <div className={formLayoutStyles.page}>
      <div className={formLayoutStyles.pageHeader}>
        <h2 className={formLayoutStyles.pageTitle}>
          {SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_DETALHAMENTO_CURSOS}
        </h2>
        <p className={formLayoutStyles.subtitle}>
          Preencha os dados gerais e, quando necessário, adicione despesas
          específicas de cada curso. Cada curso pode ser editado e salvo
          individualmente.
        </p>
      </div>

      {!quantidadeCursos ? (
        <FormSectionCard>
          <p className={styles.emptyMessage}>
            Informe e salve a quantidade de cursos em{" "}
            <strong>Dados gerais do projeto</strong> para liberar os formulários.
          </p>
        </FormSectionCard>
      ) : (
        <div className={styles.list}>
          {cursos.map((curso, index) => (
            <CursoDetalhamentoForm
              key={curso.id}
              courseNumber={index + 1}
              value={curso}
              readOnlyView={readOnlyView}
              onSave={(value) => handleSaveCurso(index, value)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default DetalhamentoCursos
