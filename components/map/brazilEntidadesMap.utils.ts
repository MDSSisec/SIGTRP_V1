import {
  BRAZIL_MAP_EMPTY_FILL,
  BRAZIL_MAP_PALETTES,
  type BrazilMapVariant,
} from "./constants";

export type UfSource = {
  uf: string | null;
};

/** @deprecated Use UfSource */
export type EntidadeUfSource = UfSource;

export function countByUf(items: UfSource[]): Record<string, number> {
  const counts: Record<string, number> = {};

  for (const item of items) {
    const uf = item.uf?.trim().toUpperCase();

    if (!uf) {
      continue;
    }

    counts[uf] = (counts[uf] ?? 0) + 1;
  }

  return counts;
}

/** @deprecated Use countByUf */
export function countEntidadesByUf(entidades: UfSource[]): Record<string, number> {
  return countByUf(entidades);
}

function interpolateColor(
  start: string,
  end: string,
  factor: number,
): string {
  const parse = (hex: string) => {
    const value = hex.replace("#", "");
    return {
      r: Number.parseInt(value.slice(0, 2), 16),
      g: Number.parseInt(value.slice(2, 4), 16),
      b: Number.parseInt(value.slice(4, 6), 16),
    };
  };

  const from = parse(start);
  const to = parse(end);
  const ratio = Math.min(1, Math.max(0, factor));

  const r = Math.round(from.r + (to.r - from.r) * ratio);
  const g = Math.round(from.g + (to.g - from.g) * ratio);
  const b = Math.round(from.b + (to.b - from.b) * ratio);

  return `rgb(${r}, ${g}, ${b})`;
}

export function getUfHeatFill(
  count: number,
  maxCount: number,
  variant: BrazilMapVariant = "green",
) {
  if (count <= 0 || maxCount <= 0) {
    return BRAZIL_MAP_EMPTY_FILL;
  }

  const palette = BRAZIL_MAP_PALETTES[variant];

  return interpolateColor(
    palette.min,
    palette.max,
    count / maxCount,
  );
}

export function getMaxUfCount(counts: Record<string, number>) {
  return Object.values(counts).reduce((max, count) => Math.max(max, count), 0);
}

export function getSortedUfCounts(counts: Record<string, number>) {
  return Object.entries(counts)
    .filter(([, count]) => count > 0)
    .sort(([ufA, countA], [ufB, countB]) => {
      if (countB !== countA) {
        return countB - countA;
      }

      return ufA.localeCompare(ufB, "pt-BR");
    });
}
