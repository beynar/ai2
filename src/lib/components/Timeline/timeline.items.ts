import type { Colors } from '$lib/types/theme.js';
import type {
	TimelineItem,
	TimelineOrientation,
	TimelinePlacement,
	TimelineSide
} from './timeline.props.js';

export type ResolvedTimelineItem<Item extends TimelineItem> = Readonly<{
	key: string;
	item: Item;
	index: number;
	side: TimelineSide;
	orientation: TimelineOrientation;
	color: Colors;
	connectorColor: Colors;
	isFirst: boolean;
	isLast: boolean;
}>;

function formatTimelineId(id: string | number): string {
	return typeof id === 'string' ? `"${id}"` : String(id);
}

export function resolveTimelineItems<Item extends TimelineItem>(
	items: readonly Item[],
	orientation: TimelineOrientation,
	placement: TimelinePlacement,
	color: Colors,
	connectorColor: Colors
): readonly ResolvedTimelineItem<Item>[] {
	const explicitIds = new Set<string | number>();

	return items.map((timelineItem, index) => {
		if (timelineItem.id !== undefined) {
			if (explicitIds.has(timelineItem.id)) {
				throw new TypeError(
					`Timeline item IDs must be unique. Duplicate ID ${formatTimelineId(timelineItem.id)} at index ${index}.`
				);
			}
			explicitIds.add(timelineItem.id);
		}

		if (placement !== 'alternate' && timelineItem.side !== undefined) {
			throw new TypeError(
				`Timeline item side is only valid when placement="alternate". Remove side from the item at index ${index} or change the placement.`
			);
		}

		const side =
			placement === 'alternate'
				? (timelineItem.side ?? (index % 2 === 0 ? 'end' : 'start'))
				: placement;
		const key =
			timelineItem.id === undefined
				? `index:${index}`
				: `id:${typeof timelineItem.id}:${timelineItem.id}`;

		return {
			key,
			item: timelineItem,
			index,
			side,
			orientation,
			color: timelineItem.color ?? color,
			connectorColor: timelineItem.connectorColor ?? connectorColor,
			isFirst: index === 0,
			isLast: index === items.length - 1
		};
	});
}
