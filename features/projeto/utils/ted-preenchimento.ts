import type { ProjectSession01Identificacao } from "@/features/projeto/types/project-session-01-identificacao"
import type { ProjectSession02Description } from "@/features/projeto/types/project-session-02-description"
import type { ProjectSession03Participants } from "@/features/projeto/types/project-session-03-participants"
import type { ProjectSession04Characterization } from "@/features/projeto/types/project-session-04-characterization"

type SectionConfig<T> = {
  key: string
  fields: Array<keyof T>
}

/**
 * Seções da Identificação (sessão 01).
 * Concluída quando pelo menos um campo da seção está preenchido.
 */
const IDENTIFICACAO_SECTIONS: SectionConfig<ProjectSession01Identificacao>[] = [
  {
    key: "TITLE_SESSAO_IDENTIFICACAO_PROJETO",
    fields: ["localExecucao", "duracao", "resumoProjeto"],
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
      "representanteMatriculaFuncional",
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
 * Seções da Descrição (sessão 02) já persistidas.
 */
const DESCRICAO_SECTIONS: SectionConfig<ProjectSession02Description>[] = [
  {
    key: "TITLE_SESSAO_JUSTIFICATIVA_MOTIVACAO",
    fields: [
      "justificativaCaracterizacaoInteresses",
      "justificativaPublicoAlvo",
      "justificativaProblema",
      "justificativaResultadosEsperados",
      "justificativaRelacaoPrograma",
    ],
  },
  {
    key: "TITLE_SESSAO_METODOLOGIA",
    fields: [
      "metodologiaMeta",
      "metodologiaEtapa11",
      "metodologiaEtapa12",
      "metodologiaEtapa13",
      "metodologiaEtapa14",
    ],
  },
]

/**
 * Seções de Participantes (sessão 03).
 */
const PARTICIPANTES_SECTIONS: SectionConfig<ProjectSession03Participants>[] = [
  {
    key: "TITLE_SESSAO_HISTORICO_SITUACAO_TERRITORIO",
    fields: ["historicoSituacaoTexto"],
  },
  {
    key: "TITLE_SESSAO_BASE_TERRITORIAL",
    fields: ["baseTerritorialLinhas"],
  },
  {
    key: "TITLE_SESSAO_PUBLICO_BENEFICIARIO",
    fields: ["publicoHomensDiretos", "publicoMulheresDiretos"],
  },
  {
    key: "TITLE_SESSAO_POVOS_COMUNIDADES_TRADICIONAIS",
    fields: ["povosSelecoes", "povosOutrosEspecificar"],
  },
  {
    key: "TITLE_SESSAO_PERFIL_SOCIO_OCUPACIONAL",
    fields: ["perfilSelecoes", "perfilOutrosEspecificar"],
  },
  {
    key: "TITLE_SESSAO_PUBLICO_BENEFICIARIO_E_SERVICOS",
    fields: ["servicosSelecoes", "servicosOutrosEspecificar"],
  },
]

/**
 * Seções de Caracterização (sessão 04).
 */
const CARACTERIZACAO_SECTIONS: SectionConfig<ProjectSession04Characterization>[] =
  [
    {
      key: "TITLE_SESSAO_OUTRAS_INFORMACOES_PROPOSTA",
      fields: ["outrasInformacoesTexto"],
    },
  ]

function isFilled(value: unknown): boolean {
  if (typeof value === "string") {
    return value.trim().length > 0
  }

  if (typeof value === "number") {
    return Number.isFinite(value)
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return false

    return value.some((item) => {
      if (typeof item === "string") return item.trim().length > 0
      if (item && typeof item === "object") {
        return Object.values(item as Record<string, unknown>).some(isFilled)
      }
      return isFilled(item)
    })
  }

  return false
}

function collectCompletedSections<T extends object>(
  data: T | null,
  sections: SectionConfig<T>[],
): Set<string> {
  const completed = new Set<string>()

  if (!data) return completed

  for (const section of sections) {
    const hasFilledField = section.fields.some((field) =>
      isFilled(data[field]),
    )

    if (hasFilledField) {
      completed.add(section.key)
    }
  }

  return completed
}

export function getItensConcluidosFromIdentificacao(
  identificacao: ProjectSession01Identificacao | null,
): Set<string> {
  return collectCompletedSections(identificacao, IDENTIFICACAO_SECTIONS)
}

/** @deprecated Use getItensConcluidosFromIdentificacao */
export const getItensConcluidosFromTedIdentificacao =
  getItensConcluidosFromIdentificacao

export function getItensConcluidosFromDescricao(
  descricao: ProjectSession02Description | null,
): Set<string> {
  return collectCompletedSections(descricao, DESCRICAO_SECTIONS)
}

export function getItensConcluidosFromParticipantes(
  participantes: ProjectSession03Participants | null,
): Set<string> {
  return collectCompletedSections(participantes, PARTICIPANTES_SECTIONS)
}

export function getItensConcluidosFromCaracterizacao(
  caracterizacao: ProjectSession04Characterization | null,
): Set<string> {
  return collectCompletedSections(caracterizacao, CARACTERIZACAO_SECTIONS)
}

/** Une vários conjuntos de seções concluídas. */
export function mergeItensConcluidos(
  ...sets: Array<Set<string> | null | undefined>
): Set<string> {
  const merged = new Set<string>()

  for (const set of sets) {
    if (!set) continue
    for (const key of set) {
      merged.add(key)
    }
  }

  return merged
}

/**
 * Calcula os itens preenchidos a partir dos dados persistidos das sessões.
 */
export function getItensConcluidos(options: {
  identificacao?: ProjectSession01Identificacao | null
  descricao?: ProjectSession02Description | null
  participantes?: ProjectSession03Participants | null
  caracterizacao?: ProjectSession04Characterization | null
}): Set<string> {
  return mergeItensConcluidos(
    getItensConcluidosFromIdentificacao(options.identificacao ?? null),
    getItensConcluidosFromDescricao(options.descricao ?? null),
    getItensConcluidosFromParticipantes(options.participantes ?? null),
    getItensConcluidosFromCaracterizacao(options.caracterizacao ?? null),
  )
}
