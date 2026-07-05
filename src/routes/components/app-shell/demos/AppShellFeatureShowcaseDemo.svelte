<script lang="ts">
	import {
		AppShell,
		type AppShellActions,
		type AppShellSidebarProps
	} from '$lib/components/AppShell/index.js';
	import type { BreadcrumbItem } from '$lib/components/Breadcrumbs/index.js';
	import type { SidebarGroup, SidebarThemeProps } from '$lib/components/Sidebar/index.js';
	import { arrowClockwiseIcon } from '$lib/components/Icons/arrowClockwise.js';
	import { chartBarIcon } from '$lib/components/Icons/chartBar.js';
	import { checkIcon } from '$lib/components/Icons/check.js';
	import { commandIcon } from '$lib/components/Icons/command.js';
	import { downloadSimpleIcon } from '$lib/components/Icons/downloadSimple.js';
	import { funnelIcon } from '$lib/components/Icons/funnel.js';
	import { gearIcon } from '$lib/components/Icons/gear.js';
	import { houseIcon } from '$lib/components/Icons/house.js';
	import { plusIcon } from '$lib/components/Icons/plus.js';
	import { trayIcon } from '$lib/components/Icons/tray.js';
	import { usersIcon } from '$lib/components/Icons/users.js';
	import { xIcon } from '$lib/components/Icons/x.js';

	let contextMode = $state<'breadcrumbs' | 'eyebrow'>('breadcrumbs');

	const previewSidebarTheme = {
		root: { base: 'h-full !min-h-0 overflow-hidden rounded-lg border border-background-muted' },
		container: { base: '!absolute !inset-y-0 !h-full' },
		gap: { base: 'h-full shrink-0' },
		inset: { base: 'min-w-0' }
	} satisfies SidebarThemeProps;

	const items: SidebarGroup[] = [
		{
			label: 'Workspace',
			items: [
				{ label: 'Overview', href: '#overview', icon: houseIcon },
				{ label: 'Reports', href: '#reports', icon: chartBarIcon, isActive: true },
				{ label: 'Customers', href: '#customers', icon: usersIcon, badge: 18 },
				{ label: 'Inbox', href: '#inbox', icon: trayIcon, badge: 4 },
				{ label: 'Settings', href: '#settings', icon: gearIcon }
			]
		}
	];

	const breadcrumbs: BreadcrumbItem[] = [
		{ label: 'Workspace', href: '#workspace' },
		{ label: 'Reports', href: '#reports' },
		{ label: 'Customer intelligence', active: true }
	];

	const headerActions = [
		{ label: 'Refresh', squared: true, variant: 'outline', prefix: arrowClockwiseIcon },
		{ content: 'Filter', variant: 'outline', prefix: funnelIcon },
		{ content: 'Export', variant: 'outline', prefix: downloadSimpleIcon },
		{ content: 'Create', color: 'primary', prefix: plusIcon }
	] satisfies AppShellActions;

	const footerActions = [
		{ content: 'Discard', variant: 'outline', prefix: xIcon },
		{ content: 'Publish', color: 'primary', prefix: checkIcon }
	] satisfies AppShellActions;

	const sidebar: AppShellSidebarProps = {
		items,
		collapsible: 'icon',
		variant: 'inset',
		rail: true,
		width: '16rem',
		widthIcon: '3.5rem',
		theme: previewSidebarTheme,
		headerButton: {
			icon: commandIcon,
			title: 'Acme Ops',
			subtitle: 'Command center'
		}
	};

	const metrics = [
		{ label: 'Accounts watched', value: '184', detail: '+12 this week' },
		{ label: 'Expansion signal', value: '72%', detail: '9 points above target' },
		{ label: 'Open risks', value: '11', detail: '3 need owner review' }
	];

	const activities = [
		'Northstar renewed with a larger support plan.',
		'Mercury Health crossed the usage threshold for expansion.',
		'Rivet Labs needs procurement confirmation before Friday.',
		'Falcon Works has three unresolved onboarding tickets.',
		'Lakehouse requested a security review for the new region.',
		'Atlas Studio moved from trial to implementation.',
		'Orbit Foods asked for updated invoice contacts.',
		'Vertex Group completed the quarterly business review.'
	];
</script>

