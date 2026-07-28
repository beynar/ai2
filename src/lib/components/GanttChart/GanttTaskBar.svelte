<script
	lang="ts"
	generics="TTaskFields extends object, TDependencyFields extends object, TResourceFields extends object, TAssignmentFields extends object"
>
	import Slot from '$lib/components/Slot/Slot.svelte';
	import { tooltip } from '$lib/components/Tooltip/tooltip.svelte.js';
	import type { Messages } from '$lib/i18n/en.js';
	import { getDateTimeFormatter } from '$lib/scheduling/zonedTime.js';
	import type { Colors, Density } from '$lib/types/theme.js';
	import type { Snippet } from 'svelte';
	import { getGanttTaskColor, isGanttSemanticColor } from './ganttChart.color.js';
	import type { GanttPositionedTask } from './ganttChart.layout.js';
	import type {
		GanttBaselinePayload,
		GanttDeadlinePayload,
		GanttProgressPayload,
		GanttTaskLabelPayload,
		GanttTaskPayload,
		GanttTaskTooltipPayload
	} from './ganttChart.props.js';
	import type { GanttChartState } from './ganttChart.state.svelte.js';
	import type { GanttChartClasses } from './ganttChart.theme.js';
	import type { GanttAssignment, GanttResource } from './ganttChart.types.js';

	type TaskSnippets = {
		task?: Snippet<[GanttTaskPayload<TTaskFields, TAssignmentFields>]>;
		summaryTask?: Snippet<[GanttTaskPayload<TTaskFields, TAssignmentFields>]>;
		milestone?: Snippet<[GanttTaskPayload<TTaskFields, TAssignmentFields>]>;
		taskLabel?: Snippet<[GanttTaskLabelPayload<TTaskFields>]>;
		taskTooltip?: Snippet<
			[GanttTaskTooltipPayload<TTaskFields, TResourceFields, TAssignmentFields>]
		>;
		progress?: Snippet<[GanttProgressPayload<TTaskFields>]>;
		baseline?: Snippet<[GanttBaselinePayload<TTaskFields>]>;
		deadline?: Snippet<[GanttDeadlinePayload<TTaskFields>]>;
	};

	let {
		positioned,
		rowTop,
		chart,
		resources,
		assignments,
		messages,
		locale,
		timeZone,
		density,
		color,
		direction,
		disabled,
		showBaseline,
		showDeadline,
		showCritical,
		isSelected,
		isFocused,
		classes,
		snippets,
		onTaskClick,
		onTaskDoubleClick
	}: {
		positioned: GanttPositionedTask<TTaskFields>;
		rowTop: number;
		chart: GanttChartState<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
		resources: readonly GanttResource<TResourceFields>[];
		assignments: readonly GanttAssignment<TAssignmentFields>[];
		messages: Messages;
		locale: string;
		timeZone: string;
		density: Density;
		color: Colors;
		direction: 'ltr' | 'rtl';
		disabled: boolean;
		showBaseline: boolean;
		showDeadline: boolean;
		showCritical: boolean;
		isSelected: boolean;
		isFocused: boolean;
		classes: GanttChartClasses;
		snippets: TaskSnippets;
		onTaskClick?: (task: typeof positioned.node, event: MouseEvent) => void;
		onTaskDoubleClick?: (task: typeof positioned.node, event: MouseEvent) => void;
	} = $props();

	const node = $derived(positioned.node);
	const taskAssignments = $derived(
		assignments.filter((assignment) => assignment.taskId === node.taskId)
	);
	const assignedResourceIds = $derived(
		new Set(taskAssignments.map((assignment) => assignment.resourceId))
	);
	const assignedResources = $derived(
		resources.filter((resource) => assignedResourceIds.has(resource.id))
	);
	const semanticColor = $derived(isGanttSemanticColor(node.task.color) ? node.task.color : color);
	const taskColor = $derived(getGanttTaskColor(node.task.color, color));
	const progressValue = $derived(node.progress ?? 0);
	const expectedProgressValue = $derived(node.task.expectedProgress ?? null);
	const isCritical = $derived(showCritical && node.isCritical);
	const isDragging = $derived(chart.interaction.isTaskActive(node.taskId));
	const startHandleLeft = $derived(positioned.startX + (direction === 'rtl' ? 10 : -10));
	const endHandleLeft = $derived(positioned.endX + (direction === 'rtl' ? -10 : 10));
	const handleTop = $derived(positioned.geometry.top + positioned.geometry.height / 2);
	const progressHandleLeft = $derived(getProgressHandleLeft(positioned, progressValue, direction));
	const canCreateDependency = $derived(
		chart.interaction.dependency.canCreateForTask(node.taskId) && !disabled
	);
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
		node.resolvedStart && node.resolvedEnd
			? node.resolvedStart.getTime() === node.resolvedEnd.getTime()
				? dateFormatter.format(node.resolvedStart)
				: dateFormatter.formatRange(node.resolvedStart, node.resolvedEnd)
			: messages.ganttChartUnscheduled
	);
	const defaultAccessibleLabel = $derived(
		[
			messages.ganttChartTaskLabel(node.task.title, node.wbs),
			node.type === 'summary'
				? messages.ganttChartSummary
				: node.type === 'milestone'
					? messages.ganttChartMilestone
					: null,
			rangeLabel,
			`${Math.round(progressValue * 100)}%`,
			isCritical ? messages.ganttChartCritical : null
		]
			.filter(Boolean)
			.join(', ')
	);
	const taskPayload = $derived<GanttTaskPayload<TTaskFields, TAssignmentFields>>({
		node,
		geometry: positioned.geometry,
		assignments: taskAssignments,
		isSelected,
		isFocused,
		isDragging,
		isCritical,
		defaultContent
	});
	const labelPayload = $derived<GanttTaskLabelPayload<TTaskFields>>({
		node,
		geometry: positioned.geometry,
		defaultLabel: node.task.title,
		defaultContent: defaultLabel
	});
	const progressPayload = $derived<GanttProgressPayload<TTaskFields>>({
		node,
		progress: progressValue,
		expectedProgress: expectedProgressValue,
		defaultContent: defaultProgress
	});
	const tooltipPayload = $derived<
		GanttTaskTooltipPayload<TTaskFields, TResourceFields, TAssignmentFields>
	>({
		node,
		resources: assignedResources,
		assignments: taskAssignments,
		defaultAccessibleLabel,
		defaultContent: defaultTooltip
	});
	const taskTooltipAttachment = tooltip({
		get content() {
			return resolvedTooltip;
		},
		position: 'top',
		delay: 350
	});
	const visualSnippet = $derived(
		node.type === 'summary'
			? snippets.summaryTask
			: node.type === 'milestone'
				? snippets.milestone
				: snippets.task
	);
	const visualClass = $derived(
		node.type === 'summary'
			? classes.summaryTask
			: node.type === 'milestone'
				? classes.milestone
				: classes.task
	);
	const taskLabelLeft = $derived(
		direction === 'rtl'
			? Math.min(positioned.startX, positioned.endX) - 6
			: Math.max(positioned.startX, positioned.endX) + 6
	);

	function activate(event: MouseEvent): void {
		event.stopPropagation();
		if (disabled) return;
		chart.select({ kind: 'task', taskId: node.taskId, dependencyId: null, cell: null });
		onTaskClick?.(node, event);
	}

	function handleDoubleClick(event: MouseEvent): void {
		event.stopPropagation();
		if (disabled) return;
		onTaskDoubleClick?.(node, event);
	}

	function getProgressHandleLeft(
		currentTask: GanttPositionedTask<TTaskFields>,
		progress: number,
		currentDirection: 'ltr' | 'rtl'
	): number {
		if (currentTask.segments.length === 0) {
			return currentTask.startX + (currentTask.endX - currentTask.startX) * progress;
		}
		const totalWidth = currentTask.segments.reduce((sum, segment) => sum + segment.width, 0);
		let remaining = totalWidth * progress;
		for (const segment of currentTask.segments) {
			if (remaining <= segment.width) {
				return currentDirection === 'rtl'
					? segment.left + segment.width - remaining
					: segment.left + remaining;
			}
			remaining -= segment.width;
		}
		const lastSegment = currentTask.segments.at(-1);
		if (!lastSegment) return currentTask.endX;
		return currentDirection === 'rtl' ? lastSegment.left : lastSegment.left + lastSegment.width;
	}
