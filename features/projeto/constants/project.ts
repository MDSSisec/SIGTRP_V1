/**
 * Textos utilizados na tela de cadastro, edição e visualização de projetos.
 *
 * Centralizar as mensagens neste arquivo facilita a manutenção,
 * padronização da interface e futura internacionalização (i18n).
 */
export const PROJETOS_FORM = {
  /**
   * Títulos das páginas.
   */
  createTitle: "Criar projeto",
  editTitle: "Editar projeto",
  viewTitle: "Visualizar projeto",

  /**
   * Descrições exibidas abaixo do título.
   */
  createDescription: "Informe os dados para cadastrar um novo projeto.",
  editDescription: "Atualize os dados do projeto selecionado.",
  viewDescription: "Confira os dados do projeto selecionado.",

  /**
   * Labels dos campos do formulário.
   */
  fields: {
    tipoProjeto: "Tipo do projeto",
    nome: "Nome do projeto",
    responsavelInterno: "Responsável interno",
    responsavelExterno: "Responsável externo",
  },

  /**
   * Placeholders dos campos.
   */
  placeholders: {
    tipoProjeto: "Selecione o tipo do projeto",
    nome: "Ex.: Modernização da infraestrutura",
    responsavelInterno: "Selecione o responsável interno",
    responsavelExterno: "Selecione o responsável externo",
  },

  /**
   * Mensagens de validação.
   */
  validation: {
    tipoProjeto: "Selecione o tipo do projeto.",
    nome: "Informe o nome do projeto.",
    responsavelInterno: "Selecione o responsável interno.",
    responsavelExterno: "Selecione o responsável externo.",
  },

  /**
   * Mensagens e ações.
   */
  submitError: "Não foi possível salvar o projeto.",
  saving: "Salvando...",
  save: "Salvar projeto",
  saveChanges: "Salvar alterações",
  cancel: "Cancelar",
  close: "Fechar",
  emptyResponsavelInterno: "Nenhum responsável interno cadastrado.",
  emptyResponsavelExterno: "Nenhum responsável externo cadastrado.",
} as const