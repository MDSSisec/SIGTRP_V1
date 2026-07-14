import { redirect } from "next/navigation"

type PageProps = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ secao?: string }>
}

/** Compatibilidade com a rota antiga `/projetos/[id]/ted`. */
export default async function ProjetoTedRedirectPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params
  const query = await searchParams
  const secao = query.secao ? `?secao=${encodeURIComponent(query.secao)}` : ""

  redirect(`/projetos/${id}/editar${secao}`)
}
