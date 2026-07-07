"use client"

import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"
import { useProjectData } from "@/features/projetos/contexts/project-data-context"
import styles from "./IdentificacaoRepresentanteLegal.module.css"
import { IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS, IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS } from "@/features/projetos/constants/ted/identificacao-representante-legal"
import { SESSOES_VISAO_GERAL_TITLE } from "@/features/projetos/constants/ted/visao-geral"

interface DadosIdentificacaoRepresentanteLegal {
  nome: string
  matriculaSiape: string
  profissao: string
  cargo: string
  estadoCivil: string
  telefone: string
  email: string
}

interface PropsFormularioIdentificacaoRepresentanteLegal {
  onChange?: (dados: DadosIdentificacaoRepresentanteLegal) => void
  projectId?: string
}

const VAZIO_REP: DadosIdentificacaoRepresentanteLegal = {
  nome: "",
  matriculaSiape: "",
  profissao: "",
  cargo: "",
  estadoCivil: "",
  telefone: "",
  email: "",
}

function formatMatriculaSiape(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{6})(\d)/, "$1-$2")
    .slice(0, 8)
}

function formatTelefone(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15)
}

function getInicialRepresentanteLegal(projectData: ReturnType<typeof useProjectData>): DadosIdentificacaoRepresentanteLegal {
  const r = projectData?.identificacao?.representante_legal
  if (!r) return VAZIO_REP

  return {
    nome: r.nome ?? "",
    matriculaSiape: r.matricula ?? "",
    profissao: "",
    cargo: r.cargo ?? "",
    estadoCivil: r.estado_civil ?? "",
    telefone: r.telefone ?? "",
    email: r.email ?? "",
  }
}

function FormularioIdentificacaoRepresentanteLegal({
  onChange,
  projectId,
}: PropsFormularioIdentificacaoRepresentanteLegal) {
  const projectData = useProjectData()

  const [dadosFormulario, setDadosFormulario] = useState<DadosIdentificacaoRepresentanteLegal>(() =>
    projectId === "2" && projectData ? getInicialRepresentanteLegal(projectData) : VAZIO_REP
  )

  useEffect(() => {
    if (projectId === "2" && projectData) {
      setDadosFormulario(getInicialRepresentanteLegal(projectData))
    }
  }, [projectId, projectData])

  const aoAlterar = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target
    
    if (name === "matriculaSiape") {
      value = formatMatriculaSiape(value)
    } else if (name === "telefone") {
      value = formatTelefone(value)
    } else if (name === "profissao" || name === IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_NOME || name === "cargo" || name === "estadoCivil") {
      if (/\d/.test(value)) {
        alert(`O campo ${name === "profissao" ? "Profissão" : name === "cargo" ? "Cargo" : name === "estadoCivil" ? "Estado Civil" : "Nome"} não aceita números.`)
        return 
      }
    }

    const dadosAtualizados = { ...dadosFormulario, [name]: value }
    setDadosFormulario(dadosAtualizados)
    onChange?.(dadosAtualizados)
  }

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.title}>
          {SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_IDENTIFICACAO_REPRESENTANTE_LEGAL}
        </h2>

        <div className={styles.formGrid}>
          <div className={styles.fieldGroup}>
            <Label htmlFor="nome" className={styles.label}>
              {IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_NOME}
              <span className={styles.required}></span>
            </Label>
            <Input
              id="nome"
              name={IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_NOME}
              value={dadosFormulario.nome}
              onChange={aoAlterar}
              placeholder={IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS.PLACEHOLDER_NOME}
              className={styles.input}
            />
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="matriculaSiape" className={styles.label}>
                {IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_MATRICULA_SIAPE}
                <span className={styles.required}></span>
              </Label>
              <Input
                id="matriculaSiape"
                name="matriculaSiape"
                value={dadosFormulario.matriculaSiape}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS.PLACEHOLDER_MATRICULA_SIAPE}
                className={styles.input}
                maxLength={8}
              />
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="profissao" className={styles.label}>
                {IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_PROFISSAO}
                <span className={styles.required}></span>
              </Label>
              <Input
                id="profissao"
                name="profissao"
                value={dadosFormulario.profissao}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS.PLACEHOLDER_PROFISSAO}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="cargo" className={styles.label}>
                {IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_CARGO}
                <span className={styles.required}></span>
              </Label>
              <Input
                id="cargo"
                name="cargo"
                value={dadosFormulario.cargo}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS.PLACEHOLDER_CARGO}
                className={styles.input}
              />
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="estadoCivil" className={styles.label}>
                {IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_ESTADO_CIVIL}
                <span className={styles.required}></span>
              </Label>
              <Input
                id="estadoCivil"
                name="estadoCivil"
                value={dadosFormulario.estadoCivil}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS.PLACEHOLDER_ESTADO_CIVIL}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="telefone" className={styles.label}>
                {IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_TELEFONE}
                <span className={styles.required}></span>
              </Label>
              <Input
                id="telefone"
                name="telefone"
                value={dadosFormulario.telefone}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS.PLACEHOLDER_TELEFONE}
                className={styles.input}
                maxLength={15}
              />
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="email" className={styles.label}>
                {IDENTIFICACAO_REPRESENTANTE_LEGAL_LABELS.LABEL_EMAIL}
                <span className={styles.required}></span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={dadosFormulario.email}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_REPRESENTANTE_LEGAL_PLACEHOLDERS.PLACEHOLDER_EMAIL}
                className={styles.input}
              />
            </div>
          </div>
        </div>
      </section>

      <div className={styles.actions}>
        <GenericButton variant="editar" onClick={() => {}} />
        <GenericButton variant="salvar" onClick={() => {}} />
      </div>
    </div>
  )
}

export default FormularioIdentificacaoRepresentanteLegal