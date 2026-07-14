export {
  createProjeto,
  deleteProjeto,
  fetchProjetos,
  fetchProjectStages,
  fetchResponsaveisExternos,
  fetchResponsaveisInternos,
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
