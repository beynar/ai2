import {
	defineChart,
	facet,
	frame,
	type ChartAnimationOptions,
	type ChartColorOptions,
	type ChartDefinition,
	type ChartHostOptions,
	type StaticChartDefinition
} from '@tanstack/charts';
import { compileAnnotations } from './chart.annotation.js';
import { compileMarkAnalysis } from './chart.analysis.js';
import {
	compileChannel,
	compileChartTheme,
	compileColor,
	compileKeyChannel,
	compileOptionalColor
} from './chart.channels.js';
import {
	compileAreaGradients,
	compileBarMark,
	compileScatterMark,
	compileSeriesMark,
	type AreaGradients,
	type CompiledMark,
	type CompiledMarkResult
} from './chart.cartesian.js';
import { compileDistribution, isEmpiricalDistributionMark } from './chart.distribution.js';
import { unsupportedDiscriminant } from './chart.errors.js';
import {
	compileMatrixColorOptions,
	compileMatrixMark,
	isCalendarMatrixMark,
	isQuantitativeMatrixMark
} from './chart.matrix.js';
import { compilePolarChartMark } from './chart.polar.js';
import { compilePosition } from './chart.position.js';
import { compileProportion } from './chart.proportion.js';
import { compileRelationChart } from './chart.relation.js';
import type {
	ChartChannel,
	ChartDistributionMark,
	ChartFrameDefinition,
	ChartKey,
	ChartMark,
	ChartPositionDefinition,
	ChartProportionMark,
	ChartRelationMark,
	ChartScatterMark,
	ChartProps
} from './chart.props.js';
import {
	compileChartTooltip,
	resolveChartTooltipGroupBy,
	type ChartTooltipSpecialization
} from './chart.tooltip.js';
import { validateInitialDimensions, validateMarkId } from './chart.validation.js';

type ChartPlotConfiguration<TRow extends object> = Pick<
	ChartProps<TRow>,
	'marks' | 'x' | 'y' | 'guides' | 'clip' | 'frame' | 'margin' | 'palette' | 'tooltip'
>;

type CreateChartOptionsInput<TRow extends object> = Pick<
	ChartProps<TRow>,
	| 'data'
	| 'marks'
	| 'x'
	| 'y'
	| 'guides'
	| 'clip'
	| 'frame'
	| 'margin'
	| 'palette'
	| 'tooltip'
	| 'ariaLabel'
	| 'ariaDescription'
	| 'initialDimensions'
> & {
	idPrefix: string;
	tooltipClassName?: string;
	animation?: false | ChartAnimationOptions;
};

type CompileMarkInput<TRow extends object> = {
	readonly data: readonly TRow[];
	readonly mark: ChartMark<TRow>;
	readonly path: string;
	readonly configuration: ChartPlotConfiguration<TRow>;
	readonly tooltipClassName?: string;
	readonly areaGradients?: AreaGradients;
	readonly fallbackSeries?: ChartChannel<TRow, ChartKey>;
	readonly distributionDomain?: readonly [number, number];
};

export function createChartOptions<TRow extends object>({
	data,
	marks,
	x,
	y,
	guides,
	clip,
	frame: chartFrame,
	margin,
	palette,
	tooltip,
	ariaLabel,
	ariaDescription,
	idPrefix,
	initialDimensions,
	tooltipClassName,
	animation
}: CreateChartOptionsInput<TRow>): ChartHostOptions<TRow> {
	validateInitialDimensions(initialDimensions);
	const definition = compileChartDefinition(
		data,
		{ marks, x, y, guides, clip, frame: chartFrame, margin, palette, tooltip },
		tooltipClassName,
		animation
	);

	return {
		definition,
		ariaLabel,
		ariaDescription,
		idPrefix,
		initialWidth: initialDimensions?.width,
		aspectRatio: initialDimensions ? initialDimensions.width / initialDimensions.height : undefined
	};
}

function compileChartDefinition<TRow extends object>(
	data: readonly TRow[],
	configuration: ChartPlotConfiguration<TRow>,
	tooltipClassName?: string,
	animation?: false | ChartAnimationOptions
): ChartDefinition<TRow> {
	if (!Array.isArray(configuration.marks) || configuration.marks.length === 0) {
		throw new TypeError('[Chart] marks must contain at least one mark.');
	}
	const relationMark = configuration.marks.find(
		(mark): mark is ChartRelationMark<TRow> => mark.type === 'relation'
	);
	if (!relationMark) {
		return compileChartPlot(data, configuration, tooltipClassName, '', undefined, animation);
	}
	const relationIndex = configuration.marks.indexOf(relationMark);
	const relationPath = `marks[${relationIndex}]`;
	validateRelationPlot(configuration, relationIndex);
	if (configuration.palette !== undefined && configuration.palette.length === 0) {
		throw new TypeError('[Chart] palette must contain at least one color.');
	}
	const chartTooltip = compileChartTooltip(configuration.tooltip, tooltipClassName, undefined, {
		type: 'relation'
	});
	return compileRelationChart({
		data,
		mark: relationMark,
		path: relationPath,
		palette: configuration.palette,
		tooltip: chartTooltip.input
	});
}

