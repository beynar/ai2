<script lang="ts">
	import Accordion from '$lib/components/Accordion/Accordion.svelte';
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
		}
	]);
	let size = $state<'normal'>('normal');
	let variant = $state<'classic' | 'card' | 'outlined'>('card');
	let oneAtATime = $state<boolean>(true);
	let splitted = $state(true);
</script>

<DocPage
	title="Accordion"
	subtitle="Vertically stacked sections that expand and collapse to reveal their content."
	component="Accordion"
	features={[
		'Built on Melt Accordion builder',
		'Slide transition on expand/collapse',
		'oneAtATime or multi-panel open',
		'Collapsed content kept in sr-only span'
	]}
>
	<ComponentCard
		description="Interactive accordion driven by the controls in Examples."
		code={`<Accordion
	variant="card"
	size="normal"
	oneAtATime
	splitted
	items={[
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
		}
	]}
/>`}
	>
		<div class="w-[300px]">
			<Accordion {variant} {oneAtATime} {splitted} {size} {items} />
		</div>
	</ComponentCard>

	{#snippet examples()}
		<select
			name="size"
			bind:value={size}
			class="bg-background-light raised text-foreground text-sms rounded p-2"
		>
			<option value="normal">normal</option>
			<option value="small">small</option>
			<option value="large">large</option>
		</select>

		<select
			name="variant"
			bind:value={variant}
			class="bg-background-light raised text-foreground text-sms rounded p-2"
		>
			<option value="classic">classic</option>
			<option value="card">card</option>
			<option value="outlined">outlined</option>
		</select>

		<input type="checkbox" id="oneAtATime" bind:checked={oneAtATime} />
		<label for="oneAtATime">oneAtATime</label>

		<input type="checkbox" id="splitted" bind:checked={splitted} />
		<label for="splitted">splitted</label>

		<ComponentCard description="Classic, card, and outlined variants with splitted panels.">
			<div class="my-10 grid w-[800px] grid-cols-3 gap-10">
				<Accordion variant="classic" {oneAtATime} {splitted} {size} {items} />
				<Accordion variant="card" {oneAtATime} {splitted} {size} {items} />
				<Accordion variant="outlined" {oneAtATime} {splitted} {size} {items} />
			</div>
		</ComponentCard>
		<ComponentCard description="Same variants with splitted=false — panels share a single container.">
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
	{/snippet}
</DocPage>
