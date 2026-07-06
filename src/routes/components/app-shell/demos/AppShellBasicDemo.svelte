<script lang="ts">
	import { AppShell, type AppShellSidebarProps } from '$lib/components/AppShell/index.js';
	import type { SidebarGroup } from '$lib/components/Sidebar/index.js';
	import { chartBarIcon } from '$lib/components/Icons/chartBar.js';
	import { commandIcon } from '$lib/components/Icons/command.js';
	import { gearIcon } from '$lib/components/Icons/gear.js';
	import { houseIcon } from '$lib/components/Icons/house.js';
	import { sidebarIcon } from '$lib/components/Icons/sidebar.js';
	import { trayIcon } from '$lib/components/Icons/tray.js';

	let open = $state(true);

	const items: SidebarGroup[] = [
		{
			label: 'Workspace',
			items: [
				{ label: 'Overview', href: '#overview', icon: houseIcon, isActive: true },
				{ label: 'Inbox', href: '#inbox', icon: trayIcon, badge: 8 },
				{ label: 'Analytics', href: '#analytics', icon: chartBarIcon },
				{ label: 'Settings', href: '#settings', icon: gearIcon }
			]
		}
	];

	const sidebar = $derived<AppShellSidebarProps>({
		open,
		onOpenChange: (nextOpen) => {
			open = nextOpen;
		},
		items,
		collapsible: 'icon',
		variant: 'inset',
		rail: true,
		width: '17rem',
		widthIcon: '3.5rem',
		headerButton: {
			icon: commandIcon,
			title: 'Acme',
			subtitle: 'Operations'
		}
	});
</script>

<div class="h-[520px] w-full">
	<AppShell
		{sidebar}
		title="Dashboard"
		subtitle="Sidebar navigation with sticky page chrome"
		frame="contained"
		theme={{
			root: { base: 'h-full !min-h-0 overflow-hidden rounded-lg border border-background-muted' }
		}}
	>
		{#snippet headerActions({ sidebar })}
			<button
				type="button"
				class="border-background-muted hover:bg-background-muted inline-flex size-8 items-center justify-center rounded-md border text-foreground"
				aria-label="Toggle sidebar"
				onclick={sidebar.toggle}
			>
				{@render sidebarIcon({ class: 'size-4' })}
			</button>
		{/snippet}

		{#snippet footer()}
			<span>Sidebar is {open ? 'expanded' : 'collapsed'}</span>
			<span class="font-medium text-primary">Responsive drawer included</span>
		{/snippet}

		{#snippet children()}
			<div class="grid gap-4 p-4 md:grid-cols-3">
				{#each ['Pipeline', 'Revenue', 'Support'] as metric}
					<section class="rounded-lg border border-background-muted bg-background-light p-4">
						<p class="text-sm font-medium text-foreground">{metric}</p>
						<p class="mt-2 text-2xl font-semibold text-primary">Healthy</p>
					</section>
				{/each}
			</div>
		{/snippet}
	</AppShell>
</div>
