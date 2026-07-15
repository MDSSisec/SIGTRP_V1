export {
  createProjeto,
  deleteProjeto,
  fetchProjetos,
  fetchProjectStages,
  fetchResponsaveisExternos,
  fetchResponsaveisInternos,
  updateProjetoInformacoes,
} from "./projeto.service"

export {
  buildProjetoEditNavItems,
  getModeloNavLabel,
  getProjetoEditSectionUrl,
  getProjetoTedSectionUrl,
  getSidebarConfig,
  parseProjetoTedPath,
  type SidebarConfig,
} from "./sidebar.service"

export {
  fetchEstados,
  fetchMunicipiosByUf,
  type IbgeEstado,
  type IbgeMunicipio,
} from "./ibge.service"

export {
  fetchTedIdentificacao,
  saveTedIdentificacaoProjeto,
  saveTedIdentificacaoProponente,
  saveTedIdentificacaoRepresentante,
  saveTedIdentificacaoResponsavelTecnico,
} from "./ted-identificacao.service"

export {
  fetchTedSecaoReviews,
  saveTedSecaoReview,
  syncTedCampoReviews,
} from "./ted-secao-review.service"

export { mapModeloCronogramaToForm } from "./project-ted.service"
