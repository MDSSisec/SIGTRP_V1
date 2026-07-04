export const BRAZIL_STATES_GEO_URL =
  "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson";

export const BRAZIL_MAP_EMPTY_FILL = "#e5e7eb";

export const BRAZIL_MAP_GREEN_MIN_FILL = "#d1fae5";
export const BRAZIL_MAP_GREEN_MAX_FILL = "#047857";

export const BRAZIL_MAP_BLUE_MIN_FILL = "#dbeafe";
export const BRAZIL_MAP_BLUE_MAX_FILL = "#1d4ed8";

/** @deprecated Use BRAZIL_MAP_GREEN_MIN_FILL */
export const BRAZIL_MAP_MIN_FILL = BRAZIL_MAP_GREEN_MIN_FILL;

/** @deprecated Use BRAZIL_MAP_GREEN_MAX_FILL */
export const BRAZIL_MAP_MAX_FILL = BRAZIL_MAP_GREEN_MAX_FILL;

export type BrazilMapVariant = "green" | "blue";

export const BRAZIL_MAP_PALETTES: Record<
  BrazilMapVariant,
  { min: string; max: string }
> = {
  green: {
    min: BRAZIL_MAP_GREEN_MIN_FILL,
    max: BRAZIL_MAP_GREEN_MAX_FILL,
  },
  blue: {
    min: BRAZIL_MAP_BLUE_MIN_FILL,
    max: BRAZIL_MAP_BLUE_MAX_FILL,
  },
};
