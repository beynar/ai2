import type { Channel as TanStackChannel, ChartTheme, VisualChannel } from '@tanstack/charts';
import type { ChartChannel, ChartColor, ChartKey, ChartValue, ChartVisual } from './chart.props.js';

const SEMANTIC_COLORS = new Set([
	'primary',
	'secondary',
	'danger',
	'success',
	'warning',
	'info',
	'neutral'
]);

export const DEFAULT_CHART_PALETTE = [
	'var(--color-primary)',
	'var(--color-secondary)',
	'var(--color-success)',
	'var(--color-warning)',
	'var(--color-danger)',
	'var(--color-info)',
	'var(--color-neutral)'
] as const;

export function compileChartTheme(palette: readonly ChartColor[] | undefined): ChartTheme {
	return {
		foreground: 'var(--color-neutral)',
		muted: 'var(--color-neutral)',
		grid: 'var(--color-neutral)',
		background: 'var(--color-surface)',
		palette: palette?.map(compileColor) ?? DEFAULT_CHART_PALETTE
	};
}

export function compileMarkChannels<TRow extends object>(
	mark: {
		id?: string;
		key?: TanStackChannel<TRow, ChartKey>;
		series?: ChartChannel<TRow, ChartKey>;
		colorBy?: ChartChannel<TRow, ChartKey>;
	},
	fallbackSeries?: ChartChannel<TRow, ChartKey>
) {
	return {
		id: mark.id,
		key: compileKeyChannel(mark.key),
		z: compileOptionalChannel(mark.series ?? mark.colorBy ?? fallbackSeries),
		color: compileOptionalChannel(mark.colorBy)
	};
}

export function compileChannel<TRow extends object, TValue>(
	channel: ChartChannel<TRow, TValue>
): (row: TRow, index: number, rows: readonly TRow[]) => TValue | null | undefined {
	if (typeof channel === 'function') return channel;
	// ChartField guarantees this property has the requested value type; Reflect cannot retain
	// that mapped-type relationship once the field is translated into a runtime accessor.
	return (row) => Reflect.get(row, channel) as TValue | null | undefined;
}

export function compileOptionalChannel<TRow extends object, TValue>(
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

export function compileNumberOrChannel<TRow extends object>(
	value: number | ChartChannel<TRow, number> | undefined
): number | ReturnType<typeof compileChannel<TRow, number>> | undefined {
	return compileValueOrChannel(
		value,
		(candidate): candidate is number => typeof candidate === 'number'
	);
}

export function compileNumberOrValueChannel<TRow extends object>(
	value: number | ChartChannel<TRow, ChartValue>
): number | ReturnType<typeof compileChannel<TRow, ChartValue>> {
	return typeof value === 'number' ? value : compileChannel(value);
}

export function compileKeyChannel<TRow extends object>(
	channel: TanStackChannel<TRow, ChartKey>
): (row: TRow, index: number, rows: readonly TRow[]) => ChartKey;
export function compileKeyChannel<TRow extends object>(
	channel: TanStackChannel<TRow, ChartKey> | undefined
): ((row: TRow, index: number, rows: readonly TRow[]) => ChartKey) | undefined;
export function compileKeyChannel<TRow extends object>(
	channel: TanStackChannel<TRow, ChartKey> | undefined
): ((row: TRow, index: number, rows: readonly TRow[]) => ChartKey) | undefined {
	if (channel === undefined || typeof channel === 'function') return channel;
	return (row) => Reflect.get(row, channel) as ChartKey;
}

export function compileColorVisual<TRow>(
	color: ChartVisual<TRow, ChartColor> | undefined
): VisualChannel<TRow, string> | undefined {
	if (typeof color !== 'function') return color === undefined ? undefined : compileColor(color);
	return (row, index, rows) => compileColor(color(row, index, rows));
}

export function compileOptionalColor(color: ChartColor | undefined): string | undefined {
	return color === undefined ? undefined : compileColor(color);
}

export function compileColor(color: ChartColor): string {
	return SEMANTIC_COLORS.has(color) ? `var(--color-${color})` : color;
}

export function chartKeyIdentity(value: ChartKey): string {
	return `${typeof value}:${String(value)}`;
}
