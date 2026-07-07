"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useCallback, useEffect, useRef, useState } from "react"
import styles from "./IdentificacaoProponente.module.css"
import { useProjectData } from "@/features/projetos/contexts/project-data-context"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"
import { 
  IDENTIFICACAO_PROPONENTE_LABELS, 
  IDENTIFICACAO_PROPONENTE_PLACEHOLDERS
} from "@/features/projetos/constants/ted/identificacao-proponente"

interface DadosIdentificacaoProponente {
  nome: string
  cnpj: string
  dataFundacao: string
  registroCnpj: string
  enderecoCompleto: string
  bairro: string
  municipio: string
  cep: string
  uf: string
  telefoneFax: string
  email: string
  paginaWeb: string
}

interface PropsFormularioIdentificacaoProponente {
  onChange?: (dados: DadosIdentificacaoProponente) => void
  projectId?: string
}

const VAZIO_Proponente: DadosIdentificacaoProponente = {
  nome: "",
  cnpj: "",
  dataFundacao: "",
  registroCnpj: "",
  enderecoCompleto: "",
  bairro: "",
  municipio: "",
  cep: "",
  uf: "",
  telefoneFax: "",
  email: "",
  paginaWeb: "",
}

function dataBrParaInput(d: string | undefined): string {
  if (!d) return ""
  const parts = d.trim().split(/[/-]/)
  if (parts.length !== 3) return d
  const [a, b, c] = parts
  if (a.length === 4) return d
  return `${c}-${b.padStart(2, "0")}-${a.padStart(2, "0")}`
}

function formatCNPJ(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .slice(0, 18)
}

function formatTelefone(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15)
}

function formatCEP(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d)/, "$1-$2")
    .slice(0, 9)
}

function getInicialProponente(projectData: ReturnType<typeof useProjectData>): DadosIdentificacaoProponente {
  const e = projectData?.identificacao?.entidade_proponente
  if (!e) return VAZIO_Proponente

  const end = e.endereco
  const contato = e.contato
  const email = contato?.emails?.length ? contato.emails[0] ?? "" : ""

  return {
    nome: e.nome ?? "",
    cnpj: e.cnpj ?? "",
    dataFundacao: dataBrParaInput(e.data_fundacao) || (e.data_fundacao ?? ""),
    registroCnpj: e.registro_cnpj ?? "",
    enderecoCompleto: end?.logradouro ?? "",
    bairro: end?.bairro ?? "",
    municipio: end?.municipio ?? "",
    cep: end?.cep ?? "",
    uf: end?.uf ?? "",
    telefoneFax: contato?.telefone ?? "",
    email,
    paginaWeb: contato?.site ?? "",
  }
}

