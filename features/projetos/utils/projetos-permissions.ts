/**
 * Barrel file responsável por expor as permissões de projetos.
 *
 * A camada de apresentação deve importar as permissões deste módulo,
 * evitando dependência direta da camada de domínio.
 */
export {
  canCreateProjeto,
  canDeleteProjeto,
  canEditProjetoInformacoes,
  isUsuarioExterno,
  PROJETO_CREATE_PROFILE_IDS,
  PROJETO_EDIT_INFO_PROFILE_IDS,
} from "../domain/projetos.permissions"