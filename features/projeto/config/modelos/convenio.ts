import type { ModeloProjetoConfig } from "./types"
import {
  buildProjetoMenuGroups,
  CONVENIO_MENU_GRUPOS,
} from "@/features/projeto/constants/secoes-projeto"

/**
 * Convênio — mesmas seções do TED por enquanto.
 * Para divergir, edite `CONVENIO_MENU_GRUPOS` em `constants/secoes-projeto.ts`.
 */
export const CONVENIO_MODELO_CONFIG: ModeloProjetoConfig = {
  tipo: "CONVENIO",
  label: "Convênio",
  defaultSecao: "informacoes-projeto",
  groups: buildProjetoMenuGroups(CONVENIO_MENU_GRUPOS),
}
