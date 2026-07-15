export type {
  CreateProjetoInput,
  Projeto,
  ProjetoEtapa,
  ProjetoStatus,
  ProjetoTipo,
  ResponsavelOption,
} from "./projeto"

export type { CronogramaDataMapped, ProjectModelData } from "./ted"

export type {
  TedCampoReview,
  TedCampoReviewSyncInput,
} from "./ted-campo-review"

export type {
  TedSecaoReview,
  TedSecaoReviewInput,
  TedSecaoRevisaoStatus,
  TedIdentificacaoSecaoSlug,
} from "./ted-secao-review"

export type {
  TedIdentificacao,
  TedIdentificacaoProjetoInput,
  TedIdentificacaoProponenteInput,
  TedIdentificacaoRepresentanteInput,
  TedIdentificacaoResponsavelTecnicoInput,
} from "./ted-identificacao"

export type {
  CursoDespesaRow,
  CursoDetalhamentoDados,
  DadosGeraisProjetoState,
} from "./general-project-data"

export {
  createDefaultCursoDespesas,
  createDespesaFromPreset,
  createEmptyCurso,
  createEmptyDespesa,
  syncCursosByQuantidade,
} from "./general-project-data"
