import type { Colors } from '$lib/types/theme.js';
import type { GanttColor } from './ganttChart.types.js';

const SEMANTIC_COLORS: ReadonlySet<string> = new Set<Colors>([
	'primary',
	'secondary',
	'danger',
	'success',
	'warning',
	'info',
	'neutral'
]);

export function isGanttSemanticColor(value: GanttColor | undefined): value is Colors {
	return value !== undefined && SEMANTIC_COLORS.has(value);
}

export function getGanttTaskColor(value: GanttColor | undefined, fallback: Colors): string {
	if (!value) return `var(--color-${fallback})`;
	return isGanttSemanticColor(value) ? `var(--color-${value})` : value;
}