function compileChartPlot<TRow extends object>(
	data: readonly TRow[],
	configuration: ChartPlotConfiguration<TRow>,
	tooltipClassName?: string,
	path = '',
	fallbackSeries?: ChartChannel<TRow, ChartKey>,
	animation?: false | ChartAnimationOptions
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

	const distributionMark = configuration.marks.find(
		(mark): mark is ChartDistributionMark<TRow> => mark.type === 'distribution'
	);
	const proportionMark = configuration.marks.find(
		(mark): mark is ChartProportionMark<TRow> => mark.type === 'proportion'
	);
	const hexbinMark = configuration.marks.find(
		(mark): mark is Extract<ChartScatterMark<TRow>, { variant: 'hexbin' }> =>
			mark.type === 'scatter' && mark.variant === 'hexbin'
	);
	const proportionIndex = proportionMark ? configuration.marks.indexOf(proportionMark) : -1;
	if (proportionMark) validateProportionPlot(configuration, proportionIndex, path);

	const chartTooltip = compileChartTooltip(
		configuration.tooltip,
		tooltipClassName,
		hexbinMark ? undefined : resolveChartTooltipGroupBy(configuration),
		resolveTooltipSpecialization(distributionMark, proportionMark, hexbinMark)
	);
	const areaGradients = configuration.marks.some((mark) => mark.type === 'series' && mark.area)
		? compileAreaGradients(configuration.palette, path)
		: undefined;
	const markIds = new Map<string, number>();
	let distributionIndex: number | undefined;
	let requiredXPath: string | undefined;
	let requiredYPath: string | undefined;
	let resolvedX = configuration.x;
	let resolvedY = configuration.y;
	let matrixColor: ChartColorOptions | undefined;
	const marks: CompiledMark[] = [];
	const plotFrame = compileFrame(configuration.frame);
	if (plotFrame) marks.push(plotFrame);

	configuration.marks.forEach((mark, index) => {
		const markPath = `${marksPath}[${index}]`;
		validateMarkId(mark, index, markPath, markIds);
		validateBandwidthScales(mark, configuration, markPath, path);
		if (mark.type === 'matrix' && isQuantitativeMatrixMark(mark)) {
			if (configuration.marks.length !== 1) {
				throw new TypeError(
					`[Chart] ${markPath}.value requires the matrix to be the only mark in its plot because it owns the numeric color scale.`
				);
			}
			matrixColor = compileMatrixColorOptions(mark, markPath);
		}
		if (mark.type === 'distribution') {
			if (distributionIndex !== undefined) {
				throw new TypeError(
					`[Chart] ${markPath}.type cannot be combined with ${marksPath}[${distributionIndex}].type; only one distribution mark is supported per plot.`
				);
			}
			distributionIndex = index;
			validateDistributionScales(mark, configuration, markPath, path);
		}

		const compiled = compileMark({
			data,
			mark,
			path: markPath,
			configuration,
			tooltipClassName,
			areaGradients,
			fallbackSeries,
			distributionDomain:
				mark.type === 'distribution' ? resolveDistributionDomain(mark, configuration) : undefined
		});
		if (compiled.implicitPositions) {
			resolvedX = compiled.implicitPositions.x;
			resolvedY = compiled.implicitPositions.y;
		}
		if (compiled.requiresX && requiredXPath === undefined) requiredXPath = markPath;
		if (compiled.requiresY && requiredYPath === undefined) requiredYPath = markPath;
		const compiledMarks = 'marks' in compiled ? compiled.marks : [compiled.mark];
		const annotationSources = compiled.annotationMarks ?? compiledMarks;
		const annotations =
			'annotations' in mark
				? compileAnnotations(data, mark, annotationSources, markPath)
				: { under: [], over: [] };
		const analysisMarks = compileMarkAnalysis({
			data,
			mark,
			path: markPath,
			fallbackSeries
		});
		marks.push(...annotations.under, ...compiledMarks, ...analysisMarks, ...annotations.over);
	});

	if (requiredXPath !== undefined && resolvedX === undefined) {
		throw new TypeError(`[Chart] ${xPath} is required by ${requiredXPath}.`);
	}
	if (requiredYPath !== undefined && resolvedY === undefined) {
		throw new TypeError(`[Chart] ${yPath} is required by ${requiredYPath}.`);
	}

	const definition: StaticChartDefinition<TRow> = {
		marks,
		x: requiredXPath !== undefined && resolvedX ? compilePosition(resolvedX, xPath) : undefined,
		y: requiredYPath !== undefined && resolvedY ? compilePosition(resolvedY, yPath) : undefined,
		guides: configuration.guides,
		clip: configuration.clip,
		margin: configuration.margin,
		gradients: areaGradients?.definitions,
		color: matrixColor,
		theme: compileChartTheme(configuration.palette)
	};

	return defineChart(definition, {
		animate: animation,
		keyboard: false,
		focusRing: false,
		focus: chartTooltip.focus,
		tooltip: chartTooltip.input
	});
}

