<script lang="ts">
	import { setPageShell } from '$lib/components/PageShell/index.js';
	import { arrowClockwiseIcon } from '$lib/components/Icons/arrowClockwise.js';

	setPageShell({
		title: 'Revenue insights',
		subtitle: 'Child page content injected this header and footer',
		headerActions,
		footer
	});
</script>

{#snippet headerActions()}
	<button
		type="button"
		class="border-background-muted hover:bg-background-muted inline-flex h-8 items-center gap-2 rounded-md border px-3 text-sm font-medium text-foreground"
	>
		{@render arrowClockwiseIcon({ class: 'size-4' })}
		Refresh
	</button>
{/snippet}

{#snippet footer()}
	<span>Route footer</span>
	<span class="font-medium text-primary">Synced 2 minutes ago</span>
{/snippet}

<div class="grid gap-4 p-4 md:grid-cols-2">
	<section class="rounded-lg border border-background-muted bg-background-light p-4">
		<p class="text-sm font-medium text-primary">Net revenue</p>
		<p class="mt-3 text-3xl font-semibold text-foreground">$128.4k</p>
		<p class="mt-2 text-sm text-foreground/60">The child page sets the shell title and footer.</p>
	</section>
	<section class="rounded-lg border border-background-muted bg-background-light p-4">
		<p class="text-sm font-medium text-primary">Expansion</p>
		<p class="mt-3 text-3xl font-semibold text-foreground">18.2%</p>
		<p class="mt-2 text-sm text-foreground/60">Cleanup happens automatically on destroy.</p>
	</section>
</div>
