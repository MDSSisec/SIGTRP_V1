export type ProfileRow = {
  id: number
  nome: string
  descricao: string
}

export type Profile = {
  id: number
  nome: string
  descricao: string
}

export function toProfile(row: ProfileRow): Profile {
  return {
    id: row.id,
    nome: row.nome,
    descricao: row.descricao,
  }
}
