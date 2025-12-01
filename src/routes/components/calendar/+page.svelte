<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import CalendarPrimitive from '$lib/components/Form/Calendar/CalendarPrimitive.svelte';

	let disabledDates = $state<Date[]>([]);
</script>

<div class="grid gap-10">
	<div
		class="border-surface-muted relative grid min-h-[400px] w-full max-w-[90vw] items-center gap-4 rounded border p-10"
	>
		<Button onClick={() => disabledDates.push(new Date())}>Add disabled date</Button>
		<CalendarPrimitive type="calendar" {disabledDates}></CalendarPrimitive>
	</div>
</div>
