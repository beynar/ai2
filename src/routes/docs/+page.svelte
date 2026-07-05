<script lang="ts">
	import Code from '$lib/components/Code/Code.svelte';
	import Separator from '$lib/components/Separator/Separator.svelte';

	type Option = {
		name: string;
		type: string;
		def: string;
		desc: string;
	};

	const themeOptions: Option[] = [
		{ name: 'name', type: 'string', def: '—', desc: 'Theme name used for data-theme switching.' },
		{
			name: 'default',
			type: 'boolean',
			def: 'false',
			desc: 'Apply this theme to <html> without a data-theme attribute.'
		},
		{
			name: 'colorscheme',
			type: "'light' | 'dark'",
			def: "'light'",
			desc: 'Base scheme driving background/foreground generation.'
		},
		{
			name: 'prefersDark',
			type: 'boolean',
			def: 'false',
			desc: 'Also apply under @media (prefers-color-scheme: dark).'
		},
		{
			name: 'luminance',
			type: 'number',
			def: '0',
			desc: 'Shift overall brightness (positive lighter, negative darker).'
		},
		{
			name: 'saturation',
			type: 'number',
			def: '0',
			desc: 'Shift color saturation across the palette.'
		},
		{
			name: 'radius',
			type: "'none' | 'subtile' | 'small' | 'normal' | 'large' | 'round' | number",
			def: 'normal',
			desc: 'Multiplier applied to the native Tailwind radius scale (rounded-sm … rounded-4xl). normal = 1×.'
		},
		{
			name: 'spacing',
			type: "'small' | 'normal' | 'large' | number",
			def: 'normal',
			desc: 'Multiplier applied to the native Tailwind spacing scale (p-*, gap-*, m-*, size-* …). normal = 1×, small = 0.8×, large = 1.2×.'
		},
		{
			name: 'raised-with-border',
			type: 'boolean',
			def: 'true',
			desc: 'Add a border to raised-* elements in light mode.'
		}
	];

	const semanticColors = [
		'primary',
		'secondary',
		'danger',
		'success',
		'warning',
		'info',
		'background',
		'foreground'
	] as const;

	const variants = ['DEFAULT', 'light', 'lighter', 'dark', 'muted', 'contrast'] as const;

	const installCode = `pnpm add tailwindcss @tailwindcss/vite`;

	const cssSetupCode = `@import 'tailwindcss';

/* Light theme — applied to <html> by default.
   The default theme also registers the utilities,
   variants and .ui-spinner component. */
@plugin './lib/tailwind/theme' {
	name: light;
	default: true;
	colorscheme: light;
	radius: normal;
	spacing: normal;
}

/* Dark theme — applied via html[data-theme="dark"] or .dark */
@plugin './lib/tailwind/theme' {
	name: dark;
	colorscheme: dark;
	radius: normal;
	spacing: normal;
}`;

	const brandCode = `@plugin './lib/tailwind/theme' {
	name: light;
	default: true;
	colorscheme: light;

	/* hex or a Tailwind color name (e.g. \`indigo\`) */
	primary: #6366f1;
	secondary: #8b5cf6;
	danger: #ef4444;
	success: #22c55e;
	warning: #f59e0b;
	info: #3b82f6;

	/* background = page background, foreground = default text color */
	background: #ffffff;
	foreground: #0a0a0a;

	/* optional per-variant overrides */
	primary-dark: #4338ca;
	primary-contrast: #ffffff;
}`;

	const usageCode = `<button class="bg-primary text-primary-contrast rounded px-3 py-1.5">
	Primary
</button>

<div class="bg-background-dark border-background-muted rounded-xl border p-4">
	<p class="text-foreground">Title</p>
	<p class="text-foreground-muted">Muted body copy</p>
</div>

<!-- opacity modifiers work on every token -->
<span class="bg-primary/20 text-primary">Soft badge</span>`;

	const themeToggleCode = `<html data-theme="dark">
	<!-- or toggle the \`.dark\` class -->
</html>`;
</script>