</script>

<div class="group/gantt-task contents" data-gantt-task-group={node.taskId}>
	{#if showBaseline && positioned.baselineGeometry && node.task.baseline}
		{@const baselinePayload = {
			node,
			range: node.task.baseline,
			geometry: positioned.baselineGeometry,
			defaultContent: defaultBaseline
		} satisfies GanttBaselinePayload<TTaskFields>}
		<div
			data-gantt-chart-part="baseline"
			data-task-id={node.taskId}
			class={classes.baseline({ density, color: semanticColor, disabled })}
			style:left={`${positioned.baselineGeometry.left}px`}
			style:top={`${positioned.baselineGeometry.top}px`}
			style:width={`${positioned.baselineGeometry.width}px`}
			style:height={`${positioned.baselineGeometry.height}px`}
			aria-hidden="true"
		>
			<Slot render={snippets.baseline ?? defaultBaseline} payload={baselinePayload} />
		</div>
	{/if}

	{#if showDeadline && positioned.deadlineLeft !== null && node.task.deadline}
		{@const deadlinePayload = {
			node,
			deadline: node.task.deadline,
			left: positioned.deadlineLeft,
			defaultContent: defaultDeadline
		} satisfies GanttDeadlinePayload<TTaskFields>}
		<div
			data-gantt-chart-part="deadline"
			data-task-id={node.taskId}
			class={classes.deadline({ density, color: semanticColor, disabled })}
			style:left={`${positioned.deadlineLeft}px`}
			style:top={`${positioned.geometry.top + positioned.geometry.height / 2 - 6}px`}
			title={dateFormatter.format(node.task.deadline)}
			aria-hidden="true"
		>
			<Slot render={snippets.deadline ?? defaultDeadline} payload={deadlinePayload} />
		</div>
	{/if}

	<button
		type="button"
		aria-label={defaultAccessibleLabel}
		aria-pressed={isSelected}
		aria-current={isFocused ? 'true' : undefined}
		{disabled}
		tabindex={isSelected || isFocused ? 0 : -1}
		data-gantt-chart-part={node.type === 'summary'
			? 'summary-task'
			: node.type === 'milestone'
				? 'milestone'
				: 'task'}
		data-task-id={node.taskId}
		data-task-type={node.type}
		data-selected={isSelected || undefined}
		data-critical={isCritical || undefined}
		data-dragging={isDragging || undefined}
		data-continues-before={positioned.geometry.continuesBefore || undefined}
		data-continues-after={positioned.geometry.continuesAfter || undefined}
		data-color={semanticColor}
		style:--gantt-task-color={taskColor}
		style:left={`${positioned.geometry.left}px`}
		style:top={`${positioned.geometry.top}px`}
		style:width={`${positioned.geometry.width}px`}
		style:height={`${positioned.geometry.height}px`}
		class={visualClass({
			density,
			color: semanticColor,
			disabled,
			selected: isSelected,
			critical: isCritical,
			readOnly: node.task.readOnly ?? false,
			class: [
				node.type === 'task' && positioned.segments.length > 0
					? 'border-0 bg-transparent shadow-none'
					: undefined,
				isDragging ? 'opacity-35' : undefined
			]
		})}
		onclick={activate}
		ondblclick={handleDoubleClick}
		{@attach node.type === 'summary' ||
		node.task.readOnly ||
		node.task.draggable === false ||
		disabled
			? null
			: chart.interaction.taskDrag(node.taskId, 'move', rowTop)}
		{@attach taskTooltipAttachment}
	>
		<Slot render={visualSnippet ?? defaultContent} payload={taskPayload} />
	</button>

	{#if node.type === 'task' && !node.task.readOnly && node.task.resizable !== false && !disabled}
		<span
			role="button"
			aria-label={messages.ganttChartResizeStartAction}
			aria-disabled={disabled}
			tabindex="-1"
			data-gantt-chart-part="resize-handle"
			data-edge="start"
			data-task-id={node.taskId}
			class={classes.resizeHandle({ density, color: semanticColor, disabled })}
			style:left={`${startHandleLeft}px`}
			style:top={`${handleTop}px`}
			{@attach chart.interaction.taskDrag(node.taskId, 'resize-start', rowTop)}
		>
			<span class="h-3 w-0.5 rounded-full bg-[var(--gantt-task-color)]"></span>
		</span>
		<span
			role="button"
			aria-label={messages.ganttChartResizeEndAction}
			aria-disabled={disabled}
			tabindex="-1"
			data-gantt-chart-part="resize-handle"
			data-edge="end"
			data-task-id={node.taskId}
			class={classes.resizeHandle({ density, color: semanticColor, disabled })}
			style:left={`${endHandleLeft}px`}
			style:top={`${handleTop}px`}
			{@attach chart.interaction.taskDrag(node.taskId, 'resize-end', rowTop)}
		>
			<span class="h-3 w-0.5 rounded-full bg-[var(--gantt-task-color)]"></span>
		</span>
	{/if}

	{#if node.type === 'task' && !node.task.readOnly && node.task.progressEditable !== false && !disabled}
		<span
			role="slider"
			aria-label={messages.ganttChartProgressAction}
			aria-valuemin="0"
			aria-valuemax="100"
			aria-valuenow={Math.round(progressValue * 100)}
			tabindex="-1"
			data-gantt-chart-part="progress-handle"
			data-task-id={node.taskId}
			class={classes.progressHandle({ density, color: semanticColor, disabled })}
			style:left={`${progressHandleLeft}px`}
			style:top={`${handleTop}px`}
			{@attach chart.interaction.progressDrag(node.taskId, rowTop)}
		>
			<span class="size-2 rounded-full border border-surface bg-[var(--gantt-task-color)]"></span>
		</span>
	{/if}

	{#if canCreateDependency}
		<span
			role="button"
			aria-label={`${messages.ganttChartDependencyAction}: ${node.task.title}, start`}
			tabindex="-1"
			data-gantt-chart-part="dependency-handle"
			data-endpoint="start"
			data-task-id={node.taskId}
			data-target={chart.interaction.dependency.isValidTarget(node.taskId, 'start') || undefined}
			class={classes.dependencyHandle({ density, color: semanticColor, disabled })}
			style:left={`${startHandleLeft}px`}
			style:top={`${handleTop}px`}
			{@attach chart.interaction.dependency.dependencyHandle(node.taskId, 'start', {
				x: startHandleLeft,
				y: handleTop
			})}
		>
			<span class="size-2 rounded-full border border-[var(--gantt-task-color)] bg-surface"></span>
		</span>
		<span
			role="button"
			aria-label={`${messages.ganttChartDependencyAction}: ${node.task.title}, end`}
			tabindex="-1"
			data-gantt-chart-part="dependency-handle"
			data-endpoint="end"
			data-task-id={node.taskId}
			data-target={chart.interaction.dependency.isValidTarget(node.taskId, 'end') || undefined}
			class={classes.dependencyHandle({ density, color: semanticColor, disabled })}
			style:left={`${endHandleLeft}px`}
			style:top={`${handleTop}px`}
			{@attach chart.interaction.dependency.dependencyHandle(node.taskId, 'end', {
				x: endHandleLeft,
				y: handleTop
			})}
		>
			<span class="size-2 rounded-full border border-[var(--gantt-task-color)] bg-surface"></span>
		</span>
	{/if}

	<div
		data-gantt-chart-part="task-label"
		data-task-id={node.taskId}
		class={classes.taskLabel({ density, color: semanticColor, disabled })}
		style:left={`${taskLabelLeft}px`}
		style:top={`${positioned.geometry.top + positioned.geometry.height / 2}px`}
		style:transform={direction === 'rtl' ? 'translate(-100%, -50%)' : 'translateY(-50%)'}
		aria-hidden="true"
	>
		<Slot render={snippets.taskLabel ?? defaultLabel} payload={labelPayload} />
	</div>
</div>

{#snippet defaultContent()}
	{#if node.type === 'task'}
		{#if positioned.segments.length > 0}
			{#each positioned.segments as segment (segment.segment.start.getTime())}
				<span
					data-gantt-chart-part="segment"
					class={classes.segment({
						density,
						color: semanticColor,
						disabled,
						class:
							'border border-[color-mix(in_oklab,var(--gantt-task-color)_40%,transparent)] bg-[color-mix(in_oklab,var(--gantt-task-color)_18%,var(--color-surface))]'
					})}
					style:left={`${segment.left - positioned.geometry.left}px`}
					style:width={`${segment.width}px`}
				>
					<span
						data-gantt-chart-part="expected-progress"
						class={classes.expectedProgress({ density, color: semanticColor, disabled })}
						style:width={`${segment.expectedProgressWidth}px`}
					></span>
					<span
						data-gantt-chart-part="progress"
						class={classes.progress({ density, color: semanticColor, disabled })}
						style:width={`${segment.progressWidth}px`}
					></span>
				</span>
			{/each}
		{:else}
			<Slot render={snippets.progress ?? defaultProgress} payload={progressPayload} />
		{/if}
	{:else if node.type === 'summary'}
		<span
			class="absolute inset-y-0 start-0 bg-[var(--gantt-task-color)] opacity-35"
			style:width={`${progressValue * 100}%`}
		></span>
	{/if}
{/snippet}

{#snippet defaultProgress()}
	{#if expectedProgressValue !== null}
		<span
			data-gantt-chart-part="expected-progress"
			class={classes.expectedProgress({ density, color: semanticColor, disabled })}
			style:width={`${expectedProgressValue * 100}%`}
		></span>
	{/if}
	<span
		data-gantt-chart-part="progress"
		class={classes.progress({ density, color: semanticColor, disabled })}
		style:width={`${progressValue * 100}%`}
	></span>
{/snippet}

{#snippet defaultLabel()}
	{node.task.title}
{/snippet}

{#snippet defaultBaseline()}{/snippet}

{#snippet defaultDeadline()}{/snippet}

{#snippet defaultTooltip()}
	<div class="grid gap-0.5">
		<strong>{node.task.title}</strong>
		<span>{rangeLabel}</span>
		<span>{Math.round(progressValue * 100)}%</span>
		{#if assignedResources.length > 0}
			<span>{assignedResources.map((resource) => resource.title).join(', ')}</span>
		{/if}
	</div>
{/snippet}

{#snippet resolvedTooltip()}
	<Slot render={snippets.taskTooltip ?? defaultTooltip} payload={tooltipPayload} />
{/snippet}
