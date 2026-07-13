<script lang="ts">
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';
	import SortableList from '$lib/components/SortableList/SortableList.svelte';

	type Task = { id: string; label: string };
	type Feature = { id: string; title: string; description: string };

	const makeTasks = (): Task[] => [
		{ id: 'brief', label: 'Write the project brief' },
		{ id: 'design', label: 'Design the mockups' },
		{ id: 'build', label: 'Build the components' },
		{ id: 'review', label: 'Review with the team' },
		{ id: 'ship', label: 'Ship the release' }
	];

	// A separate list per interactive example so reorders don't bleed across cards.
	let basic = $state(makeTasks());
	let handleTasks = $state(makeTasks());
	let sizedTasks = $state(makeTasks());
	let disabledTasks = $state(makeTasks());

	let bound = $state(makeTasks());
	const boundOrder = $derived(bound.map((task) => task.label).join(' → '));

	let features = $state<Feature[]>([
		{ id: 'a11y', title: 'Accessible', description: 'Keyboard sorting and ARIA out of the box' },
		{ id: 'animated', title: 'Animated', description: 'Rows slide out of the way as you drag' },
		{ id: 'generic', title: 'Generic', description: 'Works with any item type' }
	]);
</script>

<DocPage
	title="Sortable list"
	subtitle="A vertical list whose items reorder by drag and drop, animated by default."
	component="SortableList"
	features={[
		'Drag to reorder, with displaced rows animating into place',
		'Full-row or handle-only drag via a single prop',
		'Keyboard sortable (space to pick up, arrows to move)',
		'Custom item and handle content via snippets',
		'Generic over the item type, built on @dnd-kit-svelte'
	]}
>
	<ComponentCard
		description="Drag any row to reorder the list"
		code={`<script lang="ts">
	let items = $state([
		{ id: 'brief', label: 'Write the project brief' },
		{ id: 'design', label: 'Design the mockups' },
		{ id: 'build', label: 'Build the components' }
	]);
<\/script>

<SortableList bind:items />`}
	>
		<SortableList bind:items={basic} class="w-full max-w-md" />
	</ComponentCard>

	{#snippet examples()}
		<!-- Example 1: Handle-only drag -->
		<ComponentCard
			description="With handle, only the grip drags and the row text stays selectable"
			code={`<SortableList bind:items handle />`}
		>
			<SortableList bind:items={handleTasks} handle class="w-full max-w-md" />
		</ComponentCard>

		<!-- Example 2: Custom item snippet (rich rows) -->
		<ComponentCard
			description="Custom row content via the item snippet"
			code={`<SortableList bind:items handle>
	{#snippet item({ item })}
		<div class="flex flex-col">
			<span class="font-medium">{item.title}</span>
			<span class="text-foreground-muted text-sm">{item.description}</span>
		</div>
	{/snippet}
</SortableList>`}
		>
			<SortableList bind:items={features} handle class="w-full max-w-md">
				{#snippet item({ item })}
					<div class="flex flex-col">
						<span class="font-medium">{item.title}</span>
						<span class="text-foreground-muted text-sm">{item.description}</span>
					</div>
				{/snippet}
			</SortableList>
		</ComponentCard>

		<!-- Example 3: Custom handle snippet -->
		<ComponentCard
			description="Custom handle content via the handle snippet"
			code={`<SortableList bind:items>
	{#snippet handle()}
		<span class="text-lg leading-none">⠿</span>
	{/snippet}
</SortableList>`}
		>
			<SortableList bind:items={sizedTasks} class="w-full max-w-md">
				{#snippet handle()}
					<span class="text-lg leading-none">⠿</span>
				{/snippet}
			</SortableList>
		</ComponentCard>

		<!-- Example 4: bind:items with a live order readout -->
		<ComponentCard
			description="Bind items and read the live order"
			code={`<script lang="ts">
	let items = $state([...]);
	const order = $derived(items.map((t) => t.label).join(' → '));
<\/script>

<SortableList bind:items />
<p>{order}</p>`}
		>
			<div class="flex w-full max-w-md flex-col gap-3">
				<SortableList bind:items={bound} />
				<p class="text-foreground-muted text-sm">{boundOrder}</p>
			</div>
		</ComponentCard>

		<!-- Example 5: Sizes -->
		<ComponentCard
			description="Small, normal and large sizes"
			code={`<SortableList bind:items size="small" />
<SortableList bind:items size="normal" />
<SortableList bind:items size="large" />`}
		>
			<div class="grid w-full max-w-3xl gap-6 sm:grid-cols-3">
				<SortableList items={makeTasks().slice(0, 3)} size="small" />
				<SortableList items={makeTasks().slice(0, 3)} size="normal" />
				<SortableList items={makeTasks().slice(0, 3)} size="large" />
			</div>
		</ComponentCard>

		<!-- Example 6: Disabled -->
		<ComponentCard
			description="Disabled renders the rows but blocks reordering"
			code={`<SortableList bind:items disabled />`}
		>
			<SortableList bind:items={disabledTasks} disabled class="w-full max-w-md" />
		</ComponentCard>
	{/snippet}
</DocPage>
