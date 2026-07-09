import type { EntidadeUfSource } from "./brazilEntidadesMap.utils";
import { BrazilUfDistributionMap } from "./BrazilUfDistributionMap";

const ENTIDADES_MAP_LABELS = {
  listTitle: "Entidades por UF",
  listAriaLabel: "Entidades por UF",
  mapTitle: "Distribuição de entidades por UF",
  mapDescription:
    "Quanto mais escuro o estado, maior a quantidade de entidades cadastradas.",
  emptyMessage: "Nenhuma entidade com UF cadastrada para exibir no mapa.",
  countSingular: "entidade",
  countPlural: "entidades",
} as const;

type BrazilEntidadesMapProps = {
  entidades: EntidadeUfSource[];
};

export function BrazilEntidadesMap({ entidades }: BrazilEntidadesMapProps) {
  return (
    <BrazilUfDistributionMap
      items={entidades}
      variant="primary"
      labels={ENTIDADES_MAP_LABELS}
    />
  );
}
