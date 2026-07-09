<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import CalendarPrimitive from '$lib/components/Form/Calendar/CalendarPrimitive.svelte';
	import { CalendarInput } from '$lib/components/Form/Calendar/index.js';
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';

	let disabledDates = $state<Date[]>([]);
</script>

<DocPage
	title="Calendar"
	subtitle="Date selection through an interactive month calendar."
	component="CalendarInput"
	features={[
		'Single or double-month views',
		'Calendar & range selection modes',
		'Bindable value with disabled dates',
		'aria-label on each day abbr',
		'Custom cell snippet support'
	]}
>
	<ComponentCard
		description="Double-month calendar with configurable disabled dates."
		code={`<CalendarPrimitive view="double" type="calendar" disabledDates={[]} />`}
	>
		<CalendarPrimitive view="double" type="calendar" {disabledDates}></CalendarPrimitive>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard description="Add disabled dates at runtime and observe onViewChange callbacks.">
			<Button onClick={() => disabledDates.push(new Date())}>Add disabled date</Button>
			<CalendarPrimitive
				onViewChange={(v) => console.log(v)}
				view="double"
				type="calendar"
				{disabledDates}
			></CalendarPrimitive>
		</ComponentCard>

		<ComponentCard
			title="Sizes"
			description="Small, normal, and large calendar inputs."
			code={`<div class="grid w-full max-w-md gap-6">
	<CalendarInput label="Small" type="calendar" size="small" />
	<CalendarInput label="Normal" type="calendar" size="normal" />
	<CalendarInput label="Large" type="calendar" size="large" />
</div>`}
		>
			<div class="grid w-full max-w-md gap-6">
				<CalendarInput label="Small" type="calendar" size="small" />
				<CalendarInput label="Normal" type="calendar" size="normal" />
				<CalendarInput label="Large" type="calendar" size="large" />
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
