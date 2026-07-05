<script lang="ts">
	import DocPage from '../../DocPage.svelte';
	import ComponentCard from '../../ComponentCard.svelte';
	import { DateInput } from '$lib/components/Form/DateInput/index.js';
	import Form from '$lib/components/Form/Form/Form.svelte';

	let date = $state<Date | null>(null);
</script>

<DocPage
	title="Date input"
	subtitle="Typed date entry with formatting and validation."
	component="DateInput"
	features={[
		'Maskito date masking (@maskito/kit)',
		'Configurable format masks',
		'Bindable Date value',
		'Label linked via Field wrapper'
	]}
>
	<ComponentCard
		description="A masked date input (dd/mm/yyyy)"
		code={`<DateInput label="Date" bind:value={date} />`}
	>
		<div class="w-full max-w-md">
			<DateInput label="Date" bind:value={date} />
			{#if date}
				<p class="text-foreground-muted mt-2 text-xs">Value: {date.toLocaleDateString()}</p>
			{/if}
		</div>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard description="A masked date input (dd/mm/yyyy)">
			<div class="w-full max-w-md">
				<DateInput label="Date" bind:value={date} />
				{#if date}
					<p class="text-foreground-muted mt-2 text-xs">Value: {date.toLocaleDateString()}</p>
				{/if}
			</div>
		</ComponentCard>

		<ComponentCard description="Change the mask with the format prop">
			<div class="grid w-full max-w-md gap-6">
				<DateInput label="US format" format="mm/dd/yyyy" />
				<DateInput label="Month & year" format="mm/yyyy" />
			</div>
		</ComponentCard>

		<ComponentCard description="Using type: 'date' inside a Form">
			<div class="w-full max-w-md">
				<Form
					inputs={{
						birthdate: {
							type: 'date',
							label: 'Birth date',
							format: 'dd/mm/yyyy',
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
