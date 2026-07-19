<script lang="ts">
	import ComponentCard from '../../ComponentCard.svelte';
	import { createComponentControls } from '../../componentControls.svelte.js';
	import DocPage from '../../DocPage.svelte';
	import Rating from '$lib/components/Rating/Rating.svelte';
	import { heartIcon, heartIconFill } from '$lib/components/Icons/heart.js';

	const controls = createComponentControls([
		{
			name: 'size',
			type: 'segmented',
			label: 'Size',
			value: 'normal',
			options: ['small', 'normal', 'large']
		},
		{
			name: 'color',
			type: 'segmented',
			label: 'Color',
			value: 'warning',
			options: ['warning', 'primary', 'success', 'danger']
		},
		{
			name: 'value',
			type: 'slider',
			label: 'Rating',
			value: 3.5,
			min: 0,
			max: 5,
			step: 0.5,
			showValue: true
		}
	]);
</script>

<DocPage
	title="Rating"
	subtitle="A read-only star rating display with half and partial star support."
	component="Rating"
	features={[
		'Any fraction renders as a partial fill',
		'Configurable star count via max',
		'RTL fills from the right',
		'Custom icon via the star snippet',
		'Shared theme with RatingInput'
	]}
>
	<ComponentCard
		{controls}
		description="A static rating display"
		code={`<Rating value={${controls.value.value}} size="${controls.value.size}" color="${controls.value.color}" />`}
	>
		<Rating value={controls.value.value} size={controls.value.size} color={controls.value.color} />
	</ComponentCard>

	{#snippet examples()}
		<!-- Example 1: Basic values -->
		<ComponentCard description="Whole, half, and fractional values (e.g. a 3.7 average)">
			<div class="flex flex-col gap-2">
				<Rating value={3} />
				<Rating value={2.5} />
				<Rating value={3.7} />
			</div>
		</ComponentCard>

		<!-- Example 2: Star count -->
		<ComponentCard description="Configurable star count via max">
			<Rating value={7.5} max={10} />
		</ComponentCard>

		<!-- Example 3: Colors -->
		<ComponentCard description="Fill color follows the theme colors (default is warning)">
			<div class="flex flex-col gap-2">
				<Rating value={3.5} color="primary" />
				<Rating value={3.5} color="danger" />
				<Rating value={3.5} color="success" />
			</div>
		</ComponentCard>

		<!-- Example 4: Sizes -->
		<ComponentCard description="Small, normal and large sizes">
			<div class="flex flex-col gap-2">
				<Rating value={3.5} size="small" />
				<Rating value={3.5} size="normal" />
				<Rating value={3.5} size="large" />
			</div>
		</ComponentCard>

		<!-- Example 5: RTL -->
		<ComponentCard description="RTL orders and fills the stars from the right">
			<Rating value={2.5} dir="rtl" />
		</ComponentCard>

		<!-- Example 6: Custom icon via the star snippet -->
		<ComponentCard description="Custom icon — the snippet renders once per layer (base and fill)">
			<Rating value={3.5} color="danger">
				{#snippet star({ layer })}
					{#if layer === 'base'}
						{@render heartIcon({ class: 'size-full' })}
					{:else}
						{@render heartIconFill({ class: 'size-full' })}
					{/if}
				{/snippet}
			</Rating>
		</ComponentCard>
	{/snippet}
</DocPage>