<div class="h-[620px] w-full">
	<AppShell
		{sidebar}
		title="Customer intelligence"
		subtitle="A production-style shell with persistent navigation, sticky chrome, and responsive actions."
		breadcrumbs={contextMode === 'breadcrumbs' ? breadcrumbs : undefined}
		breadcrumbsMaxItems={2}
		eyebrow={contextMode === 'eyebrow' ? 'Customer health' : undefined}
		back={{ href: '#reports' }}
		{headerActions}
		{footerActions}
		contentPadding="normal"
		contentWidth="wide"
		mobileActionCount={1}
		pageShellClass="h-full"
		theme={{ root: { base: 'h-full !min-h-0 overflow-hidden' } }}
	>
		{#snippet footer()}
			<span>Draft saved 14:32</span>
		{/snippet}

		{#snippet children()}
			<div class="grid gap-5">
				<section
					class="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-background-muted bg-background-light p-4"
				>
					<div>
						<p class="text-sm font-medium text-foreground">Header context</p>
						<p class="mt-1 text-sm text-foreground/60">
							Swap between collapsed breadcrumbs and an eyebrow without replacing the header.
						</p>
					</div>

					<div class="inline-flex rounded-md border border-background-muted bg-background p-1">
						<button
							type="button"
							class="rounded px-3 py-1.5 text-sm font-medium transition {contextMode ===
							'breadcrumbs'
								? 'bg-primary text-primary-foreground'
								: 'text-foreground/70 hover:bg-background-light'}"
							aria-pressed={contextMode === 'breadcrumbs'}
							onclick={() => (contextMode = 'breadcrumbs')}
						>
							Breadcrumbs
						</button>
						<button
							type="button"
							class="rounded px-3 py-1.5 text-sm font-medium transition {contextMode === 'eyebrow'
								? 'bg-primary text-primary-foreground'
								: 'text-foreground/70 hover:bg-background-light'}"
							aria-pressed={contextMode === 'eyebrow'}
							onclick={() => (contextMode = 'eyebrow')}
						>
							Eyebrow
						</button>
					</div>
				</section>

				<div class="grid gap-4 md:grid-cols-3">
					{#each metrics as metric}
						<section class="rounded-lg border border-background-muted bg-background-light p-4">
							<p class="text-sm font-medium text-foreground/70">{metric.label}</p>
							<p class="mt-3 text-3xl font-semibold tracking-normal text-foreground">
								{metric.value}
							</p>
							<p class="mt-1 text-sm text-primary">{metric.detail}</p>
						</section>
					{/each}
				</div>

				<section class="rounded-lg border border-background-muted bg-background-light p-4">
					<div class="flex flex-wrap items-center justify-between gap-3">
						<div>
							<p class="text-sm font-medium text-foreground">Pipeline review</p>
							<p class="mt-1 text-sm text-foreground/60">
								Content uses the shell width and padding presets.
							</p>
						</div>
						<span
							class="rounded-full border border-background-muted bg-background px-2.5 py-1 text-xs font-medium text-foreground/70"
						>
							Wide content
						</span>
					</div>

					<div class="mt-4 grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
						<div class="rounded-md border border-background-muted bg-background p-4">
							<p class="text-sm font-medium text-foreground">Priority accounts</p>
							<div class="mt-4 space-y-3">
								{#each ['Mercury Health', 'Northstar', 'Falcon Works'] as account}
									<div class="flex items-center justify-between gap-4">
										<span class="text-sm text-foreground">{account}</span>
										<span class="text-sm font-medium text-primary">Review</span>
									</div>
								{/each}
							</div>
						</div>

						<div class="rounded-md border border-background-muted bg-background p-4">
							<p class="text-sm font-medium text-foreground">Next milestone</p>
							<p class="mt-4 text-sm leading-6 text-foreground/70">
								Confirm owner coverage, then publish the weekly customer-health summary.
							</p>
						</div>
					</div>
				</section>

				<section class="rounded-lg border border-background-muted bg-background-light p-4">
					<p class="text-sm font-medium text-foreground">Recent activity</p>
					<div
						class="mt-4 divide-y divide-background-muted overflow-hidden rounded-md border border-background-muted"
					>
						{#each activities as activity}
							<div class="flex items-start gap-3 bg-background px-4 py-3">
								<span class="mt-2 size-2 shrink-0 rounded-full bg-primary"></span>
								<p class="text-sm leading-6 text-foreground/70">{activity}</p>
							</div>
						{/each}
					</div>
				</section>
			</div>
		{/snippet}
	</AppShell>
</div>
