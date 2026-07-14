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
