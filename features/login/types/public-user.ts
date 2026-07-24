export type PublicUser = {
  id: string
  email: string
  name: string
  tipo: string
  perfilId: number
  perfilNome: string
  roles: number[]
  isAdmin: boolean
  /** Usuário interno com perfil Gestor do Projeto / Gestor Interno. */
  isGestorProjeto: boolean
}
