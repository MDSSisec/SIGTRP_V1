const IBGE_BASE_URL = "https://servicodados.ibge.gov.br/api/v1/localidades"

export type IbgeEstado = {
  id: number
  sigla: string
  nome: string
}

export type IbgeMunicipio = {
  id: number
  nome: string
}

export async function fetchEstados(signal?: AbortSignal): Promise<IbgeEstado[]> {
  const response = await fetch(`${IBGE_BASE_URL}/estados?orderBy=nome`, {
    signal,
  })

  if (!response.ok) {
    throw new Error("Não foi possível carregar os estados (IBGE).")
  }

  const data = (await response.json()) as IbgeEstado[]
  return data.map((uf) => ({ id: uf.id, sigla: uf.sigla, nome: uf.nome }))
}

export async function fetchMunicipiosByUf(
  uf: string,
  signal?: AbortSignal,
): Promise<IbgeMunicipio[]> {
  const sigla = uf.trim().toUpperCase()

  if (!sigla) return []

  const response = await fetch(
    `${IBGE_BASE_URL}/estados/${sigla}/municipios?orderBy=nome`,
    { signal },
  )

  if (!response.ok) {
    throw new Error("Não foi possível carregar os municípios (IBGE).")
  }

  const data = (await response.json()) as IbgeMunicipio[]
  return data.map((municipio) => ({ id: municipio.id, nome: municipio.nome }))
}
