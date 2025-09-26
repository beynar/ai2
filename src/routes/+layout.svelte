<script lang="ts">
	import '../app.css';
	import Button from '$lib/components/Button/Button.svelte';
	import Chip from '$lib/components/Chip/Chip.svelte';
	import { ThemeState, useTheme } from '$lib/components/Theme/theme.state.svelte.js';
	import Theme from '$lib/components/Theme/Theme.svelte';

	const { children: childrenSnippet } = $props();
</script>

<Theme>
	{#snippet children(theme: ThemeState)}
		<div class="relative grid grid-cols-11">
			<div
				class=" bg-surface border-surface-muted sticky top-0 z-50 col-span-11 flex items-center justify-between gap-4 border-b border-dashed px-10 py-2"
			>
				<div class="flex items-center gap-4">
					<Button size="small" variant="link" href="/docs">Docs</Button>
					<Button size="small" variant="link" href="/components/accordion">Components</Button>
					<Button size="small" variant="link" href="/">Sections</Button>
					<Button size="small" variant="link" href="/">Examples</Button>
					<Button size="small" variant="link" href="/playground">Playground</Button>
					<Button size="small" variant="link" href="/colors">Colors</Button>
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
				<!-- <Separator orientation="horizontal">Getting started</Separator> -->
				<Button size="small" variant="link" href="/">Introduction</Button>
				<Button size="small" variant="link" href="/">Installation</Button>
				<Button size="small" variant="link" href="/">Theming</Button>
				<Button size="small" variant="link" href="/">Switching theme</Button>
				<!-- <Separator orientation="horizontal" class="mt-4 mb-2">Typography</Separator> -->
				<Button size="small" variant="link" href="/fluid-scale">Fluid scale</Button>
				<Button size="small" variant="link" href="/components/callout">Heading</Button>
				<Button size="small" variant="link" href="/components/callout">Text</Button>
				<Button size="small" variant="link" href="/components/callout">Callout</Button>
				<Button size="small" variant="link" href="/components/blockquote">Blockquote</Button>
				<!-- <Separator orientation="horizontal" class="mt-4 mb-2">Components</Separator> -->
				<Button size="small" variant="link" href="/components/theme">Theme</Button>
				<Button size="small" variant="link" href="/components/button">Button</Button>
				<Button size="small" variant="link" href="/components/button-group">Button group</Button>
				<Button size="small" variant="link" href="/components/menu-button">Menu button</Button>
				<Button size="small" variant="link" href="/components/toggle">Toggle</Button>
				<Button size="small" variant="link" href="/components/toggle-group">Toggle group</Button>
				<Button size="small" variant="link" href="/components/code">Code</Button>
				<Button size="small" fullWidth variant="link" href="/components/chip"
					>Chip
					<Chip class="ml-auto" size="small">New component</Chip>
				</Button>
				<Button size="small" fullWidth variant="link" href="/components/badge">Badge</Button>
				<Button size="small" variant="link" href="/components/pattern">Pattern</Button>
				<Button size="small" variant="link" href="/components/breadcrumbs">Breadcrumbs</Button>
				<Button size="small" variant="link" href="/components/thumb">Thumb</Button>
				<Button size="small" variant="link" href="/components/toast">Toast</Button>
				<Button size="small" variant="link" href="/components/avatar">Avatar</Button>
				<!-- <Button size="small" variant="link" href="/components/separator">Separator</Button> -->

				<Button size="small" variant="link" href="/components/meter">Meter</Button>
				<Button size="small" variant="link" href="/components/marquee">Marquee</Button>
				<Button size="small" variant="link" href="/components/slideshow">Slideshow</Button>
				<Button size="small" variant="link" href="/components/tabs">Tabs</Button>
				<Button size="small" variant="link" href="/components/tree">Tree</Button>
				<Button size="small" variant="link" href="/components/navlinks">Navigation links</Button>
				<Button size="small" variant="link" href="/components/networkIndicator"
					>Network indicator</Button
				>
				<Button size="small" variant="link" href="/components/loader">Loader</Button>
				<Button size="small" variant="link" href="/components/dialog">Dialog</Button>
				<Button size="small" variant="link" href="/components/megamenu">Megamenu</Button>
				<Button size="small" variant="link" href="/components/contextmenu">Context menu</Button>
				<Button size="small" variant="link" href="/components/dropdown-menu">Dropdown menu</Button>
				<Button size="small" variant="link" href="/components/card">Card</Button>
				<Button size="small" variant="link" href="/components/hovercard">Hover Card</Button>

				<Button size="small" variant="link" href="/components/menu">Menu</Button>
				<Button size="small" variant="link" href="/components/menubar">Menubar</Button>
				<Button size="small" variant="link" href="/components/split-layout">Split layout</Button>

				<Button size="small" variant="link" href="/components/popover">Popover</Button>
				<Button size="small" variant="link" href="/components/tooltip">Tooltip</Button>

				<Button size="small" variant="link" href="/components/kbd">KBD</Button>
				<Button size="small" variant="link" href="/components/accordion">Accordion</Button>

				<!-- <Separator orientation="horizontal" class="mt-4 mb-2">Form</Separator> -->
				<Button size="small" variant="link" href="/components/textarea">Textarea</Button>
				<Button size="small" variant="link" href="/components/number-input">Number input</Button>
				<Button size="small" variant="link" href="/components/color-input">Color</Button>
				<Button size="small" variant="link" href="/components/select">Select</Button>
				<Button size="small" variant="link" href="/components/date-input">DateInput</Button>
				<Button size="small" variant="link" href="/components/radios">Radios</Button>
				<Button size="small" variant="link" href="/components/tag-input">Tag input</Button>
				<Button size="small" variant="link" href="/components/switch">Switch</Button>
				<Button size="small" variant="link" href="/components/form">Form</Button>
				<Button size="small" variant="link" href="/components/text-input">Text input</Button>
				<Button size="small" variant="link" href="/components/time-input">Time input</Button>
				<Button size="small" variant="link" href="/components/slider">Slider</Button>
				<Button size="small" variant="link" href="/components/pininput">PIN input</Button>
				<Button size="small" variant="link" href="/components/file-input">File input</Button>
				<Button size="small" variant="link" href="/components/calendar-input">Calendar</Button>

				<!-- <Separator orientation="horizontal" class="mt-4 mb-2">actions & utilities</Separator> -->

				<Button variant="link" href="/components/textarea">autosize</Button>
				<Button variant="link" href="/components/textarea">usePrevious</Button>
				<Button variant="link" href="/components/textarea">trapFocus</Button>
				<Button variant="link" href="/components/textarea">clickOutside</Button>

				<!-- <Separator orientation="horizontal" class="mt-4 mb-2">Tailwind utilities</Separator> -->

				<Button variant="link" href="/utilities/raised">.raised</Button>
			</div>
			<main class="bg-surface-dark col-span-9 p-4 md:p-10">
				{@render childrenSnippet()}
			</main>
		</div>
	{/snippet}
</Theme>
