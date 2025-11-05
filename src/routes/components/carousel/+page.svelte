<script lang="ts">
	import Accordion from '$lib/components/Accordion/Accordion.svelte';
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
		}
	]);
	let size = $state<'normal'>('normal');
	let variant = $state<'classic' | 'card' | 'outlined'>('card');
	let oneAtATime = $state<boolean>(true);
	let splitted = $state(true);
</script>

<ComponentCard title="Accordion Classic" class="flex ">
	<Carousel layout={{ default: 2 }}>
		{#each items as item}
			<div class="bg-primary raised size-10 rounded p-10">
				<h1>{item.title}</h1>
				<p>{item.description}</p>
				<p>{item.content}</p>
			</div>
		{/each}
	</Carousel>
</ComponentCard>

<!--
<ComponentCard title="Accordion Outlined" class="flex !items-start">
	<div class="w-[300px] my-10 grid gap-10">
		<AccordionGroup {size} variant="outlined" openedIndices={openedIndex} {items} />
		<AccordionGroup {size} variant="outlined" splitted openedIndices={openedIndex} {items} />

	</div>
</ComponentCard>

<ComponentCard title="Accordion Card" class="flex !items-start">
	<div class="w-[300px] my-10 grid gap-10">
		<AccordionGroup {size} variant="card" openedIndices={openedIndex} {items} />
		<AccordionGroup {size} variant="card" splitted openedIndices={openedIndex} {items} />
		<Accordion
			{size}
			variant="card"
			title="title"
			description="description"
			content="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
		/>
	</div>
</ComponentCard> -->