{#snippet ic(text: string)}<code class="bg-background-muted rounded px-1 py-0.5 text-sm"
		>{text}</code
	>{/snippet}

<article class="text-foreground mx-auto grid max-w-3xl gap-4 pb-20">
	<header class="grid gap-2">
		<h1 class="text-3xl font-semibold">Getting started</h1>
		<p class="text-foreground-muted text-balance">
			This library is a set of Svelte components on top of a small Tailwind CSS theme engine,
			configured entirely from your {@render ic('app.css')} — no JavaScript config file needed.
		</p>
	</header>

	<Separator class="my-2" children="Installation" />

	<p class="text-foreground-muted">Install Tailwind and its Vite plugin.</p>
	<Code language="bash" code={installCode} />

	<p class="text-foreground-muted">
		Then wire up the theme in your {@render ic('src/app.css')}. Declare the {@render ic(
			"@plugin './lib/tailwind/theme'"
		)} block once per theme — each generates a scoped color palette and design tokens. The block marked
		{@render ic('default: true')} also registers the shared utilities, variants and {@render ic(
			'.ui-spinner'
		)} component, so a single plugin is all you need.
	</p>
	<Code language="css" code={cssSetupCode} />

	<Separator class="my-2" children="Theme options" />

	<p class="text-foreground-muted">
		Every key below is passed inside the {@render ic("@plugin './lib/tailwind/theme'")} block.
	</p>

	<div class="border-background-muted rounded-xl overflow-hidden border">
		{#each themeOptions as option, i (option.name)}
			<div
				class="grid grid-cols-[1fr_1.4fr] gap-4 p-3 {i % 2 === 0
					? 'bg-background'
					: 'bg-background-dark'}"
			>
				<div class="grid content-start gap-1">
					<code class="text-primary text-sm font-medium">{option.name}</code>
					<code class="text-foreground-muted text-xs">{option.type}</code>
					<span class="text-foreground-muted text-xs">default: {option.def}</span>
				</div>
				<p class="text-foreground-muted text-sm">{option.desc}</p>
			</div>
		{/each}
	</div>

	<p class="text-foreground-muted">
		Each base color ({@render ic('primary')}, {@render ic('danger')}, …) accepts a hex value or a
		Tailwind color name. Variants ({@render ic('-light')}, {@render ic('-dark')}, {@render ic(
			'-muted'
		)}, {@render ic('-contrast')}) are derived automatically but can be overridden individually.
	</p>
	<Code language="css" code={brandCode} />

	<Separator class="my-2" children="Color tokens" />

	<p class="text-foreground-muted">
		The palette exposes eight semantic colors, each with five variants. Use them like any Tailwind
		color: {@render ic('bg-primary')}, {@render ic('text-danger-contrast')}, {@render ic(
			'border-background-muted'
		)}. Opacity modifiers ({@render ic('/20')}) are supported.
	</p>

	<div class="grid gap-3">
		{#each semanticColors as color (color)}
			<div class="grid gap-1">
				<span class="text-foreground-muted text-xs font-medium">{color}</span>
				<div class="flex flex-wrap gap-2">
					{#each variants as variant (variant)}
						{@const token = variant === 'DEFAULT' ? color : `${color}-${variant}`}
						<div
							class="border-background-muted grid h-12 min-w-20 flex-1 place-items-center rounded border text-xs"
							style:background-color="var(--color-{token})"
						>
							<span class="rounded bg-black/40 px-1 text-white">
								{variant === 'DEFAULT' ? color : variant}
							</span>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<p class="text-foreground-muted">
		See the <a class="text-primary underline" href="/colors">Colors</a> page for the full palette.
	</p>

	<Separator class="my-2" children="Using tokens" />

	<Code language="html" code={usageCode} />

	<Separator class="my-2" children="Dark mode" />

	<p class="text-foreground-muted">
		Any non-default theme is applied through its {@render ic('data-theme')} attribute or a matching class.
		Toggle it on {@render ic('<html>')} to switch themes. Add {@render ic('prefersDark: true;')} to follow
		the system setting automatically.
	</p>
	<Code language="html" code={themeToggleCode} />
</article>
