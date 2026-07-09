import {
  BRAZIL_MAP_CSS_VARS,
  BRAZIL_MAP_EMPTY_FILL,
  BRAZIL_MAP_PALETTES,
  BRAZIL_MAP_PRIMARY_MAX_FILL,
  BRAZIL_MAP_PRIMARY_MIN_FILL,
  type BrazilMapVariant,
} from "./constants";

export type UfSource = {
  uf: string | null;
};

/** @deprecated Use UfSource */
export type EntidadeUfSource = UfSource;

export type MapHeatPalette = {
  variant: BrazilMapVariant;
  empty: string;
  min: string;
  max: string;
};

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

function parseColorChannels(color: string) {
  const rgbMatch = color.match(
    /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i,
  );

  if (rgbMatch) {
    return {
      r: Number.parseInt(rgbMatch[1], 10),
      g: Number.parseInt(rgbMatch[2], 10),
      b: Number.parseInt(rgbMatch[3], 10),
    };
  }

  const hex = color.replace("#", "");

  if (hex.length === 6) {
    return {
      r: Number.parseInt(hex.slice(0, 2), 16),
      g: Number.parseInt(hex.slice(2, 4), 16),
      b: Number.parseInt(hex.slice(4, 6), 16),
    };
  }

  return null;
}

function interpolateHexColor(
  start: string,
  end: string,
  factor: number,
): string {
  const from = parseColorChannels(start);
  const to = parseColorChannels(end);

  if (!from || !to) {
    return end;
  }

  const ratio = Math.min(1, Math.max(0, factor));

  const r = Math.round(from.r + (to.r - from.r) * ratio);
  const g = Math.round(from.g + (to.g - from.g) * ratio);
  const b = Math.round(from.b + (to.b - from.b) * ratio);

  return `rgb(${r}, ${g}, ${b})`;
}

function mixCssHeatColor(ratio: number): string {
  if (typeof window === "undefined") {
    return interpolateHexColor(
      BRAZIL_MAP_PRIMARY_MIN_FILL,
      BRAZIL_MAP_PRIMARY_MAX_FILL,
      ratio,
    );
  }

  const clamped = Math.min(1, Math.max(0, ratio));
  const maxPercent = Math.round(clamped * 100);
  const minPercent = 100 - maxPercent;

  const probe = document.createElement("span");
  probe.style.color = `color-mix(in oklch, var(${BRAZIL_MAP_CSS_VARS.min}) ${minPercent}%, var(${BRAZIL_MAP_CSS_VARS.max}) ${maxPercent}%)`;
  probe.style.display = "none";
  document.documentElement.appendChild(probe);

  const resolved = getComputedStyle(probe).color;
  document.documentElement.removeChild(probe);

  if (!resolved || resolved === "rgba(0, 0, 0, 0)") {
    return interpolateHexColor(
      BRAZIL_MAP_PRIMARY_MIN_FILL,
      BRAZIL_MAP_PRIMARY_MAX_FILL,
      ratio,
    );
  }

  return resolved;
}

export function getMapHeatPalette(
  variant: BrazilMapVariant = "primary",
): MapHeatPalette {
  const fallback = BRAZIL_MAP_PALETTES[variant];

  if (variant === "green") {
    return {
      variant,
      empty: BRAZIL_MAP_EMPTY_FILL,
      min: fallback.min,
      max: fallback.max,
    };
  }

  return {
    variant,
    empty: `var(${BRAZIL_MAP_CSS_VARS.empty})`,
    min: BRAZIL_MAP_PRIMARY_MIN_FILL,
    max: BRAZIL_MAP_PRIMARY_MAX_FILL,
  };
}

export function getUfHeatFill(
  count: number,
  maxCount: number,
  palette: MapHeatPalette,
) {
  if (count <= 0 || maxCount <= 0) {
    return palette.empty;
  }

  const ratio = count / maxCount;

  if (palette.variant === "green") {
    return interpolateHexColor(palette.min, palette.max, ratio);
  }

  return mixCssHeatColor(ratio);
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
