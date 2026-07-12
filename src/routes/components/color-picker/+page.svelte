<script lang="ts">
	import DocPage from '../../DocPage.svelte';
	import ComponentCard from '../../ComponentCard.svelte';
	import { ColorPicker } from '$lib/components/Form/ColorPicker/index.js';

	let color = $state('#6366f1');
	let alphaColor = $state('#22c55e80');
	let lastChange = $state('');
</script>

<DocPage
	title="Color picker"
	subtitle="A standalone color picker panel: a saturation/brightness square, hue and alpha sliders, an eyedropper, and a format-aware text input."
	component="ColorPicker"
	features={[
		'Canonical hex output (#rrggbb / #rrggbbaa)',
		'Hue and saturation preserved while dragging to black or white',
		'Native eyedropper where supported (SSR-safe)',
		'Keyboard-driven role="slider" thumbs',
		'hex / rgb / hsl text representations'
	]}
>
	<ComponentCard description="A color picker panel" code={`<ColorPicker bind:value={color} />`}>
		<ColorPicker bind:value={color} />
	</ComponentCard>

	{#snippet examples()}
		<!-- Example 1: Bound value shown live -->
		<ComponentCard
			description="Bind the value and read the canonical hex back live"
			code={`<ColorPicker bind:value={color} />
<p>Value: {color}</p>`}
		>
			<div class="flex flex-col items-center gap-3">
				<ColorPicker bind:value={color} />
				<div class="flex items-center gap-2 text-sm">
					<span
						class="border-background-muted size-5 rounded border"
						style="background-color: {color}"
					></span>
					<code class="font-mono">{color}</code>
				</div>
			</div>
		</ComponentCard>

		<!-- Example 2: Alpha -->
		<ComponentCard
			description="Colors with alpha below 1 are emitted as #rrggbbaa"
			code={`<ColorPicker value="#22c55e80" />`}
		>
			<div class="flex flex-col items-center gap-3">
				<ColorPicker bind:value={alphaColor} />
				<code class="font-mono text-sm">{alphaColor}</code>
			</div>
		</ComponentCard>

		<!-- Example 3: Format variants -->
		<ComponentCard
			description="The format prop changes only the text representation — the bound value stays hex"
			code={`<ColorPicker value="#6366f1" format="hex" />
<ColorPicker value="#6366f1" format="rgb" />
<ColorPicker value="#6366f1" format="hsl" />`}
		>
			<div class="flex flex-wrap items-start justify-center gap-6">
				<ColorPicker value="#6366f1" format="hex" />
				<ColorPicker value="#6366f1" format="rgb" />
				<ColorPicker value="#6366f1" format="hsl" />
			</div>
		</ComponentCard>

		<!-- Example 4: Sizes -->
		<ComponentCard
			description="Small, normal and large sizes scale the panel, sliders and text"
			code={`<ColorPicker value="#f59e0b" size="small" />
<ColorPicker value="#f59e0b" size="normal" />
<ColorPicker value="#f59e0b" size="large" />`}
		>
			<div class="flex flex-wrap items-start justify-center gap-6">
				<ColorPicker value="#f59e0b" size="small" />
				<ColorPicker value="#f59e0b" size="normal" />
				<ColorPicker value="#f59e0b" size="large" />
			</div>
		</ComponentCard>

		<!-- Example 5: Disabled -->
		<ComponentCard
			description="Disabled dims the panel and blocks every control"
			code={`<ColorPicker value="#ef4444" disabled />`}
		>
			<ColorPicker value="#ef4444" disabled />
		</ComponentCard>

		<!-- Example 6: onChange logging -->
		<ComponentCard
			description="onChange fires on every committed change, including continuously while dragging"
			code={`<ColorPicker value="#3b82f6" onChange={(hex) => console.log(hex)} />`}
		>
			<div class="flex flex-col items-center gap-3">
				<ColorPicker value="#3b82f6" onChange={(hex) => (lastChange = hex)} />
				<p class="text-foreground-muted text-xs">
					Last change: <code class="font-mono">{lastChange || '—'}</code>
				</p>
			</div>
		</ComponentCard>
	{/snippet}
</DocPage>
