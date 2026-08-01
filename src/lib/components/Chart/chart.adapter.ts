import {
	areaX,
	areaY,
	arrow,
	bandX,
	bandY,
	barX,
	barY,
	cell,
	d3AreaXCurve,
	d3Curve,
	defineChart,
	dot,
	facet,
	frame,
	group,
	hexagon,
	lineY,
	link,
	rect,
	ruleX,
	ruleY,
	stack,
	text,
	tickX,
	tickY,
	vector,
	whenFocused,
	type ChartAxisOptions,
	type Channel as TanStackChannel,
	type ChartHostOptions,
	type ChartMark as TanStackMark,
	type ChartTheme,
	type ChartTooltipDatumItem,
	type ChartTooltipInput,
	type ChartValue as TanStackValue,
	type StaticChartDefinition,
	type VisualChannel
} from '@tanstack/charts';
import { geoShape } from '@tanstack/charts/geo';
import {
	angleGrid,
	polar,
	radialArc,
	radialArea,
	radialDot,
	radialGrid,
	radialLine,
	radialRule,
	radialText,
	type PolarGuide,
	type PolarMark
} from '@tanstack/charts/polar';
import { tooltip } from '@tanstack/charts/tooltip';
import { portal } from '@tanstack/charts/tooltip/portal';
import type { GeoPermissibleObjects } from 'd3-geo';
import type {
	ChartAreaMark,
	ChartBarMark,
	ChartChannel,
	ChartColor,
	ChartFacetDefinition,
	ChartGeoObject,
	ChartGeoShapeMark,
	ChartGroupLayout,
	ChartInitialDimensions,
	ChartKey,
	ChartLineMark,
	ChartMark,
	ChartPolarChildMark,
	ChartPolarGuide,
	ChartPolarMark,
	ChartPolarRadarMark,
	ChartPositionDefinition,
	ChartProps,
	ChartStackLayout,
	ChartTooltipDefinition,
	ChartTooltipField,
	ChartValue,
	ChartVisual
} from './chart.props.js';
import { compileChartCurve, compileChartProjection, compileChartScale } from './chart.scale.js';

const SEMANTIC_COLORS = new Set([
	'primary',
	'secondary',
	'danger',
	'success',
	'warning',
	'info',
	'neutral'
]);

const DEFAULT_PALETTE = [
	'var(--color-primary)',
	'var(--color-secondary)',
	'var(--color-success)',
	'var(--color-warning)',
	'var(--color-danger)',
	'var(--color-info)',
	'var(--color-neutral)'
] as const;

const GROUPED_TOOLTIP_PLACEMENTS = ['top', 'right', 'left', 'bottom'] as const;

const GROUPED_LINE_POINT_STATES = [
	{
		when: { focus: 'group' },
		style: {
			r: 5,
			stroke: 'var(--color-surface)',
			strokeWidth: 1.5
		},
		transition: { duration: 140, easing: 'ease-out' }
	},
	{
		when: { focus: 'unmatched' },
		style: { opacity: 0.3 }
	}
] as const;

type ChartPlotConfiguration<TRow extends object> = Pick<
	ChartProps<TRow>,
	'marks' | 'x' | 'y' | 'guides' | 'clip' | 'margin' | 'palette' | 'tooltip'
>;

type CreateChartOptionsInput<TRow extends object> = Pick<
	ChartProps<TRow>,
	| 'data'
	| 'marks'
	| 'x'
	| 'y'
	| 'guides'
	| 'clip'
	| 'margin'
	| 'palette'
	| 'tooltip'
	| 'ariaLabel'
	| 'ariaDescription'
	| 'initialDimensions'
> & {
	idPrefix: string;
	tooltipClassName?: string;
};

type CompiledMark = TanStackMark<unknown, TanStackValue, TanStackValue>;

type CompiledMarkResult = {
	mark: CompiledMark;
	requiresX: boolean;
	requiresY: boolean;
};

export function createChartOptions<TRow extends object>({
	data,
	marks,
	x,
	y,
	guides,
	clip,
	margin,
	palette,
	tooltip,
	ariaLabel,
	ariaDescription,
	idPrefix,
	initialDimensions,
	tooltipClassName
}: CreateChartOptionsInput<TRow>): ChartHostOptions<TRow> {
	validateInitialDimensions(initialDimensions);

	return {
		definition: compileChartPlot(
			data,
			{ marks, x, y, guides, clip, margin, palette, tooltip },
			tooltipClassName
		),
		ariaLabel,
		ariaDescription,
		idPrefix,
		initialWidth: initialDimensions?.width,
		aspectRatio: initialDimensions ? initialDimensions.width / initialDimensions.height : undefined
	};
}

function compileChartPlot<TRow extends object>(
	data: readonly TRow[],
	configuration: ChartPlotConfiguration<TRow>,
	tooltipClassName?: string,
	path = ''
): StaticChartDefinition<TRow> {
	const marksPath = appendPath(path, 'marks');
	const palettePath = appendPath(path, 'palette');
	const xPath = appendPath(path, 'x');
	const yPath = appendPath(path, 'y');
	if (!Array.isArray(configuration.marks) || configuration.marks.length === 0) {
		throw new TypeError(`[Chart] ${marksPath} must contain at least one mark.`);
	}
	if (configuration.palette !== undefined && configuration.palette.length === 0) {
		throw new TypeError(`[Chart] ${palettePath} must contain at least one color.`);
	}

	const chartTooltip = compileTooltip(
		configuration.tooltip,
		tooltipClassName,
		resolveTooltipGroupBy(configuration)
	);
	const markIds = new Map<string, number>();
	let requiredXPath: string | undefined;
	let requiredYPath: string | undefined;
	const marks: CompiledMark[] = [];
	const focusBand = compilePointFocusBand(
		data,
		configuration.marks,
		chartTooltip.focus,
		marksPath
	);
	if (focusBand) marks.push(focusBand);
	configuration.marks.forEach((mark, index) => {
		const markPath = `${marksPath}[${index}]`;
		validateMarkId(mark, index, markPath, markIds);
		validateBandwidthScales(mark, configuration, markPath, path);
		const compiled = compileMark(data, mark, markPath, tooltipClassName);
		if (compiled.requiresX && requiredXPath === undefined) requiredXPath = markPath;
		if (compiled.requiresY && requiredYPath === undefined) requiredYPath = markPath;
		marks.push(compiled.mark);
		if (mark.type === 'line' && mark.points) {
			marks.push(compileLinePoints(data, mark, markPath, chartTooltip.focus !== undefined));
		}
	});

	if (requiredXPath !== undefined && configuration.x === undefined) {
		throw new TypeError(`[Chart] ${xPath} is required by ${requiredXPath}.`);
	}
	if (requiredYPath !== undefined && configuration.y === undefined) {
		throw new TypeError(`[Chart] ${yPath} is required by ${requiredYPath}.`);
	}

	const theme = compileTheme(configuration.palette);
	const definition: StaticChartDefinition<TRow> = {
		marks,
		x: configuration.x ? compilePosition(configuration.x, xPath) : undefined,
		y: configuration.y ? compilePosition(configuration.y, yPath) : undefined,
		guides: configuration.guides,
		clip: configuration.clip,
		margin: configuration.margin,
		theme
	};

	return defineChart(definition, {
		keyboard: chartTooltip.input !== false,
		focus: chartTooltip.focus,
		tooltip: chartTooltip.input
	});
}

