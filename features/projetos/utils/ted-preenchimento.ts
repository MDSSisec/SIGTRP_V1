import type { TedIdentificacao } from "../types/ted-identificacao"

/**
 * Representa uma seção da tela e os campos utilizados para verificar
 * se ela já possui informações preenchidas.
 */
type SectionConfig = {
  key: string
  fields: Array<keyof TedIdentificacao>
}

/**
 * Configuração das seções da Identificação do TED.
 *
 * Cada seção é considerada concluída quando pelo menos um de seus
 * campos possui valor preenchido.
 */
const TED_IDENTIFICACAO_SECTIONS: SectionConfig[] = [
  {
    key: "TITLE_SESSAO_IDENTIFICACAO_PROJETO",
    fields: [
      "localExecucao",
      "duracao",
      "resumoProjeto",
    ],
  },
  {
    key: "TITLE_SESSAO_IDENTIFICACAO_PROPOSTA",
    fields: [
      "proponenteNome",
      "proponenteCnpj",
      "proponenteDataFundacao",
      "proponenteRegistroCnpj",
      "proponenteEndereco",
      "proponenteBairro",
      "proponenteUfIbge",
      "proponenteMunicipioIbge",
      "proponenteCep",
      "proponenteTelefone",
      "proponenteEmail",
      "proponentePaginaWeb",
    ],
  },
  {
    key: "TITLE_SESSAO_IDENTIFICACAO_REPRESENTANTE_LEGAL",
    fields: [
      "representanteNome",
      "representanteCpf",
      "representanteProfissao",
      "representanteCargo",
      "representanteEstadoCivil",
      "representanteTelefone",
      "representanteEmail",
    ],
  },
  {
    key: "TITLE_SESSAO_IDENTIFICACAO_RESPONSAVEL_TECNICO",
    fields: [
      "responsavelTecnicoNome",
      "responsavelTecnicoCargo",
      "responsavelTecnicoTelefone",
      "responsavelTecnicoCelular",
      "responsavelTecnicoEmail",
    ],
  },
]

/**
 * Verifica se um valor é considerado preenchido.
 */
function isFilled(value: unknown): boolean {
  if (typeof value === "string") {
    return value.trim().length > 0
  }

  if (typeof value === "number") {
    return Number.isFinite(value)
  }

  return false
}

/**
 * Retorna as chaves das seções da Identificação do TED que possuem
 * pelo menos um campo preenchido.
 *
 * O retorno é utilizado para marcar as etapas concluídas na visão geral.
 */
export function getItensConcluidosFromTedIdentificacao(
  identificacao: TedIdentificacao | null,
): Set<string> {
  const completedSections = new Set<string>()

  if (!identificacao) {
    return completedSections
  }

  for (const section of TED_IDENTIFICACAO_SECTIONS) {
    const hasFilledField = section.fields.some((field) =>
      isFilled(identificacao[field]),
    )

    if (hasFilledField) {
      completedSections.add(section.key)
    }
  }

  return completedSections
}