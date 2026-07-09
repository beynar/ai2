<script lang="ts">
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import { TimeInput } from '$lib/components/Form/TimeInput/index.js';
	import Form from '$lib/components/Form/Form/Form.svelte';
</script>

<DocPage
	title="Time input"
	subtitle="Typed time entry with formatting and constraints."
	component="TimeInput"
	features={[
		'Maskito time masking (@maskito/kit)',
		'HH:MM or HH:MM:SS formats',
		'Value as minutes/seconds/ms since midnight',
		'Per-segment min/max constraints'
	]}
>
	<ComponentCard
		description="A masked time input, value as minutes since midnight"
		code={`<TimeInput
	as="minuteSinceMidnight"
	value={1439}
	label="Time"
	format="HH:MM"
	placeholder="HH:MM"
	onChange={(value) => {
		console.log('value', value);
	}}
/>`}
	>
		<div class="w-full max-w-md">
			<TimeInput
				as="minuteSinceMidnight"
				value={1439}
				label="Time"
				format="HH:MM"
				placeholder="HH:MM"
				onChange={(value) => {
					console.log('value', value);
				}}
			/>
		</div>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard description="A masked time input, value as minutes since midnight">
			<div class="w-full max-w-md">
				<TimeInput
					as="minuteSinceMidnight"
					value={1439}
					label="Time"
					format="HH:MM"
					placeholder="HH:MM"
					onChange={(value) => {
						console.log('value', value);
					}}
				/>
			</div>
		</ComponentCard>

		<ComponentCard description="Use the HH:MM:SS format">
			<div class="w-full max-w-md">
				<TimeInput as="secondSinceMidnight" label="Time" format="HH:MM:SS" placeholder="HH:MM:SS" />
			</div>
		</ComponentCard>

		<ComponentCard
			title="Sizes"
			description="Small, normal, and large time inputs."
			code={`<div class="grid w-full max-w-md gap-6">
	<TimeInput label="Small" size="small" />
	<TimeInput label="Normal" size="normal" />
	<TimeInput label="Large" size="large" />
</div>`}
		>
			<div class="grid w-full max-w-md gap-6">
				<TimeInput label="Small" size="small" />
				<TimeInput label="Normal" size="normal" />
				<TimeInput label="Large" size="large" />
			</div>
		</ComponentCard>

		<ComponentCard description="Using type: 'time' inside a Form">
			<div class="w-full max-w-md">
				<Form
					inputs={{
						time: {
							type: 'time',
							label: 'Time',
							format: 'HH:MM',
							placeholder: 'HH:MM',
							required: true
						}
					}}
					onSubmit={(data) => {
						console.log('Form submitted:', data);
					}}
				/>
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
