/**
 * Textos utilizados na tela de gerenciamento de projetos.
 *
 * Centralizar as mensagens neste arquivo facilita a manutenção,
 * padronização da interface e futura internacionalização (i18n).
 */
export const PROJETOS_TEXT = {
  /**
   * Informações da página.
   */
  page: {
    title: "Projetos",
    subtitle: "Gerencie os projetos do sistema.",
  },

  /**
   * Textos das ações da tela.
   */
  actions: {
    create: "Criar Projeto",
  },

  /**
   * Textos da busca.
   */
  search: {
    placeholder: "Buscar projeto...",
    ariaLabel: "Buscar projeto",
  },

  /**
   * Mensagens exibidas durante o carregamento.
   */
  loading: {
    projetos: "Carregando projetos...",
    projeto: "Carregando projeto...",
  },

  /**
   * Tela de edição do projeto.
   */
  edit: {
    backToList: "Voltar para projetos",
    notFound: "Projeto não encontrado.",
  },

  /**
   * Mensagens da tabela.
   */
  table: {
    empty: "Ainda não há nenhum projeto cadastrado.",
    emptyFiltered: "Nenhum projeto encontrado para os filtros aplicados.",
  },

  /**
   * Mensagens de erro.
   */
  errors: {
    loadUser: "Não foi possível carregar o usuário.",
    loadProjetos: "Não foi possível carregar os projetos.",
    createProjeto: "Erro ao salvar projeto.",
    deleteProjeto: "Erro ao excluir projeto.",
  },

  /**
   * Mensagens de sucesso.
   */
  success: {
    createProjeto: "Projeto criado com sucesso!",
    deleteProjeto: "Projeto excluído com sucesso!",
  },
} as const