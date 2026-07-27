<script
	lang="ts"
	generics="TTaskFields extends object, TDependencyFields extends object, TResourceFields extends object, TAssignmentFields extends object"
>
	import Button from '$lib/components/Button/Button.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup/ButtonGroup.svelte';
	import Select from '$lib/components/Form/Select/Select.svelte';
	import { arrowsInIcon } from '$lib/components/Icons/arrowsIn.js';
	import { calendarIcon } from '$lib/components/Icons/calendar.js';
	import { minusIcon } from '$lib/components/Icons/minus.js';
	import { plusIcon } from '$lib/components/Icons/plus.js';
	import Slot from '$lib/components/Slot/Slot.svelte';
	import { getDateTimeFormatter } from '$lib/scheduling/zonedTime.js';
	import type { Messages } from '$lib/i18n/en.js';
	import type { Colors, Density } from '$lib/types/theme.js';
	import type { Snippet } from 'svelte';
	import type { GanttHeaderPayload, GanttSnapshot } from './ganttChart.props.js';
	import type { GanttChartState } from './ganttChart.state.svelte.js';
	import type { GanttChartClasses } from './ganttChart.theme.js';
	import type { GanttZoomLevel } from './ganttChart.types.js';

	let {
		chart,
		snapshot,
		messages,
		locale,
		timeZone,
		density,
		color,
		disabled,
		stickyHeader,
		scrollMode,
		classes,
		header,
		actions
	}: {
		chart: GanttChartState<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
		snapshot: GanttSnapshot<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>;
		messages: Messages;
		locale: string;
		timeZone: string;
		density: Density;
		color: Colors;
		disabled: boolean;
		stickyHeader: boolean;
		scrollMode: 'contained' | 'page';
		classes: GanttChartClasses;
		header?: Snippet<
			[GanttHeaderPayload<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>]
		>;
		actions?: Snippet<
			[GanttSnapshot<TTaskFields, TDependencyFields, TResourceFields, TAssignmentFields>]
		>;
	} = $props();

	const zoomLabels = $derived<Record<string, string>>({
		hour: messages.ganttChartHourZoom,
		day: messages.ganttChartDayZoom,
		week: messages.ganttChartWeekZoom,
		month: messages.ganttChartMonthZoom,
		quarter: messages.ganttChartQuarterZoom,
		year: messages.ganttChartYearZoom
	});
	const zoomItems = $derived(
		chart.enabledZoomLevels.map((zoom) => ({ value: zoom, label: zoomLabels[zoom] ?? zoom }))
	);
	const rangeFormatter = $derived(
		getDateTimeFormatter(locale, timeZone, {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		})
	);
	const rangeTitle = $derived(
		rangeFormatter.formatRange(snapshot.visibleRange.start, snapshot.visibleRange.end)
	);
	const zoomButtons = $derived([
		{
			type: 'button' as const,
			prefix: minusIcon,
			label: messages.ganttChartZoomOut,
			onClick: () => chart.zoomOut()
		},
		{
			type: 'button' as const,
			prefix: plusIcon,
			label: messages.ganttChartZoomIn,
			onClick: () => chart.zoomIn()
		}
	]);
</script>

<div
	data-gantt-chart-part="header"
	class={classes.header({
		density,
		color,
		disabled,
		class: stickyHeader && scrollMode === 'page' ? 'sticky top-0 z-40' : undefined
	})}
>
	{#if header}
		{@const payload = {
			...snapshot,
			zoomOut: zoomOutPart,
			zoomIn: zoomInPart,
			fitProject: fitProjectPart,
			today: todayPart,
			zoomControl: zoomControlPart,
			actions: actionsPart
		} satisfies GanttHeaderPayload<
			TTaskFields,
			TDependencyFields,
			TResourceFields,
			TAssignmentFields
		>}
		<Slot render={header} {payload} />
	{:else}
		<div
			data-gantt-chart-part="navigation"
			class={classes.navigation({ density, color, disabled })}
		>
			{@render todayPart()}
			{@render fitProjectPart()}
		</div>
		<div
			data-gantt-chart-part="title"
			class={classes.title({ density, color, disabled })}
			role="status"
			aria-live="polite"
		>
			{rangeTitle}
		</div>
		{@render zoomControlPart()}
		{@render actionsPart()}
	{/if}
</div>

{#snippet zoomOutPart()}
	<Button
		type="button"
		squared
		size="small"
		variant="ghost"
		color="neutral"
		prefix={minusIcon}
		label={messages.ganttChartZoomOut}
		{disabled}
		onClick={() => chart.zoomOut()}
	/>
{/snippet}

{#snippet zoomInPart()}
	<Button
		type="button"
		squared
		size="small"
		variant="ghost"
		color="neutral"
		prefix={plusIcon}
		label={messages.ganttChartZoomIn}
		{disabled}
		onClick={() => chart.zoomIn()}
	/>
{/snippet}

{#snippet fitProjectPart()}
	<Button
		type="button"
		squared
		size="small"
		variant="ghost"
		color="neutral"
		prefix={arrowsInIcon}
		label={messages.ganttChartFitProject}
		{disabled}
		onClick={() => chart.fitProject()}
	/>
{/snippet}

{#snippet todayPart()}
	<Button
		type="button"
		size="small"
		variant="outline"
		{color}
		prefix={calendarIcon}
		{disabled}
		onClick={() => chart.scrollToDate(new Date())}
	>
		{messages.ganttChartToday}
	</Button>
{/snippet}

{#snippet zoomControlPart()}
	<div
		data-gantt-chart-part="zoom-control"
		class={classes.zoomControl({ density, color, disabled })}
	>
		<ButtonGroup items={zoomButtons} size="small" variant="ghost" color="neutral" {disabled} />
		<Select
			items={zoomItems}
			value={snapshot.zoom}
			size="small"
			density="small"
			{disabled}
			attrs={{ 'aria-label': messages.ganttChartZoomLevel }}
			onChange={(zoom) => chart.setZoom(zoom as GanttZoomLevel)}
		/>
	</div>
{/snippet}

{#snippet actionsPart()}
	{#if actions}
		<div data-gantt-chart-part="actions" class={classes.actions({ density, color, disabled })}>
			<Slot render={actions} payload={snapshot} />
		</div>
	{/if}
{/snippet}
