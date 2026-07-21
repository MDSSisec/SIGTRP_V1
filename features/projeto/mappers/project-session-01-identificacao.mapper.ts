import type { ProjectSession01Identificacao } from "../types/project-session-01-identificacao"

type DbNumeric = string | number | null

/** Registro bruto da tabela de identificação (snake_case). */
export type ProjectSession01IdentificacaoRow = {
  id: string
  projeto_id: string
  nome_projeto: string | null
  local_execucao: string | null
  duracao: string | null
  resumo_projeto: string | null
  proponente_nome: string | null
  proponente_cnpj: DbNumeric
  proponente_data_fundacao: string | Date | null
  proponente_registro_cnpj: string | Date | null
  proponente_endereco: string | null
  proponente_bairro: string | null
  proponente_uf_ibge: number | null
  proponente_municipio_ibge: number | null
  proponente_cep: DbNumeric
  proponente_telefone: DbNumeric
  proponente_email: string | null
  proponente_pagina_web: string | null
  representante_nome: string | null
  representante_matricula_funcional: string | null
  representante_profissao: string | null
  representante_cargo: string | null
  representante_estado_civil: string | null
  representante_telefone: DbNumeric
  representante_email: string | null
  responsavel_tecnico_nome: string | null
  responsavel_tecnico_cargo: string | null
  responsavel_tecnico_telefone: DbNumeric
  responsavel_tecnico_celular: DbNumeric
  responsavel_tecnico_email: string | null
  criado_em: string
  atualizado_em: string
}

function normalizeDigits(value: DbNumeric): string | null {
  if (value == null || value === "") return null
  const digits = String(value).replace(/\D/g, "")
  return digits || null
}

function normalizeDate(value: string | Date | null | undefined): string | null {
  if (value == null || value === "") return null

  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return null
    return value.toISOString().slice(0, 10)
  }

  const text = String(value).trim()
  const match = text.match(/^(\d{4}-\d{2}-\d{2})/)
  return match ? match[1] : text || null
}

export function toProjectSession01Identificacao(
  row: ProjectSession01IdentificacaoRow,
): ProjectSession01Identificacao {
  return {
    id: row.id,
    projetoId: row.projeto_id,
    nomeProjeto: row.nome_projeto,
    localExecucao: row.local_execucao,
    duracao: row.duracao,
    resumoProjeto: row.resumo_projeto,
    proponenteNome: row.proponente_nome,
    proponenteCnpj: normalizeDigits(row.proponente_cnpj),
    proponenteDataFundacao: normalizeDate(row.proponente_data_fundacao),
    proponenteRegistroCnpj: normalizeDate(row.proponente_registro_cnpj),
    proponenteEndereco: row.proponente_endereco,
    proponenteBairro: row.proponente_bairro,
    proponenteUfIbge: row.proponente_uf_ibge,
    proponenteMunicipioIbge: row.proponente_municipio_ibge,
    proponenteCep: normalizeDigits(row.proponente_cep),
    proponenteTelefone: normalizeDigits(row.proponente_telefone),
    proponenteEmail: row.proponente_email,
    proponentePaginaWeb: row.proponente_pagina_web,
    representanteNome: row.representante_nome,
    representanteMatriculaFuncional:
      row.representante_matricula_funcional?.trim() || null,
    representanteProfissao: row.representante_profissao,
    representanteCargo: row.representante_cargo,
    representanteEstadoCivil: row.representante_estado_civil,
    representanteTelefone: normalizeDigits(row.representante_telefone),
    representanteEmail: row.representante_email,
    responsavelTecnicoNome: row.responsavel_tecnico_nome,
    responsavelTecnicoCargo: row.responsavel_tecnico_cargo,
    responsavelTecnicoTelefone: normalizeDigits(row.responsavel_tecnico_telefone),
    responsavelTecnicoCelular: normalizeDigits(row.responsavel_tecnico_celular),
    responsavelTecnicoEmail: row.responsavel_tecnico_email,
    criadoEm: row.criado_em,
    atualizadoEm: row.atualizado_em,
  }
}
