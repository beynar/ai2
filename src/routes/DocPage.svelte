<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Tabbar } from '$lib/components/Tabbar/index.js';
	import PropsTable from './PropsTable.svelte';
	import StructureSchema from './StructureSchema.svelte';
	import ThemeSchema from './ThemeSchema.svelte';

	let {
		title,
		subtitle,
		component,
		features,
		children,
		examples
	}: {
		title: string;
		subtitle?: string;
		/** Component key for the props table + structure schema (e.g. "Button"). */
		component?: string;
		/** 2-6 highlights: accessibility, underlying library, ergonomics. */
		features?: string[];
		/** Usage tab: a simple demo of the component. */
		children: Snippet;
		/** Examples tab: every meaningful variation. */
		examples?: Snippet;
	} = $props();

	const tabs = ['Usage', 'Examples', 'Structure'];
	let activeTab = $state(0);
</script>

<article class="mx-auto w-full max-w-6xl">
	<header class="mb-6">
		<h1 class="text-foreground text-3xl font-bold tracking-tight">{title}</h1>
		{#if subtitle}
			<p class="text-foreground/70 mt-2 text-base">{subtitle}</p>
		{/if}
	</header>

	{#if features && features.length}
		<ul class="mb-8 flex flex-wrap gap-2">
			{#each features as feature (feature)}
				<li
					class="border-background-muted bg-background text-foreground/80 inline-flex items-center gap-1.5 rounded-full border py-1 pr-3 pl-2 text-xs"
				>
					<svg
						class="text-primary size-3.5 shrink-0"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 0 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
							clip-rule="evenodd"
						/>
					</svg>
					{feature}
				</li>
			{/each}
		</ul>
	{/if}

	<Tabbar items={tabs} bind:activeTab />

	<div class="mt-8">
		{#if activeTab === 0}
			<div class="grid gap-10">
				{@render children()}
			</div>
			{#if component}
				<PropsTable {component} />
			{/if}
		{:else if activeTab === 1}
			{#if examples}
				<div class="grid gap-10">
					{@render examples()}
				</div>
			{:else}
				<p class="text-foreground/60 text-sm">No examples yet for this component.</p>
			{/if}
		{:else if component}
			<div class="grid gap-8">
				<StructureSchema {component} />
				<ThemeSchema {component} />
			</div>
		{:else}
			<p class="text-foreground/60 text-sm">No structural schema for this component.</p>
		{/if}
	</div>
</article>
