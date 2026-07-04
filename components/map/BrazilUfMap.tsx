"use client";

import * as React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import {
  countByUf,
  getMaxUfCount,
  getUfHeatFill,
  type UfSource,
} from "./brazilEntidadesMap.utils";
import { BRAZIL_STATES_GEO_URL, type BrazilMapVariant } from "./constants";

import styles from "./BrazilUfDistributionMap.module.css";

type BrazilStateProperties = {
  name?: string;
  sigla?: string;
};

type MapTooltip = {
  name: string;
  uf: string;
  count: number;
  x: number;
  y: number;
};

type BrazilUfMapProps = {
  items: UfSource[];
  variant?: BrazilMapVariant;
  title?: string;
  description?: string;
  countSingular?: string;
  countPlural?: string;
  emptyMessage?: string;
};

export function BrazilUfMap({
  items,
  variant = "green",
  title = "Distribuição por UF",
  description = "Quanto mais escuro o estado, maior a quantidade registrada.",
  countSingular = "registro",
  countPlural = "registros",
  emptyMessage = "Nenhum dado com UF cadastrada para exibir no mapa.",
}: BrazilUfMapProps) {
  const mapWrapRef = React.useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = React.useState<MapTooltip | null>(null);

  const countsByUf = React.useMemo(() => countByUf(items), [items]);
  const maxCount = React.useMemo(
    () => getMaxUfCount(countsByUf),
    [countsByUf],
  );
  const totalComUf = React.useMemo(
    () => Object.values(countsByUf).reduce((sum, count) => sum + count, 0),
    [countsByUf],
  );

  function handleGeographyMouseEnter(
    event: React.MouseEvent<SVGPathElement>,
    properties: BrazilStateProperties,
  ) {
    const uf = properties.sigla?.trim().toUpperCase() ?? "";
    const name = properties.name?.trim() ?? uf;
    const rect = mapWrapRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    setTooltip({
      name,
      uf,
      count: countsByUf[uf] ?? 0,
      x: event.clientX - rect.left + 12,
      y: event.clientY - rect.top + 12,
    });
  }

  function handleGeographyMouseMove(event: React.MouseEvent<SVGPathElement>) {
    const rect = mapWrapRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    setTooltip((currentTooltip) =>
      currentTooltip
        ? {
            ...currentTooltip,
            x: event.clientX - rect.left + 12,
            y: event.clientY - rect.top + 12,
          }
        : null,
    );
  }

  function handleGeographyMouseLeave() {
    setTooltip(null);
  }

  if (totalComUf === 0) {
    return (
      <div className={styles.emptyContainer}>
        <p className={styles.emptyMessage}>{emptyMessage}</p>
      </div>
    );
  }

  const legendBarClassName =
    variant === "blue" ? styles.legendBarBlue : styles.legendBarGreen;

  return (
    <div className={styles.mapCard}>
      <div className={styles.header}>
        <div>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.legend} aria-hidden="true">
          <span>Menos</span>
          <span className={legendBarClassName} />
          <span>Mais</span>
        </div>
      </div>

      <div className={styles.mapWrap} ref={mapWrapRef}>
        <ComposableMap
          className={styles.map}
          projection="geoMercator"
          projectionConfig={{
            scale: 550,
            center: [-54, -15],
          }}
          width={800}
          height={520}
        >
          <Geographies geography={BRAZIL_STATES_GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const properties = geo.properties as BrazilStateProperties;
                const uf = properties.sigla?.trim().toUpperCase() ?? "";
                const count = countsByUf[uf] ?? 0;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getUfHeatFill(count, maxCount, variant)}
                    stroke="var(--border)"
                    strokeWidth={0.6}
                    onMouseEnter={(event) =>
                      handleGeographyMouseEnter(event, properties)
                    }
                    onMouseMove={handleGeographyMouseMove}
                    onMouseLeave={handleGeographyMouseLeave}
                    style={{
                      default: { outline: "none" },
                      hover: {
                        outline: "none",
                        cursor: "pointer",
                        filter: "brightness(0.95)",
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        {tooltip ? (
          <div
            className={styles.tooltip}
            style={{ left: tooltip.x, top: tooltip.y }}
            role="status"
          >
            <p className={styles.tooltipTitle}>
              {tooltip.name} ({tooltip.uf})
            </p>
            <p className={styles.tooltipCount}>
              {tooltip.count}{" "}
              {tooltip.count === 1 ? countSingular : countPlural}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
