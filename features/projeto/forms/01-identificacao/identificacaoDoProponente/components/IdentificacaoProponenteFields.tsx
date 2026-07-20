"use client"

import { IDENTIFICACAO_PROPONENTE_LABELS, IDENTIFICACAO_PROPONENTE_PLACEHOLDERS } from "@/features/projeto/constants/identificacao-proponente"
import { CampoReviewLabel } from "@/features/projeto/components/formShared/secao-review-actions"
import { CEP_FEEDBACK, SELECT_CLASS_NAME, type CepStatus } from "../constants/form"
import type { IbgeEstado, IbgeMunicipio } from "@/features/projeto/services"
import type { DadosIdentificacaoProponente } from "../types/proponente-form"
import styles from "../identificacao-do-proponente.module.css"
import { Input } from "@/components/ui/input"
import type { ChangeEvent } from "react"
import { cn } from "@/lib/utils"

type IdentificacaoProponenteFieldsProps = {
  /** Dados do formulário. */
  dados: DadosIdentificacaoProponente

  /** Indica se os campos podem ser editados. */
  isLocked: boolean

  /** Estado atual da busca do CEP. */
  cepStatus: CepStatus

  /** CEP com 8 dígitos — libera UF, bairro e município. */
  isCepCompleto: boolean

  /** Lista de estados disponíveis. */
  estados: IbgeEstado[]

  /** Lista de municípios da UF selecionada. */
  municipios: IbgeMunicipio[]

  /** Indica se os municípios estão sendo carregados. */
  carregandoMunicipios: boolean

  /** Retorna a classe CSS de destaque para um campo em revisão. */
  fieldClass: (campoKey: string) => string

  /** Alteração dos campos de texto. */
  onChange: (
    event: ChangeEvent<HTMLInputElement>,
  ) => void

  /** Alteração dos selects. */
  onSelectChange: (
    event: ChangeEvent<HTMLSelectElement>,
  ) => void
}

/**
 * Campos da seção "Identificação do(a) Proponente".
 *
 * Responsável apenas pela renderização da interface.
 * Toda a lógica de carregamento, CEP, IBGE, edição e salvamento
 * permanece isolada no hook do formulário.
 */

