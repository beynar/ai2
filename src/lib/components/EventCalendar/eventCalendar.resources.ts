import { EventCalendarError } from './eventCalendar.error.js';
import type { EventCalendarDayBucket } from './eventCalendar.items.js';
import type {
	EventCalendarBusinessHours,
	EventCalendarItem,
	EventCalendarResource
} from './eventCalendar.types.js';

export type EventCalendarResourceStructureNode = Readonly<{
	id: string;
	parentId?: string;
	depth: number;
	isLeaf: boolean;
	leafStart: number;
	leafSpan: number;
}>;

export type EventCalendarResourceStructure = Readonly<{
	signature: string;
	nodes: readonly EventCalendarResourceStructureNode[];
	leaves: readonly EventCalendarResourceStructureNode[];
	maxDepth: number;
}>;

export type EventCalendarResourceColumn<TResourceFields extends object> = Readonly<{
	key: string;
	resourceId?: string;
	resource: EventCalendarResource<TResourceFields> | null;
	depth: number;
	isUnassigned: boolean;
}>;

export type EventCalendarResourceHeaderCell<TResourceFields extends object> = Readonly<{
	key: string;
	resource: EventCalendarResource<TResourceFields> | null;
	resourceId?: string;
	depth: number;
	isLeaf: boolean;
	isUnassigned: boolean;
	columnStart: number;
	columnSpan: number;
	rowSpan: number;
}>;

export type EventCalendarResourceModel<TResourceFields extends object> = Readonly<{
	structure: EventCalendarResourceStructure;
	columns: readonly EventCalendarResourceColumn<TResourceFields>[];
	headerCells: readonly EventCalendarResourceHeaderCell<TResourceFields>[];
	leafIds: ReadonlySet<string>;
	resolveLeaf(resourceId?: string): EventCalendarResource<TResourceFields> | null;
	resolveLeafId(resourceId?: string): string | undefined;
	resolveItemLeafIds(item: Pick<EventCalendarItem<object>, 'resourceId' | 'resourceIds'>): string[];
	getBusinessHours(resourceId?: string): readonly EventCalendarBusinessHours[] | null;
	isReadOnly(resourceId?: string): boolean;
}>;

/**
 * Reuses hierarchy metadata while rebuilding the current-object map for every new controlled array.
 * Consumer-only field replacements therefore reach snippets without invalidating stable structure.
 */
export class EventCalendarResourceIndex<TResourceFields extends object> {
	private resources: readonly EventCalendarResource<TResourceFields>[] | null = null;
	private structure: EventCalendarResourceStructure | null = null;
	private model: EventCalendarResourceModel<TResourceFields> | null = null;

	get(
		resources: readonly EventCalendarResource<TResourceFields>[]
	): EventCalendarResourceModel<TResourceFields> {
		if (this.resources === resources && this.model) return this.model;

		const resourcesById = validateResourceDefinitions(resources);
		const signature = JSON.stringify(
			resources.map((resource) => [resource.id, resource.parentId ?? null])
		);
		if (this.structure?.signature !== signature) {
			this.structure = buildResourceStructure(resources, resourcesById, signature);
		}

		const structure = this.structure;
		const leafIds = new Set(structure.leaves.map((leaf) => leaf.id));
		const columns: EventCalendarResourceColumn<TResourceFields>[] = structure.leaves.map(
			(leaf) => ({
				key: `resource:${leaf.id}`,
				resourceId: leaf.id,
				resource: getRequiredResource(resourcesById, leaf.id),
				depth: leaf.depth,
				isUnassigned: false
			})
		);
		columns.push({
			key: 'resource:unassigned',
			resource: null,
			depth: 0,
			isUnassigned: true
		});

		const headerCells: EventCalendarResourceHeaderCell<TResourceFields>[] = structure.nodes.map(
			(node) => ({
				key: `resource-header:${node.id}`,
				resourceId: node.id,
				resource: getRequiredResource(resourcesById, node.id),
				depth: node.depth,
				isLeaf: node.isLeaf,
				isUnassigned: false,
				columnStart: node.leafStart,
				columnSpan: node.leafSpan,
				rowSpan: node.isLeaf ? structure.maxDepth - node.depth + 1 : 1
			})
		);
		headerCells.push({
			key: 'resource-header:unassigned',
			resource: null,
			depth: 0,
			isLeaf: true,
			isUnassigned: true,
			columnStart: structure.leaves.length,
			columnSpan: 1,
			rowSpan: structure.maxDepth + 1
		});

		this.resources = resources;
		this.model = {
			structure,
			columns,
			headerCells,
			leafIds,
			resolveLeaf: (resourceId) =>
				resourceId && leafIds.has(resourceId) ? (resourcesById.get(resourceId) ?? null) : null,
			resolveLeafId: (resourceId) =>
				resourceId && leafIds.has(resourceId) ? resourceId : undefined,
			resolveItemLeafIds: (item) =>
				getEventCalendarResourceIds(item).flatMap((resourceId) =>
					leafIds.has(resourceId) ? [resourceId] : []
				),
			getBusinessHours: (resourceId) =>
				resourceId && leafIds.has(resourceId)
					? (resourcesById.get(resourceId)?.businessHours ?? null)
					: null,
			isReadOnly: (resourceId) =>
				Boolean(resourceId && leafIds.has(resourceId) && resourcesById.get(resourceId)?.readOnly)
		};
		return this.model;
	}
}

