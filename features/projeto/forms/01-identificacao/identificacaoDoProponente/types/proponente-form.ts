import type { ProjectSession01Identificacao } from "@/features/projeto/types/project-session-01-identificacao"

import { formatCEP, formatCNPJ, formatTelefone } from "../utils/formatters"

/**
 * Estado utilizado pelo formulÃ¡rio de
 * IdentificaÃ§Ã£o do(a) Proponente.
 *
 * Alguns campos (UF e MunicÃ­pio) possuem dois valores:
 * - nome/sigla (utilizados na interface);
 * - cÃ³digo IBGE (persistido no banco).
 */
export type DadosIdentificacaoProponente = {
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

/**
 * Estado inicial do formulÃ¡rio.
 */
export const VAZIO_IDENTIFICACAO_PROPONENTE: Readonly<DadosIdentificacaoProponente> =
  {
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

/**
 * Converte os dados retornados pela API para o modelo
 * utilizado pelo formulÃ¡rio.
 *
 * ObservaÃ§Ã£o:
 * - UF e MunicÃ­pio sÃ£o carregados inicialmente apenas pelos
 *   respectivos cÃ³digos IBGE.
 * - Os nomes sÃ£o resolvidos posteriormente pelo hook
 *   `useProponenteLocalidade`.
 */
export function toIdentificacaoProponenteForm(
  identificacao: ProjectSession01Identificacao | null,
): DadosIdentificacaoProponente {
  if (!identificacao) {
    return VAZIO_IDENTIFICACAO_PROPONENTE
  }

  return {
    dataFundacao: identificacao.proponenteDataFundacao ?? "",
    registroCnpj: identificacao.proponenteRegistroCnpj ?? "",
    enderecoCompleto: identificacao.proponenteEndereco ?? "",
    municipioIbge: identificacao.proponenteMunicipioIbge,
    cnpj: formatCNPJ(identificacao.proponenteCnpj ?? ""),
    paginaWeb: identificacao.proponentePaginaWeb ?? "",
    cep: formatCEP(identificacao.proponenteCep ?? ""),
    bairro: identificacao.proponenteBairro ?? "",
    nome: identificacao.proponenteNome ?? "",
    email: identificacao.proponenteEmail ?? "",
    telefoneFax: formatTelefone(
      identificacao.proponenteTelefone ?? "",
    ),
    ufIbge: identificacao.proponenteUfIbge,
    municipio: "",
    uf: "",
  }
}