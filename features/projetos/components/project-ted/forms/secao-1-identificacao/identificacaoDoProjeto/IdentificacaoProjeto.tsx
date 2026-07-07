"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useEffect, useState } from "react"
import styles from "./IdentificacaoProjeto.module.css"
import { useProjectData } from "@/features/projetos/contexts/project-data-context"
import { IDENTIFICACAO_PROJETO_DESCRIPTIONS, IDENTIFICACAO_PROJETO_LABELS, IDENTIFICACAO_PROJETO_PLACEHOLDERS } from "@/features/projetos/constants/ted/identificacao-projeto"
import { SESSOES_VISAO_GERAL_TITLE } from "@/features/projetos/constants/ted/visao-geral"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"

interface DadosIdentificacaoProjeto {
  nomeProjeto: string
  localExecucao: string
  duracao: string
  resumoProjeto: string
}

interface PropsFormularioIdentificacaoProjeto {
  onChange?: (dados: DadosIdentificacaoProjeto) => void
  projectId?: string
}

function getInicialIdentificacao(projectData: ReturnType<typeof useProjectData>): DadosIdentificacaoProjeto {
  const p = projectData?.identificacao?.projeto
  if (!p) return { nomeProjeto: "", localExecucao: "", duracao: "", resumoProjeto: "" }
  return {
    nomeProjeto: p.nome ?? "",
    localExecucao: p.local_execucao ?? "",
    duracao: p.duracao ?? "",
    resumoProjeto: p.resumo ?? "",
  }
}

const VAZIO: DadosIdentificacaoProjeto = {
  nomeProjeto: "",
  localExecucao: "",
  duracao: "",
  resumoProjeto: "",
}

function FormularioIdentificacaoProjeto({
  onChange,
  projectId,
}: PropsFormularioIdentificacaoProjeto) {
  const projectData = useProjectData()

  const [dadosFormulario, setDadosFormulario] = useState<DadosIdentificacaoProjeto>(() =>
    projectData ? getInicialIdentificacao(projectData) : VAZIO
  )

  useEffect(() => {
    if (projectData) {
      setDadosFormulario(getInicialIdentificacao(projectData))
    }
  }, [projectData])

  const aoAlterar = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    const dadosAtualizados = { ...dadosFormulario, [name]: value }
    setDadosFormulario(dadosAtualizados)
    onChange?.(dadosAtualizados)
  }

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.title}>
          {SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_IDENTIFICACAO_PROJETO}
        </h2>

        <div className={styles.formGrid}>
          <div className={styles.fieldGroup}>
            <Label htmlFor="nomeProjeto" className={styles.label}>
              {IDENTIFICACAO_PROJETO_LABELS.LABEL_NOME_PROJETO}
              <span className={styles.required} />
            </Label>
            <Input
              id="nomeProjeto"
              name="nomeProjeto"
              placeholder={IDENTIFICACAO_PROJETO_PLACEHOLDERS.PLACEHOLDER_NOME_PROJETO}
              value={dadosFormulario.nomeProjeto}
              onChange={aoAlterar}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="localExecucao" className={styles.label}>
                {IDENTIFICACAO_PROJETO_LABELS.LABEL_LOCAL_EXECUCAO}
                <span className={styles.required} />
              </Label>
              <Input
                id="localExecucao"
                name="localExecucao"
                placeholder={IDENTIFICACAO_PROJETO_PLACEHOLDERS.PLACEHOLDER_LOCAL_EXECUCAO}
                value={dadosFormulario.localExecucao}
                onChange={aoAlterar}
                className={styles.input}
              />
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="duracao" className={styles.label}>
                {IDENTIFICACAO_PROJETO_LABELS.LABEL_DURACAO}
                <span className={styles.required} />
              </Label>
              <Input
                id="duracao"
                name="duracao"
                placeholder={IDENTIFICACAO_PROJETO_PLACEHOLDERS.PLACEHOLDER_DURACAO}
                value={dadosFormulario.duracao}
                onChange={aoAlterar}
                className={styles.input}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>
          {IDENTIFICACAO_PROJETO_LABELS.LABEL_RESUMO_PROJETO}
        </h2>

        <div className={styles.fieldGroup}>
          <Label htmlFor="resumoProjeto" className={styles.label}>
            {IDENTIFICACAO_PROJETO_DESCRIPTIONS.DESCRIPTION_RESUMO_PROJETO}
            <span className={styles.required} />
          </Label>
          <textarea
            id="resumoProjeto"
            name="resumoProjeto"
            placeholder={IDENTIFICACAO_PROJETO_PLACEHOLDERS.PLACEHOLDER_RESUMO_PROJETO}
            value={dadosFormulario.resumoProjeto}
            onChange={aoAlterar}
            rows={6}
            className={styles.textarea}
          />
        </div>
      </section>

      <div className={styles.actions}>
        <GenericButton variant="editar" onClick={() => {}} />
        <GenericButton variant="salvar" onClick={() => {}} />
      </div>
    </div>
  )
}

export default FormularioIdentificacaoProjeto