/** Campos do formulário de Identificação do(a) Proponente. */
export function IdentificacaoProponenteFields({
  dados,
  isLocked,
  cepStatus,
  isCepCompleto,
  estados,
  municipios,
  carregandoMunicipios,
  fieldClass,
  onChange,
  onSelectChange,
}: IdentificacaoProponenteFieldsProps) {
  const isLocalidadeLocked = isLocked || !isCepCompleto

  return (
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
              value={dados.nome}
              onChange={onChange}
              placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_NOME}
              className={fieldClass("nome")}
              disabled={isLocked}
            />
          </div>

          <div className={styles.fieldGroup}>
            <CampoReviewLabel htmlFor="cnpj" campoKey="cnpj" className={styles.label}>
              {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_CNPJ}
            </CampoReviewLabel>
            <Input
              id="cnpj"
              name="cnpj"
              value={dados.cnpj}
              onChange={onChange}
              placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_CNPJ}
              className={fieldClass("cnpj")}
              maxLength={18}
              disabled={isLocked}
            />
          </div>
        </div>

        <div className={styles.grid2}>
          <div className={styles.fieldGroup}>
            <CampoReviewLabel
              htmlFor="dataFundacao"
              campoKey="dataFundacao"
              className={styles.label}
            >
              {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_DATA_FUNDACAO}
            </CampoReviewLabel>
            <Input
              id="dataFundacao"
              name="dataFundacao"
              type="date"
              value={dados.dataFundacao}
              onChange={onChange}
              className={fieldClass("dataFundacao")}
              disabled={isLocked}
              placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_DATA_FUNDACAO}
            />
          </div>

          <div className={styles.fieldGroup}>
            <CampoReviewLabel
              htmlFor="registroCnpj"
              campoKey="registroCnpj"
              className={styles.label}
            >
              {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_REGISTRO_CNPJ}
            </CampoReviewLabel>
            <Input
              id="registroCnpj"
              name="registroCnpj"
              type="date"
              value={dados.registroCnpj}
              onChange={onChange}
              className={fieldClass("registroCnpj")}
              disabled={isLocked}
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <CampoReviewLabel
            htmlFor="enderecoCompleto"
            campoKey="enderecoCompleto"
            className={styles.label}
          >
            {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_ENDERECO_COMPLETO}
          </CampoReviewLabel>
          <Input
            id="enderecoCompleto"
            name="enderecoCompleto"
            value={dados.enderecoCompleto}
            onChange={onChange}
            placeholder={
              IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_ENDERECO_COMPLETO
            }
            className={fieldClass("enderecoCompleto")}
            disabled={isLocked}
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
              value={dados.cep}
              onChange={onChange}
              placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_CEP}
              className={fieldClass("cep")}
              maxLength={9}
              disabled={isLocked}
            />
            {cepStatus !== "idle" ? (
              <span
                style={{
                  fontSize: "12px",
                  marginTop: "4px",
                  display: "block",
                  color: CEP_FEEDBACK[cepStatus].cor,
                }}
              >
                {CEP_FEEDBACK[cepStatus].texto}
              </span>
            ) : null}
          </div>

          <div className={styles.fieldGroup}>
            <CampoReviewLabel htmlFor="uf" campoKey="ufIbge" className={styles.label}>
              {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_UF}
            </CampoReviewLabel>
            <select
              id="uf"
              name="uf"
              value={dados.ufIbge ?? ""}
              onChange={onSelectChange}
              className={cn(
                SELECT_CLASS_NAME,
                fieldClass("ufIbge"),
                !(dados.ufIbge ?? "") && "text-muted-foreground",
              )}
              disabled={isLocalidadeLocked}
            >
              <option value="">
                {!isCepCompleto
                  ? "Informe o CEP primeiro"
                  : "Selecione a UF..."}
              </option>
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
              value={dados.bairro}
              onChange={onChange}
              className={fieldClass("bairro")}
              disabled={isLocalidadeLocked}
              placeholder={
                !isCepCompleto ? "Informe o CEP primeiro" : undefined
              }
            />
          </div>

          <div className={styles.fieldGroup}>
            <CampoReviewLabel
              htmlFor="municipio"
              campoKey="municipioIbge"
              className={styles.label}
            >
              {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_MUNICIPIO}
            </CampoReviewLabel>
            <select
              id="municipio"
              name="municipio"
              value={dados.municipioIbge ?? ""}
              onChange={onSelectChange}
              className={cn(
                SELECT_CLASS_NAME,
                fieldClass("municipioIbge"),
                !(dados.municipioIbge ?? "") && "text-muted-foreground",
              )}
              disabled={
                isLocalidadeLocked || !dados.uf || carregandoMunicipios
              }
            >
              <option value="">
                {!isCepCompleto
                  ? "Informe o CEP primeiro"
                  : !dados.uf
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
            <CampoReviewLabel
              htmlFor="telefoneFax"
              campoKey="telefoneFax"
              className={styles.label}
            >
              {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_TELEFONE_FAX}
            </CampoReviewLabel>
            <Input
              id="telefoneFax"
              name="telefoneFax"
              value={dados.telefoneFax}
              onChange={onChange}
              placeholder={
                IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_TELEFONE_FAX
              }
              className={fieldClass("telefoneFax")}
              maxLength={15}
              disabled={isLocked}
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
              value={dados.email}
              onChange={onChange}
              placeholder={IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_EMAIL}
              className={fieldClass("email")}
              disabled={isLocked}
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <CampoReviewLabel
            htmlFor="paginaWeb"
            campoKey="paginaWeb"
            className={styles.label}
          >
            {IDENTIFICACAO_PROPONENTE_LABELS.LABEL_PAGINA_WEB}
          </CampoReviewLabel>
          <Input
            id="paginaWeb"
            name="paginaWeb"
            value={dados.paginaWeb}
            onChange={onChange}
            placeholder={
              IDENTIFICACAO_PROPONENTE_PLACEHOLDERS.PLACEHOLDER_PAGINA_WEB
            }
            className={fieldClass("paginaWeb")}
            disabled={isLocked}
          />
        </div>
      </div>
    </section>
  )
}
