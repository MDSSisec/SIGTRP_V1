"use client"

import type { ChangeEvent } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formLayoutStyles } from "@/features/projeto/components/formShared/form-section"
import type { ProjetoEtapa, ResponsavelOption } from "@/features/projeto/types"
import { cn } from "@/lib/utils"

import { VIEW_MODE_FIELD_CLASS } from "../constants/form"
import type { DadosInformacoesProjeto } from "../types/informacoes-form"

type InformacoesProjetoFieldsProps = {
  dados: DadosInformacoesProjeto
  tipoProjetoLabel: string
  etapas: ProjetoEtapa[]
  responsaveisInternos: ResponsavelOption[]
  responsaveisExternos: ResponsavelOption[]
  canEditInfo: boolean
  isInfoLocked: boolean
  isResponsaveisLocked: boolean
  isViewMode: boolean
  readOnlyView?: boolean
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

export function InformacoesProjetoFields({
  dados,
  tipoProjetoLabel,
  etapas,
  responsaveisInternos,
  responsaveisExternos,
  canEditInfo,
  isInfoLocked,
  isResponsaveisLocked,
  isViewMode,
  readOnlyView,
  onChange,
}: InformacoesProjetoFieldsProps) {
  return (
    <>
      <section className={formLayoutStyles.section}>
        <h2 className={formLayoutStyles.title}>Informações do Projeto</h2>
        {!canEditInfo && !readOnlyView ? (
          <p className="text-sm text-muted-foreground">
            Apenas administradores ou gestores internos do MDS podem alterar a
            etapa do projeto.
          </p>
        ) : null}
        <div className={formLayoutStyles.grid2}>
          <div className={formLayoutStyles.fieldGroup}>
            <Label htmlFor="tipoProjeto" className={formLayoutStyles.label}>
              Tipo do projeto
            </Label>
            <Input
              id="tipoProjeto"
              type="text"
              value={tipoProjetoLabel}
              readOnly
              tabIndex={-1}
              className={cn(formLayoutStyles.input, VIEW_MODE_FIELD_CLASS)}
            />
          </div>
          <div className={formLayoutStyles.fieldGroup}>
            <Label htmlFor="etapaId" className={formLayoutStyles.label}>
              Etapa do projeto
            </Label>
            <select
              id="etapaId"
              name="etapaId"
              value={dados.etapaId}
              onChange={onChange}
              className={cn(
                formLayoutStyles.select,
                isViewMode && VIEW_MODE_FIELD_CLASS,
              )}
              disabled={isInfoLocked}
            >
              <option value="">Selecione...</option>
              {etapas.map((etapa) => (
                <option key={etapa.id} value={etapa.id}>
                  {etapa.nome}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className={formLayoutStyles.section}>
        <h2 className={formLayoutStyles.title}>Responsáveis</h2>
        <div className={formLayoutStyles.grid2}>
          <div className={formLayoutStyles.fieldGroup}>
            <Label
              htmlFor="responsavelInternoId"
              className={formLayoutStyles.label}
            >
              Usuário interno
            </Label>
            <select
              id="responsavelInternoId"
              name="responsavelInternoId"
              value={dados.responsavelInternoId}
              onChange={onChange}
              className={cn(
                formLayoutStyles.select,
                isViewMode && VIEW_MODE_FIELD_CLASS,
              )}
              disabled={isResponsaveisLocked}
            >
              <option value="">Selecione...</option>
              {responsaveisInternos.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nome}
                </option>
              ))}
            </select>
          </div>
          <div className={formLayoutStyles.fieldGroup}>
            <Label
              htmlFor="responsavelExternoId"
              className={formLayoutStyles.label}
            >
              Usuário externo
            </Label>
            <select
              id="responsavelExternoId"
              name="responsavelExternoId"
              value={dados.responsavelExternoId}
              onChange={onChange}
              className={cn(
                formLayoutStyles.select,
                isViewMode && VIEW_MODE_FIELD_CLASS,
              )}
              disabled={isResponsaveisLocked}
            >
              <option value="">Selecione...</option>
              {responsaveisExternos.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nome}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>
    </>
  )
}
