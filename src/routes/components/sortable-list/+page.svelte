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
	let indicatorTasks = $state(makeTasks());
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

	// Two lists in the same group: rows drag freely between them.
	let today = $state<Task[]>([
		{ id: 'standup', label: 'Team standup' },
		{ id: 'fix-login', label: 'Fix the login redirect' },
		{ id: 'review-pr', label: 'Review the theme PR' }
	]);
	let tomorrow = $state<Task[]>([
		{ id: 'write-docs', label: 'Write the release docs' },
		{ id: 'plan-sprint', label: 'Plan the next sprint' }
	]);
	let lastCrossMove = $state('');

	// Orientation examples
	let queue = $state(['Intro', 'Verse', 'Chorus', 'Bridge', 'Outro']);
	let tiles = $state(
		Array.from({ length: 10 }, (_, i) => ({ id: `t${i + 1}`, label: `Tile ${i + 1}` }))
	);
</script>

<DocPage
	title="Sortable list"
	subtitle="A vertical list whose items reorder by drag and drop, animated by default."
	component="SortableList"
	features={[
		'Live placeholder preview or insertion-line feedback',
		'Full-row or handle-only drag via a single prop',
		'State updates once, at drop — the preview is render-only',
		'Custom item and handle content via snippets',
		'Generic over the item type, built on the useDndList utility'
	]}
>
	<ComponentCard
		title="Live preview or indicator"
		description="Choose animated displacement for spatial feedback, or keep every row stable and mark the insertion edge with a line."
		code={`<SortableList bind:items={previewItems} />
<SortableList bind:items={indicatorItems} indicator />`}
	>
		<div class="grid w-full max-w-3xl gap-6 md:grid-cols-2">
			<section class="min-w-0">
				<div class="mb-3">
					<h3 class="text-foreground font-medium">Live preview</h3>
					<p class="text-foreground-muted mt-1 text-sm">Rows part around the prospective slot.</p>
				</div>
				<SortableList bind:items={basic} />
			</section>

			<section class="min-w-0">
				<div class="mb-3">
					<h3 class="text-foreground font-medium">Indicator line</h3>
					<p class="text-foreground-muted mt-1 text-sm">Rows remain fixed until drop.</p>
				</div>
				<SortableList bind:items={indicatorTasks} indicator />
			</section>
		</div>
	</ComponentCard>

	{#snippet examples()}
		<!-- Example 1: Handle-only drag -->
		<ComponentCard
			description="With handle, only the grip initiates the drag"
			code={`<SortableList bind:items handle />`}
		>
			<SortableList bind:items={handleTasks} handle class="w-full max-w-md" />
		</ComponentCard>

		<!-- Example 2: Cross-list group -->
		<ComponentCard
			description="Lists sharing a group accept each other's rows — drag between Today and Tomorrow. Both bound arrays update at drop; onReceive/onRemove report the move."
			code={`<SortableList bind:items={today} group="planner" name="today" empty="Drop tasks here" />
<SortableList bind:items={tomorrow} group="planner" name="tomorrow" empty="Drop tasks here" />`}
		>
			<div class="flex w-full max-w-2xl flex-col gap-3">
				<div class="grid gap-6 sm:grid-cols-2">
					<div class="flex flex-col gap-2">
						<span class="text-foreground/70 text-sm font-medium">Today ({today.length})</span>
						<SortableList
							bind:items={today}
							group="planner"
							name="today"
							empty="Nothing planned — drop tasks here"
							onReceive={({ item, from }) =>
								(lastCrossMove = `"${item.label}" ← ${from.list} #${from.index}`)}
						/>
					</div>
					<div class="flex flex-col gap-2">
						<span class="text-foreground/70 text-sm font-medium">Tomorrow ({tomorrow.length})</span>
						<SortableList
							bind:items={tomorrow}
							group="planner"
							name="tomorrow"
							empty="Nothing planned — drop tasks here"
							onReceive={({ item, from }) =>
								(lastCrossMove = `"${item.label}" ← ${from.list} #${from.index}`)}
						/>
					</div>
				</div>
				<p class="text-foreground-muted text-xs">
					{lastCrossMove || 'Drag a task into the other list to see onReceive.'}
				</p>
			</div>
		</ComponentCard>

		<!-- Orientations -->
		<ComponentCard
			description="orientation='horizontal' lays rows in a line; before/after resolves on the horizontal axis"
			code={`<SortableList bind:items orientation="horizontal" size="small" />`}
		>
			<SortableList
				bind:items={queue}
				orientation="horizontal"
				size="small"
				class="w-full max-w-xl"
			/>
		</ComponentCard>

		<ComponentCard
			description="orientation='grid' wraps rows — drag across lines, the drop math follows the logical order. Override the root theme for a real CSS grid."
			code={`<SortableList bind:items orientation="grid" size="small" />`}
		>
			<SortableList bind:items={tiles} orientation="grid" size="small" class="w-full max-w-sm">
				{#snippet item({ item })}
					<span class="w-16 px-1 text-center">{item.label}</span>
				{/snippet}
			</SortableList>
		</ComponentCard>

		<!-- Example 3: Custom item snippet (rich rows) -->
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
