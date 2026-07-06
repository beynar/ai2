<script lang="ts">
	import { Sidebar, type SidebarGroup } from '$lib/components/Sidebar/index.js';
	import { Skeleton } from '$lib/components/Skeleton/index.js';
	import { bookOpenIcon } from '$lib/components/Icons/bookOpen.js';
	import { chartPieIcon } from '$lib/components/Icons/chartPie.js';
	import { commandIcon } from '$lib/components/Icons/command.js';
	import { databaseIcon } from '$lib/components/Icons/database.js';
	import { gearIcon } from '$lib/components/Icons/gear.js';
	import { lightningIcon } from '$lib/components/Icons/lightning.js';
	import { lockIcon } from '$lib/components/Icons/lock.js';
	import { robotIcon } from '$lib/components/Icons/robot.js';

	let open = $state(false);

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

<div class="flex h-[460px] w-full flex-col gap-3">
	<div class="flex w-full justify-end">
		<button
			type="button"
			class="border-background-muted bg-background hover:bg-background-muted inline-flex h-8 items-center rounded-md border px-3 text-sm font-medium text-foreground transition"
			aria-pressed={!open}
			onclick={() => (open = !open)}
		>
			{open ? 'Collapse' : 'Expand'}
		</button>
	</div>

	<div
		class="min-h-0 flex-1 overflow-hidden rounded-lg border border-background-muted bg-background-muted"
	>
		<Sidebar
			bind:open
			{items}
			collapsible="icon"
			tooltips="always"
			variant="floating"
			frame="contained"
			width="16rem"
			widthIcon="3.5rem"
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
			{#snippet children()}
				<div class="grid h-full min-w-0 place-items-center bg-background p-8">
					<div class="grid w-full max-w-2xl gap-3">
						<Skeleton color="primary" class="h-3 w-11/12 rounded-full" />
						<Skeleton class="h-3 w-8/12 rounded-full" />
						<Skeleton class="h-3 w-full rounded-full" />
						<Skeleton color="primary" class="h-3 w-7/12 rounded-full" />
					</div>
				</div>
			{/snippet}
		</Sidebar>
	</div>
</div>