export function filterEventCalendarBucketByResource<TItemFields extends object>(
	bucket: EventCalendarDayBucket<TItemFields> | undefined,
	model: EventCalendarResourceModel<object>,
	resourceId?: string
): EventCalendarDayBucket<TItemFields> | undefined {
	if (!bucket) return undefined;
	const belongsToColumn = (item: EventCalendarItem<TItemFields>): boolean => {
		const resourceIds = model.resolveItemLeafIds(item);
		return resourceId === undefined ? resourceIds.length === 0 : resourceIds.includes(resourceId);
	};
	return {
		all: bucket.all.filter((segment) => belongsToColumn(segment.occurrence.item)),
		foreground: bucket.foreground.filter((segment) => belongsToColumn(segment.occurrence.item)),
		background: bucket.background.filter((segment) => belongsToColumn(segment.occurrence.item)),
		allDay: bucket.allDay.filter((segment) => belongsToColumn(segment.occurrence.item)),
		timed: bucket.timed.filter((segment) => belongsToColumn(segment.occurrence.item))
	};
}

export function getEventCalendarResourceIds(item: {
	resourceId?: string;
	resourceIds?: readonly string[];
}): string[] {
	if (item.resourceIds !== undefined) return [...item.resourceIds];
	return item.resourceId === undefined ? [] : [item.resourceId];
}

export function setEventCalendarResourceIds<TItemFields extends object>(
	item: EventCalendarItem<TItemFields>,
	resourceIds: readonly string[]
): EventCalendarItem<TItemFields> {
	const next = { ...item };
	delete next.resourceId;
	delete next.resourceIds;
	if (resourceIds.length === 1) next.resourceId = resourceIds[0];
	else if (resourceIds.length > 1) next.resourceIds = [...resourceIds];
	return next;
}

export function replaceEventCalendarResourceAssignment<TItemFields extends object>(
	item: EventCalendarItem<TItemFields>,
	sourceResourceId: string | undefined,
	targetResourceId: string | undefined
): EventCalendarItem<TItemFields> {
	const current = getEventCalendarResourceIds(item);
	const next = current.filter((resourceId) => resourceId !== sourceResourceId);
	if (targetResourceId !== undefined && !next.includes(targetResourceId))
		next.push(targetResourceId);
	return setEventCalendarResourceIds(item, next);
}

function validateResourceDefinitions<TResourceFields extends object>(
	resources: readonly EventCalendarResource<TResourceFields>[]
): ReadonlyMap<string, EventCalendarResource<TResourceFields>> {
	if (!Array.isArray(resources)) {
		throw new EventCalendarError('invalid-resource', 'resources must be an array.');
	}
	const resourcesById = new Map<string, EventCalendarResource<TResourceFields>>();
	for (const resource of resources) {
		if (!resource || typeof resource !== 'object') {
			throw new EventCalendarError('invalid-resource', 'Every resource must be an object.');
		}
		if (typeof resource.id !== 'string' || resource.id.length === 0) {
			throw new EventCalendarError('invalid-resource', 'Every resource needs a non-empty id.');
		}
		if (resourcesById.has(resource.id)) {
			throw new EventCalendarError('invalid-resource', `Duplicate resource id: ${resource.id}.`, {
				id: resource.id
			});
		}
		if (typeof resource.title !== 'string') {
			throw new EventCalendarError('invalid-resource', `Resource ${resource.id} needs a title.`, {
				id: resource.id
			});
		}
		if (resource.businessHours !== undefined && !Array.isArray(resource.businessHours)) {
			throw new EventCalendarError(
				'invalid-resource',
				`Resource ${resource.id} businessHours must be an array.`,
				{ id: resource.id }
			);
		}
		for (const window of resource.businessHours ?? []) {
			if (
				!window ||
				typeof window !== 'object' ||
				!isValidClock(window.start) ||
				!isValidClock(window.end) ||
				clockMinutes(window.start) >= clockMinutes(window.end) ||
				(window.daysOfWeek !== undefined &&
					(!Array.isArray(window.daysOfWeek) ||
						new Set(window.daysOfWeek).size !== window.daysOfWeek.length ||
						window.daysOfWeek.some((day: number) => !Number.isInteger(day) || day < 0 || day > 6)))
			) {
				throw new EventCalendarError(
					'invalid-resource',
					`Resource ${resource.id} has invalid businessHours.`,
					{ id: resource.id }
				);
			}
		}
		resourcesById.set(resource.id, resource);
	}
	for (const resource of resources) {
		if (resource.parentId === undefined) continue;
		if (resource.parentId === resource.id || !resourcesById.has(resource.parentId)) {
			throw new EventCalendarError(
				'invalid-resource',
				`Resource ${resource.id} has an invalid parent.`,
				{ id: resource.id, parentId: resource.parentId }
			);
		}
	}
	return resourcesById;
}