function FormularioIdentificacaoProponente({
  onChange,
  projectId,
}: PropsFormularioIdentificacaoProponente) {
  const projectData = useProjectData()

  const [dadosFormulario, setDadosFormulario] = useState<DadosIdentificacaoProponente>(() =>
    projectId === "2" && projectData ? getInicialProponente(projectData) : VAZIO_Proponente
  )

  const [cepStatus, setCepStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  // AbortController para cancelar requisições anteriores (evita race condition)
  const abortControllerRef = useRef<AbortController | null>(null)
  const cepTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (projectId === "2" && projectData) {
      setDadosFormulario(getInicialProponente(projectData))
    }
  }, [projectId, projectData])

  const buscarCep = useCallback(async (cep: string) => {
    const digits = cep.replace(/\D/g, "")
    if (digits.length < 8) return

    // Cancela requisição anterior se ainda pendente
    abortControllerRef.current?.abort()
    abortControllerRef.current = new AbortController()

    setCepStatus("loading")

    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`, {
        signal: abortControllerRef.current.signal,
      })

      if (!res.ok) {
        setCepStatus("error")
        return
      }

      const data = await res.json()

      if (data.erro) {
        setCepStatus("error")
        return
      }

      setDadosFormulario(prev => {
        const atualizado: DadosIdentificacaoProponente = {
          ...prev,
          bairro: data.bairro || prev.bairro,
          municipio: data.localidade || prev.municipio,
          uf: data.uf || prev.uf,
          enderecoCompleto: prev.enderecoCompleto || data.logradouro || "",
        }
        onChange?.(atualizado)
        return atualizado
      })

      setCepStatus("success")
    } catch (err: unknown) {
      // Ignora abort (usuário digitou um novo CEP antes de terminar)
      if (err instanceof Error && err.name === "AbortError") return
      setCepStatus("error")
    }
  }, [onChange])

  // Debounce: aguarda 600ms após parar de digitar para chamar a API
  useEffect(() => {
    const digits = dadosFormulario.cep.replace(/\D/g, "")

    if (digits.length < 8) {
      setCepStatus("idle")
      return
    }

    if (cepTimerRef.current) clearTimeout(cepTimerRef.current)

    cepTimerRef.current = setTimeout(() => {
      buscarCep(dadosFormulario.cep)
    }, 600)

    return () => {
      if (cepTimerRef.current) clearTimeout(cepTimerRef.current)
    }
  }, [dadosFormulario.cep, buscarCep])

  const aoAlterar = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target
    if (name === "cnpj" || name === "registroCnpj") {
      value = formatCNPJ(value)
    } else if (name === "telefoneFax") {
      value = formatTelefone(value)
    } else if (name === "cep") {
      value = formatCEP(value)
      setCepStatus("idle") // Reseta status ao editar o campo
    }
    const dadosAtualizados = { ...dadosFormulario, [name]: value }
    setDadosFormulario(dadosAtualizados)
    onChange?.(dadosAtualizados)
  }

  const cepFeedback: Record<string, { texto: string; cor: string }> = {
    loading: { texto: "Buscando CEP...", cor: "gray" },
    success: { texto: "CEP encontrado ✓", cor: "green" },
    error:   { texto: "CEP não encontrado.", cor: "red" },
  }

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.title}>2. Identificação do(a) Proponente</h2>

        <div className={styles.formGrid}>
          <div className={styles.fieldGroup}>
            <Label htmlFor="nome" className={styles.label}>
              {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_NOME}
              <span className={styles.required}></span>
            </Label>
            <Input
              id="nome"
              name="nome"
              value={dadosFormulario.nome}
              onChange={aoAlterar}
              placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_NOME}
              className={styles.input}
            />
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="cnpj" className={styles.label}>
                {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_CNPJ}
                <span className={styles.required}></span>
              </Label>
              <Input
                id="cnpj"
                name="cnpj"
                value={dadosFormulario.cnpj}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_CNPJ}
                className={styles.input}
                maxLength={18}
              />
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="dataFundacao" className={styles.label}>
                {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_DATA_FUNDACAO}
                <span className={styles.required}></span>
              </Label>
              <Input
                id="dataFundacao"
                name="dataFundacao"
                type="date"
                value={dadosFormulario.dataFundacao}
                onChange={aoAlterar}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <Label htmlFor="registroCnpj" className={styles.label}>
              {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_REGISTRO_CNPJ}
              <span className={styles.required}></span>
            </Label>
            <Input
              id="registroCnpj"
              name="registroCnpj"
              value={dadosFormulario.registroCnpj}
              onChange={aoAlterar}
              placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_REGISTRO_CNPJ}
              className={styles.input}
              maxLength={18}
            />
          </div>

          <div className={styles.fieldGroup}>
            <Label htmlFor="enderecoCompleto" className={styles.label}>
              {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_ENDERECO_COMPLETO}
              <span className={styles.required}></span>
            </Label>
            <Input
              id="enderecoCompleto"
              name="enderecoCompleto"
              value={dadosFormulario.enderecoCompleto}
              onChange={aoAlterar}
              placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_ENDERECO_COMPLETO}
              className={styles.input}
            />
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="cep" className={styles.label}>
                {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_CEP}
                <span className={styles.required}></span>
              </Label>
              <Input
                id="cep"
                name="cep"
                value={dadosFormulario.cep}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_CEP}
                className={styles.input}
                maxLength={9}
              />
              {cepStatus !== "idle" && (
                <span style={{ fontSize: "12px", marginTop: "4px", display: "block", color: cepFeedback[cepStatus].cor }}>
                  {cepFeedback[cepStatus].texto}
                </span>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="uf" className={styles.label}>
                {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_UF}
                <span className={styles.required}></span>
              </Label>
              <Input
                id="uf"
                name="uf"
                value={dadosFormulario.uf}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_UF}
                maxLength={2}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="bairro" className={styles.label}>
                {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_BAIRRO}
                <span className={styles.required}></span>
              </Label>
              <Input
                id="bairro"
                name="bairro"
                value={dadosFormulario.bairro}
                onChange={aoAlterar}
                className={styles.input}
              />
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="municipio" className={styles.label}>
                {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_MUNICIPIO}
                <span className={styles.required}></span>
              </Label>
              <Input
                id="municipio"
                name="municipio"
                value={dadosFormulario.municipio}
                onChange={aoAlterar}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="telefoneFax" className={styles.label}>
                {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_TELEFONE_FAX}
                <span className={styles.required}></span>
              </Label>
              <Input
                id="telefoneFax"
                name="telefoneFax"
                value={dadosFormulario.telefoneFax}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_TELEFONE_FAX}
                className={styles.input}
                maxLength={15}
              />
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor="email" className={styles.label}>
                {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_EMAIL}
                <span className={styles.required}></span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={dadosFormulario.email}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_EMAIL}
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <Label htmlFor="paginaWeb" className={styles.label}>
              {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_PAGINA_WEB}
              <span className={styles.required}></span>
            </Label>
            <Input
              id="paginaWeb"
              name="paginaWeb"
              value={dadosFormulario.paginaWeb}
              onChange={aoAlterar}
              placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_PAGINA_WEB}
              className={styles.input}
            />
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

export default FormularioIdentificacaoProponente