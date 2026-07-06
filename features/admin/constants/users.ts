export const USUARIO_TIPOS = {
  INTERNO: "interno",
  EXTERNO: "externo",
} as const

export type UsuarioTipo =
  (typeof USUARIO_TIPOS)[keyof typeof USUARIO_TIPOS]

export function normalizeUsuarioTipo(tipo: string): UsuarioTipo | null {
  const normalized = tipo.trim().toLowerCase()

  if (normalized === USUARIO_TIPOS.INTERNO) {
    return USUARIO_TIPOS.INTERNO
  }

  if (normalized === USUARIO_TIPOS.EXTERNO) {
    return USUARIO_TIPOS.EXTERNO
  }

  return null
}

export const ADMIN_USERS_FORM = {
  createTitle: "Criar usuário",
  editTitle: "Editar usuário",
  viewTitle: "Visualizar usuário",
  createDescription: "Informe os dados para cadastrar um novo usuário.",
  editDescription: "Atualize os dados do usuário selecionado.",
  viewDescription: "Confira os dados do usuário selecionado.",
  fields: {
    nome: "Nome",
    email: "E-mail",
    tipo: "Tipo",
    perfil: "Perfil",
    roles: "Permissões",
    ativo: "Usuário ativo",
  },
  placeholders: {
    nome: "Ex.: Maria Silva",
    email: "Ex.: maria.silva@org.gov.br",
    tipo: "Selecione o tipo",
    perfil: "Selecione um perfil",
    roles: "Nenhuma (opcional)",
  },
  validation: {
    nome: "Informe o nome do usuário.",
    email: "Informe o e-mail do usuário.",
    emailInvalid: "Informe um e-mail válido.",
    tipo: "Selecione o tipo válido (interno ou externo).",
    perfil: "Selecione um perfil.",
  },
  submitError: "Não foi possível salvar o usuário.",
  saving: "Salvando...",
  save: "Salvar usuário",
  saveChanges: "Salvar alterações",
  cancel: "Cancelar",
  close: "Fechar",
} as const