function compileFrame(input: boolean | ChartFrameDefinition | undefined): CompiledMark | undefined {
	if (!input) return undefined;
	const definition = input === true ? {} : input;
	return frame({
		fill: compileOptionalColor(definition.fill),
		fillOpacity: definition.fillOpacity,
		stroke: compileColor(definition.stroke ?? 'neutral'),
		strokeOpacity: definition.strokeOpacity ?? 0.35,
		strokeWidth: definition.strokeWidth ?? 1,
		inset: definition.inset,
		radius: definition.radius
	});
}

function compileMark<TRow extends object>({
	data,
	mark,
	path,
	configuration,
	tooltipClassName,
	areaGradients,
	fallbackSeries,
	distributionDomain
}: CompileMarkInput<TRow>): CompiledMarkResult {
	switch (mark.type) {
		case 'series':
			return compileSeriesMark(data, mark, path, areaGradients, fallbackSeries);
		case 'scatter':
			return compileScatterMark(data, mark, path, fallbackSeries);
		case 'bar':
			return compileBarMark(data, mark, path, fallbackSeries);
		case 'distribution': {
			const compiled = compileDistribution({
				data,
				mark,
				path,
				group: compileChannel(mark.group),
				value: compileChannel(mark.value),
				color: mark.color === undefined ? undefined : compileColor(mark.color),
				domain: distributionDomain
			});
			return {
				marks: compiled.marks,
				annotationMarks: compiled.marks,
				requiresX: true,
				requiresY: true
			};
		}
		case 'proportion': {
			const marks = compileProportion({
				data,
				mark,
				path,
				category: compileChannel(mark.category),
				value: compileChannel(mark.value)
			});
			return { marks, annotationMarks: marks.slice(0, 1), requiresX: false, requiresY: false };
		}
		case 'matrix':
			return compileMatrixMark(data, mark, path, fallbackSeries);
		case 'facet': {
			const nestedConfiguration: ChartPlotConfiguration<TRow> = {
				...configuration,
				marks: mark.marks,
				frame: undefined,
				tooltip: undefined
			};
			return {
				mark: facet(data, {
					id: mark.id,
					by: compileKeyChannel(mark.by),
					chart: (facetData, facetKey) =>
						compileChartPlot(
							facetData,
							nestedConfiguration,
							tooltipClassName,
							path,
							() => facetKey
						),
					columns: mark.columns,
					minWidth: mark.minWidth,
					gap: mark.gap,
					label: mark.label,
					axes: mark.axes
				}),
				requiresX: false,
				requiresY: false
			};
		}
		case 'polar': {
			const polarMark = compilePolarChartMark(data, mark, path);
			return { mark: polarMark, annotationMarks: [polarMark], requiresX: false, requiresY: false };
		}
		case 'relation':
			throw new TypeError(`[Chart] ${path}.type "relation" cannot be nested in a facet.`);
		default:
			return unsupportedDiscriminant(mark, `${path}.type`);
	}
}

function validateRelationPlot<TRow extends object>(
	configuration: ChartPlotConfiguration<TRow>,
	relationIndex: number
): void {
	const markPath = `marks[${relationIndex}]`;
	if (configuration.marks.length !== 1) {
		throw new TypeError(
			`[Chart] ${markPath}.type must be the only mark in its plot because it owns the complete relation layout.`
		);
	}
	if (configuration.x !== undefined || configuration.y !== undefined) {
		throw new TypeError(`[Chart] ${markPath}.type cannot be combined with x or y positions.`);
	}
	if (
		configuration.guides !== undefined ||
		configuration.clip !== undefined ||
		configuration.frame !== undefined ||
		configuration.margin !== undefined
	) {
		throw new TypeError(
			`[Chart] ${markPath}.type owns guides, clipping, framing, and margins for its relation layout.`
		);
	}
}

