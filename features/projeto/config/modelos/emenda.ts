import type { ModeloProjetoConfig } from "./types"
import {
  buildProjetoMenuGroups,
  EMENDA_MENU_GRUPOS,
} from "@/features/projeto/constants/secoes-projeto"

/**
 * Emenda — mesmas seções do TED por enquanto.
 * Para divergir, edite `EMENDA_MENU_GRUPOS` em `constants/secoes-projeto.ts`.
 */
export const EMENDA_MODELO_CONFIG: ModeloProjetoConfig = {
  tipo: "EMENDA",
  label: "Emenda",
  defaultSecao: "informacoes-projeto",
  groups: buildProjetoMenuGroups(EMENDA_MENU_GRUPOS),
}
