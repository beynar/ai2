import { getDateTimeFormatter } from '$lib/scheduling/zonedTime.js';
import type { Messages } from '$lib/i18n/en.js';
import { GanttChartError } from './ganttChart.error.js';
import type {
	GanttAssignment,
	GanttBuiltInColumnId,
	GanttColumnDefinition,
	GanttColumnEditContext,
	GanttResource,
	GanttTask
} from './ganttChart.types.js';

const DEFAULT_COLUMN_IDS: readonly GanttBuiltInColumnId[] = [
	'wbs',
	'title',
	'start',
	'end',
	'duration',
	'progress',
	'resources'
];

const COLUMN_DEFAULTS: Readonly<
	Record<
		GanttBuiltInColumnId,
		Readonly<{
			width: number;
			minWidth: number;
			maxWidth: number;
			align: 'start' | 'center' | 'end';
			sortable: boolean;
			editable: boolean;
		}>
	>
> = {
	wbs: { width: 68, minWidth: 56, maxWidth: 120, align: 'start', sortable: true, editable: false },
	title: {
		width: 220,
		minWidth: 140,
		maxWidth: 520,
		align: 'start',
		sortable: true,
		editable: true
	},
	start: {
		width: 148,
		minWidth: 116,
		maxWidth: 240,
		align: 'start',
		sortable: true,
		editable: true
	},
	end: {
		width: 148,
		minWidth: 116,
		maxWidth: 240,
		align: 'start',
		sortable: true,
		editable: true
	},
	duration: {
		width: 104,
		minWidth: 84,
		maxWidth: 180,
		align: 'end',
		sortable: true,
		editable: false
	},
	progress: {
		width: 96,
		minWidth: 80,
		maxWidth: 160,
		align: 'end',
		sortable: true,
		editable: true
	},
	resources: {
		width: 168,
		minWidth: 120,
		maxWidth: 320,
		align: 'start',
		sortable: true,
		editable: false
	}
};

export function resolveGanttColumns<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	columns:
		| readonly GanttColumnDefinition<
				TTaskFields,
				TDependencyFields,
				TResourceFields,
				TAssignmentFields
		  >[]
		| undefined
): readonly GanttColumnDefinition<
	TTaskFields,
	TDependencyFields,
	TResourceFields,
	TAssignmentFields
>[] {
	const source: readonly GanttColumnDefinition<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	>[] = columns ?? DEFAULT_COLUMN_IDS.map((id) => ({ id }));
	if (source.length === 0) {
		throw new GanttChartError('invalid-column', 'GanttChart needs at least one column.');
	}
	const seenIds = new Set<string>();
	const resolved = source.map((column) => {
		validateColumn(column, seenIds);
		const defaults = isBuiltInColumnId(column.id) ? COLUMN_DEFAULTS[column.id] : undefined;
		return {
			...column,
			visible: column.visible ?? true,
			width: column.width ?? defaults?.width ?? 160,
			minWidth: column.minWidth ?? defaults?.minWidth ?? 80,
			maxWidth: column.maxWidth ?? defaults?.maxWidth ?? 480,
			align: column.align ?? defaults?.align ?? 'start',
			sortable: column.sortable ?? defaults?.sortable ?? false,
			editable: column.editable ?? defaults?.editable ?? false,
			sortDirection: column.sortDirection ?? null
		};
	});
	if (!resolved.some((column) => column.visible)) {
		throw new GanttChartError('invalid-column', 'GanttChart needs at least one visible column.');
	}
	return resolved;
}

export function getGanttColumnLabel(columnId: string, messages: Messages): string {
	switch (columnId) {
		case 'wbs':
			return messages.ganttChartColumnWbs;
		case 'title':
			return messages.ganttChartColumnTitle;
		case 'start':
			return messages.ganttChartColumnStart;
		case 'end':
			return messages.ganttChartColumnEnd;
		case 'duration':
			return messages.ganttChartColumnDuration;
		case 'progress':
			return messages.ganttChartColumnProgress;
		case 'resources':
			return messages.ganttChartColumnResources;
		default:
			return columnId;
	}
}

export function getGanttColumnValue<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	column: GanttColumnDefinition<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>,
	context: GanttColumnEditContext<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	>
): unknown {
	if (column.value) return column.value(context);
	const { node } = context;
	switch (column.id) {
		case 'wbs':
			return node.wbs;
		case 'title':
			return node.task.title;
		case 'start':
			return node.resolvedStart;
		case 'end':
			return node.resolvedEnd;
		case 'duration':
			return node.workingDurationMinutes;
		case 'progress':
			return node.progress;
		case 'resources':
			return resolveTaskResourceTitles(node.task, context.resources, context.assignments);
		default:
			return Reflect.get(node.task, column.id);
	}
}

export function formatGanttColumnValue(
	columnId: string,
	value: unknown,
	locale: string,
	timeZone: string,
	messages: Messages
): string {
	if (value === null || value === undefined) return messages.ganttChartUnscheduled;
	if (columnId === 'start' || columnId === 'end') {
		if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
			throw new GanttChartError('invalid-date', `${columnId} column received an invalid Date.`);
		}
		return getDateTimeFormatter(locale, timeZone, {
			dateStyle: 'medium',
			timeStyle: 'short'
		}).format(value);
	}
	if (columnId === 'duration') return formatDuration(value);
	if (columnId === 'progress') {
		if (typeof value !== 'number' || !Number.isFinite(value)) return messages.ganttChartUnscheduled;
		return new Intl.NumberFormat(locale, {
			style: 'percent',
			maximumFractionDigits: 0
		}).format(value);
	}
	if (Array.isArray(value)) return value.map(String).join(', ');
	return String(value);
}

