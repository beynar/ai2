import type { Colors } from '$lib/types/theme.js';
import type { EventCalendarOccurrence } from './eventCalendar.types.js';

const SEMANTIC_COLORS: ReadonlySet<string> = new Set<Colors>([
	'primary',
	'secondary',
	'danger',
	'success',
	'warning',
	'info',
	'neutral'
]);

export function isEventCalendarSemanticColor(value: string | undefined): value is Colors {
	return value !== undefined && SEMANTIC_COLORS.has(value);
}

export function getEventCalendarItemColor<TItemFields extends object>(
	occurrence: EventCalendarOccurrence<TItemFields>,
	fallback: Colors
): string {
	const itemColor = occurrence.item.color;
	if (!itemColor) return `var(--color-${fallback})`;
	return isEventCalendarSemanticColor(itemColor) ? `var(--color-${itemColor})` : itemColor;
}
