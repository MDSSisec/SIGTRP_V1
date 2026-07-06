export type UsuarioRow = {
  id: string
  nome: string
  email: string
  tipo: string
  perfil_id: number
  senha: string | null
  roles: string
  ativo: boolean
  criado_em: string
  atualizado_em: string
}

export type Usuario = {
  id: string
  nome: string
  email: string
  tipo: string
  perfilId: number
  senha: string
  roles: number[]
  ativo: boolean
  criadoEm: string
  atualizadoEm: string
}

export type UsuarioFilter = "todos" | "ativos" | "inativos"

function parseRoles(roles: string): number[] {
  try {
    const parsed = JSON.parse(roles) as unknown

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter((role): role is number => typeof role === "number")
  } catch {
    return []
  }
}

export function toUsuario(row: UsuarioRow): Usuario {
  return {
    id: row.id,
    nome: row.nome,
    email: row.email,
    tipo: row.tipo,
    perfilId: row.perfil_id,
    senha: row.senha ?? "",
    roles: parseRoles(row.roles),
    ativo: row.ativo,
    criadoEm: row.criado_em,
    atualizadoEm: row.atualizado_em,
  }
}