function validateBandwidthScales<TRow extends object>(
	mark: ChartMark<TRow>,
	configuration: ChartPlotConfiguration<TRow> | ChartFacetDefinition<TRow>,
	markPath: string,
	definitionPath: string
): void {
	if (mark.type !== 'cell' && (mark.type !== 'rect' || mark.x === undefined)) return;
	validateBandScale(configuration.x, `${markPath}.x`, appendPath(definitionPath, 'x'));
	validateBandScale(configuration.y, `${markPath}.y`, appendPath(definitionPath, 'y'));
}

function appendPath(parent: string, field: string): string {
	return parent ? `${parent}.${field}` : field;
}

function validateBandScale(
	position: ChartPositionDefinition | undefined,
	channelPath: string,
	positionPath: string
): void {
	if (position === undefined || position.scale.type === 'band') return;
	throw new TypeError(`[Chart] ${channelPath} requires ${positionPath}.scale.type to be "band".`);
}

function compileMark<TRow extends object>(
	data: readonly TRow[],
	mark: ChartMark<TRow>,
	path: string,
	tooltipClassName?: string
): CompiledMarkResult {
	switch (mark.type) {
		case 'line':
			return {
				mark: lineY(data, {
					...compileMarkChannels(mark),
					x: compileChannel(mark.x),
					y: compileChannel(mark.y),
					stroke: compileColorVisual(mark.stroke),
					strokeOpacity: mark.strokeOpacity,
					strokeWidth: mark.strokeWidth,
					strokeDasharray: mark.strokeDasharray,
					points: false,
					curve: mark.curve ? d3Curve(compileChartCurve(mark.curve, `${path}.curve`)) : undefined
				}),
				requiresX: true,
				requiresY: true
			};
		case 'area':
			return compileAreaMark(data, mark, path);
		case 'bar':
			return compileBarMark(data, mark, path);
		case 'band': {
			const axis = mark.axis;
			if (axis === 'x') {
				return {
					mark: bandX(data, {
						...compileMarkChannels(mark),
						x: compileChannel(mark.value),
						fill: compileColorVisual(mark.fill),
						fillOpacity: mark.fillOpacity,
						inset: mark.inset,
						radius: mark.radius
					}),
					requiresX: true,
					requiresY: false
				};
			}
			if (axis === 'y') {
				return {
					mark: bandY(data, {
						...compileMarkChannels(mark),
						y: compileChannel(mark.value),
						fill: compileColorVisual(mark.fill),
						fillOpacity: mark.fillOpacity,
						inset: mark.inset,
						radius: mark.radius
					}),
					requiresX: false,
					requiresY: true
				};
			}
			return unsupportedNestedDiscriminant(axis, `${path}.axis`);
		}
		case 'rect':
			return {
				mark: rect(data, {
					...compileMarkChannels(mark),
					x: compileOptionalChannel(mark.x),
					y: compileOptionalChannel(mark.y),
					x1: compileOptionalChannel(mark.x1),
					x2: compileOptionalChannel(mark.x2),
					y1: compileOptionalChannel(mark.y1),
					y2: compileOptionalChannel(mark.y2),
					fill: compileOptionalColor(mark.fill),
					fillOpacity: mark.fillOpacity,
					stroke: compileOptionalColor(mark.stroke),
					strokeWidth: mark.strokeWidth,
					inset: mark.inset,
					radius: mark.radius
				}),
				requiresX: true,
				requiresY: true
			};
		case 'cell':
			return {
				mark: cell(data, {
					...compileMarkChannels(mark),
					x: compileChannel(mark.x),
					y: compileChannel(mark.y),
					fill: compileOptionalColor(mark.fill),
					fillOpacity: mark.fillOpacity,
					stroke: compileOptionalColor(mark.stroke),
					strokeWidth: mark.strokeWidth,
					inset: mark.inset,
					radius: mark.radius
				}),
				requiresX: true,
				requiresY: true
			};
		case 'point': {
			const shape = mark.shape;
			if (shape === 'circle') {
				return {
					mark: dot(data, {
						...compileMarkChannels(mark),
						x: compileChannel(mark.x),
						y: compileChannel(mark.y),
						r: compileNumberOrChannel(mark.radius),
						fill: compileOptionalColor(mark.fill),
						fillOpacity: mark.fillOpacity,
						stroke: compileOptionalColor(mark.stroke),
						strokeOpacity: mark.strokeOpacity,
						strokeWidth: mark.strokeWidth
					}),
					requiresX: true,
					requiresY: true
				};
			}
			if (shape === 'hexagon') {
				return {
					mark: hexagon(data, {
						...compileMarkChannels(mark),
						x: compileChannel(mark.x),
						y: compileChannel(mark.y),
						r: compileNumberOrChannel(mark.radius),
						fill: compileColorVisual(mark.fill),
						fillOpacity: mark.fillOpacity,
						stroke: compileColorVisual(mark.stroke),
						strokeOpacity: mark.strokeOpacity,
						strokeWidth: mark.strokeWidth
					}),
					requiresX: true,
					requiresY: true
				};
			}
			return unsupportedNestedDiscriminant(shape, `${path}.shape`);
		}
		case 'rule': {
			const axis = mark.axis;
			const options = {
				id: mark.id,
				color: compileOptionalChannel(mark.colorBy),
				stroke: compileColorVisual(mark.stroke),
				strokeOpacity: mark.strokeOpacity,
				strokeWidth: mark.strokeWidth,
				strokeDasharray: mark.strokeDasharray
			};
			if (axis === 'x') {
				return {
					mark: ruleX(data, { ...options, x: compileChannel(mark.value) }),
					requiresX: true,
					requiresY: false
				};
			}
			if (axis === 'y') {
				return {
					mark: ruleY(data, { ...options, y: compileChannel(mark.value) }),
					requiresX: false,
					requiresY: true
				};
			}
			return unsupportedNestedDiscriminant(axis, `${path}.axis`);
		}
		case 'link':
			return {
				mark: link(data, {
					...compileMarkChannels(mark),
					x1: compileChannel(mark.x1),
					y1: compileChannel(mark.y1),
					x2: compileChannel(mark.x2),
					y2: compileChannel(mark.y2),
					stroke: compileColorVisual(mark.stroke),
					strokeOpacity: mark.strokeOpacity,
					strokeWidth: mark.strokeWidth,
					strokeDasharray: mark.strokeDasharray,
					lineCap: mark.lineCap,
					curve: mark.curve ? d3Curve(compileChartCurve(mark.curve, `${path}.curve`)) : undefined
				}),
				requiresX: true,
				requiresY: true
			};
		case 'arrow':
			return {
				mark: arrow(data, {
					...compileMarkChannels(mark),
					x1: compileChannel(mark.x1),
					y1: compileChannel(mark.y1),
					x2: compileChannel(mark.x2),
					y2: compileChannel(mark.y2),
					stroke: compileColorVisual(mark.stroke),
					strokeOpacity: mark.strokeOpacity,
					strokeWidth: mark.strokeWidth,
					headLength: mark.headLength,
					headAngle: mark.headAngle
				}),
				requiresX: true,
				requiresY: true
			};
		case 'vector':
			return {
				mark: vector(data, {
					...compileMarkChannels(mark),
					x: compileChannel(mark.x),
					y: compileChannel(mark.y),
					length: compileNumberOrChannel(mark.length),
					rotate: compileNumberOrChannel(mark.rotate),
					anchor: mark.anchor,
					stroke: compileColorVisual(mark.stroke),
					strokeOpacity: mark.strokeOpacity,
					strokeWidth: mark.strokeWidth,
					headLength: mark.headLength,
					headAngle: mark.headAngle
				}),
				requiresX: true,
				requiresY: true
			};
		case 'tick': {
			const axis = mark.axis;
			const options = {
				...compileMarkChannels(mark),
				x: compileChannel(mark.x),
				y: compileChannel(mark.y),
				stroke: compileColorVisual(mark.stroke),
				strokeOpacity: mark.strokeOpacity,
				strokeWidth: mark.strokeWidth,
				length: mark.length,
				inset: mark.inset
			};
			if (axis === 'x') {
				return { mark: tickX(data, options), requiresX: true, requiresY: true };
			}
			if (axis === 'y') {
				return { mark: tickY(data, options), requiresX: true, requiresY: true };
			}
			return unsupportedNestedDiscriminant(axis, `${path}.axis`);
		}
		case 'text':
			return {
				mark: text(data, {
					...compileMarkChannels(mark),
					x: compileChannel(mark.x),
					y: compileChannel(mark.y),
					text: compileChannel(mark.text),
					fill: compileColorVisual(mark.fill),
					fontSize: mark.fontSize,
					fontWeight: mark.fontWeight,
					anchor: mark.anchor,
					rotate: mark.rotate,
					dx: mark.dx,
					dy: mark.dy
				}),
				requiresX: true,
				requiresY: true
			};
		case 'frame':
			return {
				mark: frame({
					id: mark.id,
					fill: compileOptionalColor(mark.fill),
					fillOpacity: mark.fillOpacity,
					stroke: compileOptionalColor(mark.stroke),
					strokeOpacity: mark.strokeOpacity,
					strokeWidth: mark.strokeWidth,
					inset: mark.inset,
					radius: mark.radius
				}),
				requiresX: false,
				requiresY: false
			};
		case 'facet':
			return {
				mark: facet(data, {
					id: mark.id,
					by: compileKeyChannel(mark.by),
					chart: (facetData) =>
						compileChartPlot(facetData, mark.definition, tooltipClassName, `${path}.definition`),
					columns: mark.columns,
					minWidth: mark.minWidth,
					gap: mark.gap,
					label: mark.label,
					axes: mark.axes
				}),
				requiresX: false,
				requiresY: false
			};
		case 'polar': {
			if (mark.marks === undefined) {
				return {
					mark: compilePolarRadar(data, mark, path),
					requiresX: false,
					requiresY: false
				};
			}
			validatePolarScales(mark, path);
			return {
				mark: polar({
					id: mark.id,
					marks: compilePolarMarks(data, mark.marks, path),
					guides: compilePolarGuides(mark.guides, path),
					angle: mark.angle
						? {
								scale: compileChartScale(mark.angle.scale, `${path}.angle.scale`),
								nice: mark.angle.nice,
								wrap: mark.angle.wrap
							}
						: undefined,
					radius: mark.radius
						? {
								scale: compileChartScale(mark.radius.scale, `${path}.radius.scale`),
								nice: mark.radius.nice
							}
						: undefined,
					startAngle: mark.startAngle,
					endAngle: mark.endAngle,
					inset: mark.inset,
					radiusRatio: mark.radiusRatio
				}),
				requiresX: false,
				requiresY: false
			};
		}
		case 'geo-shape':
			// The conditional public union only exposes this branch when TRow is GeoJSON.
			return compileGeoMark(
				data as readonly (TRow & ChartGeoObject)[],
				mark as ChartGeoShapeMark<TRow & ChartGeoObject>,
				path
			);
		default:
			return unsupportedMark(mark, path, data, tooltipClassName);
	}
}

