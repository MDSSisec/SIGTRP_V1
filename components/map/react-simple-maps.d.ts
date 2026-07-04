declare module "react-simple-maps" {
  import type * as React from "react";

  export type GeographyProps = {
    geography: unknown;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
    onMouseEnter?: (event: React.MouseEvent<SVGPathElement>) => void;
    onMouseMove?: (event: React.MouseEvent<SVGPathElement>) => void;
    onMouseLeave?: (event: React.MouseEvent<SVGPathElement>) => void;
  };

  export type ComposableMapProps = {
    children?: React.ReactNode;
    className?: string;
    projection?: string;
    projectionConfig?: Record<string, number | [number, number]>;
    width?: number;
    height?: number;
  };

  export type GeographiesProps = {
    geography: string | object;
    children: (args: {
      geographies: Array<{
        rsmKey: string;
        properties: Record<string, unknown>;
      }>;
    }) => React.ReactNode;
  };

  export function ComposableMap(props: ComposableMapProps): React.JSX.Element;
  export function Geographies(props: GeographiesProps): React.JSX.Element;
  export function Geography(props: GeographyProps): React.JSX.Element;

  export type MarkerProps = {
    coordinates: [number, number];
    children?: React.ReactNode;
  };

  export function Marker(props: MarkerProps): React.JSX.Element;

  export type AnnotationProps = {
    subject: [number, number];
    dx?: number;
    dy?: number;
    curve?: number;
    connectorProps?: React.SVGProps<SVGPathElement>;
    children?: React.ReactNode;
  };

  export function Annotation(props: AnnotationProps): React.JSX.Element;
}
