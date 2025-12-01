<script lang="ts">
	import { Carousel } from '$lib/components/Carousel/index.js';
	import ComponentCard from '../../ComponentCard.svelte';

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

<ComponentCard title="Carousel" class="flex p-10 ">
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
