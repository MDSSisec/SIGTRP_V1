import {
  DEFAULT_CURSO_DESPESA_PRESETS,
  findItemCurso,
} from "@/features/projeto/constants/ted/catalogo-despesas-curso"

export type DadosGeraisProjetoState = {
  custoTotalProjeto: string
  quantidadeCursos: number
  possuiEventoCertificacao: boolean
}

export type CursoDespesaRow = {
  id: string
  tipoItemDespesa: string
  itemDespesa: string
  codigoElementoDespesa: string
  unidade: string
  quantidadeItens: string
  valorUnitario: string
}

export type CursoDetalhamentoDados = {
  id: string
  nomeCurso: string
  cargaHoraria: string
  quantidadeParticipantes: string
  cargaHorariaDiaria: string
  quantidadeDiasSemanais: string
  quantidadeTurmas: string
  participantesPorTurma: string
  despesas: CursoDespesaRow[]
}

let despesaSeq = 0

export function createEmptyDespesa(): CursoDespesaRow {
  despesaSeq += 1
  return {
    id: `despesa-${Date.now()}-${despesaSeq}`,
    tipoItemDespesa: "",
    itemDespesa: "",
    codigoElementoDespesa: "",
    unidade: "",
    quantidadeItens: "",
    valorUnitario: "",
  }
}

export function createDespesaFromPreset(preset: {
  tipoId: string
  itemId: string
}): CursoDespesaRow {
  const item = findItemCurso(preset.tipoId, preset.itemId)
  despesaSeq += 1

  return {
    id: `despesa-${Date.now()}-${despesaSeq}`,
    tipoItemDespesa: preset.tipoId,
    itemDespesa: preset.itemId,
    codigoElementoDespesa: item?.codigo ?? "",
    unidade: item?.unidades[0] ?? "",
    quantidadeItens: "",
    valorUnitario: "",
  }
}

export function createDefaultCursoDespesas(): CursoDespesaRow[] {
  return DEFAULT_CURSO_DESPESA_PRESETS.map((preset) =>
    createDespesaFromPreset(preset),
  )
}

export function createEmptyCurso(index: number): CursoDetalhamentoDados {
  return {
    id: `curso-${index + 1}`,
    nomeCurso: "",
    cargaHoraria: "",
    quantidadeParticipantes: "",
    cargaHorariaDiaria: "",
    quantidadeDiasSemanais: "",
    quantidadeTurmas: "",
    participantesPorTurma: "",
    despesas: createDefaultCursoDespesas(),
  }
}

export function syncCursosByQuantidade(
  cursos: CursoDetalhamentoDados[],
  quantidade: number,
): CursoDetalhamentoDados[] {
  const total = Math.max(1, quantidade)

  const normalized = cursos.map((curso, index) => ({
    ...curso,
    id: `curso-${index + 1}`,
    despesas: Array.isArray(curso.despesas) ? curso.despesas : createDefaultCursoDespesas(),
  }))

  if (normalized.length === total) return normalized

  if (normalized.length < total) {
    const extras = Array.from({ length: total - normalized.length }, (_, offset) =>
      createEmptyCurso(normalized.length + offset),
    )
    return [...normalized, ...extras]
  }

  return normalized.slice(0, total)
}
