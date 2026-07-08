export type TedIdentificacaoRow = {
  id: string
  projeto_id: string
  nome_projeto: string | null
  local_execucao: string | null
  duracao: string | null
  resumo_projeto: string | null
  proponente_nome: string | null
  proponente_cnpj: string | null
  proponente_data_fundacao: string | null
  proponente_registro_cnpj: string | null
  proponente_endereco: string | null
  proponente_bairro: string | null
  proponente_uf_ibge: number | null
  proponente_municipio_ibge: number | null
  proponente_cep: string | null
  proponente_telefone: string | null
  proponente_email: string | null
  proponente_pagina_web: string | null
  representante_nome: string | null
  representante_cpf: string | null
  representante_profissao: string | null
  representante_cargo: string | null
  representante_estado_civil: string | null
  representante_telefone: string | null
  representante_email: string | null
  responsavel_tecnico_nome: string | null
  responsavel_tecnico_cargo: string | null
  responsavel_tecnico_telefone: string | null
  responsavel_tecnico_celular: string | null
  responsavel_tecnico_email: string | null
  criado_em: string
  atualizado_em: string
}

export type TedIdentificacao = {
  id: string
  projetoId: string
  nomeProjeto: string | null
  localExecucao: string | null
  duracao: string | null
  resumoProjeto: string | null
  proponenteNome: string | null
  proponenteCnpj: string | null
  proponenteDataFundacao: string | null
  proponenteRegistroCnpj: string | null
  proponenteEndereco: string | null
  proponenteBairro: string | null
  proponenteUfIbge: number | null
  proponenteMunicipioIbge: number | null
  proponenteCep: string | null
  proponenteTelefone: string | null
  proponenteEmail: string | null
  proponentePaginaWeb: string | null
  representanteNome: string | null
  representanteCpf: string | null
  representanteProfissao: string | null
  representanteCargo: string | null
  representanteEstadoCivil: string | null
  representanteTelefone: string | null
  representanteEmail: string | null
  responsavelTecnicoNome: string | null
  responsavelTecnicoCargo: string | null
  responsavelTecnicoTelefone: string | null
  responsavelTecnicoCelular: string | null
  responsavelTecnicoEmail: string | null
  criadoEm: string
  atualizadoEm: string
}

export type TedIdentificacaoProjetoInput = {
  nomeProjeto?: string
  localExecucao?: string
  duracao?: string
  resumoProjeto?: string
}

export type TedIdentificacaoProponenteInput = {
  proponenteNome?: string
  proponenteCnpj?: string
  proponenteDataFundacao?: string
  proponenteRegistroCnpj?: string
  proponenteEndereco?: string
  proponenteBairro?: string
  proponenteUfIbge?: number | null
  proponenteMunicipioIbge?: number | null
  proponenteCep?: string
  proponenteTelefone?: string
  proponenteEmail?: string
  proponentePaginaWeb?: string
}

export type TedIdentificacaoRepresentanteInput = {
  representanteNome?: string
  representanteCpf?: string
  representanteProfissao?: string
  representanteCargo?: string
  representanteEstadoCivil?: string
  representanteTelefone?: string
  representanteEmail?: string
}

export type TedIdentificacaoResponsavelTecnicoInput = {
  responsavelTecnicoNome?: string
  responsavelTecnicoCargo?: string
  responsavelTecnicoTelefone?: string
  responsavelTecnicoCelular?: string
  responsavelTecnicoEmail?: string
}

export function toTedIdentificacao(row: TedIdentificacaoRow): TedIdentificacao {
  return {
    id: row.id,
    projetoId: row.projeto_id,
    nomeProjeto: row.nome_projeto,
    localExecucao: row.local_execucao,
    duracao: row.duracao,
    resumoProjeto: row.resumo_projeto,
    proponenteNome: row.proponente_nome,
    proponenteCnpj: row.proponente_cnpj,
    proponenteDataFundacao: row.proponente_data_fundacao,
    proponenteRegistroCnpj: row.proponente_registro_cnpj,
    proponenteEndereco: row.proponente_endereco,
    proponenteBairro: row.proponente_bairro,
    proponenteUfIbge: row.proponente_uf_ibge,
    proponenteMunicipioIbge: row.proponente_municipio_ibge,
    proponenteCep: row.proponente_cep,
    proponenteTelefone: row.proponente_telefone,
    proponenteEmail: row.proponente_email,
    proponentePaginaWeb: row.proponente_pagina_web,
    representanteNome: row.representante_nome,
    representanteCpf: row.representante_cpf,
    representanteProfissao: row.representante_profissao,
    representanteCargo: row.representante_cargo,
    representanteEstadoCivil: row.representante_estado_civil,
    representanteTelefone: row.representante_telefone,
    representanteEmail: row.representante_email,
    responsavelTecnicoNome: row.responsavel_tecnico_nome,
    responsavelTecnicoCargo: row.responsavel_tecnico_cargo,
    responsavelTecnicoTelefone: row.responsavel_tecnico_telefone,
    responsavelTecnicoCelular: row.responsavel_tecnico_celular,
    responsavelTecnicoEmail: row.responsavel_tecnico_email,
    criadoEm: row.criado_em,
    atualizadoEm: row.atualizado_em,
  }
}
