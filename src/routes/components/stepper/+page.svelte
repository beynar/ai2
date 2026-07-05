<script lang="ts">
	import Stepper from '$lib/components/Stepper/Stepper.svelte';
	import { onMount } from 'svelte';
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import Popover from '$lib/components/Popover/Popover.svelte';

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
		},
		{
			title: 'hello',
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			icon: 'chevron'
			// render: step4
		},
		{
			title: 'hello',
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			icon: 'chevron'
			// render: step5
		},
		{
			title: 'hello',
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			icon: 'chevron'
			// render: step6
		},
		{
			title: 'hello',
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			icon: 'chevron'
			// render: step7
		},
		{
			title: 'hello',
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			icon: 'chevron'
			// render: step8
		},
		{
			title: 'hello',
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			icon: 'chevron'
			// render: step9
		},
		{
			title: 'hello',
			description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
			icon: 'chevron'
			// render: step10
		}
	]);

	let stepper = $state<any>();
</script>

<DocPage
	title="Stepper"
	subtitle="Indicates progress through a sequence of steps."
	component="Stepper"
	features={[
		'Bindable activeStep and stepper state',
		'tabpanel with inert inactive steps',
		'Animated height and horizontal slide',
		'Per-step snippet slots'
	]}
>
	<ComponentCard
		description="Three-step flow with next and previous controls."
		class="max-w-md"
		code={`<Stepper bind:stepper items={[
	{ title: 'Step 1', description: 'First step', content: 'First step', icon: 'chevron' },
	{ title: 'Step 2', description: 'Second step', content: 'Second step', icon: 'chevron' },
	{ title: 'Step 3', description: 'Third step', content: 'Third step', icon: 'chevron' }
]} class="w-full max-w-md">
	{#snippet step1({ stepper })}
		<div class="p-4">
			<p class="mb-2">Step 1</p>
			<button onclick={stepper.next}>Next</button>
		</div>
	{/snippet}
	{#snippet step2({ stepper })}
		<div class="p-4">
			<p class="mb-2">Step 2</p>
			<button onclick={stepper.previous}>Previous</button>
			<button onclick={stepper.next}>Next</button>
		</div>
	{/snippet}
	{#snippet step3({ stepper })}
		<div class="p-4">
			<p class="mb-2">Step 3</p>
			<button onclick={stepper.previous}>Previous</button>
		</div>
	{/snippet}
</Stepper>`}
	>
		<Stepper bind:stepper items={items.slice(0, 3)} class="w-full max-w-md">
			{#snippet step1({ stepper })}
				<div class="p-4">
					<p class="mb-2">Step 1</p>
					<button onclick={stepper.next}>Next</button>
				</div>
			{/snippet}
			{#snippet step2({ stepper })}
				<div class="p-4">
					<p class="mb-2">Step 2</p>
					<button onclick={stepper.previous}>Previous</button>
					<button onclick={stepper.next}>Next</button>
				</div>
			{/snippet}
			{#snippet step3({ stepper })}
				<div class="p-4">
					<p class="mb-2">Step 3</p>
					<button onclick={stepper.previous}>Previous</button>
				</div>
			{/snippet}
		</Stepper>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard class="!items-start">
			<div class="bg-success-muted my-10 grid w-[800px] gap-10 transition-all duration-300">
				<Stepper bind:stepper {items} class="bg-warning-muted w-full">
					{#snippet step1({ stepper })}
						<div class="bg-danger h-[200px] p-10">
							<h1>1</h1>
							<button onclick={stepper.next}>next</button>
							<Popover class="bg-danger-muted max-w-[10000px]">
								{#snippet children()}
									<div>
										<h1>Hello</h1>
										<p>Hello</p>
									</div>
								{/snippet}
								{#snippet trigger(popover)}
									<button {@attach popover.reference} onclick={() => popover.open()}>popover</button>
								{/snippet}
							</Popover>
						</div>
					{/snippet}
					{#snippet step2({ stepper })}
						<div class="bg-primary h-[300px] p-10">
							<h1>2</h1>
							<button onclick={stepper.next}>next</button>
							<button onclick={stepper.previous}>previous</button>
						</div>
					{/snippet}
					{#snippet step3({ stepper })}
						<div class="bg-success h-[400px] p-10">
							<h1>3</h1>
							<button onclick={stepper.next}>next</button>
							<button onclick={stepper.previous}>previous</button>
						</div>
					{/snippet}
					{#snippet step4({ stepper })}
						<div class="bg-info h-[250px] p-10">
							<h1>4</h1>
							<button onclick={stepper.next}>next</button>
							<button onclick={stepper.previous}>previous</button>
						</div>
					{/snippet}
					{#snippet step5({ stepper })}
						<div class="bg-warning h-[350px] p-10">
							<h1>5</h1>
							<button onclick={stepper.next}>next</button>
							<button onclick={stepper.previous}>previous</button>
						</div>
					{/snippet}
					{#snippet step6({ stepper })}
						<div class="bg-danger-muted h-[280px] p-10">
							<h1>6</h1>
							<button onclick={stepper.next}>next</button>
							<button onclick={stepper.previous}>previous</button>
						</div>
					{/snippet}
					{#snippet step7({ stepper })}
						<div class="bg-primary-muted h-[320px] p-10">
							<h1>7</h1>
							<button onclick={stepper.next}>next</button>
							<button onclick={stepper.previous}>previous</button>
						</div>
					{/snippet}
					{#snippet step8({ stepper })}
						<div class="bg-success-muted h-[290px] p-10">
							<h1>8</h1>
							<button onclick={stepper.next}>next</button>
							<button onclick={stepper.previous}>previous</button>
						</div>
					{/snippet}
					{#snippet step9({ stepper })}
						<div class="bg-info-muted h-[310px] p-10">
							<h1>9</h1>
							<button onclick={stepper.next}>next</button>
							<button onclick={stepper.previous}>previous</button>
						</div>
					{/snippet}
					{#snippet step10({ stepper })}
						<div class="bg-warning-muted h-[270px] p-10">
							<h1>10</h1>
							<button onclick={stepper.previous}>previous</button>
						</div>
					{/snippet}
				</Stepper>
			</div>
		</ComponentCard>
		<!-- <ComponentCard title="Iframe" class="flex !items-start ">
			<div class="bg-success-muted my-10 grid w-[800px] gap-10">
				<iframe src="/components/stepper" class="h-[400px] w-full"></iframe>
			</div>
		</ComponentCard> -->
	{/snippet}
</DocPage>