function compileLinePoints<TRow extends object>(
	data: readonly TRow[],
	mark: ChartLineMark<TRow>,
	path: string,
	hasGroupedFocus: boolean
): CompiledMark {
	return dot(data, {
		...compileMarkChannels(mark),
		id: `${path}:points`,
		z: compileOptionalChannel(mark.series ?? mark.colorBy),
		x: compileChannel(mark.x),
		y: compileChannel(mark.y),
		r: 2.5,
		fill: typeof mark.stroke === 'string' ? compileColor(mark.stroke) : undefined,
		states: hasGroupedFocus ? GROUPED_LINE_POINT_STATES : undefined
	});
}

function compilePointFocusBand<TRow extends object>(
	data: readonly TRow[],
	marks: readonly ChartMark<TRow>[],
	focus: 'group-x' | 'group-y' | undefined,
	path: string
): CompiledMark | undefined {
	if (!focus) return undefined;
	const axis = focus === 'group-x' ? 'x' : 'y';
	const pointSource = marks.find((mark) => {
		if (mark.type === 'line' || mark.type === 'point') return true;
		if (mark.type !== 'area' && mark.type !== 'bar') return false;
		return axis === 'x' ? mark.direction === 'vertical' : mark.direction === 'horizontal';
	});
	if (!pointSource) return undefined;

	const position = axis === 'x' ? pointSource.x : pointSource.y;
	if (position === undefined) return undefined;
	const series = 'series' in pointSource ? pointSource.series : undefined;
	const color = 'colorBy' in pointSource ? pointSource.colorBy : undefined;
	const id = `${path}:focus-${axis}`;
	const band =
		axis === 'x'
			? bandX(data, {
					id,
					x: compileChannel(position),
					z: compileOptionalChannel(series ?? color),
					fill: 'var(--color-neutral)',
					fillOpacity: 0.14,
					inset: 3,
					radius: 4
				})
			: bandY(data, {
					id,
					y: compileChannel(position),
					z: compileOptionalChannel(series ?? color),
					fill: 'var(--color-neutral)',
					fillOpacity: 0.14,
					inset: 3,
					radius: 4
				});

	return whenFocused(uniqueAxisBands(band, axis), { match: axis });
}

