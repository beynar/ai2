<script lang="ts">
	import DocPage from '../../DocPage.svelte';
	import ComponentCard from '../../ComponentCard.svelte';
	import RatingInput from '$lib/components/Form/RatingInput/RatingInput.svelte';
	import Form from '$lib/components/Form/Form/Form.svelte';

	let rating = $state<number | null>(3);
</script>

<DocPage
	title="Rating input"
	subtitle="Star rating input with half-star support, configurable star count and RTL."
	component="RatingInput"
	features={[
		'Configurable star count via max',
		'Optional half-star precision',
		'RTL fills from the right',
		'Slider role with keyboard support'
	]}
>
	<ComponentCard
		description="A star rating input"
		code={`<RatingInput label="Rating" bind:value={rating} />`}
	>
		<div class="w-full max-w-md">
			<RatingInput label="Rating" bind:value={rating} />
			{#if rating !== null}
				<p class="text-foreground-muted mt-2 text-xs">Value: {rating}</p>
			{/if}
		</div>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard description="Basic 5-star rating">
			<div class="w-full max-w-md">
				<RatingInput label="Rating" value={3} />
			</div>
		</ComponentCard>

		<ComponentCard description="Half steps (LTR)">
			<div class="w-full max-w-md">
				<RatingInput label="Rating" allowHalf value={2.5} />
			</div>
		</ComponentCard>

		<ComponentCard description="Half steps (RTL) — fills from the right">
			<div class="w-full max-w-md">
				<RatingInput label="Rating" allowHalf dir="rtl" value={2.5} />
			</div>
		</ComponentCard>

		<ComponentCard description="Ten stars">
			<div class="w-full max-w-md">
				<RatingInput label="Rating" max={10} value={7} />
			</div>
		</ComponentCard>

		<ComponentCard
			title="Sizes"
			description="Small, normal, and large rating inputs."
			code={`<div class="grid w-full max-w-md gap-6">
	<RatingInput label="Small" size="small" value={3} />
	<RatingInput label="Normal" size="normal" value={3} />
	<RatingInput label="Large" size="large" value={3} />
</div>`}
		>
			<div class="grid w-full max-w-md gap-6">
				<RatingInput label="Small" size="small" value={3} />
				<RatingInput label="Normal" size="normal" value={3} />
				<RatingInput label="Large" size="large" value={3} />
			</div>
		</ComponentCard>

		<ComponentCard description="Read-only display">
			<div class="w-full max-w-md">
				<RatingInput label="Rating" readonly allowHalf value={4.5} />
			</div>
		</ComponentCard>

		<ComponentCard description="Disabled">
			<div class="w-full max-w-md">
				<RatingInput label="Rating" disabled value={3} />
			</div>
		</ComponentCard>

		<ComponentCard description="Using type: 'rating' inside a Form">
			<div class="w-full max-w-md">
				<Form
					inputs={{
						rating: {
							type: 'rating',
							label: 'Rating',
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
