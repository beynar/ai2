<script lang="ts">
	import {
		Sidebar,
		type SidebarGroup,
		type SidebarThemeProps
	} from '$lib/components/Sidebar/index.js';
	import { bookOpenIcon } from '$lib/components/Icons/bookOpen.js';
	import { chartPieIcon } from '$lib/components/Icons/chartPie.js';
	import { commandIcon } from '$lib/components/Icons/command.js';
	import { databaseIcon } from '$lib/components/Icons/database.js';
	import { frameCornersIcon } from '$lib/components/Icons/frameCorners.js';
	import { gearIcon } from '$lib/components/Icons/gear.js';
	import { lightningIcon } from '$lib/components/Icons/lightning.js';
	import { lockIcon } from '$lib/components/Icons/lock.js';
	import { robotIcon } from '$lib/components/Icons/robot.js';
	import { sidebarIcon } from '$lib/components/Icons/sidebar.js';

	let open = $state(false);

	const previewTheme = {
		root: { base: 'h-full !min-h-0 overflow-hidden rounded-lg border border-background-muted' },
		container: { base: '!absolute !inset-y-0 !h-full' },
		gap: { base: 'h-full shrink-0' },
		inset: { base: 'min-w-0' }
	} satisfies SidebarThemeProps;

	const items: SidebarGroup[] = [
		{
			items: [
				{ label: 'Automations', href: '#automations', icon: robotIcon, isActive: true },
				{ label: 'Insights', href: '#insights', icon: chartPieIcon, badge: 4 },
				{ label: 'Data', href: '#data', icon: databaseIcon },
				{ label: 'Security', href: '#security', icon: lockIcon },
				{ label: 'Settings', href: '#settings', icon: gearIcon }
			]
		}
	];
</script>

<div class="h-[460px] w-full">
	<Sidebar
		bind:open
		{items}
		collapsible="icon"
		tooltips="always"
		variant="floating"
		width="16rem"
		widthIcon="3.5rem"
		theme={previewTheme}
		headerButton={{
			icon: commandIcon,
			title: 'Control',
			subtitle: 'Command center',
			variant: 'brand'
		}}
		footerMenu={[
			{ label: 'Quick start', href: '#quick-start', icon: lightningIcon },
			{ label: 'Docs', href: '#docs', icon: bookOpenIcon }
		]}
	>
		{#snippet children(api)}
			<div class="flex h-full min-w-0 flex-1 flex-col bg-background-light">
				<header class="border-background-muted flex h-14 items-center gap-3 border-b px-4">
					<button
						type="button"
						class="border-background-muted hover:bg-background-muted inline-flex size-8 items-center justify-center rounded-md border text-foreground"
						aria-label="Toggle sidebar"
						onclick={() => api.toggle()}
					>
						{@render sidebarIcon({ class: 'size-4' })}
					</button>
					<div>
						<p class="text-sm font-medium text-foreground">Icon rail</p>
						<p class="text-xs text-foreground/60">Tooltips and labels survive collapsed mode.</p>
					</div>
				</header>
				<div class="flex flex-1 items-center justify-center p-4">
					<div
						class="border-background-muted bg-background max-w-sm rounded-lg border p-5 text-center"
					>
						<div
							class="mx-auto mb-3 flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary"
						>
							{@render frameCornersIcon({ class: 'size-5' })}
						</div>
						<p class="text-sm font-medium text-foreground">
							{open ? 'Expanded navigation' : 'Collapsed navigation'}
						</p>
						<p class="mt-2 text-sm text-foreground/60">
							Use the header button or Cmd/Ctrl+B to toggle the same state controller.
						</p>
					</div>
				</div>
			</div>
		{/snippet}
	</Sidebar>
</div>
