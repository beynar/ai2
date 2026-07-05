<script lang="ts">
	import Collapsible from '$lib/components/Collapsible/Collapsible.svelte';
	import { sizes } from '$lib/utils/tokens.js';
	import { caretUpDownIcon } from '$lib/components/Icons/caretUpDown.js';
	import ComponentCard from '../../ComponentCard.svelte';
	import DocPage from '../../DocPage.svelte';

	let controlledOpen = false;
	let shadcnOpen = false;
</script>

<DocPage
	title="Collapsible"
	subtitle="Toggles the visibility of a single content region."
	component="Collapsible"
	features={[
		'bind:open — controlled or uncontrolled',
		'aria-expanded and aria-controls on trigger',
		'Slide transition on open/close',
		'onOpenChange callback'
	]}
>
	<ComponentCard
		description="Chevron icon trigger with slide transition."
		code={`<Collapsible icon="chevron">
	{#snippet trigger()}
		<span>Click to expand</span>
	{/snippet}

	<p>This content will be shown when expanded. It uses Svelte's slide transition.</p>
</Collapsible>`}
	>
		<Collapsible icon="chevron">
			{#snippet trigger()}
				<span>Click to expand</span>
			{/snippet}

			<p>This content will be shown when expanded. It uses Svelte's slide transition.</p>
		</Collapsible>
	</ComponentCard>

	{#snippet examples()}
		<ComponentCard description="Shadcn-style collapsible with string trigger prop.">
			<Collapsible
				bind:open={shadcnOpen}
				onOpenChange={(open) => (shadcnOpen = open)}
				class="w-[350px]"
				trigger="@peduarte starred 3 repositories"
			>
				<div class="flex flex-col gap-2">
					<div class="border-background-muted rounded-md border px-4 py-2 font-mono text-sm">
						@radix-ui/colors
					</div>
					<div class="border-background-muted rounded-md border px-4 py-2 font-mono text-sm">
						@stitches/react
					</div>
				</div>
			</Collapsible>
		</ComponentCard>

		<ComponentCard description="Basic collapsible with chevron icon.">
			<Collapsible icon="chevron">
				{#snippet trigger()}
					<span>Click to expand</span>
				{/snippet}

				<p>This content will be shown when expanded. It uses Svelte's slide transition.</p>
			</Collapsible>
		</ComponentCard>

		<ComponentCard description="Controlled collapsible with external toggle button.">
			<div class="flex flex-col gap-4">
				<Collapsible bind:open={controlledOpen} onOpenChange={(open) => console.log('State:', open)}>
					{#snippet trigger()}
						<div class="flex w-full items-center justify-between">
							<span>Toggle (Currently: {controlledOpen ? 'Open' : 'Closed'})</span>
						</div>
					{/snippet}

					<p>This collapsible is controlled by external state.</p>
					<p>Current state: {controlledOpen ? 'Open' : 'Closed'}</p>
				</Collapsible>
				<button
					class="bg-primary text-primary-contrast rounded px-4 py-2"
					onclick={() => (controlledOpen = !controlledOpen)}
				>
					Toggle from outside
				</button>
			</div>
		</ComponentCard>

		<ComponentCard description="Collapsible with children slot.">
			<Collapsible>
				{#snippet trigger()}
					<span>Show Details</span>
				{/snippet}

				<p>This uses the children slot instead of content.</p>
				<ul class="list-disc pl-6">
					<li>Item 1</li>
					<li>Item 2</li>
					<li>Item 3</li>
				</ul>
			</Collapsible>
		</ComponentCard>

		<ComponentCard description="Disabled collapsible.">
			<Collapsible disabled={true} icon="chevron">
				{#snippet trigger()}
					<span>Disabled Collapsible</span>
				{/snippet}

				<p>This content cannot be toggled.</p>
			</Collapsible>
		</ComponentCard>

		<ComponentCard description="Different sizes.">
			<div class="flex flex-col gap-4">
				{#each sizes as size}
					<Collapsible {size}>
						{#snippet trigger()}
							<div class="flex w-full items-center justify-between">
								<span>{size} Collapsible</span>
								<svg
									class="h-4 w-4"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m19.5 8.25-7.5 7.5-7.5-7.5"
									/>
								</svg>
							</div>
						{/snippet}

						<p>This is a {size} size collapsible.</p>
					</Collapsible>
				{/each}
			</div>
		</ComponentCard>

		<ComponentCard description="Multiple independent collapsibles.">
			<div class="flex flex-col gap-2">
				<Collapsible>
					{#snippet trigger()}
						<div class="flex w-full items-center justify-between">
							<span>Section 1</span>
							<svg
								class="h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
							</svg>
						</div>
					{/snippet}

					<p>Content for section 1</p>
				</Collapsible>
				<Collapsible>
					{#snippet trigger()}
						<div class="flex w-full items-center justify-between">
							<span>Section 2</span>
							<svg
								class="h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
							</svg>
						</div>
					{/snippet}

					<p>Content for section 2</p>
				</Collapsible>
				<Collapsible>
					{#snippet trigger()}
						<div class="flex w-full items-center justify-between">
							<span>Section 3</span>
							<svg
								class="h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
							</svg>
						</div>
					{/snippet}

					<p>Content for section 3</p>
				</Collapsible>
			</div>
		</ComponentCard>

		<ComponentCard description="Default open state.">
			<Collapsible defaultOpen={true}>
				{#snippet trigger()}
					<div class="flex w-full items-center justify-between">
						<span>This starts open</span>
						<svg
							class="h-4 w-4"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
						</svg>
					</div>
				{/snippet}

				<p>This collapsible starts in the open state.</p>
			</Collapsible>
		</ComponentCard>

		<ComponentCard description="Rich content in trigger and panel.">
			<Collapsible>
				{#snippet trigger()}
					<div class="flex w-full items-center justify-between">
						<div class="flex flex-col items-start">
							<span class="font-semibold">FAQ Item</span>
							<span class="text-foreground-muted text-sm">Click to see the answer</span>
						</div>
						<svg
							class="h-4 w-4"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
						</svg>
					</div>
				{/snippet}

				<div class="flex flex-col gap-2">
					<p>This is a detailed answer to the question.</p>
					<p>It can contain multiple paragraphs and other content.</p>
					<ul class="list-disc pl-6">
						<li>Point 1</li>
						<li>Point 2</li>
						<li>Point 3</li>
					</ul>
				</div>
			</Collapsible>
		</ComponentCard>
	{/snippet}
</DocPage>