function uniqueAxisBands<TRow, TXValue extends TanStackValue, TYValue extends TanStackValue>(
	mark: TanStackMark<TRow, TXValue, TYValue>,
	axis: 'x' | 'y'
): TanStackMark<TRow, TXValue, TYValue> {
	return {
		...mark,
		initialize(context) {
			const initialized = mark.initialize(context);
			return {
				...initialized,
				render(renderContext) {
					const rendered = initialized.render(renderContext);
					const uniqueValues = new Set<string>();
					const nodes = [];
					const points = [];
					for (const [index, point] of (rendered.points ?? []).entries()) {
						const value = axis === 'x' ? point.xValue : point.yValue;
						const identity = chartValueIdentity(value);
						if (uniqueValues.has(identity)) continue;
						const node = rendered.nodes[index];
						if (!node) throw new Error('[Chart] TanStack returned an incomplete focus band scene.');
						uniqueValues.add(identity);
						nodes.push(node);
						points.push(point);
					}
					return { nodes, points };
				}
			};
		}
	};
}

function chartValueIdentity(value: TanStackValue): string {
	return value instanceof Date ? `date:${value.getTime()}` : `${typeof value}:${String(value)}`;
}

function compileAreaMark<TRow extends object>(
	data: readonly TRow[],
	mark: ChartAreaMark<TRow>,
	path: string
): CompiledMarkResult {
	const direction = mark.direction;
	const style = {
		...compileMarkChannels(mark),
		fill: compileColorVisual(mark.fill),
		fillOpacity: mark.fillOpacity,
		stroke: compileColorVisual(mark.stroke),
		strokeWidth: mark.strokeWidth
	};

	if (direction === 'vertical') {
		const hasEndpoints = mark.y1 !== undefined || mark.y2 !== undefined;
		validateIntervalConfiguration(
			hasEndpoints,
			mark.y1,
			mark.y2,
			mark.baseline,
			mark.layout,
			path,
			'y'
		);
		return {
			mark: areaY(data, {
				...style,
				x: compileChannel(mark.x),
				y: compileOptionalChannel(mark.y),
				y1: compileNumberOrChannel(hasEndpoints ? mark.y1 : mark.baseline),
				y2: compileNumberOrChannel(hasEndpoints ? mark.y2 : undefined),
				layout: compileStackLayout(mark.layout, `${path}.layout`),
				curve: mark.curve ? d3Curve(compileChartCurve(mark.curve, `${path}.curve`)) : undefined
			}),
			requiresX: true,
			requiresY: true
		};
	}

	if (direction === 'horizontal') {
		const hasEndpoints = mark.x1 !== undefined || mark.x2 !== undefined;
		validateIntervalConfiguration(
			hasEndpoints,
			mark.x1,
			mark.x2,
			mark.baseline,
			mark.layout,
			path,
			'x'
		);
		return {
			mark: areaX(data, {
				...style,
				x: compileOptionalChannel(mark.x),
				x1: compileNumberOrChannel(hasEndpoints ? mark.x1 : mark.baseline),
				x2: compileNumberOrChannel(hasEndpoints ? mark.x2 : undefined),
				y: compileChannel(mark.y),
				layout: compileStackLayout(mark.layout, `${path}.layout`),
				curve: mark.curve ? d3AreaXCurve(compileChartCurve(mark.curve, `${path}.curve`)) : undefined
			}),
			requiresX: true,
			requiresY: true
		};
	}

	return unsupportedNestedDiscriminant(direction, `${path}.direction`);
}

