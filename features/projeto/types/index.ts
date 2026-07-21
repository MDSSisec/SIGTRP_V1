export type {
  CreateProjetoInput,
  Projeto,
  ProjetoEtapa,
  ProjetoStatus,
  ProjetoTipo,
  ResponsavelOption,
} from "./projeto"

export type { CronogramaDataMapped, ProjectModelData } from "./project-model"

export type { CampoReview, CampoReviewSyncInput } from "./campo-review"

export type {
  SecaoReview,
  SecaoReviewInput,
  SecaoRevisaoStatus,
  ProjectSession01IdentificacaoSecaoSlug,
} from "./secao-review"

export type {
  ProjectSession01Identificacao,
  ProjectSession01IdentificacaoProjetoInput,
  ProjectSession01IdentificacaoProponenteInput,
  ProjectSession01IdentificacaoRepresentanteInput,
  ProjectSession01IdentificacaoResponsavelTecnicoInput,
} from "./project-session-01-identificacao"

export type {
  ProjectSession02Description,
  ProjectSession02DescriptionJustificativaInput,
  ProjectSession02DescriptionMetodologiaInput,
} from "./project-session-02-description"

export type {
  ProjectSession03BaseTerritorialLinha,
  ProjectSession03Participants,
  ProjectSession03HistoricoInput,
  ProjectSession03BaseTerritorialInput,
  ProjectSession03PublicoBeneficiarioInput,
  ProjectSession03PovosInput,
  ProjectSession03PerfilInput,
  ProjectSession03ServicosInput,
} from "./project-session-03-participants"

export type {
  ProjectSession04Characterization,
  ProjectSession04OutrasInformacoesInput,
} from "./project-session-04-characterization"

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
