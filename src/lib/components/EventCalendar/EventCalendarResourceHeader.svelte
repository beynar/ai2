<script
	lang="ts"
	generics="TItemFields extends object = Record<never, never>, TResourceFields extends object = Record<never, never>"
>
	import Slot from '$lib/components/Slot/Slot.svelte';
	import type { Density } from '$lib/types/theme.js';
	import type { Snippet } from 'svelte';
	import type { EventCalendarA11y } from './eventCalendar.a11y.svelte.js';
	import { startOfZonedDay } from './eventCalendar.date.js';
	import { EventCalendarError } from './eventCalendar.error.js';
	import type { EventCalendarResourceHeaderPayload } from './eventCalendar.props.js';
	import type { EventCalendarResourceModel } from './eventCalendar.resources.js';
	import type { EventCalendarClasses } from './eventCalendar.theme.js';
	import type { EventCalendarTimeGridDayGeometry } from './eventCalendar.timeGrid.js';
	import type { EventCalendarDateOnly } from './eventCalendar.types.js';

	let {
		resourceModel,
		dayGeometries,
		a11y,
		timeZone,
		longDayFormatter,
		density,
		classes,
		disabled,
		resourceHeader,
		unassignedResourceLabel,
		registerTimeTarget,
		handleTargetKeydown,
		handleAllDayClick
	}: {
		resourceModel: EventCalendarResourceModel<TResourceFields>;
		dayGeometries: readonly EventCalendarTimeGridDayGeometry<TItemFields>[];
		a11y: EventCalendarA11y<TItemFields, TResourceFields>;
		timeZone: string;
		longDayFormatter: Intl.DateTimeFormat;
		density: Density;
		classes: EventCalendarClasses;
		disabled: boolean;
		resourceHeader?: Snippet<[EventCalendarResourceHeaderPayload<TResourceFields>]>;
		unassignedResourceLabel: string;
		registerTimeTarget: (targetKey: string) => (node: HTMLElement) => () => void;
		handleTargetKeydown: (event: KeyboardEvent, targetKey: string, activate?: boolean) => void;
		handleAllDayClick: (day: EventCalendarDateOnly, event: MouseEvent, resourceId?: string) => void;
	} = $props();

	function getGeometry(column: number): EventCalendarTimeGridDayGeometry<TItemFields> {
		const geometry = dayGeometries[column];
		if (geometry) return geometry;
		throw new EventCalendarError(
			'invalid-resource',
			`Resource header column ${column} has no time-grid geometry.`,
			{ column }
		);
	}
</script>

{#each resourceModel.headerCells as cell (cell.key)}
	{@const defaultLabel = cell.resource?.title ?? unassignedResourceLabel}
	{@const payload = {
		resource: cell.resource,
		depth: cell.depth,
		isUnassigned: cell.isUnassigned,
		defaultContent: defaultResourceHeader
	} satisfies EventCalendarResourceHeaderPayload<TResourceFields>}
	{#if cell.isLeaf}
		{@const geometry = getGeometry(cell.columnStart)}
		{@const targetKey = `day-header:${geometry.key}`}
		<button
			type="button"
			tabindex={disabled ? -1 : a11y.getTimeTargetTabIndex(targetKey)}
			aria-label={`${defaultLabel}, ${longDayFormatter.format(startOfZonedDay(geometry.day, timeZone))}`}
			{disabled}
			data-event-calendar-part="resource-header"
			data-resource-id={cell.resourceId}
			data-resource-depth={cell.depth}
			data-unassigned={cell.isUnassigned || undefined}
			class={classes.resourceHeader({
				density,
				view: 'resource',
				disabled,
				class:
					'border-e border-b border-neutral-muted px-2 py-1.5 text-center outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-color/60'
			})}
			style:grid-column={`${cell.columnStart + 2} / span ${cell.columnSpan}`}
			style:grid-row={`${cell.depth + 1} / span ${cell.rowSpan}`}
			onfocus={() => a11y.handleTimeTargetFocus(targetKey)}
			onclick={(event) => handleAllDayClick(geometry.day, event, geometry.resourceId)}
			onkeydown={(event) => handleTargetKeydown(event, targetKey, true)}
			{@attach disabled ? null : registerTimeTarget(targetKey)}
		>
			<Slot render={resourceHeader ?? defaultResourceHeader} {payload} />
		</button>
	{:else}
		<div
			role="group"
			aria-label={defaultLabel}
			data-event-calendar-part="resource-header"
			data-resource-id={cell.resourceId}
			data-resource-depth={cell.depth}
			data-resource-group
			class={classes.resourceHeader({
				density,
				view: 'resource',
				disabled,
				class: 'border-e border-b border-neutral-muted px-2 py-1 text-center'
			})}
			style:grid-column={`${cell.columnStart + 2} / span ${cell.columnSpan}`}
			style:grid-row={`${cell.depth + 1} / span ${cell.rowSpan}`}
		>
			<Slot render={resourceHeader ?? defaultResourceHeader} {payload} />
		</div>
	{/if}

	{#snippet defaultResourceHeader()}
		<span>{defaultLabel}</span>
	{/snippet}
{/each}