function isValidClock(value: string): boolean {
	return typeof value === 'string' && /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value);
}

function clockMinutes(value: string): number {
	const [hours, minutes] = value.split(':').map(Number);
	return hours * 60 + minutes;
}

function buildResourceStructure<TResourceFields extends object>(
	resources: readonly EventCalendarResource<TResourceFields>[],
	resourcesById: ReadonlyMap<string, EventCalendarResource<TResourceFields>>,
	signature: string
): EventCalendarResourceStructure {
	const childrenByParent = new Map<string | null, string[]>();
	for (const resource of resources) {
		const parentId = resource.parentId ?? null;
		const siblings = childrenByParent.get(parentId) ?? [];
		siblings.push(resource.id);
		childrenByParent.set(parentId, siblings);
	}
	assertAcyclicResources(resources, resourcesById);

	const nodes: Array<EventCalendarResourceStructureNode | null> = [];
	const leaves: EventCalendarResourceStructureNode[] = [];
	let maxDepth = 0;
	const visit = (id: string, depth: number): EventCalendarResourceStructureNode => {
		const childIds = childrenByParent.get(id) ?? [];
		const nodeIndex = nodes.length;
		nodes.push(null);
		const leafStart = leaves.length;
		const childNodes = childIds.map((childId) => visit(childId, depth + 1));
		const isLeaf = childNodes.length === 0;
		const resource = getRequiredResource(resourcesById, id);
		const node: EventCalendarResourceStructureNode = {
			id,
			...(resource.parentId === undefined ? {} : { parentId: resource.parentId }),
			depth,
			isLeaf,
			leafStart,
			leafSpan: isLeaf ? 1 : leaves.length - leafStart
		};
		if (isLeaf) {
			leaves.push(node);
			maxDepth = Math.max(maxDepth, depth);
		}
		nodes[nodeIndex] = node;
		return node;
	};
	for (const rootId of childrenByParent.get(null) ?? []) visit(rootId, 0);

	return {
		signature,
		nodes: nodes.map((node) => {
			if (node) return node;
			throw new EventCalendarError('invalid-resource', 'Resource hierarchy is incomplete.');
		}),
		leaves,
		maxDepth
	};
}

function assertAcyclicResources<TResourceFields extends object>(
	resources: readonly EventCalendarResource<TResourceFields>[],
	resourcesById: ReadonlyMap<string, EventCalendarResource<TResourceFields>>
): void {
	const visited = new Set<string>();
	for (const resource of resources) {
		if (visited.has(resource.id)) continue;
		const path = new Set<string>();
		let current: EventCalendarResource<TResourceFields> | undefined = resource;
		while (current && !visited.has(current.id)) {
			if (path.has(current.id)) {
				throw new EventCalendarError('invalid-resource', 'Resource hierarchy contains a cycle.', {
					id: resource.id,
					parentId: current.id
				});
			}
			path.add(current.id);
			current = current.parentId ? resourcesById.get(current.parentId) : undefined;
		}
		for (const resourceId of path) visited.add(resourceId);
	}
}

function getRequiredResource<TResourceFields extends object>(
	resourcesById: ReadonlyMap<string, EventCalendarResource<TResourceFields>>,
	id: string
): EventCalendarResource<TResourceFields> {
	const resource = resourcesById.get(id);
	if (resource) return resource;
	throw new EventCalendarError('invalid-resource', `Resource structure lost ${id}.`, { id });
}
