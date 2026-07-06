<script lang="ts">
	import DocPage from '../../DocPage.svelte';
	import ComponentCard from '../../ComponentCard.svelte';
	import { NumberInput } from '$lib/components/Form/NumberInput/index.js';
	import Form from '$lib/components/Form/Form/Form.svelte';

	let quantity = $state<number | null>(1);
</script>

<DocPage
	title="Number input"
	subtitle="Numeric entry with stepping and min/max constraints."
	component="NumberInput"
	features={[
		'Native min, max & step plus +/- controls',
		'Bindable value, errors & focus',
		'Min/max checked in onValidate',
		'Label linked via Field wrapper'
	]}
>
	<ComponentCard
		description="A numeric input"
		code={`<NumberInput label="Quantity" placeholder="0" increment={2} bind:value={quantity} />`}
	>
		<div class="w-full max-w-md">
			<NumberInput label="Quantity" placeholder="0" increment={2} bind:value={quantity} />
			{#if quantity !== null}
				<p class="text-foreground-muted mt-2 text-xs">Value: {quantity}</p>
			{/if}
		</div>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard description="A numeric input">
			<div class="w-full max-w-md">
				<NumberInput label="Quantity" placeholder="0" bind:value={quantity} />
				{#if quantity !== null}
					<p class="text-foreground-muted mt-2 text-xs">Value: {quantity}</p>
				{/if}
			</div>
		</ComponentCard>

		<ComponentCard description="Constrain the range and increment">
			<div class="w-full max-w-md">
				<NumberInput label="Age" placeholder="18" min={18} max={120} step={1} increment={5} />
			</div>
		</ComponentCard>

		<ComponentCard description="Using type: 'number' inside a Form">
			<div class="w-full max-w-md">
				<Form
					inputs={{
						age: {
							type: 'number',
							label: 'Age',
							placeholder: 'Enter your age',
							min: 18,
							max: 120,
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