function validateBandwidthScales<TRow extends object>(
	mark: ChartMark<TRow>,
	configuration: ChartPlotConfiguration<TRow>,
	markPath: string,
	definitionPath: string
): void {
	if (mark.type !== 'matrix') return;
	if (isCalendarMatrixMark(mark)) {
		if (configuration.x !== undefined || configuration.y !== undefined) {
			throw new TypeError(
				`[Chart] ${markPath}.variant "calendar" owns its x and y positions and cannot be combined with ${appendPath(definitionPath, 'x')} or ${appendPath(definitionPath, 'y')}.`
			);
		}
		return;
	}
	validateBandScale(configuration.x, `${markPath}.x`, appendPath(definitionPath, 'x'));
	validateBandScale(configuration.y, `${markPath}.y`, appendPath(definitionPath, 'y'));
}

function validateDistributionScales<TRow extends object>(
	mark: ChartDistributionMark<TRow>,
	configuration: ChartPlotConfiguration<TRow>,
	markPath: string,
	definitionPath: string
): void {
	const direction = mark.direction ?? 'vertical';
	if (isEmpiricalDistributionMark(mark)) {
		const valueAxis = direction === 'vertical' ? 'x' : 'y';
		const statisticAxis = direction === 'vertical' ? 'y' : 'x';
		validateLinearScale(
			configuration[valueAxis],
			`${markPath}.value`,
			appendPath(definitionPath, valueAxis)
		);
		validateLinearScale(
			configuration[statisticAxis],
			`${markPath}.variant`,
			appendPath(definitionPath, statisticAxis)
		);
		return;
	}
	const groupAxis = direction === 'vertical' ? 'x' : 'y';
	const valueAxis = direction === 'vertical' ? 'y' : 'x';
	const groupPosition = configuration[groupAxis];
	const valuePosition = configuration[valueAxis];
	if (groupPosition && groupPosition.scale.type !== 'band') {
		throw new TypeError(
			`[Chart] ${markPath}.group requires ${appendPath(definitionPath, groupAxis)}.scale.type to be "band".`
		);
	}
	if (valuePosition && valuePosition.scale.type !== 'linear') {
		throw new TypeError(
			`[Chart] ${markPath}.value requires ${appendPath(definitionPath, valueAxis)}.scale.type to be "linear".`
		);
	}
}

function validateProportionPlot<TRow extends object>(
	configuration: ChartPlotConfiguration<TRow>,
	proportionIndex: number,
	definitionPath: string
): void {
	const markPath = `${appendPath(definitionPath, 'marks')}[${proportionIndex}]`;
	if (configuration.marks.length !== 1) {
		throw new TypeError(
			`[Chart] ${markPath}.type must be the only mark in its plot because it owns the complete proportion layout.`
		);
	}
	if (configuration.x !== undefined || configuration.y !== undefined) {
		throw new TypeError(`[Chart] ${markPath}.type cannot be combined with x or y positions.`);
	}
}

function resolveTooltipSpecialization<TRow extends object>(
	distributionMark: ChartDistributionMark<TRow> | undefined,
	proportionMark: ChartProportionMark<TRow> | undefined,
	hexbinMark: Extract<ChartScatterMark<TRow>, { variant: 'hexbin' }> | undefined
): ChartTooltipSpecialization | undefined {
	if (distributionMark) {
		return { type: 'distribution', direction: distributionMark.direction ?? 'vertical' };
	}
	if (proportionMark) return { type: 'proportion' };
	return hexbinMark ? { type: 'hexbin' } : undefined;
}

function resolveDistributionDomain<TRow extends object>(
	mark: ChartDistributionMark<TRow>,
	configuration: ChartPlotConfiguration<TRow>
): readonly [number, number] | undefined {
	const isVertical = (mark.direction ?? 'vertical') === 'vertical';
	let position: ChartPositionDefinition | undefined;
	if (isEmpiricalDistributionMark(mark)) position = isVertical ? configuration.x : configuration.y;
	else position = isVertical ? configuration.y : configuration.x;
	return position?.scale.type === 'linear' ? position.scale.domain : undefined;
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

function validateLinearScale(
	position: ChartPositionDefinition | undefined,
	channelPath: string,
	positionPath: string
): void {
	if (position === undefined || position.scale.type === 'linear') return;
	throw new TypeError(`[Chart] ${channelPath} requires ${positionPath}.scale.type to be "linear".`);
}
