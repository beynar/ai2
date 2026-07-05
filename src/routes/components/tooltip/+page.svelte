<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import { tooltip } from '$lib/components/Tooltip/tooltip.svelte.js';
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
</script>

<DocPage
	title="Tooltip"
	subtitle="Contextual information on hover, attached to any element."
	component="Tooltip"
	features={[
		'{@attach tooltip()} on any element',
		'Hover-triggered with configurable delay',
		'Any-side placement via Floating UI',
		'Single shared instance through theme state'
	]}
>
	<ComponentCard
		description="A tooltip attached to a button, shown on hover."
		code={`<Button
	variant="outline"
	color="background"
	{@attach tooltip({ content: 'Hover me', position: 'top' })}
>
	Hover me
</Button>`}
	>
		<Button
			variant="outline"
			color="background"
			{@attach tooltip({ content: 'Hover me', position: 'top' })}
		>
			Hover me
		</Button>
	</ComponentCard>

	{#snippet examples()}
	<ComponentCard description="Placement on all sides and a longer open delay.">
		<div class="flex items-center justify-center gap-4">
			<Button variant="outline" color="background" {@attach tooltip({ content: 'Top tooltip', position: 'top' })}>
				Top
			</Button>
			<Button variant="outline" color="background" {@attach tooltip({ content: 'Bottom tooltip', position: 'bottom' })}>
				Bottom
			</Button>
			<Button variant="outline" color="background" {@attach tooltip({ content: 'Left tooltip', position: 'left' })}>
				Left
			</Button>
			<Button variant="outline" color="background" {@attach tooltip({ content: 'Right tooltip', position: 'right' })}>
				Right
			</Button>
			<Button variant="outline" color="background" {@attach tooltip({ content: 'Shows after 1s', delay: 1000 })}>
				Long delay
			</Button>
		</div>
	</ComponentCard>
	{/snippet}
</DocPage>