function compileBarMark<TRow extends object>(
	data: readonly TRow[],
	mark: ChartBarMark<TRow>,
	path: string
): CompiledMarkResult {
	const direction = mark.direction;
	if (mark.layout?.type === 'group' && mark.series === undefined && mark.colorBy === undefined) {
		throw new TypeError(
			`[Chart] ${path}.layout with type "group" requires ${path}.series or ${path}.colorBy.`
		);
	}
	const style = {
		...compileMarkChannels(mark),
		fill: compileColorVisual(mark.fill),
		fillOpacity: mark.fillOpacity,
		inset: mark.inset,
		radius: mark.radius
	};

	if (direction === 'vertical') {
		const hasEndpoints = mark.y1 !== undefined || mark.y2 !== undefined;
		validateIntervalConfiguration(
			hasEndpoints,
			mark.y1,
			mark.y2,
			mark.baseline,
			mark.layout,
			path,
			'y'
		);
		return {
			mark: barY(data, {
				...style,
				x: compileChannel(mark.x),
				y: compileOptionalChannel(mark.y),
				y1: compileNumberOrChannel(hasEndpoints ? mark.y1 : mark.baseline),
				y2: compileNumberOrChannel(hasEndpoints ? mark.y2 : undefined),
				layout: compileBarLayout(mark.layout, `${path}.layout`)
			}),
			requiresX: true,
			requiresY: true
		};
	}

	if (direction === 'horizontal') {
		const hasEndpoints = mark.x1 !== undefined || mark.x2 !== undefined;
		validateIntervalConfiguration(
			hasEndpoints,
			mark.x1,
			mark.x2,
			mark.baseline,
			mark.layout,
			path,
			'x'
		);
		return {
			mark: barX(data, {
				...style,
				x: compileOptionalChannel(mark.x),
				x1: compileNumberOrChannel(hasEndpoints ? mark.x1 : mark.baseline),
				x2: compileNumberOrChannel(hasEndpoints ? mark.x2 : undefined),
				y: compileChannel(mark.y),
				layout: compileBarLayout(mark.layout, `${path}.layout`)
			}),
			requiresX: true,
			requiresY: true
		};
	}

	return unsupportedNestedDiscriminant(direction, `${path}.direction`);
}

function compileStackLayout(
	layout: ChartStackLayout | undefined,
	path: string
): ReturnType<typeof stack> | undefined {
	if (layout === undefined) return undefined;
	const type = layout.type;
	if (type !== 'stack') return unsupportedNestedDiscriminant(type, `${path}.type`);
	return stack({ order: layout.order, offset: layout.offset, reverse: layout.reverse });
}

function compileBarLayout(
	layout: ChartStackLayout | ChartGroupLayout | undefined,
	path: string
): ReturnType<typeof stack> | ReturnType<typeof group> | undefined {
	if (layout === undefined) return undefined;
	switch (layout.type) {
		case 'stack':
			return stack({ order: layout.order, offset: layout.offset, reverse: layout.reverse });
		case 'group':
			return group({ padding: layout.padding });
		default:
			return unsupportedNestedDiscriminant(layout, `${path}.type`);
	}
}

function validateIntervalConfiguration(
	hasEndpoints: boolean,
	firstEndpoint: unknown,
	secondEndpoint: unknown,
	baseline: unknown,
	layout: unknown,
	path: string,
	axis: 'x' | 'y'
): void {
	if (hasEndpoints && (firstEndpoint === undefined || secondEndpoint === undefined)) {
		throw new TypeError(`[Chart] ${path}.${axis}1 and ${path}.${axis}2 must be provided together.`);
	}
	if ((hasEndpoints || baseline !== undefined) && layout !== undefined) {
		throw new TypeError(
			`[Chart] ${path}.layout cannot be combined with explicit ${axis}-axis endpoints.`
		);
	}
}

function compilePolarMarks<TRow extends object>(
	data: readonly TRow[],
	marks: readonly ChartPolarChildMark<TRow>[],
	parentPath: string
): readonly PolarMark<unknown, TanStackValue, TanStackValue>[] {
	if (marks.length === 0) {
		throw new TypeError(`[Chart] ${parentPath}.marks must contain at least one mark.`);
	}
	const ids = new Map<string, number>();
	return marks.map((mark, index) => {
		const path = `${parentPath}.marks[${index}]`;
		validateExplicitId(mark.id, index, path, ids);
		return compilePolarMark(data, mark, path);
	});
}

function compilePolarRadar<TRow extends object>(
	data: readonly TRow[],
	mark: ChartPolarRadarMark<TRow>,
	path: string
): CompiledMark {
	if (!mark.area && !mark.line && !mark.points) {
		throw new TypeError(`[Chart] ${path} must enable area, line, or points.`);
	}
	const angle = compileChannel(mark.angle);
	const radius = compileChannel(mark.radius);
	const color = compileColor(mark.color ?? 'primary');
	const curve = compileChartCurve(mark.curve ?? 'linear-closed', `${path}.curve`);
	const marks: PolarMark<unknown, TanStackValue, TanStackValue>[] = [];
	if (mark.area) {
		marks.push(
			radialArea(data, {
					id: `${path}:area`,
					angle,
					radius,
					curve,
					fill: color,
					fillOpacity: 0.18
				})
		);
	}
	if (mark.line) {
		marks.push(
			radialLine(data, {
					id: `${path}:line`,
					angle,
					radius,
					curve,
					stroke: color,
					strokeWidth: 2.25
				})
		);
	}
	if (mark.points) {
		marks.push(
			radialDot(data, {
					id: `${path}:points`,
					angle,
					radius,
					r: 3.5,
					fill: color
				})
		);
	}

	const inset = mark.inset ?? 24;
	const radiusRatio = mark.radiusRatio ?? 1;
	const compiled = polar({
		id: mark.id,
		marks,
		guides:
			mark.guides === false
				? undefined
				: [
						radialGrid({ ticks: 5, shape: 'polygon', strokeOpacity: 0.14 }),
						angleGrid({ strokeOpacity: 0.14 })
					],
		angle: { scale: compileChartScale({ type: 'point' }, `${path}.angle`) },
		radius: {
			scale: compileChartScale(
				{ type: 'linear', domain: mark.domain },
				`${path}.radius`
			)
		},
		inset,
		radiusRatio
	});
	return centerPolarPolygon(compiled, inset, radiusRatio);
}

