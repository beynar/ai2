<script lang="ts">
	import '../app.css';
	import { ThemeState, useTheme } from '$lib/components/Theme/theme.state.svelte.js';
	import Theme from '$lib/components/Theme/Theme.svelte';
	import { page } from '$app/state';
	import { NetworkIndicator } from '$lib/components/NetworkIndicator/index.js';
	import { Separator } from '$lib/components/Separator/index.js';
	import Confirmation from '$lib/components/Confirmation/Confirmation.svelte';
	const { children: childrenSnippet } = $props();
</script>

{#snippet navigationButton({ href, text }: { href: string; text: string })}
	{@const isActive = page.route.id === href}
	<a
		{href}
		class="text-contrast {isActive
			? 'bg-primary/20 text-primary'
			: ''} rounded-md px-2 py-1 text-sm"
	>
		{text}
	</a>
{/snippet}

{#snippet sideNavigationButton({ href, text }: { href: string; text: string })}
	{@const isActive = page.route.id === href}
	<a
		{href}
		class="text-contrast {isActive
			? 'bg-primary/20 text-primary'
			: ''} rounded-md px-2 py-1 text-sm"
	>
		{text}
	</a>
{/snippet}

<Theme>
	{#snippet children(theme: ThemeState)}
		<NetworkIndicator color="danger" />
		<Confirmation />
		<div class="relative grid grid-cols-12">
			<div
				class=" bg-surface border-surface-muted sticky top-0 z-10 col-span-12 flex items-center justify-between gap-4 border-b border-dashed px-10 py-2"
			>
				<div class="flex items-center gap-4">
					{@render navigationButton({ href: '/docs', text: 'Docs' })}
					{@render navigationButton({ href: '/components/accordion', text: 'Components' })}
					{@render navigationButton({ href: '/', text: 'Sections' })}
					{@render navigationButton({ href: '/', text: 'Examples' })}
					{@render navigationButton({ href: '/playground', text: 'Playground' })}
					{@render navigationButton({ href: '/colors', text: 'Colors' })}
				</div>
				<div class="flex items-center gap-2">
					<!-- <Button suffix={githubLogo} variant="ghost" size="small" /> -->
					<button
						class="border-border bg-background text-foreground hover:bg-muted hover:text-foreground inline-flex h-8 items-center justify-center rounded-md border px-3 text-xs font-medium transition-colors disabled:pointer-events-none disabled:opacity-50"
						onclick={() => (theme.theme = theme.resolvedTheme === 'dark' ? 'light' : 'dark')}
					>
						{theme?.resolvedTheme === 'dark' ? '☀️ Light' : '🌙 Dark'}
					</button>
				</div>
			</div>
			<div
				class="  border-surface-muted scrollbar scrollbar-none bg-surface sticky top-[45px] left-0 col-span-2 grid max-h-[calc(100vh-45px)] overflow-auto border-r border-dashed px-2 pb-10"
			>
				<!-- Actions -->
				<Separator class="my-4" children="Actions" />
				{@render sideNavigationButton({ href: '/components/button', text: 'Button' })}
				{@render sideNavigationButton({ href: '/components/button-group', text: 'Button group' })}
				{@render sideNavigationButton({ href: '/components/toggle-button', text: 'Toggle button' })}
				{@render sideNavigationButton({
					href: '/components/toggle-button-group',
					text: 'Toggle group'
				})}

				<!-- Display -->
				<Separator class="my-4" children="Display" />
				{@render sideNavigationButton({ href: '/components/code', text: 'Code' })}
				{@render sideNavigationButton({ href: '/components/chip', text: 'Chip' })}
				{@render sideNavigationButton({ href: '/components/badge', text: 'Badge' })}
				{@render sideNavigationButton({ href: '/components/breadcrumbs', text: 'Breadcrumbs' })}
				{@render sideNavigationButton({ href: '/components/avatar', text: 'Avatar' })}
				{@render sideNavigationButton({ href: '/components/separator', text: 'Separator' })}
				{@render sideNavigationButton({ href: '/components/meter', text: 'Meter' })}
				{@render sideNavigationButton({ href: '/components/marquee', text: 'Marquee' })}
				{@render sideNavigationButton({ href: '/components/carousel', text: 'Carousel' })}
				{@render sideNavigationButton({ href: '/components/tabbar', text: 'Tabbar' })}
				{@render sideNavigationButton({ href: '/components/tabs', text: 'Tabs' })}
				{@render sideNavigationButton({ href: '/components/stepper', text: 'Stepper' })}
				{@render sideNavigationButton({ href: '/components/table', text: 'Table' })}
				{@render sideNavigationButton({ href: '/components/dialog', text: 'Dialog' })}
				{@render sideNavigationButton({ href: '/components/card', text: 'Card' })}
				{@render sideNavigationButton({ href: '/components/aspect-ratio', text: 'Aspect ratio' })}
				{@render sideNavigationButton({ href: '/components/skeleton', text: 'Skeleton' })}

				<!-- Menus & Navigation -->
				<Separator class="my-4" children="Menus & Navigation" />
				{@render sideNavigationButton({ href: '/components/menu', text: 'Menu' })}
				{@render sideNavigationButton({ href: '/components/menu-option', text: 'Menu option' })}
				{@render sideNavigationButton({ href: '/components/popup-menu', text: 'Popup menu' })}
				{@render sideNavigationButton({ href: '/components/popover', text: 'Popover' })}
				{@render sideNavigationButton({ href: '/components/tooltip', text: 'Tooltip' })}
				{@render sideNavigationButton({ href: '/components/toast', text: 'Toast' })}

				<!-- Disclosure -->
				<Separator class="my-4" children="Disclosure" />
				{@render sideNavigationButton({ href: '/components/accordion', text: 'Accordion' })}
				{@render sideNavigationButton({ href: '/components/alert', text: 'Alert' })}
				{@render sideNavigationButton({ href: '/components/collapsible', text: 'Collapsible' })}

				<!-- Form -->
				<Separator class="my-4" children="Form" />
				{@render sideNavigationButton({ href: '/components/form', text: 'Form' })}
				{@render sideNavigationButton({ href: '/components/textinput', text: 'Text input' })}
				{@render sideNavigationButton({ href: '/components/select', text: 'Select' })}
				{@render sideNavigationButton({ href: '/components/combobox', text: 'Combobox' })}
				{@render sideNavigationButton({ href: '/components/switch', text: 'Switch' })}
				{@render sideNavigationButton({ href: '/components/radios', text: 'Radios' })}
				{@render sideNavigationButton({ href: '/components/calendar', text: 'Calendar' })}

				<!-- <Separator orientation="horizontal" class="mt-4 mb-2">actions & utilities</Separator> -->

				<!-- {@render sideNavigationButton({ href: '/components/textarea', text: 'autosize' })}
				{@render sideNavigationButton({ href: '/components/textarea', text: 'usePrevious' })}
				{@render sideNavigationButton({ href: '/components/textarea', text: 'trapFocus' })}
				{@render sideNavigationButton({ href: '/components/textarea', text: 'clickOutside' })} -->

				<!-- <Separator orientation="horizontal" class="mt-4 mb-2">Tailwind utilities</Separator> -->

				<!-- {@render sideNavigationButton({ href: '/utilities/raised', text: '.raised' })} -->
			</div>
			<main class="bg-surface-dark col-span-10 p-4 md:p-10">
				{@render childrenSnippet()}
			</main>
		</div>
	{/snippet}
</Theme>
