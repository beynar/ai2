<script lang="ts">
	import { PageShell, type PageShellAction } from '$lib/components/PageShell/index.js';
	import { arrowClockwiseIcon } from '$lib/components/Icons/arrowClockwise.js';
	import { downloadSimpleIcon } from '$lib/components/Icons/downloadSimple.js';
	import { funnelIcon } from '$lib/components/Icons/funnel.js';
	import { plusIcon } from '$lib/components/Icons/plus.js';

	const headerActions = [
		{ label: 'Refresh', squared: true, variant: 'outline', prefix: arrowClockwiseIcon },
		{ content: 'Filter', variant: 'outline', prefix: funnelIcon },
		{ content: 'Export', variant: 'outline', prefix: downloadSimpleIcon },
		{ content: 'Create', color: 'primary', prefix: plusIcon }
	] satisfies PageShellAction[];
</script>

<div class="h-[420px] w-full max-w-[390px] overflow-auto rounded-lg border border-background-muted">
	<PageShell
		title="Reports"
		subtitle="Mobile overflow keeps dense action rows usable."
		{headerActions}
		mobileActionCount={1}
		contentPadding="normal"
	>
		{#snippet children()}
			<div class="grid gap-3">
				{#each ['MRR by segment', 'Activation by cohort', 'Churn forecast'] as report}
					<section class="rounded-lg border border-background-muted bg-background-light p-4">
						<p class="text-sm font-medium text-foreground">{report}</p>
						<p class="mt-2 text-sm text-foreground/60">Ready to export.</p>
					</section>
				{/each}
			</div>
		{/snippet}
	</PageShell>
</div>
