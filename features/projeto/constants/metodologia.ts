export const METODOLOGIA_TITLE = {
  TITLE: "9. Metodologia",
} as const

export const METODOLOGIA_META_VISUAL = {
  ITEM: "9.1.",
  PREFIX: "Metodologia da Meta 1 - Realizar Capacitações técnicas na área de",
  MIDDLE: "para",
  SUFFIX: "pessoas em situação de vulnerabilidade social.",
} as const

export const METODOLOGIA_PLACEHOLDERS = {
  METODOLOGIA:
    "(Descrever como será executado o projeto, informando os procedimentos, processos e/ou técnicas para o alcance dos objetivos, o perfil e composição da equipe responsável, a gestão do projeto, as estratégias para inserção no mercado de trabalho etc. Deve abordar as diretrizes para a atuação territorializada, indicando a compatibilidade entre o público beneficiário e a metodologia adotada, bem como apresentar o potencial do projeto para a sustentabilidade e para a participação efetiva da comunidade no processo)",
  ETAPA: "Explicar detalhadamente como será realizada a etapa.",
  ETAPA_1_3:
    "Descrever etapa e indicar na tabela os insumos necessários para cada curso.",
  ETAPA_1_4:
    "Explique detalhadamente como será realizada a etapa.",
} as const

export const METODOLOGIA_ETAPAS_VISUAIS = [
  {
    item: "9.1.1.",
    etapa: "Etapa 1.1",
    placeholder: METODOLOGIA_PLACEHOLDERS.ETAPA,
    partes: [
      {
        type: "text",
        value:
          "Planejar, executar, monitorar, mobilizar, sensibilizar e divulgar as ações/atividades do projeto, compreendendo a realização dos processos licitatórios para contratação dos serviços, da aquisição de bens e insumos necessários à execução do projeto.",
      },
    ],
  },
  {
    item: "9.1.2.",
    etapa: "Etapa 1.2",
    placeholder: METODOLOGIA_PLACEHOLDERS.ETAPA,
    partes: [
      { type: "text", value: "Estruturar" },
      { type: "slot", key: "espacos", size: "sm" },
      {
        type: "text",
        value:
          "espaços de capacitação, com equipamentos necessários para a realização das ações de qualificação profissional.",
      },
    ],
  },
  {
    item: "9.1.3.",
    etapa: "Etapa 1.3",
    placeholder: METODOLOGIA_PLACEHOLDERS.ETAPA_1_3,
    partes: [
      { type: "text", value: "Realizar Curso de" },
      { type: "slot", key: "curso", size: "lg" },
      { type: "text", value: ", com carga horária de" },
      { type: "slot", key: "cargaHoraria", size: "sm" },
      { type: "text", value: "horas, para" },
      { type: "slot", key: "pessoas", size: "sm" },
      { type: "text", value: "pessoas, distribuídas em" },
      { type: "slot", key: "turmas", size: "sm" },
      { type: "text", value: "turmas." },
    ],
  },
  {
    item: "9.1.4.",
    etapa: "Etapa 1.4",
    placeholder: METODOLOGIA_PLACEHOLDERS.ETAPA_1_4,
    partes: [
      {
        type: "text",
        value:
          "Promover evento de encerramento das turmas, com entrega de certificados e kits de trabalho (se houver kits).",
      },
    ],
  },
] as const
