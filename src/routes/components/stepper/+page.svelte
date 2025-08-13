<script lang="ts">
	import Stepper from '$lib/components/Stepper/Stepper.svelte';
	import ComponentCard from '../../ComponentCard.svelte';

	let items = $state([
		{
			title: 'hello',
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			icon: 'chevron'
			// render: step1
		},
		{
			title: 'hello',
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			icon: 'chevron'
			// render: step2
		},
		{
			title: 'hello',
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			icon: 'chevron'
			// render: step3
		}
	]);
</script>

<ComponentCard title="Accordion Classic" class="flex !items-start ">
	<div class="bg-success-muted my-10 grid w-[800px] gap-10">
		<Stepper {items} class="bg-warning-muted w-full">
			{#snippet step1({ stepper })}
				<div class="bg-danger-muted h-[200px] p-10">
					<h1>1</h1>
					<button onclick={stepper.next}>next</button>
				</div>
			{/snippet}
			{#snippet step2({ stepper })}
				<div class="bg-primary-muted h-[300px] p-10">
					<h1>2</h1>
					<button onclick={stepper.next}>next</button>
					<button onclick={stepper.previous}>previous</button>
				</div>
			{/snippet}
			{#snippet step3({ stepper })}
				<div class="bg-success-muted h-[400px] p-10">
					<h1>3</h1>
					<button onclick={stepper.previous}>previous</button>
				</div>
			{/snippet}
		</Stepper>
	</div>
</ComponentCard>
