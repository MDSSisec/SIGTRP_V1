export interface Etapa {
  id?: string
  descricao: string
  valor: number
  inicio: string
  termino: string
}

/** Linha do Quadro de Conteúdos Programáticos (por meta) */
export interface QuadroConteudoProgramatico {
  curso: string
  cargaHoraria: string
  quantidadeAlunosTurmas: string
  conteudosBasicos: string
  conteudosEspecificos: string
  aulasPraticas: string
}

/** Linha do Quadro de Insumos por Curso (por meta) */
export interface QuadroInsumoCurso {
  descricaoItem: string
  unidade: string
  quantidade: string
  formasComprovação: string
}

export interface MetaCronograma {
  id?: string
  titulo: string
  etapas: Etapa[]
  /** Início (mês/ano) da meta – linha do total */
  inicio?: string
  /** Término (mês/ano) da meta – linha do total */
  termino?: string
  quadrosConteudosProgramaticos?: QuadroConteudoProgramatico[]
  quadroInsumosPorCurso?: QuadroInsumoCurso[]
}

export interface CronogramaData {
  metas: MetaCronograma[]
}
