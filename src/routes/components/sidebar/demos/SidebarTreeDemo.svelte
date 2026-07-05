<script lang="ts">
	import {
		Sidebar,
		type SidebarGroup,
		type SidebarThemeProps
	} from '$lib/components/Sidebar/index.js';
	import { commandIcon } from '$lib/components/Icons/command.js';
	import { fileIcon } from '$lib/components/Icons/file.js';
	import { folderIcon } from '$lib/components/Icons/folder.js';
	import { mapPinIcon } from '$lib/components/Icons/mapPin.js';
	import { plusIcon } from '$lib/components/Icons/plus.js';
	import { sidebarIcon } from '$lib/components/Icons/sidebar.js';
	import { terminalIcon } from '$lib/components/Icons/terminal.js';

	let open = $state(true);

	const previewTheme = {
		root: { base: 'h-full !min-h-0 overflow-hidden rounded-lg border border-background-muted' },
		container: { base: '!absolute !inset-y-0 !h-full' },
		gap: { base: 'h-full shrink-0' },
		inset: { base: 'min-w-0' }
	} satisfies SidebarThemeProps;

	const items: SidebarGroup[] = [
		{
			label: 'Files',
			action: {
				label: 'Add file',
				icon: plusIcon,
				menu: [
					{ type: 'option', title: 'New file', prefix: fileIcon },
					{ type: 'option', title: 'New folder', prefix: folderIcon }
				]
			},
			tree: [
				{
					label: 'src',
					icon: folderIcon,
					defaultOpen: true,
					children: [
						{
							label: 'lib',
							icon: folderIcon,
							defaultOpen: true,
							children: [
								{
									label: 'components',
									icon: folderIcon,
									defaultOpen: true,
									children: [
										{ label: 'Sidebar.svelte', href: '#sidebar', icon: fileIcon, isActive: true },
										{ label: 'SidebarGroup.svelte', href: '#group', icon: fileIcon }
									]
								}
							]
						},
						{ label: 'routes', href: '#routes', icon: folderIcon }
					]
				},
				{ label: 'package.json', href: '#package', icon: fileIcon }
			]
		}
	];
</script>

<div class="h-[460px] w-full">
	<Sidebar
		bind:open
		{items}
		collapsible="offcanvas"
		edgeReveal
		variant="sidebar"
		width="18rem"
		theme={previewTheme}
		headerButton={{
			icon: commandIcon,
			title: 'Repository',
			subtitle: 'svelai'
		}}
	>
		{#snippet children(api)}
			<div class="flex h-full min-w-0 flex-1 flex-col bg-background-light">
				<header
					class="border-background-muted flex h-14 items-center justify-between border-b px-4"
				>
					<div>
						<p class="text-sm font-medium text-foreground">Repository browser</p>
						<p class="text-xs text-foreground/60">Recursive tree groups share sidebar tokens.</p>
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
				<div class="grid flex-1 gap-4 p-4 md:grid-cols-2">
					<div class="border-background-muted bg-background rounded-lg border p-4">
						<div class="mb-3 flex items-center gap-2 text-primary">
							{@render terminalIcon({ class: 'size-4' })}
							<span class="text-sm font-medium">Selected file</span>
						</div>
						<code class="text-sm text-foreground">src/lib/components/Sidebar/Sidebar.svelte</code>
					</div>
					<div class="border-background-muted bg-background rounded-lg border p-4">
						<div class="mb-3 flex items-center gap-2 text-primary">
							{@render mapPinIcon({ class: 'size-4' })}
							<span class="text-sm font-medium">Current route</span>
						</div>
						<p class="text-sm text-foreground/70">/components/sidebar</p>
					</div>
				</div>
			</div>
		{/snippet}
	</Sidebar>
</div>
