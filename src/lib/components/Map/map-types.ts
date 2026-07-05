import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { MapClusterOptions } from './map-cluster.js';
import type { MapMarker } from './map-data.js';
import type {
	MapLibreControlPosition,
	MapLibreMap,
	MapLibreMapGeoJSONFeature
} from './maplibre-types.js';

export type MapStyleTheme = 'dark' | 'positron';
export type MapBounds = [number, number, number, number] | [[number, number], [number, number]];
export type MapClusterConfig = MapClusterOptions;
export type MapControlAction = 'zoom-in' | 'zoom-out' | 'fit-markers' | 'geolocate' | 'reset';
export type MapControlPosition = MapLibreControlPosition;
export type MapStyleOverrides = Partial<Record<MapStyleTheme, string>>;

export type MapGeolocationConfig = {
	enabled?: boolean;
	watch?: boolean;
	zoom?: number;
	showMarker?: boolean;
};

export type MapUserLocation = {
	lngLat: [number, number];
	accuracy: number | null;
};

export type MapUserLocationSnippetArg = MapUserLocation & {
	map: MapLibreMap;
};

export type MapViewChangeArg = {
	map: MapLibreMap;
	center: [number, number];
	zoom: number;
	bounds: [number, number, number, number];
	bearing: number;
	pitch: number;
};

export type MapMarkerSnippetArg<TData = unknown> = {
	marker: MapMarker<TData>;
	data: TData | undefined;
	map: MapLibreMap;
	lngLat: [number, number];
};

export type MapMarkerPopupContentArg<TData = unknown> = MapMarkerSnippetArg<TData> & {
	open: boolean;
	close: () => void;
};

export type MapMarkerTooltipContentArg<TData = unknown> = MapMarkerSnippetArg<TData> & {
	open: boolean;
};

export type MapClusterSnippetArg<TData = unknown> = {
	id: string;
	count: number;
	coordinates: [number, number];
	map: MapLibreMap;
	expand: () => void;
	markers: MapMarker<TData>[];
	data: TData[];
	feature: MapLibreMapGeoJSONFeature;
};

export type MapControlButtonSnippetArg = {
	action: MapControlAction;
	label: string;
	disabled: boolean;
	active: boolean;
	onclick: (event: MouseEvent) => void;
};

type MapShapeBase = {
	id: string | number;
	label?: string;
	color?: string;
	opacity?: number;
	visible?: boolean;
};

export type MapCircleShape = MapShapeBase & {
	type: 'circle';
	center: [number, number];
	radiusMeters: number;
};

export type MapPolylineShape = MapShapeBase & {
	type: 'polyline';
	coordinates: [number, number][];
	width?: number;
};

export type MapPolygonShape = MapShapeBase & {
	type: 'polygon';
	coordinates: [number, number][] | [number, number][][];
	fill?: string;
	stroke?: string;
};

export type MapRectangleShape = MapShapeBase & {
	type: 'rectangle';
	bounds: MapBounds;
	fill?: string;
	stroke?: string;
};

export type MapShape = MapCircleShape | MapPolylineShape | MapPolygonShape | MapRectangleShape;

export type MapProps<TData = unknown> = Omit<
	HTMLAttributes<HTMLDivElement>,
	'children' | 'class' | 'onerror'
> & {
	markers: MapMarker<TData>[];
	styleUrl?: string;
	styles?: MapStyleOverrides;
	center?: [number, number];
	zoom?: number;
	bounds?: MapBounds;
	minZoom?: number;
	maxZoom?: number;
	fitMarkersOnMount?: boolean;
	fitMarkersPadding?: number;
	interactive?: boolean;
	showAttribution?: boolean;
	cluster?: boolean | MapClusterConfig;
	controls?: boolean | MapControlAction[];
	controlPosition?: MapControlPosition;
	geolocation?: boolean | MapGeolocationConfig;
	userLocationMarker?: Snippet<[MapUserLocationSnippetArg]>;
	marker?: Snippet<[MapMarkerSnippetArg<TData>]>;
	clusterMarker?: Snippet<[MapClusterSnippetArg<TData>]>;
	controlButton?: Snippet<[MapControlButtonSnippetArg]>;
	popup?: boolean | Snippet<[MapMarkerPopupContentArg<TData>]>;
	tooltip?: boolean | Snippet<[MapMarkerTooltipContentArg<TData>]>;
	shapes?: MapShape[];
	onmarkerclick?: (marker: MapMarker<TData>) => void;
	onclusterclick?: (cluster: MapClusterSnippetArg<TData>) => void;
	onmapready?: (map: MapLibreMap) => void;
	onviewchange?: (view: MapViewChangeArg) => void;
	onmoveend?: (view: MapViewChangeArg) => void;
	onzoomend?: (view: MapViewChangeArg) => void;
	onerror?: (error: Error) => void;
	class?: string;
};
