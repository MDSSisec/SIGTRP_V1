export type TedSidebarMenuItem = {
  title: string
  slug: string
}

export type TedSidebarMenuGroup = {
  title: string
  items: TedSidebarMenuItem[]
}

/** Grupos do menu lateral do formulário TRP (seções I a VI). */
export const TED_SIDEBAR_MENU_GROUPS: TedSidebarMenuGroup[] = [
  {
    title: "Visão Geral do Projeto",
    items: [
      { title: "Informações do Projeto", slug: "informacoes-projeto" },
      { title: "Visão Geral do Projeto", slug: "visao-geral" },
    ],
  },
  {
    title: "Observações",
    items: [
      { title: "Observações", slug: "observacoes" },
      { title: "Andamento do Projeto", slug: "andamento-projeto" },
    ],
  },
  {
    title: "I - Identificação",
    items: [
      { title: "1. Identificação do Projeto", slug: "identificacao-projeto" },
      { title: "2. Identificação do(a) proponente", slug: "identificacao-proponente" },
      {
        title: "3. Identificação do representante legal do(a) proponente",
        slug: "identificacao-representante-legal",
      },
      { title: "4. Identificação do responsável técnico", slug: "identificacao-responsavel-tecnico" },
    ],
  },
  {
    title: "II - Descrição do Projeto",
    items: [
      {
        title: "5. Justificativa e Motivação para celebração do instrumento",
        slug: "justificativa",
      },
      { title: "6. Objetivos", slug: "objetivos" },
      { title: "7. Metas", slug: "metas" },
      { title: "8. Etapas e cronograma de execução", slug: "etapas-cronograma" },
      { title: "9. Metodologia", slug: "metodologia" },
      { title: "10. Resultados Esperados", slug: "resultados-esperados" },
      { title: "11. Gestão do Projeto", slug: "gestao-projeto" },
    ],
  },
  {
    title: "III - Participantes e Abrangência do Projeto",
    items: [
      {
        title: "12. Histórico e situação socioeconômica do território e da população a ser beneficiada",
        slug: "historico-situacao-territorio",
      },
      { title: "13. Detalhamento da base territorial do projeto", slug: "base-territorial" },
      { title: "14. Público beneficiário do projeto", slug: "publico-beneficiario" },
      {
        title: "15. Informe se o público faz parte de algum destes povos ou comunidades tradicionais",
        slug: "povos-comunidades-tradicionais",
      },
      {
        title: "16. Informe o perfil sócio-ocupacional predominante do público beneficiário",
        slug: "perfil-socio-ocupacional",
      },
      {
        title: "17. Informe se o público beneficiário está acessando alguns dos seguintes serviços",
        slug: "servicos-acessados",
      },
    ],
  },
  {
    title: "IV - Caracterização do(a) proponente",
    items: [
      {
        title: "18. Outras informações julgadas apropriadas sobre o(a) proponente",
        slug: "outras-informacoes-proponente",
      },
    ],
  },
  {
    title: "V - Dados Financeiros",
    items: [
      { title: "19. Valor total do projeto", slug: "valor-total" },
      { title: "20. Cronograma de desembolso", slug: "cronograma-desembolso" },
      {
        title: "21. Detalhamento do orçamento de bens e serviços com memória de cálculo por meta, etapa e tipo de despesa",
        slug: "detalhamento-orcamento",
      },
      {
        title: "22. Resumo do plano de aplicação por elemento de despesa",
        slug: "resumo-plano-aplicacao",
      },
    ],
  },
  {
    title: "VI - Monitoramento e Avaliação",
    items: [
      {
        title: "23. Procedimentos de monitoramento e avaliação da execução e resultados",
        slug: "procedimentos-monitoramento",
      },
      { title: "24. Indicadores de eficiência e eficácia", slug: "indicadores-eficiencia" },
    ],
  },
]
