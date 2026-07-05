<script lang="ts">
	import { PageShell, type PageShellAction } from '$lib/components/PageShell/index.js';
	import { arrowClockwiseIcon } from '$lib/components/Icons/arrowClockwise.js';
	import { downloadSimpleIcon } from '$lib/components/Icons/downloadSimple.js';

	const headerActions = [
		{
			label: 'Refresh insights',
			squared: true,
			variant: 'outline',
			prefix: arrowClockwiseIcon
		},
		{
			content: 'Export',
			color: 'primary',
			prefix: downloadSimpleIcon
		}
	] satisfies PageShellAction[];
</script>

<div class="h-[460px] w-full overflow-hidden rounded-lg border border-background-muted">
	<PageShell
		title="Insights"
		subtitle="Sticky header, scrollable content, and sticky footer"
		{headerActions}
		contentPadding="normal"
		contentWidth="wide"
	>
		{#snippet footer()}
			<span>Updated just now</span>
			<span class="font-medium text-primary">All systems healthy</span>
		{/snippet}

		{#snippet children()}
			<div class="grid gap-4 lg:grid-cols-3">
				{#each ['Revenue', 'Activation', 'Retention'] as metric, index}
					<section class="rounded-lg border border-background-muted bg-background-light p-4">
						<p class="text-sm font-medium text-foreground/60">{metric}</p>
						<p class="mt-3 text-3xl font-semibold text-foreground">{[84, 67, 91][index]}%</p>
						<p class="mt-2 text-sm text-foreground/60">Compared with the previous 30 days.</p>
					</section>
				{/each}

				<section
					class="rounded-lg border border-background-muted bg-background-light p-4 lg:col-span-3"
				>
					<p class="text-sm font-medium text-foreground">Activity feed</p>
					<div class="mt-4 grid gap-3">
						{#each ['Pipeline refreshed', 'Segment imported', 'Forecast recalculated', 'Report queued', 'Notebook synced'] as event}
							<div class="flex items-center justify-between rounded-md bg-background px-3 py-2">
								<span class="text-sm text-foreground">{event}</span>
								<span class="text-xs text-foreground/50">now</span>
							</div>
						{/each}
					</div>
				</section>
			</div>
		{/snippet}
	</PageShell>
</div>
