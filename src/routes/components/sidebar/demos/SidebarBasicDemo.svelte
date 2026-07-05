<script lang="ts">
	import {
		Sidebar,
		type SidebarGroup,
		type SidebarMenuEntry
	} from '$lib/components/Sidebar/index.js';
	import type { MenuItem } from '$lib/components/Menu/index.js';
	import type { SidebarThemeProps } from '$lib/components/Sidebar/index.js';
	import { bellIcon } from '$lib/components/Icons/bell.js';
	import { chartBarIcon } from '$lib/components/Icons/chartBar.js';
	import { commandIcon } from '$lib/components/Icons/command.js';
	import { creditCardIcon } from '$lib/components/Icons/creditCard.js';
	import { dotsThreeIcon } from '$lib/components/Icons/dotsThree.js';
	import { folderIcon } from '$lib/components/Icons/folder.js';
	import { gearIcon } from '$lib/components/Icons/gear.js';
	import { houseIcon } from '$lib/components/Icons/house.js';
	import { lifebuoyIcon } from '$lib/components/Icons/lifebuoy.js';
	import { plusIcon } from '$lib/components/Icons/plus.js';
	import { rocketIcon } from '$lib/components/Icons/rocket.js';
	import { sidebarIcon } from '$lib/components/Icons/sidebar.js';
	import { signOutIcon } from '$lib/components/Icons/signOut.js';
	import { sparkleIcon } from '$lib/components/Icons/sparkle.js';
	import { trayIcon } from '$lib/components/Icons/tray.js';
	import { usersIcon } from '$lib/components/Icons/users.js';

	let open = $state(true);
	let query = $state('');

	const previewTheme = {
		root: { base: 'h-full !min-h-0 overflow-hidden rounded-lg border border-background-muted' },
		container: { base: '!absolute !inset-y-0 !h-full' },
		gap: { base: 'h-full shrink-0' },
		inset: { base: 'min-w-0' }
	} satisfies SidebarThemeProps;

	const accountMenu: MenuItem[] = [
		{ type: 'option', title: 'Notifications', prefix: bellIcon },
		{ type: 'option', title: 'Billing', prefix: creditCardIcon },
		{ type: 'separator' },
		{ type: 'option', title: 'Sign out', prefix: signOutIcon, color: 'danger' }
	];

	const projectMenu: MenuItem[] = [
		{ type: 'option', title: 'New project', prefix: plusIcon },
		{ type: 'option', title: 'Project settings', prefix: gearIcon }
	];

	const items: SidebarGroup[] = [
		{
			label: 'Workspace',
			items: [
				{ label: 'Overview', href: '#overview', icon: houseIcon, isActive: true },
				{ label: 'Inbox', href: '#inbox', icon: trayIcon, badge: 12 },
				{
					label: 'Projects',
					icon: folderIcon,
					defaultOpen: true,
					items: [
						{ label: 'Web app', href: '#web-app', isActive: true },
						{ label: 'Mobile app', href: '#mobile-app' },
						{ label: 'Design system', href: '#design-system' }
					],
					action: { label: 'Project actions', icon: dotsThreeIcon, menu: projectMenu }
				},
				{ label: 'Analytics', href: '#analytics', icon: chartBarIcon }
			]
		},
		{
			label: 'Team',
			separator: true,
			items: [
				{ label: 'Members', href: '#members', icon: usersIcon },
				{ label: 'Launch plan', href: '#launch-plan', icon: rocketIcon, badge: 'Beta' },
				{ label: 'Support', href: '#support', icon: lifebuoyIcon }
			]
		}
	];

	const visibleGroups = $derived(query.trim() ? filterGroups(items, query.trim()) : items);
	const search = $derived({
		placeholder: 'Search workspace',
		value: query,
		onInput: (event: Event & { currentTarget: HTMLInputElement }) => {
			query = event.currentTarget.value;
		}
	});

	function filterGroups(groupsToFilter: SidebarGroup[], value: string): SidebarGroup[] {
		const normalized = value.toLowerCase();

		return groupsToFilter
			.map((group) => ({
				...group,
				items: group.items ? filterItems(group.items, normalized) : group.items
			}))
			.filter((group) => group.items?.length || group.label?.toLowerCase().includes(normalized));
	}

	function filterItems(items: SidebarMenuEntry[], normalized: string): SidebarMenuEntry[] {
		return items.flatMap((item) => {
			const children = item.items?.filter((child) =>
				child.label.toLowerCase().includes(normalized)
			);
			const matches = item.label.toLowerCase().includes(normalized);

			if (matches) return [item];
			if (children?.length) return [{ ...item, items: children, defaultOpen: true }];
			return [];
		});
	}
</script>

<div class="h-[520px] w-full">
	<Sidebar
		bind:open
		items={visibleGroups}
		{search}
		collapsible="icon"
		variant="inset"
		rail
		width="17rem"
		widthIcon="3.5rem"
		theme={previewTheme}
		headerButton={{
			icon: commandIcon,
			title: 'Acme Studio',
			subtitle: 'Operations',
			menu: accountMenu,
			menuShowLabel: true
		}}
		footerButton={{
			avatar: { fallback: 'AR' },
			title: 'Arnaud',
			subtitle: 'arnaud@example.com',
			menu: accountMenu,
			menuShowLabel: true
		}}
	>
		{#snippet children(api)}
			<div class="flex h-full min-w-0 flex-1 flex-col bg-background-light">
				<header
					class="border-background-muted flex h-14 items-center justify-between border-b px-4"
				>
					<div>
						<p class="text-sm font-medium text-foreground">Workspace overview</p>
						<p class="text-xs text-foreground/60">Search, menus, badges, and nested rows.</p>
					</div>
					<button
						type="button"
						class="border-background-muted hover:bg-background-muted inline-flex size-8 items-center justify-center rounded-md border text-foreground"
						aria-label="Toggle sidebar"
						onclick={() => api.toggle()}
					>
						{@render sidebarIcon({ class: 'size-4' })}
					</button>
				</header>
				<div class="grid flex-1 gap-4 p-4 md:grid-cols-3">
					<div class="border-background-muted bg-background rounded-lg border p-4 md:col-span-2">
						<div class="mb-8 flex items-center gap-2 text-primary">
							{@render sparkleIcon({ class: 'size-4' })}
							<span class="text-sm font-medium">Growth dashboard</span>
						</div>
						<div class="grid gap-3 sm:grid-cols-3">
							{#each ['Revenue', 'Activation', 'Retention'] as metric}
								<div class="bg-background-light rounded-md p-3">
									<p class="text-xs text-foreground/60">{metric}</p>
									<p class="mt-2 text-2xl font-semibold text-foreground">84%</p>
								</div>
							{/each}
						</div>
					</div>
					<div class="border-background-muted bg-background rounded-lg border p-4">
						<p class="text-sm font-medium text-foreground">Open state</p>
						<p class="mt-2 text-sm text-foreground/60">
							The sidebar is currently {open ? 'expanded' : 'collapsed'}.
						</p>
					</div>
				</div>
			</div>
		{/snippet}
	</Sidebar>
</div>
