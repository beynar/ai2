<script lang="ts">
	import type { BreadcrumbItem } from '$lib/components/Breadcrumbs/index.js';
	import { PageShell, type PageShellAction } from '$lib/components/PageShell/index.js';
	import { arrowClockwiseIcon } from '$lib/components/Icons/arrowClockwise.js';
	import { usersIcon } from '$lib/components/Icons/users.js';

	const breadcrumbs: BreadcrumbItem[] = [
		{ label: 'Customers', href: '#customers' },
		{ label: 'Accounts', href: '#accounts' },
		{ label: 'Acme Group', active: true }
	];

	const headerActions = [
		{ content: 'Refresh', variant: 'outline', prefix: arrowClockwiseIcon },
		{ content: 'Invite', color: 'primary', prefix: usersIcon }
	] satisfies PageShellAction[];
</script>

<div class="h-[420px] w-full overflow-hidden rounded-lg border border-background-muted">
	<PageShell
		title="Acme Group"
		subtitle="Enterprise account"
		{breadcrumbs}
		back={{ href: '#accounts' }}
		{headerActions}
		contentPadding="normal"
		contentWidth="normal"
	>
		{#snippet children()}
			<section class="rounded-lg border border-background-muted bg-background-light p-5">
				<p class="text-sm font-medium text-foreground">Header chrome</p>
				<p class="mt-2 text-sm text-foreground/60">
					Breadcrumbs take precedence over eyebrow text and the back affordance uses a default
					arrow.
				</p>
			</section>
		{/snippet}
	</PageShell>
</div>
