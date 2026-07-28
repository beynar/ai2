<script lang="ts" generics="TTaskFields extends object, TDependencyFields extends object">
	import type { Messages } from '$lib/i18n/en.js';
	import type { Colors, Density } from '$lib/types/theme.js';
	import type { Snippet } from 'svelte';
	import GanttDependencyControl from './GanttDependencyControl.svelte';
	import { positionGanttDependency } from './ganttChart.layout.js';
	import type { GanttTimeScale } from './ganttChart.scale.js';
	import type { GanttDependencyTooltipPayload } from './ganttChart.props.js';
	import type { GanttChartClasses } from './ganttChart.theme.js';
	import type { GanttResolvedDependency, GanttSelection } from './ganttChart.types.js';

	let {
		dependencies,
		rowIndexByTaskId,
		rowHeight,
		totalHeight,
		scale,
		visiblePixels,
		visibleRows,
		selection,
		messages,
		instructionsId,
		density,
		color,
		disabled,
		showCritical,
		classes,
		dependencyTooltip,
		onSelect,
		isTabStop,
		onFocus,
		onDelete,
		onUpdate,
		onDependencyClick
	}: {
		dependencies: readonly GanttResolvedDependency<TTaskFields, TDependencyFields>[];
		rowIndexByTaskId: ReadonlyMap<string, number>;
		rowHeight: number;
		totalHeight: number;
		scale: GanttTimeScale;
		visiblePixels: Readonly<{ start: number; end: number }>;
		visibleRows: Readonly<{ start: number; end: number }>;
		selection: GanttSelection;
		messages: Messages;
		instructionsId: string;
		density: Density;
		color: Colors;
		disabled: boolean;
		showCritical: boolean;
		classes: GanttChartClasses;
		dependencyTooltip?: Snippet<[GanttDependencyTooltipPayload<TTaskFields, TDependencyFields>]>;
		onSelect: (dependencyId: string) => void;
		isTabStop: (dependencyId: string) => boolean;
		onFocus: (dependencyId: string) => void;
		onDelete: (dependencyId: string) => void;
		onUpdate: (
			dependency: GanttResolvedDependency<TTaskFields, TDependencyFields>['dependency']
		) => boolean;
		onDependencyClick?: (
			dependency: GanttResolvedDependency<TTaskFields, TDependencyFields>,
			event: MouseEvent
		) => void;
	} = $props();

	const markerId = $props.id();
	const positionedDependencies = $derived(
		dependencies.flatMap((dependency) => {
			const geometry = positionGanttDependency({
				dependency,
				rowIndexByTaskId,
				rowHeight,
				scale,
				visiblePixels,
				visibleRows
			});
			return geometry?.visible ? [{ dependency, geometry }] : [];
		})
	);

	function activate(
		dependency: GanttResolvedDependency<TTaskFields, TDependencyFields>,
		event: MouseEvent
	): void {
		event.stopPropagation();
		if (disabled) return;
		onSelect(dependency.dependency.id);
		onDependencyClick?.(dependency, event);
	}
</script>

<svg
	data-gantt-chart-part="connector-layer"
	class={classes.connectorLayer({ density, color, disabled })}
	width={scale.totalWidth}
	height={totalHeight}
	viewBox={`0 0 ${scale.totalWidth} ${totalHeight}`}
	aria-hidden="true"
>
	<defs>
		<marker
			id={markerId}
			viewBox="0 0 8 8"
			refX="7"
			refY="4"
			markerWidth="6"
			markerHeight="6"
			orient="auto-start-reverse"
		>
			<path d="M 0 0 L 8 4 L 0 8 z" class="fill-neutral/55"></path>
		</marker>
	</defs>
	{#each positionedDependencies as positioned (positioned.dependency.dependency.id)}
		{@const isSelected =
			selection.kind === 'dependency' &&
			selection.dependencyId === positioned.dependency.dependency.id}
		{@const isCritical = showCritical && positioned.dependency.isCritical}
		<path
			d={positioned.geometry.path}
			data-gantt-chart-part="connector"
			data-dependency-id={positioned.dependency.dependency.id}
			data-critical={isCritical || undefined}
			data-selected={isSelected || undefined}
			class={classes.connector({
				density,
				color,
				disabled,
				critical: isCritical,
				selected: isSelected,
				class: [
					isCritical ? 'stroke-danger' : undefined,
					isSelected ? 'stroke-color stroke-[2.5]' : undefined
				]
			})}
			marker-end={`url(#${markerId})`}
			aria-hidden="true"
		></path>
		<path
			d={positioned.geometry.path}
			data-gantt-chart-part="connector-hit-target"
			data-dependency-id={positioned.dependency.dependency.id}
			class={classes.connectorHitTarget({ density, color, disabled, selected: isSelected })}
			pointer-events="stroke"
			aria-hidden="true"
			onclick={(event) => activate(positioned.dependency, event)}
		></path>
	{/each}
</svg>

<div
	class="pointer-events-none absolute inset-0"
	style:width={`${scale.totalWidth}px`}
	style:height={`${totalHeight}px`}
>
	{#each positionedDependencies as positioned (positioned.dependency.dependency.id)}
		<GanttDependencyControl
			dependency={positioned.dependency}
			geometry={positioned.geometry}
			{messages}
			{disabled}
			isSelected={selection.kind === 'dependency' &&
				selection.dependencyId === positioned.dependency.dependency.id}
			isTabStop={isTabStop(positioned.dependency.dependency.id)}
			{instructionsId}
			{dependencyTooltip}
			onActivate={(event) => activate(positioned.dependency, event)}
			onFocus={() => onFocus(positioned.dependency.dependency.id)}
			onDelete={() => onDelete(positioned.dependency.dependency.id)}
			{onUpdate}
		/>
	{/each}
</div>
