<script
	lang="ts"
	generics="TTaskFields extends object, TDependencyFields extends object, TResourceFields extends object, TAssignmentFields extends object"
>
	import Slot from '$lib/components/Slot/Slot.svelte';
	import { getDateTimeFormatter } from '$lib/scheduling/zonedTime.js';
	import type { Colors, Density } from '$lib/types/theme.js';
	import type { Snippet } from 'svelte';
	import { getGanttTaskColor, isGanttSemanticColor } from './ganttChart.color.js';
	import type { GanttChartInteractionStatus } from './ganttChart.interactions.svelte.js';
	import { positionGanttTask } from './ganttChart.layout.js';
	import type { GanttDragPreviewPayload } from './ganttChart.props.js';
	import type { GanttRowModel } from './ganttChart.rows.js';
	import { getGanttScalePixel, type GanttTimeScale } from './ganttChart.scale.js';
	import type { GanttChartClasses } from './ganttChart.theme.js';
	import type {
		GanttRange,
		GanttResolvedTaskNode,
		GanttTask,
		GanttTaskGeometry
	} from './ganttChart.types.js';

	let {
		status,
		rowModel,
		scale,
		visibleRange,
		visiblePixels,
		totalHeight,
		rowHeight,
		locale,
		timeZone,
		density,
		color,
		disabled,
		classes,
		dragPreview
	}: {
		status: GanttChartInteractionStatus<TTaskFields>;
		rowModel: GanttRowModel<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
		scale: GanttTimeScale;
		visibleRange: GanttRange;
		visiblePixels: Readonly<{ start: number; end: number }>;
		totalHeight: number;
		rowHeight: number;
		locale: string;
		timeZone: string;
		density: Density;
		color: Colors;
		disabled: boolean;
		classes: GanttChartClasses;
		dragPreview?: Snippet<[GanttDragPreviewPayload<TTaskFields>]>;
	} = $props();
	let labelWidth = $state(0);
	let labelHeight = $state(0);

	const taskProposal = $derived(status.type === 'task' ? status.proposal : null);
	const proposedTask = $derived(taskProposal?.task ?? null);
	const sourceNode = $derived(
		status.type === 'task'
			? (rowModel.rows.find((node) => node.taskId === status.taskId) ?? null)
			: null
	);
	const previewNode = $derived(
		proposedTask && sourceNode ? createPreviewNode(sourceNode, proposedTask) : null
	);
	const positioned = $derived(
		previewNode
			? positionGanttTask({
					node: previewNode,
					rowTop: status.rowTop,
					rowHeight,
					scale,
					visibleRange,
					visiblePixels
				})
			: null
	);
	const rangeGeometry = $derived(
		status.type === 'range' && status.proposal
			? createRangeGeometry(status.proposal, status.rowTop, rowHeight, scale, visiblePixels)
			: null
	);
	const geometry = $derived(positioned?.geometry ?? rangeGeometry);
	const range = $derived(
		proposedTask?.start && proposedTask.end
			? { start: proposedTask.start, end: proposedTask.end }
			: status.type === 'range'
				? status.proposal
				: null
	);
	const semanticColor = $derived(
		proposedTask && isGanttSemanticColor(proposedTask.color) ? proposedTask.color : color
	);
	const taskColor = $derived(getGanttTaskColor(proposedTask?.color, color));
	const dateFormatter = $derived(
		getDateTimeFormatter(locale, timeZone, {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit'
		})
	);
	const rangeLabel = $derived(
		range
			? range.start.getTime() === range.end.getTime()
				? dateFormatter.format(range.start)
				: dateFormatter.formatRange(range.start, range.end)
			: ''
	);
	const durationLabel = $derived(
		`${new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(status.workingDurationMinutes)} min`
	);
	const labelLeft = $derived(
		Math.max(
			visiblePixels.start + 8,
			Math.min(visiblePixels.end - labelWidth - 8, status.pointerCanvasX + 12)
		)
	);
	const labelTop = $derived(
		Math.max(4, Math.min(totalHeight - labelHeight - 4, status.rowTop - 4))
	);
	const payload = $derived(
		status.proposal && geometry
			? ({
					proposal: status.proposal,
					geometry,
					isValid: status.isValid,
					invalidReason: status.invalidReason,
					defaultContent
				} satisfies GanttDragPreviewPayload<TTaskFields>)
			: null
	);

	function createPreviewNode(
		node: GanttResolvedTaskNode<TTaskFields>,
		task: GanttTask<TTaskFields>
	): GanttResolvedTaskNode<TTaskFields> {
		return {
			...node,
			task,
			resolvedStart: task.start ? new Date(task.start) : null,
			resolvedEnd: task.end ? new Date(task.end) : null,
			progress: task.progress ?? 0
		};
	}

	function createRangeGeometry(
		proposal: GanttRange,
		rowTop: number,
		logicalRowHeight: number,
		currentScale: GanttTimeScale,
		currentVisiblePixels: Readonly<{ start: number; end: number }>
	): GanttTaskGeometry {
		const start = getGanttScalePixel(currentScale, proposal.start);
		const end = getGanttScalePixel(currentScale, proposal.end);
		const left = Math.min(start, end);
		const width = Math.max(1, Math.abs(end - start));
		const visibleLeft = Math.max(left, currentVisiblePixels.start);
		const visibleEnd = Math.min(left + width, currentVisiblePixels.end);
		return {
			left,
			top: rowTop + 5,
			width,
			height: Math.max(8, logicalRowHeight - 10),
			visibleLeft,
			visibleWidth: Math.max(0, visibleEnd - visibleLeft),
			continuesBefore: proposal.start.getTime() < visibleRange.start.getTime(),
			continuesAfter: proposal.end.getTime() > visibleRange.end.getTime()
		};
	}
</script>

{#if status.isValid && status.proposal && geometry && payload && range}
	<div
		data-gantt-chart-part={status.type === 'range' ? 'range-selection' : 'drag-preview'}
		data-operation={status.operation}
		class={(status.type === 'range' ? classes.rangeSelection : classes.dragPreview)({
			density,
			color: semanticColor,
			disabled
		})}
		style:--gantt-task-color={taskColor}
		style:left={`${geometry.left}px`}
		style:top={`${geometry.top}px`}
		style:width={`${geometry.width}px`}
		style:height={`${geometry.height}px`}
		aria-hidden="true"
	>
		<Slot render={dragPreview ?? defaultContent} {payload} />
	</div>
	<div
		bind:clientWidth={labelWidth}
		bind:clientHeight={labelHeight}
		data-gantt-chart-part="drag-preview-label"
		class="pointer-events-none absolute z-50 grid max-w-72 gap-0.5 rounded-md border border-neutral-muted bg-surface-raised/95 px-2 py-1 text-xs text-neutral shadow-lg backdrop-blur"
		style:left={`${labelLeft}px`}
		style:top={`${labelTop}px`}
		aria-hidden="true"
	>
		{#if proposedTask}<strong class="truncate">{proposedTask.title}</strong>{/if}
		<span class="whitespace-nowrap">{rangeLabel}</span>
		<span class="tabular-nums text-neutral/70">{durationLabel}</span>
	</div>
{/if}

{#snippet defaultContent()}
	<span class="absolute inset-0 rounded-[inherit] bg-[var(--gantt-task-color)]/10"></span>
{/snippet}