export function applyGanttColumnEdit<
	TTaskFields extends object,
	TDependencyFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	column: GanttColumnDefinition<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>,
	context: GanttColumnEditContext<
		TTaskFields,
		TDependencyFields,
		TResourceFields,
		TAssignmentFields
	>,
	value: unknown
): GanttTask<TTaskFields> {
	if (column.editable !== true) {
		throw new GanttChartError('invalid-column', `Column ${column.id} is not editable.`, {
			columnId: column.id
		});
	}
	if (column.applyEdit) return cloneTask(column.applyEdit(context, value));
	const task = context.node.task;
	switch (column.id) {
		case 'title':
			if (typeof value !== 'string') {
				throw new GanttChartError('invalid-adjustment', 'Task title edits must be strings.');
			}
			return { ...task, title: value };
		case 'start':
			return applyEndpointEdit(task, 'start', parseEditableInstant(value, 'start'));
		case 'end':
			return applyEndpointEdit(task, 'end', parseEditableInstant(value, 'end'));
		case 'progress': {
			const progress = typeof value === 'number' ? value : Number(value);
			if (!Number.isFinite(progress) || progress < 0 || progress > 1) {
				throw new GanttChartError(
					'invalid-progress',
					'Task progress edits must be from 0 through 1.'
				);
			}
			return { ...task, progress };
		}
		default:
			throw new GanttChartError(
				'invalid-column',
				`Editable custom column ${column.id} needs applyEdit.`,
				{ columnId: column.id }
			);
	}
}

function validateColumn(
	column: Readonly<{
		id: string;
		width?: number;
		minWidth?: number;
		maxWidth?: number;
		sortable?: boolean;
		sortDirection?: 'ascending' | 'descending' | null;
	}>,
	seenIds: Set<string>
): void {
	if (!column || typeof column.id !== 'string' || column.id.length === 0) {
		throw new GanttChartError('invalid-column', 'Every Gantt column needs a non-empty id.');
	}
	if (seenIds.has(column.id)) {
		throw new GanttChartError('invalid-column', `Duplicate Gantt column: ${column.id}.`, {
			columnId: column.id
		});
	}
	seenIds.add(column.id);
	for (const [name, value] of [
		['width', column.width],
		['minWidth', column.minWidth],
		['maxWidth', column.maxWidth]
	] as const) {
		if (value !== undefined && (!Number.isFinite(value) || value <= 0)) {
			throw new GanttChartError('invalid-column', `${name} must be a positive finite number.`, {
				columnId: column.id,
				[name]: value
			});
		}
	}
	if (column.sortDirection && column.sortable === false) {
		throw new GanttChartError(
			'invalid-column',
			`Column ${column.id} cannot sort while sortable is false.`,
			{ columnId: column.id }
		);
	}
}

function isBuiltInColumnId(columnId: string): columnId is GanttBuiltInColumnId {
	return DEFAULT_COLUMN_IDS.includes(columnId as GanttBuiltInColumnId);
}

function resolveTaskResourceTitles<
	TTaskFields extends object,
	TResourceFields extends object,
	TAssignmentFields extends object
>(
	task: GanttTask<TTaskFields>,
	resources: readonly GanttResource<TResourceFields>[],
	assignments: readonly GanttAssignment<TAssignmentFields>[]
): readonly string[] {
	const assignedIds = new Set(task.resourceIds ?? []);
	for (const assignment of assignments) {
		if (assignment.taskId === task.id) assignedIds.add(assignment.resourceId);
	}
	const titlesById = new Map(resources.map((resource) => [resource.id, resource.title]));
	return [...assignedIds].map((resourceId) => titlesById.get(resourceId) ?? resourceId);
}

function formatDuration(value: unknown): string {
	if (typeof value !== 'number' || !Number.isFinite(value)) return String(value);
	const minutes = Math.max(0, Math.round(value));
	const days = Math.floor(minutes / 1440);
	const hours = Math.floor((minutes % 1440) / 60);
	const remainingMinutes = minutes % 60;
	const parts = [
		days > 0 ? `${days}d` : '',
		hours > 0 ? `${hours}h` : '',
		remainingMinutes > 0 || (days === 0 && hours === 0) ? `${remainingMinutes}m` : ''
	].filter(Boolean);
	return parts.join(' ');
}

function parseEditableInstant(value: unknown, endpoint: 'start' | 'end'): Date {
	if (value instanceof Date && !Number.isNaN(value.getTime())) return new Date(value);
	if (typeof value !== 'string' || !/(?:Z|[+-]\d{2}:\d{2})$/u.test(value.trim())) {
		throw new GanttChartError(
			'invalid-date',
			`${endpoint} edits need an ISO instant with Z or an explicit UTC offset.`
		);
	}
	const instant = new Date(value);
	if (!Number.isNaN(instant.getTime())) return instant;
	throw new GanttChartError('invalid-date', `${endpoint} edit is not a valid instant.`);
}

function applyEndpointEdit<TTaskFields extends object>(
	task: GanttTask<TTaskFields>,
	endpoint: 'start' | 'end',
	instant: Date
): GanttTask<TTaskFields> {
	if ((task.type ?? 'task') === 'summary') {
		throw new GanttChartError('invalid-summary-schedule', 'Summary dates are derived.');
	}
	if (task.type === 'milestone') return { ...task, start: instant, end: new Date(instant) };
	if (!task.start || !task.end) {
		throw new GanttChartError(
			'invalid-task-schedule',
			'Editing one endpoint cannot schedule an unscheduled task.'
		);
	}
	return endpoint === 'start'
		? { ...task, start: instant, end: new Date(task.end) }
		: { ...task, start: new Date(task.start), end: instant };
}

function cloneTask<TTaskFields extends object>(
	task: GanttTask<TTaskFields>
): GanttTask<TTaskFields> {
	return { ...task };
}
