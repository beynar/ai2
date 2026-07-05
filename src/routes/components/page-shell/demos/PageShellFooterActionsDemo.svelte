<script lang="ts">
	import { PageShell, type PageShellAction } from '$lib/components/PageShell/index.js';
	import { checkIcon } from '$lib/components/Icons/check.js';
	import { xIcon } from '$lib/components/Icons/x.js';

	const footerActions = [
		{ content: 'Cancel', variant: 'outline', prefix: xIcon },
		{ content: 'Save changes', color: 'primary', prefix: checkIcon }
	] satisfies PageShellAction[];
</script>

<div class="h-[420px] w-full overflow-hidden rounded-lg border border-background-muted">
	<PageShell
		eyebrow="Settings"
		title="Billing profile"
		subtitle="Footer actions stay visible while the form scrolls."
		{footerActions}
		contentPadding="normal"
		contentWidth="narrow"
	>
		{#snippet footer()}
			<span>2 unsaved changes</span>
		{/snippet}

		{#snippet children()}
			<div class="grid gap-3">
				{#each ['Company name', 'Billing email', 'VAT number', 'Address', 'Invoice notes', 'Purchase order'] as field}
					<div class="grid gap-1 rounded-lg border border-background-muted bg-background-light p-3">
						<span class="text-sm font-medium text-foreground">{field}</span>
						<span class="h-9 rounded-md border border-background-muted bg-background"></span>
					</div>
				{/each}
			</div>
		{/snippet}
	</PageShell>
</div>
