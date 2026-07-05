<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import CalendarPrimitive from '$lib/components/Form/Calendar/CalendarPrimitive.svelte';
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
		<ComponentCard
			description="Add disabled dates at runtime and observe onViewChange callbacks."
		>
			<Button onClick={() => disabledDates.push(new Date())}>Add disabled date</Button>
			<CalendarPrimitive
				onViewChange={(v) => console.log(v)}
				view="double"
				type="calendar"
				{disabledDates}
			></CalendarPrimitive>
		</ComponentCard>
	{/snippet}
</DocPage>
