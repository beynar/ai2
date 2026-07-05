<script lang="ts">
	import { Carousel } from '$lib/components/Carousel/index.js';
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';

	let items = $state([
		{
			title: 'hello',
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			icon: 'chevron'
		},
		{
			title: 'hello',
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			icon: 'chevron'
		},
		{
			title: 'hello',
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			icon: 'chevron'
		},
		{
			title: 'title',
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			customKey: 'custom value'
		},
		{
			title: 'title',
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			customKey: 'custom value'
		},
		{
			title: 'title',
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			customKey: 'custom value'
		},
		{
			title: 'title',
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			customKey: 'custom value'
		}
	]);
</script>

<DocPage
	title="Carousel"
	subtitle="A scrollable, snapping track for browsing slides."
	component="Carousel"
	features={[
		'Blossom-carousel drag on fine pointers',
		'aria-roledescription carousel and slide labels',
		'Prev/next buttons with aria-labels',
		'Responsive slides-per-view breakpoints',
		'Dot pagination with aria-selected'
	]}
>
	<ComponentCard
		description="A horizontal snap carousel with three slides."
		code={`<Carousel class="w-full max-w-[90vw]">
	<div class="bg-primary-muted raised-lg h-[200px] rounded p-4">
		<h1>hello</h1>
		<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
	</div>
	<div class="bg-primary-muted raised-lg h-[200px] rounded p-4">
		<h1>hello</h1>
		<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
	</div>
	<div class="bg-primary-muted raised-lg h-[200px] rounded p-4">
		<h1>hello</h1>
		<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
	</div>
</Carousel>`}
	>
		<Carousel class="w-full max-w-[90vw]">
			{#each items.slice(0, 3) as item}
				<div class="bg-primary-muted raised-lg h-[200px] rounded p-4">
					<h1>{item.title}</h1>
					<p>{item.description}</p>
				</div>
			{/each}
		</Carousel>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard
			description="Responsive layout, navigation buttons, and dot pagination."
		>
			<Carousel
				layout={{ default: 1, sm: 1, xl: 3 }}
				gaps={{ default: 20 }}
				partialDelta={{ default: 50 }}
				class="w-full max-w-[90vw]"
				navigationButton={{ color: 'primary' }}
				dots={{ color: 'primary' }}
			>
				{#each items as item}
					<div class="bg-primary-muted raised-lg h-[400px] rounded p-4">
						<h1>{item.title}</h1>
						<p>{item.description}</p>
						<p>{item.content}</p>
					</div>
				{/each}
			</Carousel>
		</ComponentCard>
	{/snippet}
</DocPage>
