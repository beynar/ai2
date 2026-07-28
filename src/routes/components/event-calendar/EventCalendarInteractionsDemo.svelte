<script lang="ts">
	import { Button } from '$lib/components/Button/index.js';
	import {
		EventCalendar,
		type EventCalendarChange,
		type EventCalendarSlot,
		type EventCalendarSlotSelectInfo
	} from '$lib/components/EventCalendar/index.js';
	import { createDemoItems, type MeetingFields } from './eventCalendarDemoData.js';

	let items = $state(createDemoItems().filter((item) => item.display !== 'background'));
	let date = $state(new Date('2026-07-15T10:00:00.000Z'));
	let lastChange = $state.raw<EventCalendarChange<MeetingFields> | null>(null);
	let calendar = $state<{
		copySelection(): boolean;
		paste(): boolean;
		undo(): boolean;
		redo(): boolean;
		canUndo(): boolean;
		canRedo(): boolean;
	} | null>(null);
	let status = $state('Focus an item and press M, S, or E to move or resize it.');

	function handleItemsChange(
		_nextItems: typeof items,
		change: EventCalendarChange<MeetingFields>
	): void {
		lastChange = change;
		status = `${change.kind} committed from ${change.source}; the bound array was replaced.`;
	}

	function handleSlotSelect(slot: EventCalendarSlot, info: EventCalendarSlotSelectInfo): void {
		status =
			slot.allDay === true
				? `Selected ${slot.start} through ${slot.end} (exclusive) with ${info.source}.`
				: `Selected ${slot.start.toISOString()} through ${slot.end.toISOString()} with ${info.source}.`;
	}

	function revertLastChange(): void {
		if (!lastChange) return;
		try {
			lastChange.revert();
			lastChange = null;
			status = 'The guarded transaction restored the previous immutable array.';
		} catch (error) {
			status = error instanceof Error ? error.message : 'The transaction could not be reverted.';
		}
	}
</script>

<div class="grid w-full gap-3">
	<div class="flex flex-wrap items-center justify-between gap-3">
		<p class="text-neutral/70 text-sm" aria-live="polite">{status}</p>
		<div class="flex flex-wrap gap-2">
			<Button size="small" variant="outline" onClick={() => calendar?.copySelection()}>Copy</Button>
			<Button size="small" variant="outline" onClick={() => calendar?.paste()}>Paste</Button>
			<Button
				size="small"
				variant="outline"
				disabled={!calendar?.canUndo()}
				onClick={() => calendar?.undo()}
			>
				Undo
			</Button>
			<Button
				size="small"
				variant="outline"
				disabled={!calendar?.canRedo()}
				onClick={() => calendar?.redo()}
			>
				Redo
			</Button>
			<Button size="small" variant="outline" disabled={!lastChange} onClick={revertLastChange}>
				Revert last change
			</Button>
		</div>
	</div>
	<EventCalendar
		bind:this={calendar}
		bind:items
		bind:date
		view="week"
		views={['week', 'day', 'days']}
		timeZone="Europe/Paris"
		dayStartHour={7}
		dayEndHour={19}
		scrollToHour={8}
		businessHours={[{ daysOfWeek: [1, 2, 3, 4, 5], start: '08:00', end: '18:00' }]}
		constrainToBusinessHours
		allowOverlap={false}
		onItemsChange={handleItemsChange}
		onSlotSelect={handleSlotSelect}
		class="h-[34rem] w-full"
	/>
</div>