function centerPolarPolygon<TRow, TXValue extends TanStackValue, TYValue extends TanStackValue>(
	mark: TanStackMark<TRow, TXValue, TYValue>,
	inset: number,
	radiusRatio: number
): TanStackMark<TRow, TXValue, TYValue> {
	return {
		...mark,
		initialize(context) {
			const initialized = mark.initialize(context);
			return {
				...initialized,
				render(renderContext) {
					const rendered = initialized.render(renderContext);
					const angleValues = new Set(
						(rendered.points ?? []).map((point) => chartValueIdentity(point.xValue))
					);
					if (angleValues.size < 3) return rendered;
					const unitPoints = Array.from({ length: angleValues.size }, (_value, index) => {
						const angle = (index / angleValues.size) * Math.PI * 2;
						return [Math.sin(angle), -Math.cos(angle)] as const;
					});
					const xs = unitPoints.map(([x]) => x);
					const ys = unitPoints.map(([, y]) => y);
					const radius =
						Math.max(0, Math.min(renderContext.chart.width, renderContext.chart.height) / 2 - inset) *
						radiusRatio;
					const translateX = -((Math.min(...xs) + Math.max(...xs)) / 2) * radius;
					const translateY = -((Math.min(...ys) + Math.max(...ys)) / 2) * radius;
					return {
						nodes: rendered.nodes.map((node) =>
							node.kind === 'group'
								? {
										...node,
										translateX: (node.translateX ?? 0) + translateX,
										translateY: (node.translateY ?? 0) + translateY
									}
								: node
						),
						points: rendered.points?.map((point) => ({
							...point,
							x: point.x + translateX,
							y: point.y + translateY
						}))
					};
				}
			};
		}
	};
}

function compilePolarMark<TRow extends object>(
	data: readonly TRow[],
	mark: ChartPolarChildMark<TRow>,
	path: string
): PolarMark<unknown, TanStackValue, TanStackValue> {
	switch (mark.type) {
		case 'arc':
			return radialArc(data, {
				...compileMarkChannels(mark),
				startAngle: compileChannel(mark.startAngle),
				endAngle: compileChannel(mark.endAngle),
				padAngle: compileOptionalChannel(mark.padAngle),
				innerRadius: mark.innerRadius,
				outerRadius: mark.outerRadius,
				cornerRadius: mark.cornerRadius,
				fill: compileColorVisual(mark.fill),
				fillOpacity: mark.fillOpacity,
				stroke: compileColorVisual(mark.stroke),
				strokeOpacity: mark.strokeOpacity,
				strokeWidth: mark.strokeWidth,
				strokeDasharray: mark.strokeDasharray,
				opacity: mark.opacity
			});
		case 'line':
			return radialLine(data, {
				...compileMarkChannels(mark),
				angle: compileNumberOrValueChannel(mark.angle),
				radius: compileNumberOrChannel(mark.radius),
				curve: mark.curve ? compileChartCurve(mark.curve, `${path}.curve`) : undefined,
				stroke: compileColorVisual(mark.stroke),
				strokeOpacity: mark.strokeOpacity,
				strokeWidth: mark.strokeWidth,
				strokeDasharray: mark.strokeDasharray,
				opacity: mark.opacity,
				points: mark.points
			});
		case 'area':
			return radialArea(data, {
				...compileMarkChannels(mark),
				angle: compileNumberOrValueChannel(mark.angle),
				radius: compileNumberOrChannel(mark.radius),
				radius1: compileNumberOrChannel(mark.radius1),
				curve: mark.curve ? compileChartCurve(mark.curve, `${path}.curve`) : undefined,
				fill: compileColorVisual(mark.fill),
				fillOpacity: mark.fillOpacity,
				stroke: compileColorVisual(mark.stroke),
				strokeOpacity: mark.strokeOpacity,
				strokeWidth: mark.strokeWidth,
				strokeDasharray: mark.strokeDasharray,
				opacity: mark.opacity
			});
		case 'point': {
			const shape = mark.shape;
			if (shape !== undefined && shape !== 'circle') {
				return unsupportedNestedDiscriminant(shape, `${path}.shape`);
			}
			return radialDot(data, {
				...compileMarkChannels(mark),
				angle: compileNumberOrValueChannel(mark.angle),
				radius: compileNumberOrChannel(mark.radius),
				r: compileNumberOrChannel(mark.radiusSize),
				fill: compileColorVisual(mark.fill),
				fillOpacity: mark.fillOpacity,
				stroke: compileOptionalColor(mark.stroke),
				strokeOpacity: mark.strokeOpacity,
				strokeWidth: mark.strokeWidth,
				opacity: mark.opacity
			});
		}
		case 'text':
			return radialText(data, {
				...compileMarkChannels(mark),
				angle: compileNumberOrValueChannel(mark.angle),
				radius: compileNumberOrChannel(mark.radius),
				text: compileChannel(mark.text),
				fill: compileColorVisual(mark.fill),
				fontSize: mark.fontSize,
				fontWeight: mark.fontWeight,
				anchor: mark.anchor,
				baseline: mark.baseline,
				rotate: mark.rotate,
				dx: mark.dx,
				dy: mark.dy
			});
		case 'rule':
			return radialRule(data, {
				...compileMarkChannels(mark),
				angle: compileNumberOrValueChannel(mark.angle),
				radius1: compileNumberOrChannel(mark.radius1),
				radius2: compileNumberOrChannel(mark.radius2),
				stroke: compileColorVisual(mark.stroke),
				strokeOpacity: mark.strokeOpacity,
				strokeWidth: mark.strokeWidth,
				strokeDasharray: mark.strokeDasharray,
				opacity: mark.opacity
			});
		default:
			return unsupportedPolarMark(mark, path);
	}
}

