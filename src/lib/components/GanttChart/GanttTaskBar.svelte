<script lang="ts" module>
	function clampHandleCenter(
		preferred: number,
		bounds: Readonly<{ start: number; end: number }>,
		halfSize: number
	): number {
		const minimum = bounds.start + halfSize;
		const maximum = bounds.end - halfSize;
		if (minimum > maximum) return (bounds.start + bounds.end) / 2;
		return Math.max(minimum, Math.min(maximum, preferred));
	}

	function isPixelVisible(
		pixel: number,
		visiblePixels: Readonly<{ start: number; end: number }>
	): boolean {
		return pixel >= visiblePixels.start && pixel <= visiblePixels.end;
	}

	function placeDetachedHandle(
		edge: number,
		preferred: number,
		bounds: Readonly<{ start: number; end: number }>,
		halfSize: number
	): number {
		if (preferred - halfSize >= bounds.start && preferred + halfSize <= bounds.end) {
			return preferred;
		}
		return clampHandleCenter(edge - (preferred - edge), bounds, halfSize);
	}

	function getMarkerOffset(edge: number, handleCenter: number): number {
		const distance = edge - handleCenter;
		return Math.sign(distance) * Math.min(12, Math.abs(distance));
	}
</script>

<script
	lang="ts"
	generics="TTaskFields extends object, TDependencyFields extends object, TResourceFields extends object, TAssignmentFields extends object"
