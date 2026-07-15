"use client"

import { Check, Pencil, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import React, { useCallback, useEffect, useRef, useState } from "react"
import styles from "./IdentificacaoProponente.module.css"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"
import {
  notifyFormSaveError,
  notifyFormSaveSuccess,
} from "@/features/projetos/components/project-ted/shared/form-save-toast"
import {
  fetchEstados,
  fetchMunicipiosByUf,
  fetchTedIdentificacao,
  saveTedIdentificacaoProponente,
  type IbgeEstado,
  type IbgeMunicipio,
} from "@/features/projetos/services"
import type { TedIdentificacao } from "@/features/projetos/types/ted-identificacao"
import { useAsyncData } from "@/hooks/use-async-data"
import { cn } from "@/lib/utils"
import { 
  IDENTIFICACAO_PROPONENTE_LABELS, 
  IDENTIFICACAO_PROPONENTE_PLACEHOLDERS
} from "@/features/projetos/constants/ted/identificacao-proponente"
import { useTedReview } from "@/features/projetos/contexts/ted-review-context"
import {
  CampoReviewLabel,
  SecaoReviewBanner,
} from "@/features/projeto/components/formShared/secao-review-actions"
import type { ProjectFormSectionProps } from "../../sections-map"

/** Em modo visualização: fundo branco e opacidade plena para o texto se destacar. */
const VIEW_MODE_FIELD_CLASS =
  "!bg-[#ffffff] disabled:!bg-[#ffffff] disabled:!opacity-100 text-foreground"

const SELECT_CLASS_NAME =
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none " +
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 " +
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 md:text-sm dark:bg-input/30"

interface DadosIdentificacaoProponente {
  nome: string
  cnpj: string
  dataFundacao: string
  registroCnpj: string
  enderecoCompleto: string
  bairro: string
  municipio: string
  municipioIbge: number | null
  cep: string
  uf: string
  ufIbge: number | null
  telefoneFax: string
  email: string
  paginaWeb: string
}

const VAZIO_Proponente: DadosIdentificacaoProponente = {
  nome: "",
  cnpj: "",
  dataFundacao: "",
  registroCnpj: "",
  enderecoCompleto: "",
  bairro: "",
  municipio: "",
  municipioIbge: null,
  cep: "",
  uf: "",
  ufIbge: null,
  telefoneFax: "",
  email: "",
  paginaWeb: "",
}

function formatCNPJ(value: string | number) {
  return String(value)
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .slice(0, 18)
}

function formatTelefone(value: string | number) {
  return String(value)
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15)
}

function formatCEP(value: string | number) {
  return String(value)
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d)/, "$1-$2")
    .slice(0, 9)
}

function mapIdentificacaoToForm(
  identificacao: TedIdentificacao | null,
): DadosIdentificacaoProponente {
  if (!identificacao) return VAZIO_Proponente

  return {
    nome: identificacao.proponenteNome ?? "",
    cnpj: identificacao.proponenteCnpj ? formatCNPJ(identificacao.proponenteCnpj) : "",
    dataFundacao: identificacao.proponenteDataFundacao ?? "",
    registroCnpj: identificacao.proponenteRegistroCnpj ?? "",
    enderecoCompleto: identificacao.proponenteEndereco ?? "",
    bairro: identificacao.proponenteBairro ?? "",
    municipio: "",
    municipioIbge: identificacao.proponenteMunicipioIbge,
    cep: identificacao.proponenteCep ? formatCEP(identificacao.proponenteCep) : "",
    uf: "",
    ufIbge: identificacao.proponenteUfIbge,
    telefoneFax: identificacao.proponenteTelefone
      ? formatTelefone(identificacao.proponenteTelefone)
      : "",
    email: identificacao.proponenteEmail ?? "",
    paginaWeb: identificacao.proponentePaginaWeb ?? "",
  }
}

