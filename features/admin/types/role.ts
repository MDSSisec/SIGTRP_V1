export type RoleRow = {
  id: number
  nome: string
  descricao: string
}

export type Role = {
  id: number
  nome: string
  descricao: string
}

export function toRole(row: RoleRow): Role {
  return {
    id: row.id,
    nome: row.nome,
    descricao: row.descricao,
  }
}
