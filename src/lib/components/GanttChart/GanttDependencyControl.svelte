<script lang="ts" generics="TTaskFields extends object, TDependencyFields extends object">
	import Slot from '$lib/components/Slot/Slot.svelte';
	import { tooltip } from '$lib/components/Tooltip/tooltip.svelte.js';
	import type { Messages } from '$lib/i18n/en.js';
	import type { Snippet } from 'svelte';
	import type { GanttDependencyTooltipPayload } from './ganttChart.props.js';
	import type { GanttDependencyGeometry, GanttResolvedDependency } from './ganttChart.types.js';

	let {
		dependency,
		geometry,
		messages,
		disabled,
		isSelected,
		dependencyTooltip,
		onActivate
	}: {
		dependency: GanttResolvedDependency<TTaskFields, TDependencyFields>;
		geometry: GanttDependencyGeometry;
		messages: Messages;
		disabled: boolean;
		isSelected: boolean;
		dependencyTooltip?: Snippet<[GanttDependencyTooltipPayload<TTaskFields, TDependencyFields>]>;
		onActivate: (event: MouseEvent) => void;
	} = $props();

	const defaultAccessibleLabel = $derived(
		messages.ganttChartDependencyDescription(
			dependency.fromTask.task.title,
			dependency.toTask.task.title,
			dependency.dependency.type
		)
	);
	const tooltipPayload = $derived<GanttDependencyTooltipPayload<TTaskFields, TDependencyFields>>({
		dependency,
		geometry,
		defaultAccessibleLabel,
		defaultContent: defaultTooltip
	});
	const tooltipAttachment = tooltip({
		get content() {
			return resolvedTooltip;
		},
		position: 'top',
		delay: 350
	});
	const focusLeft = $derived((geometry.fromX + geometry.toX) / 2 - 12);
	const focusTop = $derived((geometry.fromY + geometry.toY) / 2 - 12);
</script>

<button
	type="button"
	aria-label={defaultAccessibleLabel}
	aria-pressed={isSelected}
	{disabled}
	tabindex={isSelected ? 0 : -1}
	data-gantt-chart-part="connector-control"
	data-dependency-id={dependency.dependency.id}
	class="pointer-events-auto absolute z-20 size-6 rounded-full bg-transparent opacity-0 outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-color/60"
	style:left={`${focusLeft}px`}
	style:top={`${focusTop}px`}
	onclick={onActivate}
	{@attach tooltipAttachment}
></button>

{#snippet defaultTooltip()}
	{defaultAccessibleLabel}
{/snippet}

{#snippet resolvedTooltip()}
	<Slot render={dependencyTooltip ?? defaultTooltip} payload={tooltipPayload} />
{/snippet}