function FormularioIdentificacaoProponente({
  projectId,
  readOnlyView,
}: ProjectFormSectionProps) {
  const reviewCtx = useTedReview()
  const canManageReview = Boolean(reviewCtx?.canManage)
  const review = reviewCtx?.review ?? null

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [dadosFormulario, setDadosFormulario] = useState<DadosIdentificacaoProponente>(VAZIO_Proponente)

  const [cepStatus, setCepStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const [estados, setEstados] = useState<IbgeEstado[]>([])
  const [municipios, setMunicipios] = useState<IbgeMunicipio[]>([])
  const [carregandoMunicipios, setCarregandoMunicipios] = useState(false)

  // AbortController para cancelar requisições anteriores (evita race condition)
  const abortControllerRef = useRef<AbortController | null>(null)
  const cepTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const loadIdentificacao = useCallback(async () => {
    if (!projectId) return null
    return fetchTedIdentificacao(projectId)
  }, [projectId])

  const { data: identificacao, reload } = useAsyncData(loadIdentificacao, {
    initialData: null as TedIdentificacao | null,
    errorMessage: "Não foi possível carregar o proponente.",
    loadOnMount: Boolean(projectId),
  })

  useEffect(() => {
    if (projectId) void reload()
  }, [projectId, reload])

  useEffect(() => {
    setDadosFormulario(mapIdentificacaoToForm(identificacao))
  }, [identificacao])

  // Carrega a lista de UFs do IBGE uma única vez
  useEffect(() => {
    const controller = new AbortController()

    fetchEstados(controller.signal)
      .then(setEstados)
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === "AbortError") return
        setEstados([])
      })

    return () => controller.abort()
  }, [])

  // Deriva a sigla da UF a partir do código IBGE salvo (dispara a carga de municípios)
  useEffect(() => {
    if (!estados.length) return

    setDadosFormulario((prev) => {
      if (prev.ufIbge == null || prev.uf) return prev
      const estado = estados.find((e) => e.id === prev.ufIbge)
      return estado ? { ...prev, uf: estado.sigla } : prev
    })
  }, [estados])

  // Preenche o nome do município a partir do código IBGE salvo
  useEffect(() => {
    if (!municipios.length) return

    setDadosFormulario((prev) => {
      if (prev.municipioIbge == null || prev.municipio) return prev
      const municipio = municipios.find((m) => m.id === prev.municipioIbge)
      return municipio ? { ...prev, municipio: municipio.nome } : prev
    })
  }, [municipios])

  // Carrega os municípios sempre que a UF selecionada muda
  useEffect(() => {
    const uf = dadosFormulario.uf.trim().toUpperCase()

    if (!uf) {
      setMunicipios([])
      return
    }

    const controller = new AbortController()
    setCarregandoMunicipios(true)

    fetchMunicipiosByUf(uf, controller.signal)
      .then((lista) => {
        setMunicipios(lista)
        setCarregandoMunicipios(false)
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === "AbortError") return
        setMunicipios([])
        setCarregandoMunicipios(false)
      })

    return () => controller.abort()
  }, [dadosFormulario.uf])

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

      setDadosFormulario((prev) => {
        const ufSigla = data.uf || prev.uf
        const estadoEncontrado = estados.find((estado) => estado.sigla === ufSigla)
        const municipioIbge = data.ibge ? Number(data.ibge) : prev.municipioIbge

        return {
          ...prev,
          bairro: data.bairro || prev.bairro,
          municipio: data.localidade || prev.municipio,
          municipioIbge: Number.isFinite(municipioIbge) ? municipioIbge : prev.municipioIbge,
          uf: ufSigla,
          ufIbge: estadoEncontrado?.id ?? prev.ufIbge,
          enderecoCompleto: prev.enderecoCompleto || data.logradouro || "",
        }
      })

      setCepStatus("success")
    } catch (err: unknown) {
      // Ignora abort (usuário digitou um novo CEP antes de terminar)
      if (err instanceof Error && err.name === "AbortError") return
      setCepStatus("error")
    }
  }, [estados])

  // Debounce: aguarda 600ms após parar de digitar para chamar a API
  useEffect(() => {
    if (!isEditing) return

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
  }, [dadosFormulario.cep, buscarCep, isEditing])

  const aoAlterar = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target
    setSaveError(null)
    if (name === "cnpj") {
      value = formatCNPJ(value)
    } else if (name === "telefoneFax") {
      value = formatTelefone(value)
    } else if (name === "cep") {
      value = formatCEP(value)
      setCepStatus("idle") // Reseta status ao editar o campo
    }
    setDadosFormulario((prev) => ({ ...prev, [name]: value }))
  }

  const aoAlterarSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setSaveError(null)

    if (name === "uf") {
      const estadoEncontrado = estados.find((estado) => String(estado.id) === value)
      setDadosFormulario((prev) => ({
        ...prev,
        uf: estadoEncontrado?.sigla ?? "",
        ufIbge: estadoEncontrado?.id ?? null,
        municipio: "",
        municipioIbge: null,
      }))
      return
    }

    if (name === "municipio") {
      const municipioEncontrado = municipios.find((m) => String(m.id) === value)
      setDadosFormulario((prev) => ({
        ...prev,
        municipio: municipioEncontrado?.nome ?? "",
        municipioIbge: municipioEncontrado?.id ?? null,
      }))
      return
    }

    setDadosFormulario((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    if (!projectId) return

    setIsSaving(true)
    setSaveError(null)

    try {
      const salvo = await saveTedIdentificacaoProponente(projectId, {
        proponenteNome: dadosFormulario.nome,
        proponenteCnpj: dadosFormulario.cnpj,
        proponenteDataFundacao: dadosFormulario.dataFundacao,
        proponenteRegistroCnpj: dadosFormulario.registroCnpj,
        proponenteEndereco: dadosFormulario.enderecoCompleto,
        proponenteBairro: dadosFormulario.bairro,
        proponenteUfIbge: dadosFormulario.ufIbge,
        proponenteMunicipioIbge: dadosFormulario.municipioIbge,
        proponenteCep: dadosFormulario.cep,
        proponenteTelefone: dadosFormulario.telefoneFax,
        proponenteEmail: dadosFormulario.email,
        proponentePaginaWeb: dadosFormulario.paginaWeb,
      })

      setDadosFormulario(mapIdentificacaoToForm(salvo))
      setIsEditing(false)
      await reload()
      notifyFormSaveSuccess("Proponente salvo com sucesso!")
    } catch (error) {
      setSaveError(
        notifyFormSaveError(error, "Não foi possível salvar o proponente."),
      )
    } finally {
      setIsSaving(false)
    }
  }

  const isBlockedForUser = Boolean(review?.bloqueada) && !canManageReview
  const isLocked = readOnlyView || !isEditing || isBlockedForUser
  const isViewMode = !isEditing || isBlockedForUser
  const canStartEditing = !readOnlyView && !isBlockedForUser && !reviewCtx?.isMarkingAtencao
  const marking = Boolean(reviewCtx?.isMarkingAtencao)
  const fieldDisabled = isLocked

  const fieldClass = (campoKey: string) =>
    cn(
      styles.input,
      isViewMode && VIEW_MODE_FIELD_CLASS,
      reviewCtx?.isCampoAtencao(campoKey) &&
        "!border-destructive !ring-2 !ring-destructive/30 bg-destructive/5",
    )

  const cepFeedback: Record<string, { texto: string; cor: string }> = {
    loading: { texto: "Buscando CEP...", cor: "gray" },
    success: { texto: "CEP encontrado ✓", cor: "green" },
    error:   { texto: "CEP não encontrado.", cor: "red" },
  }

  return (
    <div className={styles.container}>
      <SecaoReviewBanner />

      <section className={styles.section}>
        <h2 className={styles.title}>2. Identificação do(a) Proponente</h2>

        <div className={styles.formGrid}>
          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <CampoReviewLabel htmlFor="nome" campoKey="nome" className={styles.label}>
                {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_NOME}
              </CampoReviewLabel>
              <Input
                id="nome"
                name="nome"
                value={dadosFormulario.nome}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_NOME}
                className={fieldClass("nome")}
                disabled={fieldDisabled}
              />
            </div>

            <div className={styles.fieldGroup}>
              <CampoReviewLabel htmlFor="cnpj" campoKey="cnpj" className={styles.label}>
                {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_CNPJ}
              </CampoReviewLabel>
              <Input
                id="cnpj"
                name="cnpj"
                value={dadosFormulario.cnpj}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_CNPJ}
                className={fieldClass("cnpj")}
                maxLength={18}
                disabled={fieldDisabled}
              />
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <CampoReviewLabel htmlFor="dataFundacao" campoKey="dataFundacao" className={styles.label}>
                {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_DATA_FUNDACAO}
              </CampoReviewLabel>
              <Input
                id="dataFundacao"
                name="dataFundacao"
                type="date"
                value={dadosFormulario.dataFundacao}
                onChange={aoAlterar}
                className={fieldClass("dataFundacao")}
                disabled={fieldDisabled}
              />
            </div>

            <div className={styles.fieldGroup}>
              <CampoReviewLabel htmlFor="registroCnpj" campoKey="registroCnpj" className={styles.label}>
                {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_REGISTRO_CNPJ}
              </CampoReviewLabel>
              <Input
                id="registroCnpj"
                name="registroCnpj"
                type="date"
                value={dadosFormulario.registroCnpj}
                onChange={aoAlterar}
                className={fieldClass("registroCnpj")}
                disabled={fieldDisabled}
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <CampoReviewLabel htmlFor="enderecoCompleto" campoKey="enderecoCompleto" className={styles.label}>
              {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_ENDERECO_COMPLETO}
            </CampoReviewLabel>
            <Input
              id="enderecoCompleto"
              name="enderecoCompleto"
              value={dadosFormulario.enderecoCompleto}
              onChange={aoAlterar}
              placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_ENDERECO_COMPLETO}
              className={fieldClass("enderecoCompleto")}
              disabled={fieldDisabled}
            />
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <CampoReviewLabel htmlFor="cep" campoKey="cep" className={styles.label}>
                {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_CEP}
              </CampoReviewLabel>
              <Input
                id="cep"
                name="cep"
                value={dadosFormulario.cep}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_CEP}
                className={fieldClass("cep")}
                maxLength={9}
                disabled={fieldDisabled}
              />
              {cepStatus !== "idle" && (
                <span style={{ fontSize: "12px", marginTop: "4px", display: "block", color: cepFeedback[cepStatus].cor }}>
                  {cepFeedback[cepStatus].texto}
                </span>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <CampoReviewLabel htmlFor="uf" campoKey="ufIbge" className={styles.label}>
                {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_UF}
              </CampoReviewLabel>
              <select
                id="uf"
                name="uf"
                value={dadosFormulario.ufIbge ?? ""}
                onChange={aoAlterarSelect}
                className={cn(SELECT_CLASS_NAME, fieldClass("ufIbge"))}
                disabled={fieldDisabled}
              >
                <option value="">Selecione a UF...</option>
                {estados.map((estado) => (
                  <option key={estado.id} value={estado.id}>
                    {estado.sigla} - {estado.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <CampoReviewLabel htmlFor="bairro" campoKey="bairro" className={styles.label}>
                {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_BAIRRO}
              </CampoReviewLabel>
              <Input
                id="bairro"
                name="bairro"
                value={dadosFormulario.bairro}
                onChange={aoAlterar}
                className={fieldClass("bairro")}
                disabled={fieldDisabled}
              />
            </div>

            <div className={styles.fieldGroup}>
              <CampoReviewLabel htmlFor="municipio" campoKey="municipioIbge" className={styles.label}>
                {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_MUNICIPIO}
              </CampoReviewLabel>
              <select
                id="municipio"
                name="municipio"
                value={dadosFormulario.municipioIbge ?? ""}
                onChange={aoAlterarSelect}
                className={cn(SELECT_CLASS_NAME, fieldClass("municipioIbge"))}
                disabled={fieldDisabled || !dadosFormulario.uf || carregandoMunicipios}
              >
                <option value="">
                  {!dadosFormulario.uf
                    ? "Selecione a UF primeiro"
                    : carregandoMunicipios
                      ? "Carregando municípios..."
                      : "Selecione o município..."}
                </option>
                {municipios.map((municipio) => (
                  <option key={municipio.id} value={municipio.id}>
                    {municipio.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <CampoReviewLabel htmlFor="telefoneFax" campoKey="telefoneFax" className={styles.label}>
                {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_TELEFONE_FAX}
              </CampoReviewLabel>
              <Input
                id="telefoneFax"
                name="telefoneFax"
                value={dadosFormulario.telefoneFax}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_TELEFONE_FAX}
                className={fieldClass("telefoneFax")}
                maxLength={15}
                disabled={fieldDisabled}
              />
            </div>

            <div className={styles.fieldGroup}>
              <CampoReviewLabel htmlFor="email" campoKey="email" className={styles.label}>
                {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_EMAIL}
              </CampoReviewLabel>
              <Input
                id="email"
                name="email"
                type="email"
                value={dadosFormulario.email}
                onChange={aoAlterar}
                placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_EMAIL}
                className={fieldClass("email")}
                disabled={fieldDisabled}
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <CampoReviewLabel htmlFor="paginaWeb" campoKey="paginaWeb" className={styles.label}>
              {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_PAGINA_WEB}
            </CampoReviewLabel>
            <Input
              id="paginaWeb"
              name="paginaWeb"
              value={dadosFormulario.paginaWeb}
              onChange={aoAlterar}
              placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_PAGINA_WEB}
              className={fieldClass("paginaWeb")}
              disabled={fieldDisabled}
            />
          </div>
        </div>
      </section>

      {!readOnlyView && (
        <div className={styles.actions}>
          {saveError ? (
            <p className="mr-auto text-sm text-destructive">{saveError}</p>
          ) : null}
          {!isEditing ? (
            canStartEditing ? (
              <GenericButton variant="editar" icon={Pencil} onClick={() => setIsEditing(true)}>
                Editar
              </GenericButton>
            ) : null
          ) : (
            <>
              <GenericButton
                variant="outline"
                icon={X}
                disabled={isSaving}
                onClick={() => {
                  setDadosFormulario(mapIdentificacaoToForm(identificacao))
                  setSaveError(null)
                  setIsEditing(false)
                }}
              >
                Cancelar
              </GenericButton>
              <GenericButton
                variant="salvar"
                icon={Check}
                disabled={isSaving}
                onClick={() => void handleSave()}
              >
                {isSaving ? "Salvando..." : "Salvar"}
              </GenericButton>
            </>
          )}
        </div>
      )}
</div>
  )
}

export default FormularioIdentificacaoProponente