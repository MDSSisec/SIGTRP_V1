"use client"

import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"
import { useProjectData } from "@/features/projetos/contexts/project-data-context"
import styles from "./IdentificacaoResponsavelTecnico.module.css"
import { SESSOES_VISAO_GERAL_TITLE } from "@/features/projetos/constants/ted/visao-geral"
import { IDENTIFICACAO_RESPONSAVEL_TECNICO_LABELS, IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS } from "@/features/projetos/constants/ted/identificacao-responsavel-tecnico"
import { COMUNS_LABELS } from "@/features/projetos/constants/ted/communs"

interface DadosIdentificacaoResponsavelTecnico {
  nome: string
  cargo: string
  telefone: string
  celular: string
  email: string
}

interface PropsFormularioIdentificacaoResponsavelTecnico {
  onChange?: (dados: DadosIdentificacaoResponsavelTecnico) => void
  projectId?: string
}

const VAZIO_RT: DadosIdentificacaoResponsavelTecnico = {
  nome: "",
  cargo: "",
  telefone: "",
  celular: "",
  email: "",
}

function formatTelefone(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15)
}

function formatTelefoneFixo(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .slice(0, 14)
}

function emailValido(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function getInicialResponsavelTecnico(projectData: ReturnType<typeof useProjectData>): DadosIdentificacaoResponsavelTecnico {
  const arr = projectData?.identificacao?.responsaveis_tecnicos
  const r = arr?.length ? arr[0] : undefined

  if (!r) return VAZIO_RT

  return {
    nome: r.nome ?? "",
    cargo: r.cargo ?? "",
    telefone: r.telefone ?? "",
    celular: r.telefone ?? "",
    email: r.email ?? "",
  }
}

function FormularioIdentificacaoResponsavelTecnico({
  onChange,
  projectId,
}: PropsFormularioIdentificacaoResponsavelTecnico) {
  const projectData = useProjectData()

  const [dadosFormulario, setDadosFormulario] = useState<DadosIdentificacaoResponsavelTecnico>(() =>
    projectId === "2" && projectData ? getInicialResponsavelTecnico(projectData) : VAZIO_RT
  )

  // Controla se o campo email já foi tocado (para só mostrar erro após interação)
  const [emailTocado, setEmailTocado] = useState(false)

  useEffect(() => {
    if (projectId === "2" && projectData) {
      setDadosFormulario(getInicialResponsavelTecnico(projectData))
    }
  }, [projectId, projectData])

  const aoAlterar = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target
    
    if (name === COMUNS_LABELS.LABEL_CELULAR) {
      value = formatTelefone(value)
    } else if (name === "telefone") {
      value = formatTelefoneFixo(value)
    }

    const dadosAtualizados = { ...dadosFormulario, [name]: value }
    setDadosFormulario(dadosAtualizados)
    onChange?.(dadosAtualizados)
  }

  const emailInvalido = emailTocado && dadosFormulario.email.length > 0 && !emailValido(dadosFormulario.email)

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.title}>
          {SESSOES_VISAO_GERAL_TITLE.TITLE_SESSAO_IDENTIFICACAO_RESPONSAVEL_TECNICO}
        </h2>

        <div className={styles.formGrid}>
          <div className={styles.fieldGroup}>
            <Label htmlFor="nome" className={styles.label}>
              {COMUNS_LABELS.LABEL_NAME}
              <span className={styles.required}></span>
            </Label>
            <Input
              id="nome"
              name="nome"
              value={dadosFormulario.nome}
              onChange={aoAlterar}
              placeholder={IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS.PLACEHOLDER_NOME}
              className={styles.input}
            />
          </div>

          <div className={styles.fieldGroup}>
            <Label htmlFor="cargo" className={styles.label}>
              {IDENTIFICACAO_RESPONSAVEL_TECNICO_LABELS.LABEL_CARGO}
              <span className={styles.required}></span>
            </Label>
            <Input
              id="cargo"
              name="cargo"
              value={dadosFormulario.cargo}
              onChange={aoAlterar}
              placeholder={IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS.PLACEHOLDER_CARGO}
              className={styles.input}
            />
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="telefone" className={styles.label}>{COMUNS_LABELS.LABEL_NUMERO_DE_TELEFONE}</Label>
              <Input
                id="telefone"
                name="telefone"
                value={dadosFormulario.telefone}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS.PLACEHOLDER_TELEFONE}
                className={styles.input}
                maxLength={14}
              />
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="celular" className={styles.label}>{COMUNS_LABELS.LABEL_NUMERO_DE_CELULAR}</Label>
              <Input
                id="celular"
                name={COMUNS_LABELS.LABEL_CELULAR}
                value={dadosFormulario.celular}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS.PLACEHOLDER_CELULAR}
                className={styles.input}
                maxLength={15}
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <Label htmlFor="email" className={styles.label}>
              {COMUNS_LABELS.LABEL_EMAIL}
              <span className={styles.required}></span>
            </Label>
            <Input
              id="email"
              name={COMUNS_LABELS.LABEL_EMAIL}
              type="email"
              value={dadosFormulario.email}
              onChange={aoAlterar}
              onBlur={() => setEmailTocado(true)}
              placeholder={IDENTIFICACAO_RESPONSAVEL_TECNICO_PLACEHOLDERS.PLACEHOLDER_EMAIL}
              className={`${styles.input} ${emailInvalido ? styles.inputError : ""}`}
              required
            />
            {emailInvalido && (
              <span className={styles.errorMessage}>
                Insira um e-mail válido contendo &quot;@&quot; e domínio.
              </span>
            )}
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

export default FormularioIdentificacaoResponsavelTecnico