function compilePolarGuides(
	guides: readonly ChartPolarGuide[] | undefined,
	parentPath: string
): readonly PolarGuide[] | undefined {
	return guides?.map((guide, index) => {
		const path = `${parentPath}.guides[${index}]`;
		switch (guide.type) {
			case 'radial-grid':
				return radialGrid({
					values: guide.values,
					ticks: guide.ticks,
					shape: guide.shape,
					labels: guide.labels,
					format: guide.format,
					labelAngle: guide.labelAngle,
					labelOffset: guide.labelOffset,
					strokeOpacity: 0.14
				});
			case 'angle-grid':
				return angleGrid({
					values: guide.values,
					labels: guide.labels,
					format: guide.format,
					labelOffset: guide.labelOffset,
					strokeOpacity: 0.14
				});
			default:
				return unsupportedPolarGuide(guide, path);
		}
	});
}

function validatePolarScales<TRow extends object>(mark: ChartPolarMark<TRow>, path: string): void {
	if (mark.angle) validateScaleNice(mark.angle.scale, mark.angle.nice, `${path}.angle`);
	if (mark.radius) validateScaleNice(mark.radius.scale, mark.radius.nice, `${path}.radius`);
	const needsAngle =
		mark.marks.some((child) => child.type !== 'arc') ||
		mark.guides?.some((guide) => guide.type === 'angle-grid');
	const needsRadius =
		mark.marks.some((child) => child.type !== 'arc') ||
		mark.guides?.some((guide) => guide.type === 'radial-grid');
	if (needsAngle && mark.angle === undefined) {
		throw new TypeError(`[Chart] ${path}.angle is required by its radial marks or guides.`);
	}
	if (needsRadius && mark.radius === undefined) {
		throw new TypeError(`[Chart] ${path}.radius is required by its radial marks or guides.`);
	}
}

function compileGeoMark<TRow extends ChartGeoObject>(
	data: readonly TRow[],
	mark: ChartGeoShapeMark<TRow>,
	path: string
): CompiledMarkResult {
	// Svelai accepts readonly GeoJSON coordinates. D3's declarations require mutable arrays,
	// although geoShape only reads the objects, so the intersection keeps the original rows intact.
	type GeoRow = TRow & GeoPermissibleObjects;
	const geoData = data as readonly GeoRow[];
	return {
		mark: geoShape(geoData, {
			id: mark.id,
			key: compileKeyChannel(mark.key),
			color: compileOptionalChannel(mark.colorBy),
			projection: {
				type: compileChartProjection(mark.projection.type, `${path}.projection.type`),
				fit: mark.projection.fit ?? 'data',
				inset: mark.projection.inset
			},
			r: compileNumberOrChannel(mark.radius),
			fill: compileColorVisual(mark.fill),
			fillOpacity: mark.fillOpacity,
			stroke: compileColorVisual(mark.stroke),
			strokeOpacity: mark.strokeOpacity,
			strokeWidth: mark.strokeWidth,
			strokeDasharray: mark.strokeDasharray,
			opacity: mark.opacity,
			anchor: mark.anchor
		}),
		requiresX: false,
		requiresY: false
	};
}

function compilePosition(
	position: ChartPositionDefinition,
	path: string
): ChartAxisOptions<ChartValue> {
	validateScaleNice(position.scale, position.nice, path);
	return {
		scale: compileChartScale(position.scale, `${path}.scale`),
		nice: position.nice,
		reverse: position.reverse,
		grid: position.grid,
		axis: position.axis
	};
}

function validateScaleNice(
	scale: ChartPositionDefinition['scale'],
	nice: boolean | number | undefined,
	path: string
): void {
	if (nice === undefined || (scale.type !== 'band' && scale.type !== 'point')) return;
	throw new TypeError(`[Chart] ${path}.nice is not supported by the "${scale.type}" scale.`);
}

function compileTheme(palette: readonly ChartColor[] | undefined): ChartTheme {
	return {
		foreground: 'var(--color-neutral)',
		muted: 'var(--color-neutral)',
		grid: 'var(--color-neutral)',
		background: 'var(--color-surface)',
		palette: palette?.map(compileColor) ?? DEFAULT_PALETTE
	};
}

function compileTooltip<TRow extends object>(
	definition: boolean | ChartTooltipDefinition<TRow> | undefined,
	className: string | undefined,
	groupBy: 'x' | 'y' | undefined
): {
	input: false | ChartTooltipInput<TRow>;
	focus?: 'group-x' | 'group-y';
} {
	if (!definition) return { input: false };
	const configuredGroupBy =
		definition === true ? groupBy : resolveConfiguredGroupBy(definition, groupBy);
	const focus = configuredGroupBy ? (`group-${configuredGroupBy}` as const) : undefined;
	const placement = definition === true ? undefined : definition.placement;

	return {
		focus,
		input: {
			use: tooltip,
			portal,
			className,
			anchor: focus ? 'group-center' : 'point',
			placement: placement ?? (focus ? GROUPED_TOOLTIP_PLACEMENTS : 'auto'),
			sort: 'color-domain',
			items: definition === true ? undefined : definition.fields?.map(compileTooltipField),
			offset: definition === true ? undefined : definition.offset,
			sticky: definition === true ? undefined : definition.sticky
		}
	};
}

function resolveTooltipGroupBy<TRow extends object>(
	configuration: ChartPlotConfiguration<TRow>
): 'x' | 'y' | undefined {
	if (!configuration.x || !configuration.y) return undefined;
	const xIsCategorical = isCategoricalScale(configuration.x.scale);
	const yIsCategorical = isCategoricalScale(configuration.y.scale);
	return yIsCategorical && !xIsCategorical ? 'y' : 'x';
}

function resolveConfiguredGroupBy<TRow extends object>(
	definition: ChartTooltipDefinition<TRow>,
	fallback: 'x' | 'y' | undefined
): 'x' | 'y' | undefined {
	return definition.groupBy === false ? undefined : (definition.groupBy ?? fallback);
}

