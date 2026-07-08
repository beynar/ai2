<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import {
		AppShell,
		type AppShellApi,
		type AppShellSidebarProps
	} from '$lib/components/AppShell/index.js';
	import { Button } from '$lib/components/Button/index.js';
	import Confirmation from '$lib/components/Confirmation/Confirmation.svelte';
	import { commandIcon } from '$lib/components/Icons/command.js';
	import { sidebarSimpleIcon } from '$lib/components/Icons/sidebarSimple.js';
	import { NetworkIndicator } from '$lib/components/NetworkIndicator/index.js';
	import type {
		SidebarApi,
		SidebarCollapsible,
		SidebarDisplayState,
		SidebarVariant
	} from '$lib/components/Sidebar/index.js';
	import Theme from '$lib/components/Theme/Theme.svelte';
	import type { ThemeState } from '$lib/components/Theme/theme.state.svelte.js';
	import { getSidebarGroups, headerLinks } from './appNavigation.js';
	import SidebarCommandPalette from './SidebarCommandPalette.svelte';

	const { children: childrenSnippet } = $props();

	type SidebarFooterState = 'expanded' | 'icon' | 'hidden';

	const sidebarVariants: SidebarVariant[] = ['sidebar', 'floating', 'inset', 'split'];
	const sidebarStates: SidebarFooterState[] = ['expanded', 'icon', 'hidden'];
	const isPreviewRoute = $derived(page.route.id?.startsWith('/previews/') ?? false);
	let sidebarDisplayState = $state<SidebarDisplayState>('expanded');
	let sidebarVariant = $state<SidebarVariant>('split');
	let sidebarCollapsedDisplayState = $state<Exclude<SidebarDisplayState, 'expanded'>>('hidden');
	let sidebarWidth = $state('16rem');

	const sidebarGroups = $derived(getSidebarGroups(page.route.id));
	const sidebarState = $derived<SidebarFooterState>(
		sidebarDisplayState === 'collapsed' ? 'icon' : sidebarDisplayState
	);
	const sidebarCollapsible = $derived<SidebarCollapsible>(
		sidebarCollapsedDisplayState === 'hidden' ? 'offcanvas' : 'icon'
	);

	function setSidebarState(nextState: SidebarFooterState) {
		if (nextState === 'expanded') {
			sidebarDisplayState = 'expanded';
			return;
		}

		const nextDisplayState = nextState === 'icon' ? 'collapsed' : 'hidden';
		sidebarCollapsedDisplayState = nextDisplayState;
		sidebarDisplayState = nextDisplayState;
	}

	function handleSidebarDisplayStateChange(nextDisplayState: SidebarDisplayState) {
		sidebarDisplayState = nextDisplayState;
		if (nextDisplayState !== 'expanded') {
			sidebarCollapsedDisplayState = nextDisplayState;
		}
	}

	const sidebar = $derived<AppShellSidebarProps>({
		displayState: sidebarDisplayState,
		onDisplayStateChange: handleSidebarDisplayStateChange,
		variant: sidebarVariant,
		collapsible: sidebarCollapsible,
		rail: true,
		edgeReveal: true,
		width: sidebarWidth,
		widthMobile: '18rem',
		resizable: {
			minWidth: '12rem',
			maxWidth: '24rem',
			collapseThreshold: '10.5rem',
			storageKey: 'svelai-docs-sidebar-width',
			onWidthChange: (nextWidth) => {
				sidebarWidth = nextWidth;
			}
		},
		items: sidebarGroups,
		headerButton: {
			icon: commandIcon,
			title: 'Svelai',
			subtitle: 'Components'
		},
		footer: sidebarFooter
	});
</script>

{#snippet headerLink({ href, text }: { href: string; text: string })}
	{@const isActive = page.route.id === href}
	<a
		{href}
		class="rounded-md px-2 py-1 text-sm font-medium text-foreground transition-colors hover:bg-background-muted hover:text-foreground {isActive
			? 'bg-primary/15 text-primary'
			: ''}"
	>
		{text}
	</a>
{/snippet}

{#snippet shellFooter()}
	<div class="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2">
		<div class="flex min-w-0 flex-wrap items-center gap-1.5">
			<span class="mr-1 text-xs font-medium text-foreground-muted">Variant</span>
			<div class="flex flex-wrap items-center gap-1" role="group" aria-label="Sidebar variant">
				{#each sidebarVariants as variant}
					<Button
						variant={sidebarVariant === variant ? 'solid' : 'ghost'}
						size="small"
						onClick={() => (sidebarVariant = variant)}
					>
						{variant}
					</Button>
				{/each}
			</div>
		</div>

		<div class="flex min-w-0 flex-wrap items-center gap-1.5">
			<span class="mr-1 text-xs font-medium text-foreground-muted">State</span>
			<div class="flex flex-wrap items-center gap-1" role="group" aria-label="Sidebar state">
				{#each sidebarStates as state}
					<Button
						variant={sidebarState === state ? 'solid' : 'ghost'}
						size="small"
						onClick={() => setSidebarState(state)}
					>
						{state}
					</Button>
				{/each}
			</div>
		</div>
	</div>
{/snippet}

{#snippet sidebarFooter(api: SidebarApi)}
	<SidebarCommandPalette
		groups={sidebarGroups}
		collapsed={api.collapsible === 'icon' && api.state === 'collapsed' && !api.isMobile}
	/>
{/snippet}

<Theme>
	{#snippet children(theme: ThemeState)}
		{#if isPreviewRoute}
			{@render childrenSnippet()}
		{:else}
			{#snippet shellHeader({ sidebar }: AppShellApi)}
				<div class="flex min-h-12 items-center justify-between gap-3 px-3 py-2 sm:px-4">
					<div class="flex min-w-0 items-center gap-2">
						<Button
							prefix={sidebarSimpleIcon}
							label="Toggle sidebar"
							variant="ghost"
							size="small"
							squared
							class="md:hidden"
							onClick={() => sidebar.toggle()}
						/>
						<nav aria-label="Primary" class="flex min-w-0 flex-wrap items-center gap-1">
							{#each headerLinks as link}
								{@render headerLink(link)}
							{/each}
						</nav>
					</div>
					<Button
						variant="outline"
						size="small"
						onClick={() => (theme.theme = theme.resolvedTheme === 'dark' ? 'light' : 'dark')}
					>
						{theme.resolvedTheme === 'dark' ? 'Light' : 'Dark'}
					</Button>
				</div>
			{/snippet}

			<NetworkIndicator color="danger" />
			<Confirmation />
			<AppShell
				{sidebar}
				header={shellHeader}
				footer={shellFooter}
				contentPadding="large"
				contentWidth="wide"
			>
				{#snippet children()}
					{@render childrenSnippet()}
				{/snippet}
			</AppShell>
		{/if}
	{/snippet}
</Theme>
