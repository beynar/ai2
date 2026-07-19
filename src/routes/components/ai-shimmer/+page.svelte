<script lang="ts">
	import Shimmer from '$lib/components/AIShimmer/Shimmer.svelte';
	import ComponentCard from '../../ComponentCard.svelte';
	import { createComponentControls } from '../../componentControls.svelte.js';
	import DocPage from '../../DocPage.svelte';

	const controls = createComponentControls([
		{
			name: 'contentMode',
			type: 'segmented',
			label: 'Content',
			value: 'text',
			options: ['text', 'snippet']
		},
		{
			name: 'effect',
			type: 'segmented',
			label: 'Effect',
			value: 'loop',
			options: ['loop', 'once', 'reverse', 'off']
		},
		{
			name: 'duration',
			type: 'slider',
			label: 'Duration',
			value: 1.8,
			min: 0.6,
			max: 4,
			step: 0.1,
			showValue: true
		},
		{
			name: 'spread',
			type: 'slider',
			label: 'Spread',
			value: 2,
			min: 0.5,
			max: 5,
			step: 0.1,
			showValue: true
		}
	]);
	const effectClasses = {
		loop: '',
		once: 'shimmer-once',
		reverse: 'shimmer-reverse',
		off: 'shimmer-none'
	} as const;
	const utilityCode = '<p class="shimmer">Loading through the Tailwind utility</p>';
</script>

{#snippet customContent()}
	<span>Inspecting <strong>three sources</strong></span>
{/snippet}

<DocPage
	title="AI Shimmer"
	subtitle="A semantic text wrapper over the shared Tailwind shimmer utility."
	component="Shimmer"
	features={[
		'No private keyframes',
		'Dynamic duration and spread variables',
		'Element selection through as',
		'Text or child snippet content',
		'Reduced-motion behavior inherited from the utility',
		'Theme-aware semantic slot'
	]}
>
	<ComponentCard
		{controls}
		description="The wrapper only owns element semantics and dynamic CSS variables; animation remains in the Tailwind plugin."
		class="!min-h-[260px]"
		code={`<script lang="ts">
  import { Shimmer } from 'svelai/ai-shimmer';
${'</' + 'script>'}

<Shimmer text="Generating a response" duration={1.8} spread={2} />`}
	>
		<div class="grid w-full max-w-xl gap-5">
			{#if controls.value.contentMode === 'snippet'}
				<Shimmer
					duration={controls.value.duration}
					spread={controls.value.spread}
					class="text-lg font-medium {effectClasses[controls.value.effect]}"
				>
					{@render customContent()}
				</Shimmer>
			{:else}
				<Shimmer
					text="Generating a response"
					duration={controls.value.duration}
					spread={controls.value.spread}
					class="text-lg font-medium {effectClasses[controls.value.effect]}"
				/>
			{/if}
		</div>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			title="Shared utility"
			description="Use the raw shimmer class for ordinary markup; use this component when duration, spread, or semantic slots are useful."
			class="!min-h-[220px]"
			code={utilityCode}
		>
			<p class="shimmer text-sm font-medium">Loading through the Tailwind utility</p>
		</ComponentCard>
	{/snippet}
</DocPage>