function isCategoricalScale(scale: ChartPositionDefinition['scale']): boolean {
	return scale.type === 'band' || scale.type === 'point';
}

function compileTooltipField<TRow extends object>(
	field: ChartTooltipField<TRow>
): ChartTooltipDatumItem<TRow> {
	const format = field.format;
	return {
		field: field.field,
		label: field.label,
		text: format
			? (point) => Reflect.apply(format, undefined, [point.datum[field.field], point.datum])
			: undefined
	};
}

function compileMarkChannels<TRow extends object>(mark: {
	id?: string;
	key?: TanStackChannel<TRow, ChartKey>;
	series?: ChartChannel<TRow, ChartKey>;
	colorBy?: ChartChannel<TRow, ChartKey>;
}) {
	return {
		id: mark.id,
		key: compileKeyChannel(mark.key),
		z: compileOptionalChannel(mark.series ?? mark.colorBy),
		color: compileOptionalChannel(mark.colorBy)
	};
}

function compileChannel<TRow extends object, TValue>(
	channel: ChartChannel<TRow, TValue>
): (row: TRow, index: number, rows: readonly TRow[]) => TValue | null | undefined {
	if (typeof channel === 'function') return channel;
	// ChartField guarantees this property has the requested value type; Reflect cannot retain
	// that mapped-type relationship once the field is translated into a runtime accessor.
	return (row) => Reflect.get(row, channel) as TValue | null | undefined;
}

function compileOptionalChannel<TRow extends object, TValue>(
	channel: ChartChannel<TRow, TValue> | undefined
): ((row: TRow, index: number, rows: readonly TRow[]) => TValue | null | undefined) | undefined {
	return channel === undefined ? undefined : compileChannel(channel);
}

function compileValueOrChannel<TRow extends object, TValue>(
	value: TValue | ChartChannel<TRow, TValue> | undefined,
	isConstant: (candidate: TValue | ChartChannel<TRow, TValue>) => candidate is TValue
): TValue | ReturnType<typeof compileChannel<TRow, TValue>> | undefined {
	if (value === undefined || isConstant(value)) return value;
	return compileChannel(value);
}

function compileNumberOrChannel<TRow extends object>(
	value: number | ChartChannel<TRow, number> | undefined
): number | ReturnType<typeof compileChannel<TRow, number>> | undefined {
	return compileValueOrChannel(
		value,
		(candidate): candidate is number => typeof candidate === 'number'
	);
}

function compileNumberOrValueChannel<TRow extends object>(
	value: number | ChartChannel<TRow, ChartValue>
): number | ReturnType<typeof compileChannel<TRow, ChartValue>> {
	return typeof value === 'number' ? value : compileChannel(value);
}

function compileKeyChannel<TRow extends object>(
	channel: TanStackChannel<TRow, ChartKey>
): (row: TRow, index: number, rows: readonly TRow[]) => ChartKey;
function compileKeyChannel<TRow extends object>(
	channel: TanStackChannel<TRow, ChartKey> | undefined
): ((row: TRow, index: number, rows: readonly TRow[]) => ChartKey) | undefined;
function compileKeyChannel<TRow extends object>(
	channel: TanStackChannel<TRow, ChartKey> | undefined
): ((row: TRow, index: number, rows: readonly TRow[]) => ChartKey) | undefined {
	if (channel === undefined || typeof channel === 'function') return channel;
	return (row) => Reflect.get(row, channel) as ChartKey;
}

function compileColorVisual<TRow>(
	color: ChartVisual<TRow, ChartColor> | undefined
): VisualChannel<TRow, string> | undefined {
	if (typeof color !== 'function') return color === undefined ? undefined : compileColor(color);
	return (row, index, rows) => compileColor(color(row, index, rows));
}

function compileOptionalColor(color: ChartColor | undefined): string | undefined {
	return color === undefined ? undefined : compileColor(color);
}

function compileColor(color: ChartColor): string {
	return SEMANTIC_COLORS.has(color) ? `var(--color-${color})` : color;
}

function validateInitialDimensions(dimensions: ChartInitialDimensions | undefined): void {
	if (dimensions === undefined) return;
	if (!Number.isFinite(dimensions.width) || dimensions.width <= 0) {
		throw new TypeError('[Chart] initialDimensions.width must be a finite number greater than 0.');
	}
	if (!Number.isFinite(dimensions.height) || dimensions.height <= 0) {
		throw new TypeError('[Chart] initialDimensions.height must be a finite number greater than 0.');
	}
}

function validateMarkId<TRow extends object>(
	mark: ChartMark<TRow>,
	index: number,
	path: string,
	seen: Map<string, number>
): void {
	validateExplicitId(mark.id, index, path, seen);
}

function validateExplicitId(
	id: string | undefined,
	index: number,
	path: string,
	seen: Map<string, number>
): void {
	if (id === undefined) return;
	const previousIndex = seen.get(id);
	if (previousIndex !== undefined) {
		const previousPath = path.replace(/\[\d+\]$/, `[${previousIndex}]`);
		throw new TypeError(`[Chart] ${path}.id duplicates ${previousPath}.id "${id}".`);
	}
	seen.set(id, index);
}

function unsupportedMark<TRow extends object>(
	mark: never,
	path: string,
	_data: readonly TRow[],
	_tooltipClassName?: string
): never {
	throw new TypeError(`[Chart] ${path}.type "${String(readDiscriminant(mark))}" is not supported.`);
}

function unsupportedPolarMark(mark: never, path: string): never {
	throw new TypeError(`[Chart] ${path}.type "${String(readDiscriminant(mark))}" is not supported.`);
}

function unsupportedPolarGuide(guide: never, path: string): never {
	throw new TypeError(
		`[Chart] ${path}.type "${String(readDiscriminant(guide))}" is not supported.`
	);
}

function unsupportedNestedDiscriminant(value: unknown, path: string): never {
	throw new TypeError(`[Chart] ${path} "${String(readDiscriminant(value))}" is not supported.`);
}

function readDiscriminant(value: unknown): unknown {
	return typeof value === 'object' && value !== null && 'type' in value ? value.type : value;
}
