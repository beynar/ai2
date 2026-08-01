import type { ChartAxisOptions, ChartScale } from '@tanstack/charts';
import type { GeoProjectionDescriptor } from '@tanstack/charts/geo';
import {
	geoAlbers,
	geoAlbersUsa,
	geoAzimuthalEqualArea,
	geoAzimuthalEquidistant,
	geoConicConformal,
	geoConicEqualArea,
	geoConicEquidistant,
	geoEqualEarth,
	geoEquirectangular,
	geoGnomonic,
	geoIdentity,
	geoMercator,
	geoNaturalEarth1,
	geoOrthographic,
	geoStereographic,
	geoTransverseMercator
} from 'd3-geo';
import {
	scaleBand,
	scaleLinear,
	scaleLog,
	scalePoint,
	scalePow,
	scaleSqrt,
	scaleSymlog,
	scaleTime,
	scaleUtc
} from 'd3-scale';
import {
	curveBasis,
	curveBasisClosed,
	curveCardinal,
	curveCardinalClosed,
	curveCatmullRom,
	curveCatmullRomClosed,
	curveLinear,
	curveLinearClosed,
	curveMonotoneX,
	curveMonotoneY,
	curveNatural,
	curveStep,
	curveStepAfter,
	curveStepBefore,
	type CurveFactory
} from 'd3-shape';
import type {
	ChartCurve,
	ChartGeoProjection,
	ChartScaleDefinition,
	ChartValue
} from './chart.props.js';

type CompiledScale = Exclude<ChartAxisOptions['scale'], ChartScale>;

function configuredScale<TDomain, TScale extends { domain(values: Iterable<TDomain>): TScale }>(
	domain: readonly TDomain[] | undefined,
	createScale: () => TScale
): TScale | (() => TScale) {
	return domain === undefined ? createScale : createScale().domain(domain);
}

export function compileChartScale(definition: ChartScaleDefinition, path: string): CompiledScale {
	switch (definition.type) {
		case 'linear':
			return configuredScale(definition.domain, () =>
				scaleLinear().clamp(definition.clamp ?? false)
			);
		case 'sqrt':
			return configuredScale(definition.domain, () => scaleSqrt().clamp(definition.clamp ?? false));
		case 'pow':
			return configuredScale(definition.domain, () => {
				const scale = scalePow().clamp(definition.clamp ?? false);
				return definition.exponent === undefined ? scale : scale.exponent(definition.exponent);
			});
		case 'log':
			return configuredScale(definition.domain, () => {
				const scale = scaleLog().clamp(definition.clamp ?? false);
				return definition.base === undefined ? scale : scale.base(definition.base);
			});
		case 'symlog':
			return configuredScale(definition.domain, () => {
				const scale = scaleSymlog().clamp(definition.clamp ?? false);
				return definition.constant === undefined ? scale : scale.constant(definition.constant);
			});
		case 'time':
			return configuredScale(definition.domain, () => scaleTime().clamp(definition.clamp ?? false));
		case 'utc':
			return configuredScale(definition.domain, () => scaleUtc().clamp(definition.clamp ?? false));
		case 'band':
			return configuredScale<ChartValue, ReturnType<typeof scaleBand<ChartValue>>>(
				definition.domain,
				() => {
					const scale = scaleBand<ChartValue>();
					if (definition.padding !== undefined) scale.padding(definition.padding);
					if (definition.paddingInner !== undefined) scale.paddingInner(definition.paddingInner);
					if (definition.paddingOuter !== undefined) scale.paddingOuter(definition.paddingOuter);
					if (definition.align !== undefined) scale.align(definition.align);
					return scale;
				}
			);
		case 'point':
			return configuredScale<ChartValue, ReturnType<typeof scalePoint<ChartValue>>>(
				definition.domain,
				() => {
					const scale = scalePoint<ChartValue>();
					if (definition.padding !== undefined) scale.padding(definition.padding);
					if (definition.align !== undefined) scale.align(definition.align);
					return scale;
				}
			);
		default:
			return unsupportedScale(definition, path);
	}
}

export function compileChartCurve(curve: ChartCurve, path: string): CurveFactory {
	switch (curve) {
		case 'linear':
			return curveLinear;
		case 'linear-closed':
			return curveLinearClosed;
		case 'step':
			return curveStep;
		case 'step-before':
			return curveStepBefore;
		case 'step-after':
			return curveStepAfter;
		case 'basis':
			return curveBasis;
		case 'basis-closed':
			return curveBasisClosed;
		case 'cardinal':
			return curveCardinal;
		case 'cardinal-closed':
			return curveCardinalClosed;
		case 'catmull-rom':
			return curveCatmullRom;
		case 'catmull-rom-closed':
			return curveCatmullRomClosed;
		case 'monotone-x':
			return curveMonotoneX;
		case 'monotone-y':
			return curveMonotoneY;
		case 'natural':
			return curveNatural;
		default:
			return unsupportedCurve(curve, path);
	}
}

export function compileChartProjection(
	projection: ChartGeoProjection,
	path: string
): GeoProjectionDescriptor['type'] {
	switch (projection) {
		case 'albers':
			return geoAlbers;
		case 'albers-usa':
			return geoAlbersUsa;
		case 'azimuthal-equal-area':
			return geoAzimuthalEqualArea;
		case 'azimuthal-equidistant':
			return geoAzimuthalEquidistant;
		case 'conic-conformal':
			return geoConicConformal;
		case 'conic-equal-area':
			return geoConicEqualArea;
		case 'conic-equidistant':
			return geoConicEquidistant;
		case 'equal-earth':
			return geoEqualEarth;
		case 'equirectangular':
			return geoEquirectangular;
		case 'gnomonic':
			return geoGnomonic;
		case 'identity':
			return geoIdentity;
		case 'mercator':
			return geoMercator;
		case 'natural-earth-1':
			return geoNaturalEarth1;
		case 'orthographic':
			return geoOrthographic;
		case 'stereographic':
			return geoStereographic;
		case 'transverse-mercator':
			return geoTransverseMercator;
		default:
			return unsupportedProjection(projection, path);
	}
}

function unsupportedScale(definition: never, path: string): never {
	throw new TypeError(
		`[Chart] ${path}.type "${String(readDiscriminant(definition))}" is not supported.`
	);
}

function unsupportedCurve(curve: never, path: string): never {
	throw new TypeError(`[Chart] ${path} "${String(curve)}" is not supported.`);
}

function unsupportedProjection(projection: never, path: string): never {
	throw new TypeError(`[Chart] ${path} "${String(projection)}" is not supported.`);
}

function readDiscriminant(value: unknown): unknown {
	return typeof value === 'object' && value !== null && 'type' in value ? value.type : value;
}
