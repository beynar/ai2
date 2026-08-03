import type { ChartAxisOptions } from '@tanstack/charts';
import type { ChartPositionDefinition, ChartValue } from './chart.props.js';
import { compileChartScale } from './chart.scale.js';

export function compilePosition(
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

export function validateScaleNice(
	scale: ChartPositionDefinition['scale'],
	nice: boolean | number | undefined,
	path: string
): void {
	if (nice === undefined || (scale.type !== 'band' && scale.type !== 'point')) return;
	throw new TypeError(`[Chart] ${path}.nice is not supported by the "${scale.type}" scale.`);
}
