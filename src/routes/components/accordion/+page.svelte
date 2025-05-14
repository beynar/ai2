<script lang="ts">
	import Accordion from '$lib/components/Accordion/Accordion.svelte';
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

<select
	name="size"
	bind:value={size}
	class="bg-surface-light raised text-contrast text-sms rounded p-2"
>
	<option value="normal">normal</option>
	<option value="small">small</option>
	<option value="large">large</option>
</select>

<select
	name="variant"
	bind:value={variant}
	class="bg-surface-light raised text-contrast text-sms rounded p-2"
>
	<option value="classic">classic</option>
	<option value="card">card</option>
	<option value="outlined">outlined</option>
</select>

<input type="checkbox" id="oneAtATime" bind:checked={oneAtATime} />
<label for="oneAtATime">oneAtATime</label>

<input type="checkbox" id="splitted" bind:checked={splitted} />
<label for="splitted">splitted</label>

<ComponentCard title="Accordion Classic" class="flex !items-start ">
	<div class="my-10 grid w-[800px] grid-cols-3 gap-10">
		<Accordion variant="classic" {oneAtATime} {splitted} {size} {items} />
		<Accordion variant="card" {oneAtATime} {splitted} {size} {items} />
		<Accordion variant="outlined" {oneAtATime} {splitted} {size} {items} />
	</div>
</ComponentCard>
<ComponentCard title="Accordion Classic" class="flex !items-start ">
	<div class="my-10 grid w-[800px] grid-cols-3 gap-10">
		<Accordion variant="classic" splitted={false} {size} {items} {oneAtATime} />
		<Accordion variant="card" splitted={false} {size} {items} {oneAtATime} />
		<Accordion variant="outlined" splitted={false} {size} {items} {oneAtATime} />
	</div>
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
