<script lang="ts">
	import '../app.css';
	import Button from '$lib/components/Button/Button.svelte';
	import Chip from '$lib/components/Chip/Chip.svelte';
	import { ThemeState, useTheme } from '$lib/components/Theme/theme.state.svelte.js';
	import Theme from '$lib/components/Theme/Theme.svelte';
	import { page } from '$app/state';
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
					<!-- <Button suffix={githubLogo} suffixProps={{ size: '100%' }} variant="ghost" size="small" /> -->
					<button
						class="border-border bg-background text-foreground hover:bg-muted hover:text-foreground inline-flex h-8 items-center justify-center rounded-md border px-3 text-xs font-medium transition-colors disabled:pointer-events-none disabled:opacity-50"
						onclick={() => (theme.theme = theme.resolvedTheme === 'dark' ? 'light' : 'dark')}
					>
						{theme?.resolvedTheme === 'dark' ? '☀️ Light' : '🌙 Dark'}
					</button>
				</div>
			</div>
			<div
				class="  border-surface-muted scrollbar scrollbar-none bg-surface sticky top-[45px] left-0 col-span-2 grid max-h-[calc(100vh-45px)] overflow-auto border-r border-dashed px-2 py-10"
			>
				<!-- {@render sideNavigationButton({ href: '/', text: 'Introduction' })}
				{@render sideNavigationButton({ href: '/', text: 'Introduction' })}
				{@render sideNavigationButton({ href: '/', text: 'Installation' })}
				{@render sideNavigationButton({ href: '/', text: 'Theming' })}
				{@render sideNavigationButton({ href: '/', text: 'Switching theme' })}
				{@render sideNavigationButton({ href: '/', text: 'Heading' })}
				{@render sideNavigationButton({ href: '/', text: 'Text' })}
				{@render sideNavigationButton({ href: '/', text: 'Callout' })}
				{@render sideNavigationButton({ href: '/', text: 'Blockquote' })}
				{@render sideNavigationButton({ href: '/', text: 'Components' })}
				{@render sideNavigationButton({ href: '/', text: 'Theme' })} -->
				{@render sideNavigationButton({ href: '/components/button', text: 'Button' })}
				{@render sideNavigationButton({ href: '/components/button-group', text: 'Button group' })}
				{@render sideNavigationButton({ href: '/components/menu-button', text: 'Menu button' })}
				{@render sideNavigationButton({ href: '/components/toggle-button', text: 'Toggle button' })}
				{@render sideNavigationButton({ href: '/components/toggle-group', text: 'Toggle group' })}
				{@render sideNavigationButton({ href: '/components/code', text: 'Code' })}
				{@render sideNavigationButton({ href: '/components/chip', text: 'Chip' })}
				<!-- {@render sideNavigationButton({ href: '/components/pattern', text: 'Pattern' })} -->
				{@render sideNavigationButton({ href: '/components/badge', text: 'Badge' })}
				{@render sideNavigationButton({ href: '/components/breadcrumbs', text: 'Breadcrumbs' })}
				<!-- {@render sideNavigationButton({ href: '/components/thumb', text: 'Thumb' })} -->
				<!-- {@render sideNavigationButton({ href: '/components/toast', text: 'Toast' })} -->
				{@render sideNavigationButton({ href: '/components/avatar', text: 'Avatar' })}
				<!-- <Button size="small" variant="link" href="/components/separator">Separator</Button> -->

				{@render sideNavigationButton({ href: '/components/meter', text: 'Meter' })}
				{@render sideNavigationButton({ href: '/components/marquee', text: 'Marquee' })}
				{@render sideNavigationButton({ href: '/components/slideshow', text: 'Slideshow' })}
				{@render sideNavigationButton({ href: '/components/tabs', text: 'Tabs' })}
				{@render sideNavigationButton({ href: '/components/tree', text: 'Tree' })}
				<!-- <Button size="small" variant="link" href="/components/navlinks">Navigation links</Button> -->
				<!-- <Button size="small" variant="link" href="/components/networkIndicator"
					>Network indicator</Button
				> -->
				{@render sideNavigationButton({ href: '/components/loader', text: 'Loader' })}
				{@render sideNavigationButton({ href: '/components/dialog', text: 'Dialog' })}
				<!-- {@render sideNavigationButton({ href: '/components/megamenu', text: 'Megamenu' })} -->
				<!-- {@render sideNavigationButton({ href: '/components/contextmenu', text: 'Context menu' })} -->
				{@render sideNavigationButton({ href: '/components/dropdown-menu', text: 'Dropdown menu' })}
				{@render sideNavigationButton({ href: '/components/card', text: 'Card' })}
				{@render sideNavigationButton({ href: '/components/hovercard', text: 'Hover Card' })}

				{@render sideNavigationButton({ href: '/components/menu', text: 'Menu' })}
				{@render sideNavigationButton({ href: '/components/menubar', text: 'Menubar' })}
				{@render sideNavigationButton({ href: '/components/split-layout', text: 'Split layout' })}

				{@render sideNavigationButton({ href: '/components/popover', text: 'Popover' })}
				{@render sideNavigationButton({ href: '/components/tooltip', text: 'Tooltip' })}

				{@render sideNavigationButton({ href: '/components/kbd', text: 'KBD' })}
				{@render sideNavigationButton({ href: '/components/accordion', text: 'Accordion' })}

				<!-- <Separator orientation="horizontal" class="mt-4 mb-2">Form</Separator> -->
				{@render sideNavigationButton({ href: '/components/textarea', text: 'Textarea' })}
				{@render sideNavigationButton({ href: '/components/number-input', text: 'Number input' })}
				{@render sideNavigationButton({ href: '/components/color-input', text: 'Color' })}
				{@render sideNavigationButton({ href: '/components/select', text: 'Select' })}
				{@render sideNavigationButton({ href: '/components/date-input', text: 'DateInput' })}
				{@render sideNavigationButton({ href: '/components/radios', text: 'Radios' })}
				{@render sideNavigationButton({ href: '/components/tag-input', text: 'Tag input' })}
				{@render sideNavigationButton({ href: '/components/switch', text: 'Switch' })}
				{@render sideNavigationButton({ href: '/components/form', text: 'Form' })}
				{@render sideNavigationButton({ href: '/components/text-input', text: 'Text input' })}
				{@render sideNavigationButton({ href: '/components/time-input', text: 'Time input' })}
				{@render sideNavigationButton({ href: '/components/slider', text: 'Slider' })}
				{@render sideNavigationButton({ href: '/components/pininput', text: 'PIN input' })}
				{@render sideNavigationButton({ href: '/components/file-input', text: 'File input' })}
				{@render sideNavigationButton({ href: '/components/calendar-input', text: 'Calendar' })}

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
