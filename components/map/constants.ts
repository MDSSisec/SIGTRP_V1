export const BRAZIL_STATES_GEO_URL =
  "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson";

/** Fallback SSR — alinhado a --map-empty no tema claro */
export const BRAZIL_MAP_EMPTY_FILL = "#d4d4d4";

/** Fallback SSR — alinhado a --map-heat-min / --map-heat-max */
export const BRAZIL_MAP_PRIMARY_MIN_FILL = "#e8f0fa";
export const BRAZIL_MAP_PRIMARY_MAX_FILL = "#032a59";

/** @deprecated Use paleta primary */
export const BRAZIL_MAP_GREEN_MIN_FILL = "#d1fae5";
/** @deprecated Use paleta primary */
export const BRAZIL_MAP_GREEN_MAX_FILL = "#047857";

/** @deprecated Use BRAZIL_MAP_PRIMARY_MIN_FILL */
export const BRAZIL_MAP_BLUE_MIN_FILL = BRAZIL_MAP_PRIMARY_MIN_FILL;
/** @deprecated Use BRAZIL_MAP_PRIMARY_MAX_FILL */
export const BRAZIL_MAP_BLUE_MAX_FILL = BRAZIL_MAP_PRIMARY_MAX_FILL;

/** @deprecated Use BRAZIL_MAP_PRIMARY_MIN_FILL */
export const BRAZIL_MAP_MIN_FILL = BRAZIL_MAP_GREEN_MIN_FILL;

/** @deprecated Use BRAZIL_MAP_PRIMARY_MAX_FILL */
export const BRAZIL_MAP_MAX_FILL = BRAZIL_MAP_GREEN_MAX_FILL;

export type BrazilMapVariant = "primary" | "green" | "blue";

export const BRAZIL_MAP_CSS_VARS = {
  empty: "--map-empty",
  min: "--map-heat-min",
  max: "--map-heat-max",
} as const;

export const BRAZIL_MAP_PALETTES: Record<
  BrazilMapVariant,
  { min: string; max: string }
> = {
  primary: {
    min: BRAZIL_MAP_PRIMARY_MIN_FILL,
    max: BRAZIL_MAP_PRIMARY_MAX_FILL,
  },
  green: {
    min: BRAZIL_MAP_GREEN_MIN_FILL,
    max: BRAZIL_MAP_GREEN_MAX_FILL,
  },
  blue: {
    min: BRAZIL_MAP_PRIMARY_MIN_FILL,
    max: BRAZIL_MAP_PRIMARY_MAX_FILL,
  },
};