>
	import Slot from '$lib/components/Slot/Slot.svelte';
	import HoverCard from '$lib/components/HoverCard/HoverCard.svelte';
	import type { PopoverThemeProps } from '$lib/components/Popover/index.js';
	import type { Messages } from '$lib/i18n/en.js';
	import { getDateTimeFormatter } from '$lib/scheduling/zonedTime.js';
	import type { Colors, Density } from '$lib/types/theme.js';
	import type { Snippet } from 'svelte';
	import GanttResourceAssignments from './GanttResourceAssignments.svelte';
	import { getGanttTaskColor, isGanttSemanticColor } from './ganttChart.color.js';
	import type { GanttPositionedTask } from './ganttChart.layout.js';
	import type {
		GanttBaselinePayload,
		GanttDeadlinePayload,
		GanttProgressPayload,
		GanttResourceAssignmentsPayload,
		GanttTaskLabelPayload,
		GanttTaskPayload,
		GanttTaskTooltipPayload
	} from './ganttChart.props.js';
	import type { GanttChartState } from './ganttChart.state.svelte.js';
	import type { GanttChartClasses } from './ganttChart.theme.js';
	import type { GanttAssignment, GanttResource } from './ganttChart.types.js';

	const TASK_TOOLTIP_POPOVER_THEME = {
		root: { base: 'pointer-events-none' }
	} satisfies PopoverThemeProps;

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
		resourceAssignments?: Snippet<
			[GanttResourceAssignmentsPayload<TTaskFields, TResourceFields, TAssignmentFields>]
		>;
	};

	let {
		positioned,
		visiblePixels,
		rowTop,
		chart,
		resources,
		assignments,
		overAllocatedResourceIds,
		messages,
		locale,
		timeZone,
		density,
		color,
		direction,
		disabled,
		showBaseline,
		showDeadline,
		showConstraint,
		showCritical,
		isSelected,
		classes,
		snippets,
		onTaskClick,
		onTaskDoubleClick
	}: {
		positioned: GanttPositionedTask<TTaskFields>;
		visiblePixels: Readonly<{ start: number; end: number }>;
		rowTop: number;
		chart: GanttChartState<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
		resources: readonly GanttResource<TResourceFields>[];
		assignments: readonly GanttAssignment<TAssignmentFields>[];
		overAllocatedResourceIds: ReadonlySet<string>;
		messages: Messages;
		locale: string;
		timeZone: string;
		density: Density;
		color: Colors;
		direction: 'ltr' | 'rtl';
		disabled: boolean;
		showBaseline: boolean;
		showDeadline: boolean;
		showConstraint: boolean;
		showCritical: boolean;
		isSelected: boolean;
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
		new Set([
			...(node.task.resourceIds ?? []),
			...taskAssignments.map((assignment) => assignment.resourceId)
		])
	);
	const assignedResources = $derived(
		resources.filter((resource) => assignedResourceIds.has(resource.id))
	);
	const isOverAllocated = $derived(
		assignedResources.some((resource) => overAllocatedResourceIds.has(resource.id))
	);
	const assignmentLabel = $derived(
		assignedResources.length > 0
			? `${messages.ganttChartColumnResources}: ${assignedResources.map((resource) => resource.title).join(', ')}`
			: null
	);
	const overAllocationLabel = $derived(
		isOverAllocated
			? messages.ganttChartOverAllocated(
					assignedResources
						.filter((resource) => overAllocatedResourceIds.has(resource.id))
						.map((resource) => resource.title)
						.join(', ')
				)
			: null
	);
	const semanticColor = $derived(isGanttSemanticColor(node.task.color) ? node.task.color : color);
	const taskColor = $derived(getGanttTaskColor(node.task.color, color));
	const controlledProgressValue = $derived(node.progress ?? 0);
	const progressInteraction = $derived.by(() => {
		const status = chart.interaction.status;
		if (
			status?.type !== 'task' ||
			status.taskId !== node.taskId ||
			status.operation !== 'progress'
		) {
			return null;
		}
		return status;
	});
	const progressValue = $derived(
		progressInteraction?.proposal?.task?.progress ?? controlledProgressValue
	);
	const expectedProgressValue = $derived(node.task.expectedProgress ?? null);
	const isCritical = $derived(showCritical && node.isCritical);
	const isDragging = $derived(chart.interaction.isTaskActive(node.taskId));
	let isHoverCardOpen = $state(false);
	const isInteractionActive = $derived(chart.interaction.isActive);
	const isFocusTarget = $derived(chart.a11y.isTaskTabStop(node.taskId));
	const canMoveTask = $derived(
		node.type !== 'summary' && !node.task.readOnly && node.task.draggable !== false && !disabled
	);
	const taskCursorClass = $derived.by(() => {
		if (disabled) return undefined;
		if (canMoveTask) return 'cursor-grab active:cursor-grabbing';
		return 'cursor-default';
	});
	const resizeStartHandleLeft = $derived(
		clampHandleCenter(positioned.startX + (direction === 'rtl' ? 12 : -12), visiblePixels, 12)
	);
	const resizeEndHandleLeft = $derived(
		clampHandleCenter(positioned.endX + (direction === 'rtl' ? -12 : 12), visiblePixels, 12)
	);
	const resizeStartVisualOffset = $derived(positioned.startX - resizeStartHandleLeft);
	const resizeEndVisualOffset = $derived(positioned.endX - resizeEndHandleLeft);
	const isStartEdgeVisible = $derived(isPixelVisible(positioned.startX, visiblePixels));
	const isEndEdgeVisible = $derived(isPixelVisible(positioned.endX, visiblePixels));
	const dependencyStartHandleLeft = $derived(
		placeDetachedHandle(
			positioned.startX,
			positioned.startX + (direction === 'rtl' ? 36 : -36),
			visiblePixels,
			12
		)
	);
	const dependencyEndHandleLeft = $derived(
		placeDetachedHandle(
			positioned.endX,
			positioned.endX + (direction === 'rtl' ? -36 : 36),
			visiblePixels,
			12
		)
	);
	const dependencyStartVisualOffset = $derived(
		getMarkerOffset(positioned.startX, dependencyStartHandleLeft)
	);
	const dependencyEndVisualOffset = $derived(
		getMarkerOffset(positioned.endX, dependencyEndHandleLeft)
	);
	const handleTop = $derived(positioned.geometry.top + positioned.geometry.height / 2);
	const progressMarkerLeft = $derived(getProgressHandleLeft(positioned, progressValue, direction));
	const taskVisibleStart = $derived(
		Math.max(Math.min(positioned.startX, positioned.endX), visiblePixels.start)
	);
	const taskVisibleEnd = $derived(
		Math.min(Math.max(positioned.startX, positioned.endX), visiblePixels.end)
	);
	const progressHandleLeft = $derived.by(() => {
		if (progressInteraction?.proposal) {
			const liveThumbLeft = Math.max(
				taskVisibleStart,
				Math.min(taskVisibleEnd, progressInteraction.pointerCanvasX)
			);
			return clampHandleCenter(liveThumbLeft, visiblePixels, 14);
		}
		if (controlledProgressValue <= 0 || controlledProgressValue >= 1) {
			const controlledMarkerLeft = getProgressHandleLeft(
				positioned,
				controlledProgressValue,
				direction
			);
			const chronologicalDirection = direction === 'rtl' ? -1 : 1;
			const inwardDirection =
				controlledProgressValue <= 0 ? chronologicalDirection : -chronologicalDirection;
			const boundaryInset = Math.min(18, Math.max(0, taskVisibleEnd - taskVisibleStart) / 2);
			return clampHandleCenter(
				controlledMarkerLeft + inwardDirection * boundaryInset,
				visiblePixels,
				14
			);
		}
		return clampHandleCenter(
			progressMarkerLeft,
			{ start: taskVisibleStart, end: taskVisibleEnd },
			14
		);
	});
	const progressVisualOffset = $derived(
		progressInteraction?.proposal ? 0 : progressMarkerLeft - progressHandleLeft
	);
	const progressHandleTop = $derived(positioned.geometry.top - 4);
	const showProgressHandle = $derived(
		progressInteraction?.proposal
			? taskVisibleEnd >= taskVisibleStart
			: taskVisibleEnd >= taskVisibleStart && isPixelVisible(progressMarkerLeft, visiblePixels)
	);
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
	const numberFormatter = $derived(new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }));
	const totalSlackLabel = $derived(
		node.totalSlackMinutes === null
			? null
			: messages.ganttChartTotalSlack(numberFormatter.format(node.totalSlackMinutes))
	);
	const freeSlackLabel = $derived(
		node.freeSlackMinutes === null
			? null
			: messages.ganttChartFreeSlack(numberFormatter.format(node.freeSlackMinutes))
	);
	const constraintLabel = $derived.by(() => {
		const constraint = node.task.constraint;
		if (!constraint) return null;
		if (constraint.type === 'as-soon-as-possible') {
			return `${messages.ganttChartConstraint}: ${constraint.type}`;
		}
		return `${messages.ganttChartConstraint}: ${constraint.type}, ${dateFormatter.format(constraint.date)}`;
	});
	const violationLabels = $derived(
		node.violations.map(
			(violation) => `${messages.ganttChartScheduleViolation}: ${violation.message}`
		)
	);
	const hasConstraintViolation = $derived(
		node.violations.some((violation) => violation.constraint !== undefined)
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
			isCritical ? messages.ganttChartCritical : null,
			totalSlackLabel,
			freeSlackLabel,
			constraintLabel,
			assignmentLabel,
			overAllocationLabel,
			...violationLabels
		]
			.filter(Boolean)
			.join(', ')
	);
	const taskPayload = $derived<GanttTaskPayload<TTaskFields, TAssignmentFields>>({
		node,
		geometry: positioned.geometry,
		assignments: taskAssignments,
		isSelected,
		isFocused: isFocusTarget,
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

	$effect(() => {
		if (isInteractionActive) isHoverCardOpen = false;
	});

	function activate(event: MouseEvent): void {
		event.stopPropagation();
		if (chart.interaction.shouldSuppressTaskActivation(node.taskId)) {
			event.preventDefault();
			return;
		}
		if (disabled) return;
		chart.a11y.setTaskTarget(node.taskId);
		onTaskClick?.(node, event);
	}

	function handleDoubleClick(event: MouseEvent): void {
		event.stopPropagation();
		if (chart.interaction.shouldSuppressTaskActivation(node.taskId)) {
			event.preventDefault();
			return;
		}
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

<div
	class="group/gantt-task relative h-0 w-full"
	data-gantt-task-group={node.taskId}
	style:--gantt-task-color={taskColor}
>
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

	{#if showConstraint && positioned.constraintLeft !== null && node.task.constraint && node.task.constraint.type !== 'as-soon-as-possible'}
		<div
			data-gantt-chart-part="constraint"
			data-task-id={node.taskId}
			data-constraint-type={node.task.constraint.type}
			data-violated={hasConstraintViolation || undefined}
			class={classes.constraint({
				density,
				color: semanticColor,
				disabled,
				invalid: hasConstraintViolation
			})}
			style:left={`${positioned.constraintLeft}px`}
			style:top={`${positioned.geometry.top + positioned.geometry.height / 2 - 6}px`}
			title={constraintLabel ?? undefined}
			aria-hidden="true"
		></div>
	{/if}

	<div
		class="pointer-events-none absolute z-30"
		style:left={`${positioned.geometry.left}px`}
		style:top={`${positioned.geometry.top}px`}
		style:width={`${positioned.geometry.width}px`}
		style:height={`${positioned.geometry.height}px`}
	>
		<HoverCard
			bind:open={isHoverCardOpen}
			position="top"
			offset={10}
			delay={250}
			closeDelay={120}
			openOnFocus
			disabled={disabled || isInteractionActive}
			triggerClass="pointer-events-auto size-full"
			popoverClass="pointer-events-none"
			popoverTheme={TASK_TOOLTIP_POPOVER_THEME}
		>
			{#snippet trigger()}
				<button
					type="button"
					aria-label={defaultAccessibleLabel}
					aria-pressed={isSelected}
					aria-current={isFocusTarget ? 'true' : undefined}
					aria-describedby={chart.a11y.instructionsId}
					aria-keyshortcuts="M S E P D Shift+D R Delete Backspace"
					aria-grabbed={chart.a11y.isTaskGrabbed(node.taskId)}
					{disabled}
					tabindex={isFocusTarget && !disabled ? 0 : -1}
					data-gantt-chart-part={node.type === 'summary'
						? 'summary-task'
						: node.type === 'milestone'
							? 'milestone'
							: 'task'}
					data-task-id={node.taskId}
					data-task-type={node.type}
					data-selected={isSelected || undefined}
					data-critical={isCritical || undefined}
					data-violated={node.violations.length > 0 || undefined}
					data-violation-count={node.violations.length || undefined}
					data-over-allocated={isOverAllocated || undefined}
					data-dragging={isDragging || undefined}
					data-continues-before={positioned.geometry.continuesBefore || undefined}
					data-continues-after={positioned.geometry.continuesAfter || undefined}
					data-color={semanticColor}
					class={visualClass({
						density,
						color: semanticColor,
						disabled,
						selected: isSelected,
						critical: isCritical,
						overAllocated: isOverAllocated,
						readOnly: node.task.readOnly ?? false,
						class: [
							'relative inset-0 h-full w-full',
							taskCursorClass,
							node.type === 'task' && positioned.segments.length > 0
								? 'border-0 bg-transparent shadow-none'
								: undefined,
							isDragging ? 'opacity-35' : undefined
						]
					})}
					onclick={activate}
					ondblclick={handleDoubleClick}
					onfocus={() => chart.a11y.setTaskTarget(node.taskId)}
					{@attach canMoveTask ? chart.interaction.taskDrag(node.taskId, 'move', rowTop) : null}
				>
					<Slot render={visualSnippet ?? defaultContent} payload={taskPayload} />
				</button>
			{/snippet}

			<Slot render={snippets.taskTooltip ?? defaultTooltip} payload={tooltipPayload} />
		</HoverCard>
	</div>

	{#if node.type === 'task' && !node.task.readOnly && node.task.resizable !== false && !disabled && isStartEdgeVisible}
		<span
			aria-hidden="true"
			data-gantt-chart-part="resize-handle"
			data-edge="start"
			data-task-id={node.taskId}
			class={classes.resizeHandle({ density, color: semanticColor, disabled })}
			style:left={`${resizeStartHandleLeft}px`}
			style:top={`${handleTop}px`}
			{@attach chart.interaction.taskDrag(node.taskId, 'resize-start', rowTop)}
		>
			<span
				class="h-3 w-0.5 rounded-full bg-[var(--gantt-task-color)]"
				style:transform={`translateX(${resizeStartVisualOffset}px)`}
			></span>
		</span>
	{/if}
	{#if node.type === 'task' && !node.task.readOnly && node.task.resizable !== false && !disabled && isEndEdgeVisible}
		<span
			aria-hidden="true"
			data-gantt-chart-part="resize-handle"
			data-edge="end"
			data-task-id={node.taskId}
			class={classes.resizeHandle({ density, color: semanticColor, disabled })}
			style:left={`${resizeEndHandleLeft}px`}
			style:top={`${handleTop}px`}
			{@attach chart.interaction.taskDrag(node.taskId, 'resize-end', rowTop)}
		>
			<span
				class="h-3 w-0.5 rounded-full bg-[var(--gantt-task-color)]"
				style:transform={`translateX(${resizeEndVisualOffset}px)`}
			></span>
		</span>
	{/if}

	{#if node.type === 'task' && !node.task.readOnly && node.task.progressEditable !== false && !disabled && showProgressHandle}
		<span
			aria-hidden="true"
			data-gantt-chart-part="progress-handle"
			data-task-id={node.taskId}
			class={classes.progressHandle({
				density,
				color: semanticColor,
				disabled,
				class: progressInteraction ? '!z-[35] !opacity-100' : '!z-[35]'
			})}
			style:left={`${progressHandleLeft}px`}
			style:top={`${progressHandleTop}px`}
			{@attach chart.interaction.progressDrag(node.taskId, rowTop)}
		>
			<span
				class="pointer-events-none h-3 w-1 rounded-full bg-[var(--gantt-task-color)] shadow-sm"
				style:transform={`translateX(${progressVisualOffset}px)`}
			></span>
		</span>
	{/if}

	{#if canCreateDependency && isStartEdgeVisible}
		<span
			aria-hidden="true"
			data-gantt-chart-part="dependency-handle"
			data-endpoint="start"
			data-task-id={node.taskId}
			data-target={chart.interaction.dependency.isValidTarget(node.taskId, 'start') || undefined}
			class={classes.dependencyHandle({ density, color: semanticColor, disabled })}
			style:left={`${dependencyStartHandleLeft}px`}
			style:top={`${handleTop}px`}
			{@attach chart.interaction.dependency.dependencyHandle(node.taskId, 'start', {
				x: dependencyStartHandleLeft,
				y: handleTop
			})}
		>
			<span
				class="size-2 rounded-full border border-[var(--gantt-task-color)] bg-surface"
				style:transform={`translateX(${dependencyStartVisualOffset}px)`}
			></span>
		</span>
	{/if}
	{#if canCreateDependency && isEndEdgeVisible}
		<span
			aria-hidden="true"
			data-gantt-chart-part="dependency-handle"
			data-endpoint="end"
			data-task-id={node.taskId}
			data-target={chart.interaction.dependency.isValidTarget(node.taskId, 'end') || undefined}
			class={classes.dependencyHandle({ density, color: semanticColor, disabled })}
			style:left={`${dependencyEndHandleLeft}px`}
			style:top={`${handleTop}px`}
			{@attach chart.interaction.dependency.dependencyHandle(node.taskId, 'end', {
				x: dependencyEndHandleLeft,
				y: handleTop
			})}
		>
			<span
				class="size-2 rounded-full border border-[var(--gantt-task-color)] bg-surface"
				style:transform={`translateX(${dependencyEndVisualOffset}px)`}
			></span>
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
		<GanttResourceAssignments
			{node}
			resources={assignedResources}
			assignments={taskAssignments}
			{overAllocatedResourceIds}
			{messages}
			{locale}
			{density}
			{color}
			{disabled}
			{classes}
			resourceAssignments={snippets.resourceAssignments}
		/>
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
		{#if isCritical}<span>{messages.ganttChartCritical}</span>{/if}
		{#if totalSlackLabel}<span>{totalSlackLabel}</span>{/if}
		{#if freeSlackLabel}<span>{freeSlackLabel}</span>{/if}
		{#if constraintLabel}<span>{constraintLabel}</span>{/if}
		{#each violationLabels as violationLabel, index (`${violationLabel}-${index}`)}
			<span class="text-danger">{violationLabel}</span>
		{/each}
		{#if assignedResources.length > 0}
			<span>{assignedResources.map((resource) => resource.title).join(', ')}</span>
		{/if}
		{#if overAllocationLabel}<span class="text-danger">{overAllocationLabel}</span>{/if}
	</div>
{/snippet}
